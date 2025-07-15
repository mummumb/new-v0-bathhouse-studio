// Helper function to format date
function formatEventDate(dateString: string) {
  const date = new Date(dateString)
  const day = date.getDate()
  const month = date.toLocaleDateString("en-US", { month: "short" })
  const year = date.getFullYear()
  return {
    full: `${day} ${month} ${year}`,
    number: day.toString(),
    monthYear: `${month} ${year}`,
  }
}

// Raw event data from JSON (specific dated events)
const rawEvents = [
  {
    id: 1,
    title: "Sauna Aufguss",
    description:
      "Heat with purpose. Steam with soul.\nGuided by the Master, this ritual channels heat, scent and sound into a powerful sensory journey.\nThrough intentional towel movement, steam is carried in waves, energising, releasing, and restoring.\nYou don't just sit in the heat, you move through it. And on the other side, you return lighter, clearer, and deeply reset.",
    date: "2025-06-14",
    time: "4:00 PM - 7:00 PM",
    price: 60,
    capacity: 12,
    category: "Sauna",
  },
  {
    id: 2,
    title: "Sound Bath Meditation",
    description:
      "Where sound becomes stillness.\nJoin us in November for a meditative ritual inviting you to lie back, close your eyes, and be gently held by waves of sound. Using gongs, bowls and harmonic tones, the Master creates a space where tension dissolves and your nervous system can deeply settle.\n\nNo effort. No expectation. Just sound, silence, and the spaciousness to return to yourself.",
    date: "2024-11-09",
    time: "6:00 PM - 8:00 PM",
    price: 40,
    capacity: 20,
    category: "Mindfulness",
  },
]

// Raw services data from JSON (ongoing services)
const rawServices = [
  {
    id: 1,
    name: "Traditional Sauna",
    description:
      "Experience the purifying heat of our authentic Finnish sauna, designed to detoxify your body and calm your mind.",
    price: 85,
    category: "sauna",
  },
  {
    id: 2,
    name: "Breathwork Sessions",
    description: "Learn powerful breathing techniques that reduce stress, increase energy, and enhance mental clarity.",
    price: 65,
    category: "breathwork",
  },
  {
    id: 3,
    name: "Cold Plunge Therapy",
    description:
      "Invigorate your system with our temperature-controlled cold plunge, boosting circulation and resilience.",
    price: 45,
    category: "cold-therapy",
  },
]

// Transform raw events into full event objects
export const events = rawEvents.map((event) => {
  const formattedDate = formatEventDate(event.date)
  const slug = event.title
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^\w-]/g, "")

  return {
    id: event.id,
    slug,
    title: event.title.trim(),
    category: event.category,
    description: event.description.replace(/\n/g, " ").trim(),
    fullDescription: event.description,
    image: event.category === "Sauna" ? "/images/ritual-amanda-aufguss.jpeg" : "/images/ritual-community.jpeg",
    overlayColor: "from-bathhouse-slate/60 to-bathhouse-slate/5",
    date: formattedDate.full,
    dateNumber: formattedDate.number,
    dateMonth: formattedDate.monthYear,
    time: event.time,
    location: "Bathhouse Studio",
    capacity: `${event.capacity} spots`,
    price: `$${event.price}`,
    pricePerPerson: "per person",
    instructor: {
      name: "Amanda Berger",
      title: "Founder & Certified Aufguss Master",
      bio: "For nearly two decades, Amanda was the go-to for all things fitness. But after having two children and staying true to her belief that balance is the key to lasting success, she shifted her focus toward wellness. Forty-two saunas across five countries later (and still counting), Amanda has become one of Australia’s first certified Aufguss Masters, guiding others in the art of sauna done right. With Bathhouse Studio set to open in 2026 and a growing calendar of interstate events, Amanda is building Australia’s sauna culture, one ritual at a time.",
      image: "/images/amanda-berger-headshot.jpeg",
    },
    schedule:
      event.category === "Sauna"
        ? [
            { time: "4:00 PM", activity: "Arrival & Welcome" },
            { time: "4:15 PM", activity: "Introduction to Aufguss" },
            { time: "4:30 PM", activity: "First Round: Awakening" },
            { time: "5:00 PM", activity: "Cool-down & Hydration" },
            { time: "5:30 PM", activity: "Second Round: Deep Release" },
            { time: "6:00 PM", activity: "Final Cool-down & Integration" },
            { time: "6:30 PM", activity: "Closing Circle" },
            { time: "7:00 PM", activity: "Departure" },
          ]
        : [
            { time: "6:00 PM", activity: "Arrival & Settling" },
            { time: "6:15 PM", activity: "Opening & Intention Setting" },
            { time: "6:30 PM", activity: "Sound Journey Begins" },
            { time: "7:15 PM", activity: "Integration in Silence" },
            { time: "7:30 PM", activity: "Gentle Return & Closing" },
            { time: "8:00 PM", activity: "Departure" },
          ],
    faqs:
      event.category === "Sauna"
        ? [
            {
              question: "What should I wear?",
              answer:
                "We recommend wearing a comfortable swimsuit or swimwear. A clean towel will be provided for you to sit on inside the sauna.",
            },
            {
              question: "Is this suitable for beginners?",
              answer:
                "Absolutely. Amanda will guide you through the entire experience, and you are free to exit the sauna at any time if you feel uncomfortable. Every ritual is designed to be inclusive and welcoming.",
            },
            {
              question: "How hot does it get?",
              answer:
                "The sauna temperature typically ranges from 80-90°C (176-194°F). The towel work creates waves of heat that feel more intense but are carefully controlled by Amanda for safety and comfort.",
            },
          ]
        : [
            {
              question: "What instruments are used?",
              answer:
                "Amanda uses a variety of instruments including Tibetan singing bowls, crystal bowls, gongs, chimes, and other resonant instruments. Each session features a carefully curated selection based on the group's needs.",
            },
            {
              question: "Do I need to do anything during the session?",
              answer:
                "Nothing at all. This is a completely receptive practice. You simply lie down comfortably and allow the sounds to wash over you. There's no meditation technique to learn or follow.",
            },
            {
              question: "What should I bring?",
              answer:
                "We provide yoga mats and blankets, but you're welcome to bring your own blanket or pillow for extra comfort. Wear comfortable, loose clothing and consider bringing an eye pillow if you have one.",
            },
          ],
  }
})

