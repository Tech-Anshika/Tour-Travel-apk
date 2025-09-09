/**
 * Travel Advisor Database Module
 * Centralized data management following industry best practices
 * 
 * Features:
 * - Structured data organization
 * - Easy data retrieval and filtering
 * - Scalable architecture
 * - Type safety and validation
 * - Performance optimized
 */

// ===== DATA MODELS =====

/**
 * Place Data Model
 * Standardized structure for all tourism places
 */
const PlaceModel = {
  location_id: String,
  name: String,
  location_string: String,
  description: String,
  rating: String,
  num_reviews: String,
  price_level: String,
  price: String,
  open_now_text: String,
  photo: {
    images: {
      small: { url: String },
      medium: { url: String },
      large: { url: String }
    }
  },
  address: String,
  phone: String,
  email: String,
  website: String,
  cuisine: Array, // For restaurants
  amenities: Array, // For hotels
  category: String, // 'restaurant', 'hotel', 'attraction'
  state: String,
  city: String,
  latitude: Number,
  longitude: Number,
  created_at: Date,
  updated_at: Date
};

/**
 * Guide Data Model
 * Professional tour guide information
 */
const GuideModel = {
  id: String,
  name: String,
  location: String,
  state: String,
  speciality: String,
  languages: Array,
  experience: String,
  rating: String,
  reviews: String,
  price_per_day: String,
  photo: String,
  description: String,
  contact: String,
  email: String,
  verified: Boolean,
  tours_completed: Number,
  availability: Array,
  certifications: Array,
  created_at: Date,
  updated_at: Date
};

// ===== DATABASE COLLECTIONS =====

/**
 * Places Database - Organized by State and Category
 */
