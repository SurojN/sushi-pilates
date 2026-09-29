export const site = {
  name: "Sushi Pilates",
  brand: { logo: "/images/logo.png", cover: "/images/cover.png" },
  location: "Kathmandu, Nepal",
  description: "Mindful movement, everyday strength. Discover beginner-friendly Pilates with Sushi Pilates in Kathmandu, Nepal.",
  url: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
  phone: "",
  email: "",
  whatsapp: "", // International digits only, without +. Empty values never create links.
  trialLabel: "Book a Trial Class",
  instructor: {
    name: "Shila Nepali",
    introduction: "Meet the person behind Sushi Pilates. Shila is building her professional Pilates career in Kathmandu, with a focus on thoughtful movement and a welcoming place to begin.",
    philosophy: "A little more awareness. A little more confidence. A practice that meets you where you are.",
    journey: "Shila’s story is taking shape. A personal introduction, her training journey, and more about her approach will be shared here soon.",
    image: "/images/instructor.svg",
    imageAlt: "Abstract botanical illustration; Shila’s portrait will be added soon",
  },
  hero: { image: "/images/movement.svg", alt: "Illustration of a person stretching on a Pilates mat in a warm, sunlit space" },
  navigation: [{ href: "/", label: "Home" }, { href: "/about", label: "About" }, { href: "/classes", label: "Classes" }, { href: "/contact", label: "Contact" }],
};
