#!/usr/bin/env tsx
import { execSync } from 'child_process'

console.log('🌱 Seeding database...\n')

try {
  // Run migration scripts
  console.log('📦 Migrating data from JSON files...')
  execSync('tsx scripts/migrate-data.ts', { stdio: 'inherit' })
  
  console.log('\n📚 Importing hardcoded journal posts...')
  execSync('tsx scripts/import-journal-posts.ts', { stdio: 'inherit' })
  
  console.log('\n✅ Database seeding completed!')
} catch (error) {
  console.error('\n❌ Seeding failed:', error)
  process.exit(1)
}