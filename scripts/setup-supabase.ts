#!/usr/bin/env tsx
import { execSync } from 'child_process'

console.log('🚀 Setting up Supabase database...\n')

// Supabase connection details
const password = process.env.SUPABASE_PASSWORD
if (!password) {
  console.error('❌ SUPABASE_PASSWORD environment variable not set.')
  process.exit(1)
}
const encodedPassword = encodeURIComponent(password)
const host = 'db.hfucsndfmoaxiiglnybh.supabase.co'
const port = '5432'
const database = 'postgres'

// Build connection URL
const databaseUrl = `postgresql://postgres:${encodedPassword}@${host}:${port}/${database}`

console.log('📡 Connecting to Supabase...')
console.log(`   Host: ${host}`)
console.log(`   Port: ${port}`)
console.log(`   Database: ${database}`)

// Set environment variable and push schema
process.env.DATABASE_URL = databaseUrl

try {
  console.log('\n📤 Pushing schema to Supabase...')
  execSync('npx prisma db push --skip-generate', { 
    stdio: 'inherit',
    env: { ...process.env, DATABASE_URL: databaseUrl }
  })
  
  console.log('\n✅ Schema pushed successfully!')
  
  // Generate Prisma client
  console.log('\n🔧 Generating Prisma client...')
  execSync('npx prisma generate', { stdio: 'inherit' })
  
  console.log('\n✅ Setup complete! Your Supabase database is ready.')
  console.log('\n📋 Next steps:')
  console.log('1. Run "npm run db:migrate:cloud" to migrate your data')
  console.log('2. Add these environment variables to Vercel:')
  console.log(`   DATABASE_PROVIDER=postgresql`)
  console.log(`   DATABASE_URL=${databaseUrl}`)
  
} catch (error) {
  console.error('\n❌ Setup failed:', error)
  console.log('\n🔍 Troubleshooting:')
  console.log('1. Check your Supabase project is active')
  console.log('2. Verify the password is correct')
  console.log('3. Ensure your IP is allowed in Supabase settings')
  process.exit(1)
}