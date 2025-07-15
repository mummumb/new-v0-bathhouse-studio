import fs from 'fs'
import path from 'path'
import { prisma } from '../lib/db'
import readline from 'readline'

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})

function question(query: string): Promise<string> {
  return new Promise((resolve) => {
    rl.question(query, resolve)
  })
}

async function restoreDatabase() {
  try {
    const backupDir = path.join(process.cwd(), 'backups')
    
    // Check if backups directory exists
    if (!fs.existsSync(backupDir)) {
      console.error('❌ No backups directory found')
      process.exit(1)
    }

    // List available backups
    const backupFiles = fs.readdirSync(backupDir)
      .filter(file => file.startsWith('backup-') && file.endsWith('.json'))
      .sort().reverse()

    if (backupFiles.length === 0) {
      console.error('❌ No backup files found')
      process.exit(1)
    }

    console.log('📋 Available backups:')
    backupFiles.forEach((file, index) => {
      console.log(`   ${index + 1}. ${file}`)
    })

    // Ask user to select a backup
    const selection = await question('\nSelect backup number to restore (or "q" to quit): ')
    
    if (selection.toLowerCase() === 'q') {
      console.log('Restore cancelled')
      process.exit(0)
    }

    const backupIndex = parseInt(selection) - 1
    if (isNaN(backupIndex) || backupIndex < 0 || backupIndex >= backupFiles.length) {
      console.error('❌ Invalid selection')
      process.exit(1)
    }

    const backupFile = path.join(backupDir, backupFiles[backupIndex])
    
    // Confirm restoration
    const confirm = await question(`\n⚠️  WARNING: This will replace ALL data in the database!\nRestore from ${backupFiles[backupIndex]}? (yes/no): `)
    
    if (confirm.toLowerCase() !== 'yes') {
      console.log('Restore cancelled')
      process.exit(0)
    }

    console.log('\n🔄 Starting database restore...')

    // Read backup file
    const backupData = JSON.parse(fs.readFileSync(backupFile, 'utf8'))
    
    // Clear existing data
    console.log('🗑️  Clearing existing data...')
    await prisma.$transaction([
      prisma.journalPost.deleteMany(),
      prisma.event.deleteMany(),
      prisma.pageContent.deleteMany(),
      prisma.ritual.deleteMany(),
      prisma.standalonePage.deleteMany()
    ])

    // Restore data
    console.log('📥 Restoring data...')
    
    // Restore journal posts
    if (backupData.data.journalPosts?.length > 0) {
      await prisma.journalPost.createMany({
        data: backupData.data.journalPosts.map((post: any) => ({
          ...post,
          date: new Date(post.date),
          createdAt: new Date(post.createdAt),
          updatedAt: new Date(post.updatedAt)
        }))
      })
    }

    // Restore events
    if (backupData.data.events?.length > 0) {
      await prisma.event.createMany({
        data: backupData.data.events.map((event: any) => ({
          ...event,
          date: new Date(event.date),
          createdAt: new Date(event.createdAt),
          updatedAt: new Date(event.updatedAt)
        }))
      })
    }

    // Restore page content
    if (backupData.data.pageContent?.length > 0) {
      await prisma.pageContent.createMany({
        data: backupData.data.pageContent.map((page: any) => ({
          ...page,
          createdAt: new Date(page.createdAt),
          updatedAt: new Date(page.updatedAt)
        }))
      })
    }

    // Restore rituals
    if (backupData.data.rituals?.length > 0) {
      await prisma.ritual.createMany({
        data: backupData.data.rituals.map((ritual: any) => ({
          ...ritual,
          createdAt: new Date(ritual.createdAt),
          updatedAt: new Date(ritual.updatedAt)
        }))
      })
    }

    // Restore standalone pages
    if (backupData.data.standalonePages?.length > 0) {
      await prisma.standalonePage.createMany({
        data: backupData.data.standalonePages.map((page: any) => ({
          ...page,
          createdAt: new Date(page.createdAt),
          updatedAt: new Date(page.updatedAt)
        }))
      })
    }

    console.log('\n✅ Restore completed successfully!')
    console.log(`📊 Restored:`)
    console.log(`   - ${backupData.data.journalPosts?.length || 0} journal posts`)
    console.log(`   - ${backupData.data.events?.length || 0} events`)
    console.log(`   - ${backupData.data.pageContent?.length || 0} page content items`)
    console.log(`   - ${backupData.data.rituals?.length || 0} rituals`)
    console.log(`   - ${backupData.data.standalonePages?.length || 0} standalone pages`)

  } catch (error) {
    console.error('❌ Restore failed:', error)
    process.exit(1)
  } finally {
    rl.close()
    await prisma.$disconnect()
  }
}

restoreDatabase()