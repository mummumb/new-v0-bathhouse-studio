import { prisma } from '../lib/db'
import fs from 'fs'
import path from 'path'
import crypto from 'crypto'

async function migrateData() {
  console.log('Starting data migration...')
  
  try {
    // Migrate Journal Posts
    console.log('Migrating journal posts...')
    const journalPath = path.join(process.cwd(), 'data', 'journal.json')
    if (fs.existsSync(journalPath)) {
      const journalData = JSON.parse(fs.readFileSync(journalPath, 'utf8'))
      const upsertPromises = journalData.map((post) =>
        prisma.journalPost.upsert({
        await prisma.journalPost.upsert({})
          where: { slug: post.slug },
          update: {
            title: post.title,
            excerpt: post.excerpt,
            date: new Date(post.date),
            readTime: post.readTime,
            categories: JSON.stringify(post.categories),
            authorName: post.author.name,
            authorAvatar: post.author.avatar,
            image: post.image,
            imageAlt: post.imageAlt,
            content: post.content,
          },
          create: {
            slug: post.slug,
            title: post.title,
            excerpt: post.excerpt,
            date: new Date(post.date),
            readTime: post.readTime,
            categories: JSON.stringify(post.categories),
            authorName: post.author.name,
            authorAvatar: post.author.avatar,
            image: post.image,
            imageAlt: post.imageAlt,
            content: post.content,
          }
        })
      }
      console.log(`✓ Migrated ${journalData.length} journal posts`)
    }

    // Migrate Events
    console.log('Migrating events...')
    const eventsPath = path.join(process.cwd(), 'data', 'events.json')
    if (fs.existsSync(eventsPath)) {
      const eventsData = JSON.parse(fs.readFileSync(eventsPath, 'utf8'))
      
      for (const event of eventsData) {
        await prisma.event.upsert({
          where: { slug: event.slug },
          update: {
            title: event.title,
            category: event.category,
            description: event.description,
            image: event.image,
            date: new Date(event.date),
            time: event.time,
            location: event.location,
            capacity: event.capacity,
            price: event.price,
            isPublished: event.isPublished,
          },
          create: {
            slug: event.slug,
            title: event.title,
            category: event.category,
            description: event.description,
            image: event.image,
            date: new Date(event.date),
            time: event.time,
            location: event.location,
            capacity: event.capacity,
            price: event.price,
            isPublished: event.isPublished,
          }
        })
      }
      console.log(`✓ Migrated ${eventsData.length} events`)
    }

    // Migrate Page Content
    console.log('Migrating page content...')
    const pagesPath = path.join(process.cwd(), 'data', 'pages.json')
    if (fs.existsSync(pagesPath)) {
      const pagesData = JSON.parse(fs.readFileSync(pagesPath, 'utf8'))
      
      for (const page of pagesData) {
        await prisma.pageContent.upsert({
          where: { id: page.id },
          update: {
            page: 'home', // Default to home page
            section: page.id, // Use ID as section identifier
            title: page.title || null,
            subtitle: page.subtitle || null,
            content: JSON.stringify(page.content || {}),
            backgroundImage: page.backgroundImage || null,
            overlayOpacity: page.overlayOpacity || null,
          },
          create: {
            id: page.id,
            page: 'home', // Default to home page
            section: page.id, // Use ID as section identifier
            title: page.title || null,
            subtitle: page.subtitle || null,
            content: JSON.stringify(page.content || {}),
            backgroundImage: page.backgroundImage || null,
            overlayOpacity: page.overlayOpacity || null,
          }
        })
      }
      console.log(`✓ Migrated ${pagesData.length} page content items`)
    }

    // Migrate Rituals
    console.log('Migrating rituals...')
    const ritualsPath = path.join(process.cwd(), 'data', 'rituals.json')
    if (fs.existsSync(ritualsPath)) {
      const ritualsData = JSON.parse(fs.readFileSync(ritualsPath, 'utf8'))
      
      for (const ritual of ritualsData) {
        await prisma.ritual.upsert({
          where: { slug: ritual.slug },
          update: {
            title: ritual.title,
            category: 'Wellness', // Default category
            shortDescription: ritual.description || ritual.subtitle || '',
            fullDescription: ritual.fullDescription || ritual.description || '',
            duration: ritual.duration || '90 minutes',
            price: ritual.price || 0,
            capacity: ritual.capacity || 20,
            benefits: JSON.stringify(ritual.benefits || []),
            whatToExpect: JSON.stringify(ritual.whatToExpect || []),
            whoIsItFor: JSON.stringify(ritual.whoIsItFor || []),
            contraindications: JSON.stringify(ritual.contraindications || []),
            image: ritual.image,
            imageAlt: ritual.imageAlt || '',
          },
            id: typeof ritual.id === 'string' && /^[0-9a-fA-F-]{36}$/.test(ritual.id)
              ? ritual.id
              : crypto.randomUUID(),
            slug: ritual.slug,
            title: ritual.title,
            category: 'Wellness', // Default category
            category: 'Wellness', // Default category
            shortDescription: ritual.description || ritual.subtitle || '',
            fullDescription: ritual.fullDescription || ritual.description || '',
            duration: ritual.duration || '90 minutes',
            price: ritual.price || 0,
            capacity: ritual.capacity || 20,
            benefits: JSON.stringify(ritual.benefits || []),
            whatToExpect: JSON.stringify(ritual.whatToExpect || []),
            whoIsItFor: JSON.stringify(ritual.whoIsItFor || []),
            contraindications: JSON.stringify(ritual.contraindications || []),
            image: ritual.image,
            imageAlt: ritual.imageAlt || '',
          }
        })
      }
      console.log(`✓ Migrated ${ritualsData.length} rituals`)
    }

    // Migrate Standalone Pages
    console.log('Migrating standalone pages...')
    const standalonePath = path.join(process.cwd(), 'data', 'standalone-pages.json')
    if (fs.existsSync(standalonePath)) {
      const standaloneData = JSON.parse(fs.readFileSync(standalonePath, 'utf8'))
      
      for (const page of standaloneData) {
        await prisma.standalonePage.upsert({
          where: { slug: page.slug },
          update: {
            title: page.title,
            metaDescription: page.metaDescription || null,
            hero: JSON.stringify(page.hero || null),
            id: typeof page.id === 'string' && /^[0-9a-fA-F-]{36}$/.test(page.id)
              ? page.id
              : crypto.randomUUID(),
            slug: page.slug,
            title: page.title,
            metaDescription: page.metaDescription || null,
            slug: page.slug,
            title: page.title,
            metaDescription: page.metaDescription || null,
            hero: JSON.stringify(page.hero || null),
            sections: JSON.stringify(page.sections || []),
          }
        })
      }
      console.log(`✓ Migrated ${standaloneData.length} standalone pages`)
    }

    console.log('\n✅ Data migration completed successfully!')
  } catch (error) {
    console.error('❌ Migration failed:', error)
    process.exit(1)
  } finally {
    await prisma.$disconnect()
  }
}

migrateData()