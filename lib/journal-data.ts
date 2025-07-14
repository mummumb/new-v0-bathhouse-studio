"use server"

// This file acts as a mock database or CMS for the journal posts.
// It's easy to replace this with a real data source like a headless CMS in the future.

export type Category =
  | "Sauna Culture"
  | "Nervous System"
  | "Women's Wellness"
  | "Ritual Tools"
  | "Breath & Body"
  | "Founder's Journal"
  | "Event Recaps"
  | "Place-Based Practice"

export interface Author {
  name: string
  avatar: string
}

export interface Post {
  slug: string
  title: string
  excerpt: string
  date: string
  readTime: string
  categories: Category[]
  author: Author
  image: string
  imageAlt: string
  content: string // In a real app, this could be Markdown or HTML
}

const amandaBerger: Author = {
  name: "Amanda Berger",
  avatar: "/images/amanda-berger-headshot.jpeg",
}

export const journalPosts: Post[] = [
  {
    slug: "aufguss-101-fire-breath-modern-ritual",
    title: "Aufguss 101: Fire, Breath & Modern Ritual",
    excerpt:
      "A primer on the transformative German sauna ceremony. Learn what to expect, how to prepare, and why this ancient practice is the ultimate tool for modern stress resilience.",
    date: "December 20, 2024",
    readTime: "6 min read",
    categories: ["Sauna Culture", "Ritual Tools", "Founder's Journal"],
    author: amandaBerger,
    image: "/images/journal-aufguss-ritual.png",
    imageAlt:
      "Amanda Berger performing an Aufguss ritual, silhouetted against the warm glow of a sauna, demonstrating the traditional towel technique.",
    content: `
      <p>The Aufguss ritual is the heart of the Bathhouse Studio experience. But what exactly is it? This guide will walk you through everything you need to know about this powerful, multi-sensory sauna ceremony.</p>
      <h2>What is Aufguss?</h2>
      <p>Originating from Germany, 'Aufguss' translates to 'infusion.' It's a wellness ritual performed in a sauna, guided by a Sauna Master (or 'Saunameister'). The master pours water infused with essential oils onto the hot stones of the sauna heater, creating waves of intensely aromatic steam.</p>
      <p>But it's the next step that makes Aufguss magical. The Sauna Master uses a large towel to artfully circulate the hot air throughout the room. These choreographed, dance-like movements, often synchronized to music, ensure that every person in the sauna experiences the waves of heat and scent in a deliberate, guided way.</p>
      <blockquote>"An Aufguss is a story told through heat, scent, and motion. It's a conversation between the master, the elements, and the participants."</blockquote>
      <h2>What to Expect in Your First Ritual</h2>
      <p>An Aufguss typically consists of several 'rounds,' each with a different theme, set of essential oils, and music. Between rounds, there are cool-down periods, which are just as important as the heat itself. This contrast of hot and cold is key to the therapeutic benefits.</p>
      <ul>
        <li><strong>The Heat:</strong> It will feel more intense than a standard sauna session due to the moving air. It's a deep, penetrating heat that encourages a powerful sweat.</li>
        <li><strong>The Aromas:</strong> From invigorating citrus to calming lavender, the essential oils are chosen to guide your emotional and physical journey.</li>
        <li><strong>The Guidance:</strong> You are never alone. The Sauna Master is there to guide you, ensure your safety, and hold the space. You are always free to leave the sauna if you need to.</li>
      </ul>
      <h2>The Benefits: More Than Just a Sweat</h2>
      <p>While you will certainly sweat, the benefits go far beyond detoxification. Aufguss is a powerful tool for stress resilience. It trains your nervous system to handle intensity with calm, controlled breathing. It improves circulation, boosts your immune system, and leaves you with a profound sense of clarity and wellbeing.</p>
      <p>At its core, Aufguss is a practice of presence. For 15 minutes, you are invited to simply be—to feel, to breathe, and to connect with yourself in a profound way. We can't wait for you to experience it.</p>
    `,
  },
  {
    slug: "the-art-of-aufguss",
    title: "The Art of Aufguss: More Than Heat",
    excerpt:
      "Exploring the ancient German tradition that transforms a simple sauna session into a multi-sensory journey of renewal and connection.",
    date: "December 15, 2024",
    readTime: "5 min read",
    categories: ["Sauna Culture", "Ritual Tools"],
    author: amandaBerger,
    image: "/images/journal-sauna-culture.png",
    imageAlt:
      "Traditional sauna interior with wooden benches and hot stones, showcasing the authentic environment where Aufguss rituals take place.",
    content: `
      <p>The steam rises, carrying with it the scent of pine and eucalyptus. A choreographed dance of a towel moves the hot, fragrant air around the room. This is Aufguss, a ritual that elevates the sauna from a simple hot room to a transformative, multi-sensory experience.</p>
      <p>Originating from Germany, 'Aufguss' translates to 'infusion.' At its core, it is the practice of pouring water infused with essential oils onto hot sauna stones. But to call it just that would be an understatement. A true Aufguss is a piece of performance art, a wellness ceremony guided by a Sauna Master, or 'Saunameister'.</p>
      <h2>The Elements of the Ritual</h2>
      <p>Each Aufguss session is a unique composition of heat, aromatherapy, music, and movement. The Sauna Master uses a large towel to circulate the air, performing rhythmic, dance-like movements that distribute the steam and heat evenly. This technique intensifies the perceived temperature, creating waves of heat that encourage a deep, purifying sweat.</p>
      <blockquote>"A sauna master does with their rituals as a sommelier does with their wine. It's about curation, presence, and guiding an experience."</blockquote>
      <p>The choice of essential oils is deliberate, designed to evoke specific moods—from the invigorating scent of citrus to the calming aroma of lavender. The music, too, is carefully selected, creating a soundscape that guides the emotional journey of the participants. It's a practice that engages every sense, demanding a state of mindful presence.</p>
      <h2>Beyond the Physical</h2>
      <p>While the physical benefits of sauna use are well-documented—improved circulation, detoxification, muscle recovery—the Aufguss ritual transcends the purely physiological. It creates a shared experience, a moment of collective mindfulness where strangers become a temporary community, united in their vulnerability and openness to the experience.</p>
      <p>This is what we strive to recreate at Bathhouse Studio: not just the technical aspects of the ritual, but its soul—the sense of connection, presence, and transformation that makes each session memorable.</p>
    `,
  },
  {
    slug: "breath-as-medicine",
    title: "Breath as Medicine",
    excerpt:
      "How conscious breathing practices can shift our nervous system from stress to restoration, creating space for healing and clarity.",
    date: "December 8, 2024",
    readTime: "7 min read",
    categories: ["Nervous System", "Breath & Body", "Women's Wellness"],
    author: amandaBerger,
    image: "/images/journal-breathwork-meditation.png",
    imageAlt:
      "A person sitting in a meditative pose by calm water, eyes closed, focusing on their breath in a serene natural setting.",
    content: `
      <p>In our fast-paced world, many of us live in a state of chronic activation. Our sympathetic nervous system—the 'fight or flight' response—is constantly engaged. Breathwork is the most direct and accessible tool we have to consciously switch into our parasympathetic nervous system, the 'rest and digest' state where healing and restoration occur.</p>
      <h2>The Science of Breath</h2>
      <p>When we breathe consciously, we're directly communicating with our autonomic nervous system. The vagus nerve, which runs from the brainstem to the abdomen, is activated through specific breathing patterns. This activation signals to our body that we are safe, allowing our heart rate to slow, our muscles to relax, and our mind to find clarity.</p>
      <h2>Simple Techniques for Daily Calm</h2>
      <p>One of the simplest yet most powerful techniques is the physiological sigh. This involves a double inhale through the nose followed by a long, slow exhale through the mouth. This simple action helps to offload carbon dioxide and immediately signals to the brain that it's safe to relax.</p>
      <p>Another technique is box breathing: inhale for four counts, hold for four, exhale for four, and hold for four. This rhythmic practice is used by everyone from navy seals to yoga practitioners to cultivate focus and calm under pressure.</p>
      <h2>Integration into Daily Life</h2>
      <p>The beauty of breathwork is its accessibility. You don't need special equipment, a specific location, or hours of time. A few conscious breaths before a difficult conversation, during a stressful commute, or before sleep can shift your entire state of being.</p>
      <p>At Bathhouse Studio, we integrate breathwork into our rituals not as an add-on, but as a foundation. Every session begins with breath awareness, creating the container for deeper transformation.</p>
    `,
  },
  {
    slug: "building-community-through-ritual",
    title: "Building Community Through Ritual",
    excerpt:
      "Reflections on how shared wellness experiences create authentic connections and foster a sense of belonging in our modern world.",
    date: "December 1, 2024",
    readTime: "6 min read",
    categories: ["Founder's Journal", "Sauna Culture", "Women's Wellness"],
    author: amandaBerger,
    image: "/images/journal-community-wellness.png",
    imageAlt:
      "A diverse group of people sitting together in a circle in a beautifully designed wellness space, sharing a moment of connection and community.",
    content: `
      <p>There's something profound that happens when strangers gather in a sauna. The heat strips away pretense, the shared vulnerability creates instant connection, and the ritual itself becomes a bridge between individual experience and collective healing.</p>
      <h2>The Lost Art of Gathering</h2>
      <p>In our increasingly digital world, we've lost many of the traditional spaces where community naturally formed. The village square, the neighborhood gathering places, the rituals that brought people together—these have largely disappeared from modern life.</p>
      <p>Wellness spaces, particularly those centered around ritual and ceremony, offer a unique opportunity to recreate these connections. When we share an experience as intimate and transformative as an Aufguss ceremony or breathwork session, we're participating in something ancient and essential to human wellbeing.</p>
      <h2>Vulnerability as Connection</h2>
      <p>There's a beautiful paradox in sauna culture: the more physically exposed we become, the more emotionally connected we feel. This isn't about the physical nakedness (though that certainly plays a role), but about the emotional nakedness that heat and ritual create.</p>
      <p>When we're sweating together, breathing together, experiencing the same waves of heat and relief, we're reminded of our shared humanity. The executive and the artist, the mother and the student—all are equal in the democracy of the sauna.</p>
      <h2>Creating Sacred Space</h2>
      <p>At Bathhouse Studio, we're not just creating a wellness facility—we're creating a modern ritual space where community can form organically. Every detail, from the lighting to the music to the way we guide each session, is designed to foster connection while honoring individual experience.</p>
      <p>This is the future of wellness: not just individual optimization, but collective healing. Not just personal transformation, but community building. Not just ritual for ritual's sake, but ceremony that serves our deepest human need for connection and belonging.</p>
    `,
  },
]
