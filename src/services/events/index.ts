// Event types
export interface EventSpeaker {
  name: string;
  bio: string;
  imageUrl: string;
}

export interface Event {
  _id: number;
  id?: string;
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  location: string;
  speakers: EventSpeaker[];
  imageUrl: string;
  registrationLink: string;
  category: string;
  status: string;
  capacity: number;
  registered: number;
  price: string;
  tags?: string[]; // ✅ Add this
}

export interface PaginatedEventsResponse {
  events: Event[];
  totalPages: number;
  totalItems: number;
  currentPage: number;
  itemsPerPage: number;
}

export interface EventsFilter {
  status?: "all" | "upcoming" | "past";
  category?: string;
  page?: number;
  limit?: number;
}

// Demo events data - replace with actual API calls
const demoEvents: Event[] = [
  {
    id: "1",
    title: "International Research Conference 2025",
    description:
      "Join leading researchers and academics for a comprehensive exploration of cutting-edge research methodologies, breakthrough discoveries, and collaborative opportunities in the field of artificial intelligence and machine learning.",
    startDate: "2025-03-15T09:00:00Z",
    endDate: "2025-03-17T18:00:00Z",
    location: "San Francisco Convention Center, USA",
    speakers: [
      {
        name: "Dr. Sarah Johnson",
        bio: "AI Research Lead at Stanford University",
        imageUrl:
          "https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80",
      },
      {
        name: "Prof. Michael Chen",
        bio: "Machine Learning Expert at MIT",
        imageUrl:
          "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80",
      },
      {
        name: "Dr. Emily Rodriguez",
        bio: "Data Science Researcher at Google",
        imageUrl:
          "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80",
      },
    ],
    imageUrl:
      "https://images.unsplash.com/photo-1605810230434-7631ac76ec81?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    registrationLink: "https://example.com/research-conference-2025",
    category: "Research",
    status: "upcoming",
    capacity: 500,
    registered: 342,
    price: "$299",
    tags: ["AI", "Machine Learning", "Research", "Networking"],
  },
  {
    id: "2",
    title: "Startup Innovation Summit",
    description:
      "Connect with entrepreneurs, investors, and industry leaders in this dynamic event focused on startup innovation, funding opportunities, and scaling strategies for emerging technologies.",
    startDate: "2025-04-20T10:00:00Z",
    endDate: "2025-04-22T17:00:00Z",
    location: "Austin Convention Center, Texas",
    speakers: [
      {
        name: "Elon Musk",
        bio: "CEO of Tesla & SpaceX",
        imageUrl:
          "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80",
      },
      {
        name: "Sundar Pichai",
        bio: "CEO of Google",
        imageUrl:
          "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80",
      },
    ],
    imageUrl:
      "https://images.unsplash.com/photo-1515187029135-18ee286d815b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    registrationLink: "https://example.com/startup-summit-2025",
    category: "Business",
    status: "upcoming",
    capacity: 300,
    registered: 287,
    price: "$199",
    tags: ["Startup", "Innovation", "Funding", "Networking"],
  },
  {
    id: "3",
    title: "Academic Writing Workshop",
    description:
      "Master the art of academic writing with expert guidance on research paper structure, publication strategies, and effective communication of complex ideas to diverse audiences.",
    startDate: "2025-02-10T14:00:00Z",
    endDate: "2025-02-12T16:00:00Z",
    location: "Virtual Event (Zoom)",
    speakers: [
      {
        name: "Prof. Lisa Wang",
        bio: "Academic Writing Specialist",
        imageUrl:
          "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80",
      },
      {
        name: "Dr. David Brown",
        bio: "Research Publication Expert",
        imageUrl:
          "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80",
      },
    ],
    imageUrl:
      "https://images.unsplash.com/photo-1455390582262-044cdead277a?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    registrationLink: "https://example.com/writing-workshop-2025",
    category: "Education",
    status: "upcoming",
    capacity: 200,
    registered: 156,
    price: "$99",
    tags: ["Writing", "Academic", "Publication", "Workshop"],
  },
  {
    id: "4",
    title: "Climate Change Research Symposium",
    description:
      "Explore the latest findings in climate science research, discuss environmental policy implications, and collaborate on solutions for a sustainable future.",
    startDate: "2024-12-15T09:00:00Z",
    endDate: "2024-12-16T17:00:00Z",
    location: "Boston University, Massachusetts",
    speakers: [
      {
        name: "Dr. Jennifer Park",
        bio: "Climate Science Researcher",
        imageUrl:
          "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80",
      },
    ],
    imageUrl:
      "https://images.unsplash.com/photo-1466611653911-95081537e5b7?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    registrationLink: "https://example.com/climate-symposium-2024",
    category: "Science",
    status: "past",
    capacity: 250,
    registered: 250,
    price: "$149",
    tags: ["Climate", "Environment", "Research", "Policy"],
  },
  {
    id: "5",
    title: "Data Science Bootcamp",
    description:
      "Intensive hands-on training in data science fundamentals, machine learning algorithms, and practical applications for real-world problem solving.",
    startDate: "2024-11-20T08:00:00Z",
    endDate: "2024-11-25T18:00:00Z",
    location: "Seattle Tech Hub, Washington",
    speakers: [
      {
        name: "Dr. James Wilson",
        bio: "Data Science Researcher",
        imageUrl:
          "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80",
      },
    ],
    imageUrl:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    registrationLink: "https://example.com/datascience-bootcamp-2024",
    category: "Technology",
    status: "past",
    capacity: 100,
    registered: 100,
    price: "$599",
    tags: ["Data Science", "Machine Learning", "Bootcamp", "Hands-on"],
  },
  {
    id: "6",
    title: "Quantum Computing Workshop",
    description:
      "Dive into the fascinating world of quantum computing with expert-led sessions on quantum algorithms, quantum cryptography, and the future of computing technology.",
    startDate: "2025-05-05T10:00:00Z",
    endDate: "2025-05-07T16:00:00Z",
    location: "IBM Research Center, New York",
    speakers: [
      {
        name: "Dr. Alex Thompson",
        bio: "Quantum Physics Researcher",
        imageUrl:
          "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80",
      },
    ],
    imageUrl:
      "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    registrationLink: "https://example.com/quantum-workshop-2025",
    category: "Technology",
    status: "upcoming",
    capacity: 150,
    registered: 89,
    price: "$399",
    tags: ["Quantum Computing", "Physics", "Technology", "Workshop"],
  },
  {
    id: "7",
    title: "Biotechnology Innovation Summit",
    description:
      "Explore breakthrough innovations in biotechnology, from gene editing to synthetic biology, and discover the future of healthcare and agriculture.",
    startDate: "2025-06-10T09:00:00Z",
    endDate: "2025-06-12T17:00:00Z",
    location: "San Diego Convention Center, California",
    speakers: [
      {
        name: "Dr. Maria Garcia",
        bio: "Biotech Research Director",
        imageUrl:
          "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80",
      },
      {
        name: "Prof. Robert Kim",
        bio: "Genetic Engineering Expert",
        imageUrl:
          "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80",
      },
    ],
    imageUrl:
      "https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    registrationLink: "https://example.com/biotech-summit-2025",
    category: "Science",
    status: "upcoming",
    capacity: 400,
    registered: 234,
    price: "$349",
    tags: ["Biotechnology", "Healthcare", "Innovation", "Research"],
  },
  {
    id: "8",
    title: "Digital Marketing Masterclass",
    description:
      "Learn advanced digital marketing strategies, SEO optimization, and social media management from industry experts.",
    startDate: "2024-10-15T10:00:00Z",
    endDate: "2024-10-16T16:00:00Z",
    location: "Virtual Event (Zoom)",
    speakers: [
      {
        name: "Sarah Johnson",
        bio: "Digital Marketing Strategist",
        imageUrl:
          "https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80",
      },
    ],
    imageUrl:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    registrationLink: "https://example.com/digital-marketing-2024",
    category: "Business",
    status: "past",
    capacity: 300,
    registered: 300,
    price: "$129",
    tags: ["Marketing", "Digital", "SEO", "Social Media"],
  },
];

