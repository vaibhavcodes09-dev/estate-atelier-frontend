export const navCategories = [
  {
    title: "For Buyer",
    items: [
      { name: "Buy a Home", path: "/buy/home" },
      { name: "Buy Commercial", path: "/buy/commercial" },
      { name: "Buy a Plot", path: "/buy/plot" },
      { name: "New Projects", path: "/buy/new-projects" },
    ],
  },
  {
    title: "For Tenants",
    items: [
      { name: "Rent a Home", path: "/rent/home" },
      { name: "Rent Commercial", path: "/rent/commercial" },
      { name: "Co-living Spaces", path: "/rent/co-living" },
      { name: "Student Housing", path: "/rent/student-housing" },
    ],
  },
  {
    title: "For Dealers",
    items: [
      { name: "Partner Dashboard", path: "/dealer/dashboard" },
      { name: "List Properties", path: "/dealer/list-properties" },
      { name: "Market Insights", path: "/dealer/market-insights" },
      { name: "Pro Services", path: "/dealer/pro-services" },
    ],
  },
];

import {
  FiLogIn,
  FiUserPlus,
  FiSearch,
  FiEye,
  FiHeart,
  FiMessageCircle,
  FiPlusSquare,
} from "react-icons/fi";

export const profileMenuItems = [
  { icon: FiLogIn, label: "Login", path: "/login" },
  { icon: FiUserPlus, label: "Sign Up", path: "/signup", divider: true },
  { icon: FiSearch, label: "Recently Searched", path: "#recently-searched" },
  { icon: FiEye, label: "Recently Viewed", path: "#recently-viewed" },
  { icon: FiHeart, label: "Shortlisted", path: "#shortlisted" },
  {
    icon: FiMessageCircle,
    label: "Contacted",
    path: "#contacted",
    divider: true,
  },
  { icon: FiPlusSquare, label: "Post Property", path: "/add-property" },
];

export const searchSuggestions = [
  "Search property in Vijay Nagar",
  "Search property in Friends Colony",
  "Search property in Bharthana",
  "Search property in Jaswant Nagar",
  "Search property in Saifai",
];

export const locations = [
  {
    id: 1,
    name: "Etawah",
    properties: "1,200+",
    image:
      "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 2,
    name: "Jaswant Nagar",
    properties: "850+",
    image:
      "https://images.unsplash.com/photo-1449844908441-8829872d2607?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 3,
    name: "Saifai",
    properties: "420+",
    image:
      "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 4,
    name: "Bharthana",
    properties: "630+",
    image:
      "https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 5,
    name: "Sirsaganj",
    properties: "310+",
    image:
      "https://images.unsplash.com/photo-1519501025264-65ba15a82390?auto=format&fit=crop&w=800&q=80",
  },
];

// --- Dummy Testimonial Data ---
export const testimonials = [
  {
    id: 1,
    name: "Rahul Sharma",
    location: "Jaswant Nagar",
    image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=150&q=80",
    rating: 5,
    review: "The platform made finding a home in Jaswant Nagar incredibly easy. The 100% verified listings gave me peace of mind, and the end-to-end support was exactly what I needed as a first-time buyer."
  },
  {
    id: 2,
    name: "Priya Singh",
    location: "Etawah",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80",
    rating: 5,
    review: "I was looking for a premium property and the expert guidance I received was unmatched. They helped negotiate a fantastic deal. Highly recommend their transparent and professional services!"
  },
  {
    id: 3,
    name: "Amit Yadav",
    location: "Saifai",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80",
    rating: 5,
    review: "Selling my builder floor in Saifai was a breeze. The team handled everything from listing to finalizing the paperwork. Their transparent pricing model is a breath of fresh air in real estate."
  }
];

// --- Why Choose Us Section ---
import {
  ClipboardCheck,
  UserCheck,
  ClipboardList,
  ShieldCheck,
} from "lucide-react";
export const features = [
  {
    id: 1,
    title: "Verified Listings",
    description: "100% Verified Properties",
    icon: ClipboardCheck,
  },
  {
    id: 2,
    title: "Expert Guidance",
    description: "Professional support at every step",
    icon: UserCheck,
  },
  {
    id: 3,
    title: "Best Deals",
    description: "Transparent pricing and best discounts",
    icon: ClipboardList,
  },
  {
    id: 4,
    title: "End to End Support",
    description: "We are with you always",
    icon: ShieldCheck,
  },
];

