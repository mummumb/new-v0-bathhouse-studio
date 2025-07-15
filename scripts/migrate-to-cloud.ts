#!/usr/bin/env tsx
import { PrismaClient as LocalPrismaClient } from '../lib/generated/prisma'
import { PrismaClient as CloudPrismaClient } from '@prisma/client'
import dotenv from 'dotenv'

// Load environment variables
dotenv.config()

async function migrateToCloud() {
  console.log('🚀 Starting migration to cloud database...\n')

  // Check if cloud database URL is set
  const cloudDbUrl = process.env.CLOUD_DATABASE_URL || process.env.DATABASE_URL
  if (!cloudDbUrl || cloudDbUrl.includes('file:')) {
    console.error('❌ Please set CLOUD_DATABASE_URL environment variable with your Supabase connection string')
    console.error('Example: CLOUD_DATABASE_URL="postgresql://postgres:password@db.project.supabase.co:5432/postgres"')
    process.exit(1)
  }

  try {
    // Connect to local SQLite database
    const localDb = new LocalPrismaClient({
      datasources: {
        db: {
          url: 'file:./prisma/bathhouse.db'
        }
      }
    })

    // Connect to cloud PostgreSQL database
    const cloudDb = new CloudPrismaClient({
      datasources: {
        db: {
          url: cloudDbUrl
        }
      }
    })

    // Fetch all data from local database
    console.log('📥 Reading data from local database...')
    const [journalPosts, events, pageContent, rituals, standalonePages] = await Promise.all([
      localDb.journalPost.findMany(),
      localDb.event.findMany(),
      localDb.pageContent.findMany(),
      localDb.ritual.findMany(),
      localDb.standalonePage.findMany()
    ])

    console.log('📊 Found:')
    console.log(`   - ${journalPosts.length} journal posts`)
    console.log(`   - ${events.length} events`)
    console.log(`   - ${pageContent.length} page content items`)
    console.log(`   - ${rituals.length} rituals`)
    console.log(`   - ${standalonePages.length} standalone pages`)

    // Clear existing data in cloud database (optional)
    console.log('\n🗑️  Clearing existing cloud data...')
    await cloudDb.$transaction([
      cloudDb.journalPost.deleteMany(),
      cloudDb.event.deleteMany(),
      cloudDb.pageContent.deleteMany(),
      cloudDb.ritual.deleteMany(),
      cloudDb.standalonePage.deleteMany()
    ])

    // Migrate data to cloud database
    console.log('\n📤 Migrating data to cloud database...')

    // Migrate journal posts
    if (journalPosts.length > 0) {
      await cloudDb.journalPost.createMany({
        data: journalPosts
      })
    }

    // Migrate events
    if (events.length > 0) {
      await cloudDb.event.createMany({
        data: events
      })
    }

    // Migrate page content
    if (pageContent.length > 0) {
      await cloudDb.pageContent.createMany({
        data: pageContent
      })
    }

    // Migrate rituals
    if (rituals.length > 0) {
      await cloudDb.ritual.createMany({
        data: rituals
      })
    }

    // Migrate standalone pages
    if (standalonePages.length > 0) {
      await cloudDb.standalonePage.createMany({
        data: standalonePages
      })
    }

    console.log('\n✅ Migration completed successfully!')
    console.log('🎉 Your data is now in the cloud database!')

    // Disconnect from databases
    await localDb.$disconnect()
    await cloudDb.$disconnect()

  } catch (error) {
    console.error('\n❌ Migration failed:', error)
    process.exit(1)
  }
}

// Run migration
migrateToCloud()