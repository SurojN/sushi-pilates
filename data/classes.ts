export type PilatesClass = {
  id: string; title: string; description: string; level: string;
  duration: string; schedule: string; availability: string; price?: string;
  image: string; imageAlt: string; tag: string;
};
export const classes: PilatesClass[] = [
  { id: "beginner", title: "Beginner Pilates", description: "Start with the foundations. Explore breath, alignment, and controlled movement at a pace that feels right for you.", level: "No experience needed", duration: "To be confirmed", schedule: "Schedule coming soon", availability: "Register your interest", image: "/images/beginner.svg", imageAlt: "Illustration of a Pilates mat and exercise ball", tag: "YOUR FIRST STEP" },
  { id: "group", title: "Group Pilates", description: "Find your rhythm in good company. A shared practice built around mindful movement and everyday strength.", level: "Mixed experience", duration: "To be confirmed", schedule: "Schedule coming soon", availability: "Register your interest", image: "/images/group.svg", imageAlt: "Illustration of three Pilates mats in a calm studio", tag: "MOVE TOGETHER" },
  { id: "private", title: "Private Pilates", description: "Space to focus on you. One-to-one guidance with room to explore your movement, questions, and personal goals.", level: "Tailored to you", duration: "To be confirmed", schedule: "By inquiry", availability: "Register your interest", image: "/images/private.svg", imageAlt: "Illustration of Pilates equipment and a leafy plant", tag: "YOUR OWN PACE" },
];
