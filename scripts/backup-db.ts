import fs from 'fs'
import path from 'path'
import { prisma } from '../lib/db'

async function backupDatabase() {
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-').slice(0, -5)
  const backupDir = path.join(process.cwd(), 'backups')
  const backupFile = path.join(backupDir, `backup-${timestamp}.json`)

  try {
    // Create backups directory if it doesn't exist
    if (!fs.existsSync(backupDir)) {
      fs.mkdirSync(backupDir, { recursive: true })
    }

    console.log('📦 Starting database backup...')

    // Fetch all data
    const [journalPosts, events, pageContent, rituals, standalonePages] = await Promise.all([
      prisma.journalPost.findMany(),
      prisma.event.findMany(),
      prisma.pageContent.findMany(),
      prisma.ritual.findMany(),
      prisma.standalonePage.findMany()
    ])

    // Create backup object
    const backup = {
      version: '1.0',
      timestamp: new Date().toISOString(),
      data: {
        journalPosts,
        events,
        pageContent,
        rituals,
        standalonePages
      }
    }

    // Write backup file
    fs.writeFileSync(backupFile, JSON.stringify(backup, null, 2))

    console.log(`✅ Backup completed successfully!`)
    console.log(`📄 Backup saved to: ${backupFile}`)
    console.log(`📊 Backed up:`)
    console.log(`   - ${journalPosts.length} journal posts`)
    console.log(`   - ${events.length} events`)
    console.log(`   - ${pageContent.length} page content items`)
    console.log(`   - ${rituals.length} rituals`)
    console.log(`   - ${standalonePages.length} standalone pages`)

  } catch (error) {
    console.error('❌ Backup failed:', error)
    process.exit(1)
  } finally {
    await prisma.$disconnect()
  }
}

backupDatabase()