// --- Dummy Properties Data ---
export const propertiesData = [
  {
    id: 1,
    title: "Modern 3BHK Villa with Pool",
    priceValue: 18500000,
    price: "₹ 1.85 Cr",
    location: "Civil Lines, Jaswant Nagar, UP",
    status: "For Sale",
    type: "Villa",
    bhk: 3,
    baths: 3,
    sqft: "2,100",
    yearBuilt: "2023",
    description: "Experience luxury living in this stunning modern villa located in the heart of Jaswant Nagar. Featuring an open-concept floor plan, high ceilings, and a private backyard oasis with a swimming pool. The gourmet kitchen is equipped with top-of-the-line appliances and custom cabinetry.",
    image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1600566752355-35792bedcfea?auto=format&fit=crop&w=800&q=80"
    ],
    amenities: ["Swimming Pool", "24/7 Security", "Modular Kitchen", "Power Backup", "Garden", "Private Parking", "Gymnasium", "Vastu Compliant"],
    agent: {
      name: "Vikram Singh",
      role: "Senior Real Estate Agent",
      phone: "+91 98765 43210",
      email: "vikram@realestate.com",
      image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=200&q=80"
    }
  },
  {
    id: 2,
    title: "Luxury Apartment",
    priceValue: 6500000,
    price: "₹ 65 Lacs",
    location: "Friends Colony, Etawah, UP",
    status: "For Sale",
    type: "Apartment",
    bhk: 3,
    baths: 2,
    sqft: "1,550",
    yearBuilt: "2021",
    description: "Spacious 3BHK apartment offering premium amenities and excellent city views. Located in a high-demand gated society with round-the-clock security and maintenance staff.",
    image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1600573472591-ee6b68d14c68?auto=format&fit=crop&w=800&q=80"
    ],
    amenities: ["Club House", "24/7 Security", "Elevator", "Power Backup", "Balcony", "Reserved Parking"],
    agent: {
      name: "Neha Sharma",
      role: "Property Consultant",
      phone: "+91 98765 43211",
      email: "neha@realestate.com",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80"
    }
  },
  {
    id: 3,
    title: "Independent Family House",
    priceValue: 8500000,
    price: "₹ 85 Lacs",
    location: "Bharthana, Etawah, UP",
    status: "For Sale",
    type: "House",
    bhk: 3,
    baths: 3,
    sqft: "1,800",
    yearBuilt: "2019",
    description: "Well-maintained independent house ideal for medium to large families. Features a spacious terrace, private parking, and proximity to local schools and markets.",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1600607688969-a5bfcd394f12?auto=format&fit=crop&w=800&q=80"
    ],
    amenities: ["Private Terrace", "Vastu Compliant", "Water Storage", "Park Facing", "Visitor Parking"],
    agent: {
      name: "Rahul Verma",
      role: "Real Estate Broker",
      phone: "+91 98765 43212",
      email: "rahul@realestate.com",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=200&q=80"
    }
  },
  {
    id: 4,
    title: "Premium 5BHK Duplex",
    priceValue: 15000000,
    price: "₹ 1.50 Cr",
    location: "Saifai, Etawah, UP",
    status: "For Sale",
    type: "Duplex",
    bhk: 5,
    baths: 5,
    sqft: "3,200",
    yearBuilt: "2022",
    description: "An architectural masterpiece in Saifai. This 5BHK duplex offers double-height ceilings, a lavish living room, smart home automation, and Italian marble flooring.",
    image: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1512915922686-57c11dde9b6b?auto=format&fit=crop&w=800&q=80"
    ],
    amenities: ["Smart Home", "Central AC", "Servant Quarters", "Private Garden", "2 Covered Parking", "Security System"],
    agent: {
      name: "Vikram Singh",
      role: "Senior Real Estate Agent",
      phone: "+91 98765 43210",
      email: "vikram@realestate.com",
      image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=200&q=80"
    }
  },
  {
    id: 5,
    title: "Cozy Builder Floor",
    priceValue: 4500000,
    price: "₹ 45 Lacs",
    location: "Sirsaganj, UP",
    status: "For Sale",
    type: "Builder Floor",
    bhk: 2,
    baths: 2,
    sqft: "1,100",
    yearBuilt: "2020",
    description: "Excellent 2BHK builder floor on the first floor. Highly ventilated, naturally lit, and well-connected to the main highway.",
    image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=1200&q=80"
    ],
    amenities: ["Modular Kitchen", "Balcony", "Gated Community", "Water Supply"],
    agent: {
      name: "Neha Sharma",
      role: "Property Consultant",
      phone: "+91 98765 43211",
      email: "neha@realestate.com",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80"
    }
  },
  {
    id: 6,
    title: "Highway Facing Villa",
    priceValue: 12000000,
    price: "₹ 1.20 Cr",
    location: "NH-19 Bypass, Etawah, UP",
    status: "For Sale",
    type: "Villa",
    bhk: 4,
    baths: 4,
    sqft: "2,400",
    yearBuilt: "2023",
    description: "Premium villa right off the highway ensuring maximum connectivity. Includes lush landscaping, a private terrace garden, and premium wooden interiors.",
    image: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1200&q=80"
    ],
    amenities: ["Terrace Garden", "Highway Access", "Security", "Solar Water Heater", "Gym"],
    agent: {
      name: "Amit Yadav",
      role: "Listing Agent",
      phone: "+91 98765 43213",
      email: "amit@realestate.com",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80"
    }
  },
  {
    id: 7,
    title: "Compact 2BHK Flat",
    priceValue: 3500000,
    price: "₹ 35 Lacs",
    location: "Station Road, Jaswant Nagar, UP",
    status: "For Rent",
    type: "Apartment",
    bhk: 2,
    baths: 1,
    sqft: "900",
    yearBuilt: "2018",
    description: "Budget-friendly 2BHK flat ideal for small families or working professionals. Just 5 minutes walk from the railway station.",
    image: "https://images.unsplash.com/photo-1502672260266-1c1de2d93688?auto=format&fit=crop&w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1502672260266-1c1de2d93688?auto=format&fit=crop&w=1200&q=80"
    ],
    amenities: ["Close to Transit", "Elevator", "24/7 Water", "Security Guard"],
    agent: {
      name: "Rahul Verma",
      role: "Real Estate Broker",
      phone: "+91 98765 43212",
      email: "rahul@realestate.com",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=200&q=80"
    }
  },
  {
    id: 8,
    title: "Spacious Farmhouse",
    priceValue: 25000000,
    price: "₹ 2.50 Cr",
    location: "Outer Ring, Saifai, UP",
    status: "For Sale",
    type: "House",
    bhk: 5,
    baths: 6,
    sqft: "5,000",
    yearBuilt: "2015",
    description: "A sprawling farmhouse surrounded by nature. Features a private pool, outhouses for staff, an organic vegetable garden, and massive outdoor entertaining spaces.",
    image: "https://images.unsplash.com/photo-1518780664697-55e3ad937233?auto=format&fit=crop&w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1518780664697-55e3ad937233?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=800&q=80"
    ],
    amenities: ["Swimming Pool", "Staff Quarters", "Organic Garden", "Gazebo", "Ample Parking"],
    agent: {
      name: "Vikram Singh",
      role: "Senior Real Estate Agent",
      phone: "+91 98765 43210",
      email: "vikram@realestate.com",
      image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=200&q=80"
    }
  },
  {
    id: 9,
    title: "Koramangala IT Park Apartment",
    priceValue: 12000000,
    price: "₹ 1.20 Cr",
    location: "Koramangala, Bengaluru, KA",
    status: "For Sale",
    type: "Apartment",
    bhk: 3,
    baths: 2,
    sqft: "1,600",
    yearBuilt: "2020",
    description: "Prime location property in Bengaluru's tech hub. Perfect for IT professionals with quick access to major tech parks and vibrant city life.",
    image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80"
    ],
    amenities: ["Gym", "Pool", "Clubhouse", "Co-working Space", "CCTV Security"],
    agent: {
      name: "Priya Raj",
      role: "City Specialist",
      phone: "+91 98765 43214",
      email: "priya@realestate.com",
      image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=200&q=80"
    }
  },
  {
    id: 10,
    title: "Skyview Penthouse Suite",
    priceValue: 30000000,
    price: "₹ 3.00 Cr",
    location: "VIP Road, Lucknow, UP",
    status: "For Sale",
    type: "Duplex",
    bhk: 4,
    baths: 5,
    sqft: "4,200",
    yearBuilt: "2024",
    description: "Ultra-luxury penthouse offering panoramic views of the city skyline. Features a private elevator, jacuzzi, and extensive terrace space.",
    image: "https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?auto=format&fit=crop&w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?auto=format&fit=crop&w=1200&q=80"
    ],
    amenities: ["Private Elevator", "Jacuzzi", "Terrace Garden", "Smart Home", "Valet Parking"],
    agent: {
      name: "Sanjay Kapoor",
      role: "Luxury Property Expert",
      phone: "+91 98765 43215",
      email: "sanjay@realestate.com",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80"
    }
  },
  {
    id: 11,
    title: "Affordable 1BHK Studio",
    priceValue: 2200000,
    price: "₹ 22 Lacs",
    location: "Indira Nagar, Kanpur, UP",
    status: "For Sale",
    type: "Apartment",
    bhk: 1,
    baths: 1,
    sqft: "650",
    yearBuilt: "2017",
    description: "Compact, well-designed 1BHK ideal for bachelors and investors. High rental yield and low maintenance.",
    image: "https://images.unsplash.com/photo-1536376072261-38c75010e6c9?auto=format&fit=crop&w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1536376072261-38c75010e6c9?auto=format&fit=crop&w=1200&q=80"
    ],
    amenities: ["Two-wheeler Parking", "24/7 Water", "Proximity to Metro"],
    agent: {
      name: "Neha Sharma",
      role: "Property Consultant",
      phone: "+91 98765 43211",
      email: "neha@realestate.com",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80"
    }
  },
  {
    id: 12,
    title: "Riverside Heritage Bungalow",
    priceValue: 40000000,
    price: "₹ 4.00 Cr",
    location: "Yamuna Kinara, Agra, UP",
    status: "For Sale",
    type: "House",
    bhk: 6,
    baths: 5,
    sqft: "6,000",
    yearBuilt: "1995",
    description: "A heritage style bungalow with stunning river views. Traditional architecture merged with modern comforts. Huge courtyard and vintage wooden carvings.",
    image: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=1200&q=80"
    ],
    amenities: ["Courtyard", "River View", "Vintage Interiors", "Library Room", "Staff Quarters"],
    agent: {
      name: "Sanjay Kapoor",
      role: "Luxury Property Expert",
      phone: "+91 98765 43215",
      email: "sanjay@realestate.com",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80"
    }
  },
  {
    id: 13,
    title: "Green Valley Row House",
    priceValue: 9500000,
    price: "₹ 95 Lacs",
    location: "Sector 150, Noida, UP",
    status: "For Sale",
    type: "Villa",
    bhk: 3,
    baths: 3,
    sqft: "1,950",
    yearBuilt: "2023",
    description: "Beautifully designed row house in a green, pollution-free gated community. Features a small private front garden and backyard.",
    image: "https://images.unsplash.com/photo-1583608205776-bfd35f0d9f83?auto=format&fit=crop&w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1583608205776-bfd35f0d9f83?auto=format&fit=crop&w=1200&q=80"
    ],
    amenities: ["Private Garden", "Clubhouse Access", "Sports Courts", "Jogging Track", "24/7 Security"],
    agent: {
      name: "Amit Yadav",
      role: "Listing Agent",
      phone: "+91 98765 43213",
      email: "amit@realestate.com",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80"
    }
  },
  {
    id: 14,
    title: "Urban Chic 4BHK Apartment",
    priceValue: 18000000,
    price: "₹ 1.80 Cr",
    location: "Gomti Nagar, Lucknow, UP",
    status: "For Sale",
    type: "Apartment",
    bhk: 4,
    baths: 4,
    sqft: "2,500",
    yearBuilt: "2022",
    description: "Spacious luxury apartment located in the upscale Gomti Nagar area. Comes fully furnished with modern contemporary decor and modular fittings.",
    image: "https://images.unsplash.com/photo-1493809842364-78817add7ff6?auto=format&fit=crop&w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1493809842364-78817add7ff6?auto=format&fit=crop&w=1200&q=80"
    ],
    amenities: ["Fully Furnished", "Gymnasium", "Swimming Pool", "Kids Play Area", "CCTV"],
    agent: {
      name: "Priya Raj",
      role: "City Specialist",
      phone: "+91 98765 43214",
      email: "priya@realestate.com",
      image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=200&q=80"
    }
  },
  {
    id: 15,
    title: "Commercial Office Space",
    priceValue: 5500000,
    price: "₹ 55 Lacs",
    location: "Main Market, Etawah, UP",
    status: "For Rent",
    type: "Builder Floor",
    bhk: 0,
    baths: 2,
    sqft: "1,200",
    yearBuilt: "2015",
    description: "Prime commercial builder floor space suitable for offices, clinics, or IT startups. High footfall area with great visibility.",
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80"
    ],
    amenities: ["Central AC", "Power Backup", "Cafeteria Space", "Elevator", "Visitor Parking"],
    agent: {
      name: "Rahul Verma",
      role: "Real Estate Broker",
      phone: "+91 98765 43212",
      email: "rahul@realestate.com",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=200&q=80"
    }
  }
];