// Function to get paginated events with filtering
export const getPaginatedEvents = async (
  filter: EventsFilter = {}
): Promise<PaginatedEventsResponse> => {
  try {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 500));

    const { status = "all", category, page = 1, limit = 6 } = filter;

    // Filter events based on status and category
    let filteredEvents = demoEvents.filter((event) => {
      const matchesStatus = status === "all" || event.status === status;
      const matchesCategory = !category || event.category === category;
      return matchesStatus && matchesCategory;
    });

    // Calculate pagination
    const totalItems = filteredEvents.length;
    const totalPages = Math.ceil(totalItems / limit);
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedEvents = filteredEvents.slice(startIndex, endIndex);

    return {
      events: paginatedEvents,
      totalPages,
      totalItems,
      currentPage: page,
      itemsPerPage: limit,
    };
  } catch (error) {
    console.error("Error fetching events:", error);
    throw new Error("Failed to fetch events");
  }
};

// Function to get a single event by ID
export const getEventById = async (id: string): Promise<Event | null> => {
  try {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 300));

    const event = demoEvents.find((e) => e.id === id);
    return event || null;
  } catch (error) {
    console.error("Error fetching event:", error);
    throw new Error("Failed to fetch event");
  }
};

// Function to get event categories
export const getEventCategories = async (): Promise<
  { id: string; name: string; count: number }[]
> => {
  try {
    const categories = [
      { id: "all", name: "All Events", count: demoEvents.length },
      {
        id: "Research",
        name: "Research",
        count: demoEvents.filter((e) => e.category === "Research").length,
      },
      {
        id: "Business",
        name: "Business",
        count: demoEvents.filter((e) => e.category === "Business").length,
      },
      {
        id: "Education",
        name: "Education",
        count: demoEvents.filter((e) => e.category === "Education").length,
      },
      {
        id: "Science",
        name: "Science",
        count: demoEvents.filter((e) => e.category === "Science").length,
      },
      {
        id: "Technology",
        name: "Technology",
        count: demoEvents.filter((e) => e.category === "Technology").length,
      },
    ];

    return categories;
  } catch (error) {
    console.error("Error fetching categories:", error);
    throw new Error("Failed to fetch categories");
  }
};