export const PlacesDB = {
  // Delhi Places
  Delhi: {
    attractions: [
      {
        location_id: "delhi_red_fort",
        name: "Red Fort",
        location_string: "Delhi, Delhi",
        description: "Historic fortified palace and UNESCO World Heritage Site built by the Mughal Emperor Shah Jahan",
        rating: "4.5",
        num_reviews: "25000+",
        price_level: "₹",
        price: "₹35",
        open_now_text: "Open 9:30 AM - 4:30 PM",
        photo: {
          images: {
            small: { url: "https://images.unsplash.com/photo-1587474260584-136574528ed5?w=300&h=200&fit=crop" },
            medium: { url: "https://images.unsplash.com/photo-1587474260584-136574528ed5?w=400&h=300&fit=crop" },
            large: { url: "https://images.unsplash.com/photo-1587474260584-136574528ed5?w=800&h=600&fit=crop" }
          }
        },
        address: "Netaji Subhash Marg, Chandni Chowk, New Delhi, Delhi 110006",
        phone: "+91 11 2327 7705",
        website: "https://www.delhitourism.gov.in",
        category: "attraction",
        state: "Delhi",
        city: "New Delhi",
        latitude: 28.6562,
        longitude: 77.2410,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        location_id: "delhi_india_gate",
        name: "India Gate",
        location_string: "Delhi, Delhi",
        description: "War memorial and iconic landmark dedicated to Indian soldiers who died in World War I",
        rating: "4.4",
        num_reviews: "35000+",
        price_level: "Free",
        price: "Free",
        open_now_text: "Open 24 hours",
        photo: {
          images: {
            small: { url: "https://images.unsplash.com/photo-1599661046827-dacde6c20adb?w=300&h=200&fit=crop" },
            medium: { url: "https://images.unsplash.com/photo-1599661046827-dacde6c20adb?w=400&h=300&fit=crop" },
            large: { url: "https://images.unsplash.com/photo-1599661046827-dacde6c20adb?w=800&h=600&fit=crop" }
          }
        },
        address: "Rajpath, India Gate, New Delhi, Delhi 110001",
        category: "attraction",
        state: "Delhi",
        city: "New Delhi",
        latitude: 28.6129,
        longitude: 77.2295,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        location_id: "delhi_lotus_temple",
        name: "Lotus Temple",
        location_string: "Delhi, Delhi",
        description: "Beautiful Baháʼí House of Worship known for its distinctive lotus flower architecture",
        rating: "4.6",
        num_reviews: "20000+",
        price_level: "Free",
        price: "Free",
        open_now_text: "Open 9:00 AM - 5:30 PM",
        photo: {
          images: {
            small: { url: "https://images.unsplash.com/photo-1605649487212-47bdab064df7?w=300&h=200&fit=crop" },
            medium: { url: "https://images.unsplash.com/photo-1605649487212-47bdab064df7?w=400&h=300&fit=crop" },
            large: { url: "https://images.unsplash.com/photo-1605649487212-47bdab064df7?w=800&h=600&fit=crop" }
          }
        },
        address: "Lotus Temple Rd, Bahapur, Shambhu Dayal Bagh, Kalkaji, New Delhi, Delhi 110019",
        phone: "+91 11 2644 4029",
        category: "attraction",
        state: "Delhi",
        city: "New Delhi",
        latitude: 28.5535,
        longitude: 77.2588,
        created_at: new Date(),
        updated_at: new Date()
      }
    ],
    restaurants: [
      {
        location_id: "delhi_karims",
        name: "Karim's",
        location_string: "Delhi, Delhi",
        description: "Authentic Mughlai cuisine restaurant serving traditional dishes since 1913",
        rating: "4.2",
        num_reviews: "5000+",
        price_level: "₹₹",
        price: "₹500-800 for two",
        open_now_text: "Open 11:00 AM - 11:00 PM",
        photo: {
          images: {
            small: { url: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=300&h=200&fit=crop" },
            medium: { url: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=400&h=300&fit=crop" },
            large: { url: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=800&h=600&fit=crop" }
          }
        },
        address: "16, Gali Kababian, Jama Masjid, New Delhi, Delhi 110006",
        phone: "+91 11 2326 9880",
        cuisine: [
          { key: "mughlai", name: "Mughlai" },
          { key: "north_indian", name: "North Indian" },
          { key: "kebabs", name: "Kebabs" }
        ],
        category: "restaurant",
        state: "Delhi",
        city: "New Delhi",
        latitude: 28.6507,
        longitude: 77.2334,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        location_id: "delhi_bukhara",
        name: "Bukhara",
        location_string: "Delhi, Delhi",
        description: "World-famous North Indian restaurant known for its rustic ambiance and authentic flavors",
        rating: "4.7",
        num_reviews: "8000+",
        price_level: "₹₹₹₹",
        price: "₹3000-4000 for two",
        open_now_text: "Open 7:00 PM - 11:45 PM",
        photo: {
          images: {
            small: { url: "https://images.unsplash.com/photo-1567337712385-da821b4bb6e3?w=300&h=200&fit=crop" },
            medium: { url: "https://images.unsplash.com/photo-1567337712385-da821b4bb6e3?w=400&h=300&fit=crop" },
            large: { url: "https://images.unsplash.com/photo-1567337712385-da821b4bb6e3?w=800&h=600&fit=crop" }
          }
        },
        address: "ITC Maurya, Sardar Patel Marg, Diplomatic Enclave, New Delhi, Delhi 110021",
        phone: "+91 11 2611 2233",
        cuisine: [
          { key: "north_indian", name: "North Indian" },
          { key: "tandoor", name: "Tandoor" },
          { key: "kebabs", name: "Kebabs" }
        ],
        category: "restaurant",
        state: "Delhi",
        city: "New Delhi",
        latitude: 28.5969,
        longitude: 77.1672,
        created_at: new Date(),
        updated_at: new Date()
      }
    ],
    hotels: [
      {
        location_id: "delhi_oberoi",
        name: "The Oberoi New Delhi",
        location_string: "Delhi, Delhi",
        description: "Luxury hotel with world-class amenities and exceptional service in the heart of New Delhi",
        rating: "4.7",
        num_reviews: "8000+",
        price_level: "₹₹₹₹",
        price: "₹25,000+ per night",
        photo: {
          images: {
            small: { url: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=300&h=200&fit=crop" },
            medium: { url: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400&h=300&fit=crop" },
            large: { url: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&h=600&fit=crop" }
          }
        },
        address: "Dr. Zakir Hussain Marg, New Delhi, Delhi 110003",
        phone: "+91 11 2436 3030",
        email: "reservations.newdelhi@oberoihotels.com",
        website: "https://www.oberoihotels.com",
        amenities: ["Spa", "Pool", "Fitness Center", "Restaurant", "Bar", "WiFi", "Parking"],
        category: "hotel",
        state: "Delhi",
        city: "New Delhi",
        latitude: 28.5933,
        longitude: 77.2507,
        created_at: new Date(),
        updated_at: new Date()
      }
    ]
  },

  // Mumbai Places
  Mumbai: {
    attractions: [
      {
        location_id: "mumbai_gateway",
        name: "Gateway of India",
        location_string: "Mumbai, Maharashtra",
        description: "Iconic arch monument overlooking the Arabian Sea, built to commemorate the visit of King George V",
        rating: "4.3",
        num_reviews: "30000+",
        price_level: "Free",
        price: "Free",
        open_now_text: "Open 24 hours",
        photo: {
          images: {
            small: { url: "https://images.unsplash.com/photo-1595658658481-d53d3f999875?w=300&h=200&fit=crop" },
            medium: { url: "https://images.unsplash.com/photo-1595658658481-d53d3f999875?w=400&h=300&fit=crop" },
            large: { url: "https://images.unsplash.com/photo-1595658658481-d53d3f999875?w=800&h=600&fit=crop" }
          }
        },
        address: "Apollo Bandar, Colaba, Mumbai, Maharashtra 400001",
        category: "attraction",
        state: "Mumbai",
        city: "Mumbai",
        latitude: 18.9220,
        longitude: 72.8347,
        created_at: new Date(),
        updated_at: new Date()
      }
    ],
    restaurants: [
      {
        location_id: "mumbai_trishna",
        name: "Trishna",
        location_string: "Mumbai, Maharashtra",
        description: "Contemporary Indian seafood restaurant offering innovative coastal cuisine",
        rating: "4.6",
        num_reviews: "3000+",
        price_level: "₹₹₹",
        price: "₹2000-3000 for two",
        open_now_text: "Open 12:00 PM - 3:00 PM, 7:00 PM - 11:30 PM",
        photo: {
          images: {
            small: { url: "https://images.unsplash.com/photo-1567337712385-da821b4bb6e3?w=300&h=200&fit=crop" },
            medium: { url: "https://images.unsplash.com/photo-1567337712385-da821b4bb6e3?w=400&h=300&fit=crop" },
            large: { url: "https://images.unsplash.com/photo-1567337712385-da821b4bb6e3?w=800&h=600&fit=crop" }
          }
        },
        address: "7, Sai Baba Marg, Fort, Mumbai, Maharashtra 400001",
        phone: "+91 22 2270 3213",
        cuisine: [
          { key: "seafood", name: "Seafood" },
          { key: "indian", name: "Indian" },
          { key: "coastal", name: "Coastal" }
        ],
        category: "restaurant",
        state: "Mumbai",
        city: "Mumbai",
        latitude: 18.9322,
        longitude: 72.8264,
        created_at: new Date(),
        updated_at: new Date()
      }
    ],
    hotels: [
      {
        location_id: "mumbai_taj",
        name: "The Taj Mahal Palace",
        location_string: "Mumbai, Maharashtra",
        description: "Iconic luxury heritage hotel overlooking the Gateway of India and Arabian Sea",
        rating: "4.8",
        num_reviews: "12000+",
        price_level: "₹₹₹₹",
        price: "₹30,000+ per night",
        photo: {
          images: {
            small: { url: "https://images.unsplash.com/photo-1578774204375-826dc5d996ed?w=300&h=200&fit=crop" },
            medium: { url: "https://images.unsplash.com/photo-1578774204375-826dc5d996ed?w=400&h=300&fit=crop" },
            large: { url: "https://images.unsplash.com/photo-1578774204375-826dc5d996ed?w=800&h=600&fit=crop" }
          }
        },
        address: "Apollo Bunder, Colaba, Mumbai, Maharashtra 400001",
        phone: "+91 22 6665 3366",
        website: "https://www.tajhotels.com",
        amenities: ["Spa", "Pool", "Fitness Center", "Multiple Restaurants", "Bar", "WiFi", "Butler Service"],
        category: "hotel",
        state: "Mumbai",
        city: "Mumbai",
        latitude: 18.9216,
        longitude: 72.8331,
        created_at: new Date(),
        updated_at: new Date()
      }
    ]
  }
};

/**
 * Guides Database - Professional Tour Guides by State
 */
export const GuidesDB = {
  Delhi: [
    {
      id: "guide_delhi_1",
      name: "Rajesh Kumar",
      location: "New Delhi, Delhi",
      state: "Delhi",
      speciality: "Historical Sites & Heritage Tours",
      languages: ["Hindi", "English", "Punjabi"],
      experience: "8 years",
      rating: "4.8",
      reviews: "250+",
      price_per_day: "₹2,500",
      photo: "https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=400&h=400&fit=crop&auto=format",
      description: "Expert guide specializing in Mughal architecture and Delhi's rich history. Fluent in multiple languages with deep knowledge of local culture and hidden gems.",
      contact: "+91 98765 43210",
      email: "rajesh.guide@gmail.com",
      verified: true,
      tours_completed: 500,
      availability: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
      certifications: ["Delhi Tourism Board Certified", "Archaeological Survey of India Licensed"],
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      id: "guide_delhi_2",
      name: "Priya Sharma",
      location: "New Delhi, Delhi",
      state: "Delhi",
      speciality: "Food Tours & Local Markets",
      languages: ["Hindi", "English"],
      experience: "5 years",
      rating: "4.9",
      reviews: "180+",
      price_per_day: "₹2,000",
      photo: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=400&fit=crop&auto=format",
      description: "Passionate food enthusiast who knows the best street food spots and local markets in Delhi. Perfect for culinary adventures and authentic local experiences.",
      contact: "+91 87654 32109",
      email: "priya.foodguide@gmail.com",
      verified: true,
      tours_completed: 300,
      availability: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
      certifications: ["Food Safety Certified", "Delhi Tourism Approved"],
      created_at: new Date(),
      updated_at: new Date()
    }
  ],
  Mumbai: [
    {
      id: "guide_mumbai_1",
      name: "Arjun Patel",
      location: "Mumbai, Maharashtra",
      state: "Mumbai",
      speciality: "Bollywood & Film City Tours",
      languages: ["Hindi", "English", "Marathi"],
      experience: "6 years",
      rating: "4.7",
      reviews: "320+",
      price_per_day: "₹3,000",
      photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&auto=format",
      description: "Former film industry professional offering exclusive behind-the-scenes Bollywood tours and celebrity spotting experiences in Mumbai.",
      contact: "+91 98765 12345",
      email: "arjun.bollywood@gmail.com",
      verified: true,
      tours_completed: 450,
      availability: ["Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
      certifications: ["Film City Licensed Guide", "Maharashtra Tourism Certified"],
      created_at: new Date(),
      updated_at: new Date()
    }
  ]
};

// ===== DATABASE UTILITY FUNCTIONS =====

/**
 * Get places by state and category with filtering options
 */
export const getPlaces = (state = "Delhi", category = "attractions", filters = {}) => {
  try {
    const stateData = PlacesDB[state];
    if (!stateData) return [];
    
    let places = stateData[category] || [];
    
    // Apply filters
    if (filters.rating) {
      places = places.filter(place => parseFloat(place.rating) >= parseFloat(filters.rating));
    }
    
    if (filters.priceLevel) {
      places = places.filter(place => place.price_level === filters.priceLevel);
    }
    
    if (filters.search) {
      const searchTerm = filters.search.toLowerCase();
      places = places.filter(place => 
        place.name.toLowerCase().includes(searchTerm) ||
        place.description.toLowerCase().includes(searchTerm) ||
        place.location_string.toLowerCase().includes(searchTerm)
      );
    }
    
    // Sort by rating (highest first)
    places.sort((a, b) => parseFloat(b.rating) - parseFloat(a.rating));
    
    return places;
  } catch (error) {
    console.error('Error fetching places:', error);
    return [];
  }
};

/**
 * Get guides by state with filtering options
 */
export const getGuides = (state = "Delhi", filters = {}) => {
  try {
    let guides = GuidesDB[state] || [];
    
    // Apply filters
    if (filters.speciality) {
      guides = guides.filter(guide => 
        guide.speciality.toLowerCase().includes(filters.speciality.toLowerCase())
      );
    }
    
    if (filters.language) {
      guides = guides.filter(guide => 
        guide.languages.some(lang => 
          lang.toLowerCase().includes(filters.language.toLowerCase())
        )
      );
    }
    
    if (filters.maxPrice) {
      guides = guides.filter(guide => {
        const price = parseInt(guide.price_per_day.replace(/[^\d]/g, ''));
        return price <= parseInt(filters.maxPrice);
      });
    }
    
    if (filters.verified !== undefined) {
      guides = guides.filter(guide => guide.verified === filters.verified);
    }
    
    // Sort by rating (highest first)
    guides.sort((a, b) => parseFloat(b.rating) - parseFloat(a.rating));
    
    return guides;
  } catch (error) {
    console.error('Error fetching guides:', error);
    return [];
  }
};

/**
 * Search across all places and guides
 */
export const globalSearch = (searchTerm, filters = {}) => {
  const results = {
    places: [],
    guides: []
  };
  
  try {
    const states = Object.keys(PlacesDB);
    
    // Search places
    states.forEach(state => {
      const categories = ['attractions', 'restaurants', 'hotels'];
      categories.forEach(category => {
        const places = getPlaces(state, category, { search: searchTerm, ...filters });
        results.places.push(...places);
      });
    });
    
    // Search guides
    states.forEach(state => {
      if (GuidesDB[state]) {
        const guides = getGuides(state, { ...filters });
        const filteredGuides = guides.filter(guide =>
          guide.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          guide.speciality.toLowerCase().includes(searchTerm.toLowerCase()) ||
          guide.description.toLowerCase().includes(searchTerm.toLowerCase())
        );
        results.guides.push(...filteredGuides);
      }
    });
    
    return results;
  } catch (error) {
    console.error('Error in global search:', error);
    return results;
  }
};

/**
 * Get place by ID
 */
export const getPlaceById = (locationId) => {
  try {
    const states = Object.keys(PlacesDB);
    
    for (const state of states) {
      const categories = ['attractions', 'restaurants', 'hotels'];
      for (const category of categories) {
        const places = PlacesDB[state][category] || [];
        const place = places.find(p => p.location_id === locationId);
        if (place) return place;
      }
    }
    
    return null;
  } catch (error) {
    console.error('Error fetching place by ID:', error);
    return null;
  }
};

/**
 * Get guide by ID
 */
export const getGuideById = (guideId) => {
  try {
    const states = Object.keys(GuidesDB);
    
    for (const state of states) {
      const guides = GuidesDB[state] || [];
      const guide = guides.find(g => g.id === guideId);
      if (guide) return guide;
    }
    
    return null;
  } catch (error) {
    console.error('Error fetching guide by ID:', error);
    return null;
  }
};

/**
 * Get popular destinations
 */
export const getPopularDestinations = (limit = 6) => {
  try {
    const allPlaces = [];
    const states = Object.keys(PlacesDB);
    
    states.forEach(state => {
      const categories = ['attractions', 'restaurants', 'hotels'];
      categories.forEach(category => {
        const places = PlacesDB[state][category] || [];
        allPlaces.push(...places);
      });
    });
    
    // Sort by rating and number of reviews
    allPlaces.sort((a, b) => {
      const ratingA = parseFloat(a.rating);
      const ratingB = parseFloat(b.rating);
      const reviewsA = parseInt(a.num_reviews.replace(/[^\d]/g, ''));
      const reviewsB = parseInt(b.num_reviews.replace(/[^\d]/g, ''));
      
      if (ratingB !== ratingA) return ratingB - ratingA;
      return reviewsB - reviewsA;
    });
    
    return allPlaces.slice(0, limit);
  } catch (error) {
    console.error('Error fetching popular destinations:', error);
    return [];
  }
};

/**
 * Get statistics
 */
export const getStats = () => {
  try {
    const stats = {
      totalPlaces: 0,
      totalGuides: 0,
      totalStates: 0,
      categories: {
        attractions: 0,
        restaurants: 0,
        hotels: 0
      }
    };
    
    const states = Object.keys(PlacesDB);
    stats.totalStates = states.length;
    
    states.forEach(state => {
      const categories = ['attractions', 'restaurants', 'hotels'];
      categories.forEach(category => {
        const places = PlacesDB[state][category] || [];
        stats.totalPlaces += places.length;
        stats.categories[category] += places.length;
      });
      
      if (GuidesDB[state]) {
        stats.totalGuides += GuidesDB[state].length;
      }
    });
    
    return stats;
  } catch (error) {
    console.error('Error fetching stats:', error);
    return null;
  }
};

// ===== EXPORT DEFAULT DATABASE INSTANCE =====
export default {
  places: PlacesDB,
  guides: GuidesDB,
  getPlaces,
  getGuides,
  globalSearch,
  getPlaceById,
  getGuideById,
  getPopularDestinations,
  getStats
};
