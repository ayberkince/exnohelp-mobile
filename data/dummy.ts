export const categories = [
  {
    id: "c1",
    title: "Appointment Accompaniment",
    icon: "MapPin",
    description: "Travel together to and from your appointment.",
  },
  {
    id: "c2",
    title: "Waiting Support",
    icon: "Clock",
    description: "Someone to sit with you in the waiting room.",
  },
  {
    id: "c3",
    title: "Return-Home Help",
    icon: "Home",
    description: "Safe accompaniment back to your residence.",
  },
  {
    id: "c4",
    title: "Paperwork Assistance",
    icon: "FileText",
    description: "Help filling out forms and organizing documents.",
  },
  {
    id: "c5",
    title: "Emotional Companionship",
    icon: "Heart",
    description: "A calming presence before or after procedures.",
  },
  {
    id: "c6",
    title: "Light Practical Help",
    icon: "ShoppingBag",
    description: "Picking up groceries or pharmacy items post-appointment.",
  },
];

export const helpers = [
  {
    id: "h1",
    firstName: "Lukas",
    lastName: "M.",
    photo: "https://picsum.photos/seed/lukas/200/200",
    tagline: "Calm, reliable support for your peace of mind.",
    languages: ["German", "English"],
    rating: 4.9,
    reviewsCount: 42,
    completedBookings: 56,
    isVerified: true,
    pricePerHour: 22,
    distance: "2.5 km",
    district: "Prenzlauer Berg",
    availability: "Available today",
    services: ["c1", "c2", "c5"],
    bio: "Hi, I am Lukas. I have been living in Berlin for 8 years. I know how stressful medical appointments can be, especially if you are alone or German is not your first language. I am here to provide a calm presence, help you navigate the city, and ensure you get home safely.",
    experience:
      "2 years providing community support. First-aid certified (basic).",
  },
  {
    id: "h2",
    firstName: "Aisha",
    lastName: "K.",
    photo: "https://picsum.photos/seed/aisha/200/200",
    tagline: "Friendly accompaniment and paperwork help.",
    languages: ["German", "English", "Arabic"],
    rating: 5.0,
    reviewsCount: 28,
    completedBookings: 31,
    isVerified: true,
    pricePerHour: 25,
    distance: "4.1 km",
    district: "Neukölln",
    availability: "Available tomorrow",
    services: ["c1", "c3", "c4"],
    bio: "Hello! I am Aisha. I specialize in helping expats and international residents navigate the German healthcare bureaucracy. I can accompany you, help translate basic non-medical forms, and make sure you feel supported.",
    experience: "Former administrative assistant. Fluent in 3 languages.",
  },
  {
    id: "h3",
    firstName: "Elena",
    lastName: "S.",
    photo: "https://picsum.photos/seed/elena/200/200",
    tagline: "Warm companionship and practical post-appointment help.",
    languages: ["English", "Spanish"],
    rating: 4.8,
    reviewsCount: 15,
    completedBookings: 19,
    isVerified: true,
    pricePerHour: 20,
    distance: "1.2 km",
    district: "Mitte",
    availability: "Available this week",
    services: ["c3", "c5", "c6"],
    bio: "I believe no one should have to go through stressful days alone. I offer a warm, reassuring presence and can help with light errands like picking up your prescription or getting some groceries after your appointment.",
    experience: "Volunteer at local community center for elderly support.",
  },
];

export const clientBookings = [
  {
    id: "b1",
    helperId: "h1",
    status: "upcoming", // pending, upcoming, completed, cancelled
    date: "2026-03-15T10:00:00Z",
    durationHours: 2,
    serviceId: "c1",
    location: "Charité Campus Mitte",
    totalPrice: 44,
  },
  {
    id: "b3",
    helperId: "h3",
    status: "pending",
    date: "2026-03-22T09:00:00Z",
    durationHours: 3,
    serviceId: "c5",
    location: "Vivantes Klinikum Neukölln",
    totalPrice: 60,
  },
  {
    id: "b2",
    helperId: "h2",
    status: "completed",
    date: "2026-02-28T14:30:00Z",
    durationHours: 1.5,
    serviceId: "c4",
    location: "Bürgeramt Neukölln",
    totalPrice: 37.5,
  },
];

export const helperRequests = [
  {
    id: "r1",
    clientId: "cl1",
    clientName: "Marcus T.",
    clientPhoto: "https://picsum.photos/seed/marcus/200/200",
    status: "pending", // pending, accepted, declined
    date: "2026-03-16T09:00:00Z",
    durationHours: 2,
    serviceId: "c1",
    location: "Vivantes Klinikum Am Urban",
    notes:
      "I need someone to walk with me from the U-Bahn station and sit in the waiting room. I get very anxious.",
    totalPrice: 44,
  },
  {
    id: "r2",
    clientId: "cl2",
    clientName: "Sophie L.",
    clientPhoto: "https://picsum.photos/seed/sophie/200/200",
    status: "accepted",
    date: "2026-03-14T11:30:00Z",
    durationHours: 1.5,
    serviceId: "c6",
    location: "Rewe, Friedrichstraße",
    notes:
      "Need help carrying some groceries after my physical therapy session.",
    totalPrice: 33,
  },
];

export const openRequests = [
  {
    id: "or1",
    clientName: "Julia M.",
    clientPhoto: "https://picsum.photos/seed/julia/200/200",
    serviceId: "c1",
    date: "2026-03-18T10:00:00Z",
    durationHours: 2,
    district: "Charlottenburg",
    location: "Schlosspark-Klinik",
    languages: ["German", "English"],
    offeredPrice: 45,
    notes:
      "Need someone to accompany me to a routine eye exam and help me get a taxi back home as my vision will be blurry.",
    status: "open", // open, applied, filled
  },
  {
    id: "or2",
    clientName: "Thomas K.",
    clientPhoto: "https://picsum.photos/seed/thomas/200/200",
    serviceId: "c4",
    date: "2026-03-19T14:00:00Z",
    durationHours: 1.5,
    district: "Kreuzberg",
    location: "Home (Kreuzberg)",
    languages: ["English"],
    offeredPrice: 35,
    notes:
      "I need help translating and filling out some health insurance forms. Non-medical, just administrative.",
    status: "applied",
  },
  {
    id: "or3",
    clientName: "Elara V.",
    clientPhoto: "https://picsum.photos/seed/elara/200/200",
    serviceId: "c5",
    date: "2026-03-20T09:30:00Z",
    durationHours: 3,
    district: "Mitte",
    location: "Charité Campus Mitte",
    languages: ["German", "Spanish"],
    offeredPrice: 60,
    notes:
      "Looking for a calm presence in the waiting room before a minor procedure. Just someone to chat with and distract me.",
    status: "open",
  },
];

export const reviews = [
  {
    id: "rev1",
    author: "Sarah J.",
    rating: 5,
    date: "2026-02-10",
    text: "Lukas was incredibly calming. He met me right on time, helped me find the right department, and just sat quietly with me while I waited. Exactly what I needed.",
  },
  {
    id: "rev2",
    author: "David W.",
    rating: 5,
    date: "2026-01-22",
    text: "Very professional and respectful. Made a stressful day much easier to handle.",
  },
];