// Transform raw services into service objects
export const services = rawServices.map((service) => {
  const slug = service.name
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^\w-]/g, "")

  // Map categories to appropriate images and details
  const serviceDetails = {
    sauna: {
      image: "/images/sauna-interior.png",
      overlayColor: "from-bathhouse-rose/60 to-bathhouse-rose/5",
      duration: "60 minutes",
      availability: "Daily Sessions",
    },
    breathwork: {
      image: "/images/breathwork-space.png",
      overlayColor: "from-bathhouse-sage/60 to-bathhouse-sage/5",
      duration: "45 minutes",
      availability: "Weekly Sessions",
    },
    "cold-therapy": {
      image: "/images/cold-plunge-pool.png",
      overlayColor: "from-bathhouse-teal/60 to-bathhouse-teal/5",
      duration: "30 minutes",
      availability: "Daily Sessions",
    },
  }

  const details = serviceDetails[service.category as keyof typeof serviceDetails]

  return {
    id: service.id,
    slug,
    name: service.name,
    description: service.description,
    price: `$${service.price}`,
    category: service.category,
    image: details.image,
    overlayColor: details.overlayColor,
    duration: details.duration,
    availability: details.availability,
    instructor: {
      name: "Amanda Berger",
      title: "Founder & Wellness Expert",
      bio: "For nearly two decades, Amanda was the go-to for all things fitness. But after having two children and staying true to her belief that balance is the key to lasting success, she shifted her focus toward wellness. Forty-two saunas across five countries later (and still counting), Amanda has become one of Australia’s first certified Aufguss Masters, guiding others in the art of sauna done right. With Bathhouse Studio set to open in 2026 and a growing calendar of interstate events, Amanda is building Australia’s sauna culture, one ritual at a time.",
      image: "/images/amanda-berger-headshot.jpeg",
    },
  }
})

// Legacy ritual data for the main rituals section
export const rituals = [
  {
    slug: "breathwork-ritual",
    number: "01",
    title: "Breathwork",
    subtitle: "Come home to your breath.",
    description:
      "In this guided ritual, breath becomes your anchor, a gentle yet powerful tool for shifting energy, settling the nervous system, and reconnecting to what matters. Whether you arrive with stress, fatigue, or curiosity, this practice will meet you where you are.",
    fullDescription:
      "No performance. No pressure. Just space to slow down, listen in, and breathe with intention. Each session is layered with rhythm, stillness and presence,  a chance to let go, drop in, and return to yourself.",
    image: "/images/ritual-immersion.jpeg",
    imageAlt: "A person sitting peacefully by the water, embodying the stillness achieved through breathwork.",
    date: "Weekly Sessions",
    location: "Online & In-Studio",
  },
  {
    slug: "aufguss-ritual",
    number: "02",
    title: "Aufguss",
    subtitle: "Heat with purpose. Steam with soul.",
    description:
      "Guided by the Master, this ritual channels heat, scent and sound into a powerful sensory journey. Through intentional towel movement, steam is carried in waves, energising, releasing, and restoring.",
    fullDescription:
      "You don't just sit in the heat, you move through it. And on the other side, you return lighter, clearer, and deeply reset.",
    image: "/images/ritual-amanda-aufguss.jpeg",
    imageAlt: "Amanda Berger performing an Aufguss ritual with a towel in a warmly lit sauna.",
    date: "August 15, 2025",
    location: "Melbourne, VIC",
    icon: "🔥",
  },
  {
    slug: "sound-ritual",
    number: "03",
    title: "Sound",
    subtitle: "Let it all settle.",
    description:
      "This ritual invites you into stillness, a deep listening experience where vibration becomes medicine. With gongs, bowls, and resonant tones, sound gently moves through the body, clearing noise and quieting the mind.",
    fullDescription:
      "There's nothing to do but receive. As the layers of sound rise and fall, you'll soften, unwind, and return to a deeper rhythm within.",
    image: "/images/ritual-community.jpeg",
    imageAlt: "A serene space set up for sound healing with singing bowls and instruments.",
    date: "Monthly Sessions",
    location: "Studio & Retreats",
  },
]
