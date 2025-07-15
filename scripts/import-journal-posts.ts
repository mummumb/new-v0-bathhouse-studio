import { prisma } from '../lib/db'
import { journalPosts } from '../lib/journal-data'

async function importJournalPosts() {
  console.log('Importing journal posts from TypeScript file...')
  
  try {
    for (const post of journalPosts) {
      await prisma.journalPost.upsert({
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
      console.log(`✓ Imported: ${post.title}`)
    }

    console.log(`\n✅ Successfully imported ${journalPosts.length} journal posts!`)
  } catch (error) {
    console.error('❌ Import failed:', error)
    process.exit(1)
  } finally {
    await prisma.$disconnect()
  }
}

importJournalPosts()