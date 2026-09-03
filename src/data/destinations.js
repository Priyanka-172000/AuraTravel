export const destinationsData = [
  {
    id: "paris",
    name: "Paris",
    country: "France",
    description: "Experience the romance, art, and exquisite gastronomy of the French capital. Stroll along the Seine, visit world-class museums, and enjoy café culture.",
    imageQuery: "paris eiffel tower",
    image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=1200&q=80",
    bestTime: "April to June, or September to October",
    recommendedDays: 4,
    categories: ["Romance", "Culture", "City", "Luxury"],
    coordinates: { lat: 48.8566, lon: 2.3522 },
    famousPlaces: [
      { name: "Eiffel Tower", description: "Iconic iron lattice tower", category: "Landmark", query: "eiffel tower", image: "https://images.unsplash.com/photo-1511739001486-6bfe10ce785f?auto=format&fit=crop&w=800&q=80" },
      { name: "Louvre Museum", description: "World's largest art museum", category: "Museum", query: "louvre museum", image: "https://images.unsplash.com/photo-1499856871958-5b9627545d1a?auto=format&fit=crop&w=800&q=80" },
      { name: "Montmartre", description: "Historic hilltop district", category: "Neighborhood", query: "montmartre paris", image: "https://images.unsplash.com/photo-1550340499-a6c60fc8287c?auto=format&fit=crop&w=800&q=80" }
    ]
  },
  {
    id: "tokyo",
    name: "Tokyo",
    country: "Japan",
    description: "A dazzling mix of neon-lit skyscrapers and historic temples. Tokyo offers an unparalleled culinary scene and cutting-edge technology.",
    imageQuery: "tokyo city night",
    image: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&w=1200&q=80",
    bestTime: "March to April, or September to November",
    recommendedDays: 5,
    categories: ["Culture", "City", "Entertainment"],
    coordinates: { lat: 35.6762, lon: 139.6503 },
    famousPlaces: [
      { name: "Senso-ji", description: "Ancient Buddhist temple", category: "Temple", query: "sensoji temple", image: "https://images.unsplash.com/photo-1532236204992-f5e85c024202?auto=format&fit=crop&w=800&q=80" },
      { name: "Shibuya Crossing", description: "Busiest pedestrian intersection", category: "Landmark", query: "shibuya crossing", image: "https://upload.wikimedia.org/wikipedia/commons/8/88/Shibuya_Crossing%2C_Aerial.jpg" },
      { name: "Meiji Shrine", description: "Shinto shrine surrounded by forest", category: "Shrine", query: "meiji shrine", image: "https://upload.wikimedia.org/wikipedia/commons/8/8b/Meiji_Jingu_2023-3.jpg" }
    ]
  },
  {
    id: "bali",
    name: "Bali",
    country: "Indonesia",
    description: "An island paradise known for its forested volcanic mountains, iconic rice paddies, beaches and coral reefs.",
    imageQuery: "bali rice terrace",
    image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=1200&q=80",
    bestTime: "April to October",
    recommendedDays: 7,
    categories: ["Nature", "Beach", "Relaxation", "Romance"],
    coordinates: { lat: -8.4095, lon: 115.1889 },
    famousPlaces: [
      { name: "Uluwatu Temple", description: "Cliff-edge sea temple", category: "Temple", query: "uluwatu temple", image: "https://upload.wikimedia.org/wikipedia/commons/5/57/Pura_Luhur_Uluwatu_2017-08-17_%2834%29.jpg" },
      { name: "Ubud Monkey Forest", description: "Nature reserve and temple complex", category: "Nature", query: "ubud monkey forest", image: "https://upload.wikimedia.org/wikipedia/commons/0/00/Monkey_Forest_Ubud.jpg" },
      { name: "Tegallalang Rice Terrace", description: "Scenic terraced rice fields", category: "Landscape", query: "tegallalang rice terrace", image: "https://upload.wikimedia.org/wikipedia/commons/7/77/Tegallalang_Rice_Terrace_in_Bali.jpg" }
    ]
  },
  {
    id: "new-york",
    name: "New York",
    country: "USA",
    description: "The city that never sleeps. Explore diverse neighborhoods, catch a Broadway show, and wander through Central Park.",
    imageQuery: "new york city skyline",
    image: "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?auto=format&fit=crop&w=1200&q=80",
    bestTime: "April to June, or September to early November",
    recommendedDays: 5,
    categories: ["City", "Culture", "Entertainment"],
    coordinates: { lat: 40.7128, lon: -74.0060 },
    famousPlaces: [
      { name: "Central Park", description: "Vast urban park in Manhattan", category: "Park", query: "central park ny", image: "https://upload.wikimedia.org/wikipedia/commons/f/f1/Global_Citizen_Festival_Central_Park_New_York_City_from_NYonAir_%2815351915006%29.jpg" },
      { name: "Statue of Liberty", description: "Colossal neoclassical sculpture", category: "Landmark", query: "statue of liberty", image: "https://images.unsplash.com/photo-1605130284535-11dd9eedc58a?auto=format&fit=crop&w=800&q=80" },
      { name: "Times Square", description: "Bustling commercial intersection", category: "Landmark", query: "times square", image: "https://upload.wikimedia.org/wikipedia/commons/4/47/New_york_times_square-terabass.jpg" }
    ]
  },
  {
    id: "rome",
    name: "Rome",
    country: "Italy",
    description: "A sprawling, cosmopolitan city with nearly 3,000 years of globally influential art, architecture and culture on display.",
    imageQuery: "rome colosseum",
    image: "https://images.unsplash.com/photo-1552832230-c0197dd311b5?auto=format&fit=crop&w=1200&q=80",
    bestTime: "October to April",
    recommendedDays: 4,
    categories: ["History", "Culture", "City", "Romance"],
    coordinates: { lat: 41.9028, lon: 12.4964 },
    famousPlaces: [
      { name: "Colosseum", description: "Ancient gladiatorial arena", category: "Historic Site", query: "colosseum rome", image: "https://images.unsplash.com/photo-1552832230-c0197dd311b5?auto=format&fit=crop&w=800&q=80" },
      { name: "Trevi Fountain", description: "Iconic Baroque fountain", category: "Landmark", query: "trevi fountain", image: "https://images.unsplash.com/photo-1525874684015-58379d421a52?auto=format&fit=crop&w=800&q=80" },
      { name: "Pantheon", description: "Former Roman temple", category: "Historic Site", query: "pantheon rome", image: "https://images.unsplash.com/photo-1555992828-ca4dbe41d294?auto=format&fit=crop&w=800&q=80" }
    ]
  },
  {
    id: "dubai",
    name: "Dubai",
    country: "UAE",
    description: "A city of superlatives known for luxury shopping, ultramodern architecture, and a lively nightlife scene.",
    imageQuery: "dubai burj khalifa",
    image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1200&q=80",
    bestTime: "November to March",
    recommendedDays: 4,
    categories: ["Luxury", "City", "Entertainment"],
    coordinates: { lat: 25.2048, lon: 55.2708 },
    famousPlaces: [
      { name: "Burj Khalifa", description: "World's tallest building", category: "Landmark", query: "burj khalifa", image: "https://images.unsplash.com/photo-1528702748617-c64d49f918af?auto=format&fit=crop&w=800&q=80" },
      { name: "Palm Jumeirah", description: "Artificial archipelago", category: "Landmark", query: "palm jumeirah", image: "https://upload.wikimedia.org/wikipedia/commons/3/30/Artificial_Archipelagos%2C_Dubai%2C_United_Arab_Emirates_ISS022-E-024940_lrg_%28cropped%29.jpg" },
      { name: "Dubai Mall", description: "Massive shopping and leisure destination", category: "Attraction", query: "dubai mall", image: "https://images.unsplash.com/photo-1546412414-e1885259563a?auto=format&fit=crop&w=800&q=80" }
    ]
  },
  {
    id: "london",
    name: "London",
    country: "UK",
    description: "A 21st-century city with history stretching back to Roman times. At its centre stand the imposing Houses of Parliament and the iconic Big Ben.",
    imageQuery: "london eye",
    image: "https://upload.wikimedia.org/wikipedia/commons/d/d6/London-Eye-2009.JPG",
    bestTime: "May to August",
    recommendedDays: 5,
    categories: ["History", "Culture", "City", "Entertainment"],
    coordinates: { lat: 51.5074, lon: -0.1278 },
    famousPlaces: [
      { name: "London Eye", description: "Giant Ferris wheel", category: "Landmark", query: "london eye", image: "https://upload.wikimedia.org/wikipedia/commons/d/d6/London-Eye-2009.JPG" },
      { name: "Tower of London", description: "Historic castle", category: "Historic Site", query: "tower of london", image: "https://images.unsplash.com/photo-1587595431973-160d0d94add1?auto=format&fit=crop&w=800&q=80" },
      { name: "British Museum", description: "Human history and culture", category: "Museum", query: "british museum", image: "https://upload.wikimedia.org/wikipedia/commons/8/86/British_Museum_%28aerial%29.jpg" }
    ]
  },
  {
    id: "sydney",
    name: "Sydney",
    country: "Australia",
    description: "Capital of New South Wales and one of Australia's largest cities, best known for its harbourfront Opera House.",
    imageQuery: "sydney opera house",
    image: "https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?auto=format&fit=crop&w=1200&q=80",
    bestTime: "September to November, or March to May",
    recommendedDays: 6,
    categories: ["City", "Beach", "Culture", "Relaxation", "Nature"],
    coordinates: { lat: -33.8688, lon: 151.2093 },
    famousPlaces: [
      { name: "Sydney Opera House", description: "Multi-venue performing arts centre", category: "Landmark", query: "sydney opera house", image: "https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?auto=format&fit=crop&w=800&q=80" },
      { name: "Sydney Harbour Bridge", description: "Heritage-listed steel through arch bridge", category: "Landmark", query: "sydney harbour bridge", image: "https://images.unsplash.com/photo-1528072164453-f4e8ef0d475a?auto=format&fit=crop&w=800&q=80" },
      { name: "Bondi Beach", description: "Popular beach and surrounding suburb", category: "Beach", query: "bondi beach", image: "https://upload.wikimedia.org/wikipedia/commons/7/79/Bondi_from_above.jpg" }
    ]
  },
  {
    id: "india",
    name: "India",
    country: "India",
    description: "A vast South Asian country with diverse terrain – from Himalayan peaks to Indian Ocean coastline – and history reaching back 5 millennia.",
    imageQuery: "india taj mahal",
    image: "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&w=1200&q=80",
    bestTime: "October to March",
    recommendedDays: 14,
    categories: ["Culture", "History", "Nature", "City"],
    coordinates: { lat: 28.6139, lon: 77.2090 }, // New Delhi
    famousPlaces: [
      { name: "Taj Mahal", description: "Ivory-white marble mausoleum", category: "Historic Site", query: "taj mahal", image: "https://upload.wikimedia.org/wikipedia/commons/1/1d/Taj_Mahal_%28Edited%29.jpeg" },
      { name: "Jaipur", description: "The Pink City", category: "City", query: "jaipur palace", image: "https://images.unsplash.com/photo-1477587458883-47145ed94245?auto=format&fit=crop&w=800&q=80" },
      { name: "Kerala Backwaters", description: "Chain of brackish lagoons and lakes", category: "Nature", query: "kerala backwaters", image: "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=800&q=80" }
    ]
  },
  {
    id: "maldives",
    name: "Maldives",
    country: "Maldives",
    description: "Tropical paradise known for its beaches, blue lagoons, and extensive reefs.",
    imageQuery: "maldives beach",
    image: "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&w=1200&q=80",
    bestTime: "November to April",
    recommendedDays: 6,
    categories: ["Beach", "Relaxation", "Romance", "Luxury", "Nature"],
    coordinates: { lat: 3.2028, lon: 73.2207 },
    famousPlaces: [
      { name: "Baa Atoll", description: "UNESCO World Biosphere Reserve", category: "Nature", query: "baa atoll", image: "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&w=800&q=80" },
      { name: "Male", description: "Capital city", category: "City", query: "male maldives", image: "https://images.unsplash.com/photo-1573843981267-be1999ff37cd?auto=format&fit=crop&w=800&q=80" },
      { name: "Maafushi", description: "Local island with beautiful beaches", category: "Beach", query: "maafushi", image: "https://images.unsplash.com/photo-1590523741831-ab7e8b8f9c7f?auto=format&fit=crop&w=800&q=80" }
    ]
  }
];
