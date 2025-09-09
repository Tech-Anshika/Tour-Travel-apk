import axios from "axios";
import Database from "../database";

// Free Geoapify API key for India tourism places (free tier: 3000 requests/day)
const GEOAPIFY_API_KEY = "YOUR_FREE_GEOAPIFY_API_KEY";

export const getPlacesData = async (bl_lat, bl_lng, tr_lat, tr_lng, type) => {
  try {
    const {
      data: { data },
    } = await axios.get(
      `https://travel-advisor.p.rapidapi.com/${type}/list-in-boundary`,
      {
        params: {
          bl_latitude: bl_lat ? bl_lat : "25.15543993776612",
          tr_latitude: tr_lat ? tr_lat : "25.41257834546226",
          bl_longitude: bl_lng ? bl_lng : "51.39587210719369",
          tr_longitude: tr_lng ? tr_lng : "51.62812119686502",
          limit: "30",
          currency: "USD",
          lunit: "km",
          lang: "en_US",
        },
        headers: {
          "X-RapidAPI-Key": "YOUR_API_KEY",
          "X-RapidAPI-Host": "travel-advisor.p.rapidapi.com",
        },
      }
    );

    return data;
  } catch (error) {
    return null;
  }
};

// Enhanced function for India Tourism Places using Database with API fallback
export const getIndiaPlacesData = async (type, state = "Delhi", limit = 30) => {
  try {
    // First try to get data from local database
    const dbData = Database.getPlaces(state, type);
    
    if (dbData && dbData.length > 0) {
      console.log(`Loaded ${dbData.length} ${type} from database for ${state}`);
      return dbData.slice(0, limit);
    }

    // Fallback to API if database is empty
    const categoryMap = {
      restaurants: "catering.restaurant",
      hotels: "accommodation.hotel",
      attractions: "tourism.attraction,natural.peak,building.place_of_worship,leisure.park"
    };

    const category = categoryMap[type] || "tourism";
    
    const response = await axios.get(
      `https://api.geoapify.com/v2/places`,
      {
        params: {
          categories: category,
          filter: `place:${state},India`,
          limit: limit,
          apiKey: GEOAPIFY_API_KEY,
        },
      }
    );

    // Transform Geoapify data to match your app's expected format
    const transformedData = response.data.features?.map((place, index) => ({
      location_id: place.properties.place_id || `api_${type}_${index}`,
      name: place.properties.name || "Unknown Place",
      location_string: `${place.properties.city || state}, ${place.properties.state || "India"}`,
      description: place.properties.formatted || place.properties.name,
      rating: place.properties.rating || "4.0",
      num_reviews: place.properties.datasource?.raw?.["contact:website"] ? "100+" : "50+",
      photo: {
        images: {
          medium: {
            url: place.properties.image || "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=400&h=300&fit=crop"
          }
        }
      },
      address: place.properties.formatted || `${state}, India`,
      phone: place.properties.datasource?.raw?.phone || "",
      website: place.properties.datasource?.raw?.website || "",
      latitude: place.geometry.coordinates[1],
      longitude: place.geometry.coordinates[0],
    })) || [];

    return transformedData;
  } catch (error) {
    console.log("India Places API Error:", error);
    // Return database data as final fallback
    return Database.getPlaces(state, type).slice(0, limit);
  }
};

// Enhanced fallback data with more places for each category and state
const getIndiaFallbackData = (type, state) => {
  const stateBasedData = {
    Delhi: {
    attractions: [
      {
          location_id: "delhi_red_fort",
        name: "Red Fort",
        location_string: "Delhi, Delhi",
        description: "Historic fortified palace and UNESCO World Heritage Site",
        rating: "4.5",
        num_reviews: "25000+",
          photo: { images: { medium: { url: "https://images.unsplash.com/photo-1587474260584-136574528ed5?w=400&h=300&fit=crop" } } },
          address: "Delhi, India",
        },
        {
          location_id: "delhi_india_gate",
          name: "India Gate",
          location_string: "Delhi, Delhi",
          description: "War memorial and iconic landmark",
          rating: "4.4",
          num_reviews: "35000+",
          photo: { images: { medium: { url: "https://images.unsplash.com/photo-1599661046827-dacde6c20adb?w=400&h=300&fit=crop" } } },
          address: "Rajpath, Delhi, India",
        },
        {
          location_id: "delhi_lotus_temple",
          name: "Lotus Temple",
          location_string: "Delhi, Delhi",
          description: "Beautiful Baháʼí House of Worship",
          rating: "4.6",
          num_reviews: "20000+",
          photo: { images: { medium: { url: "https://images.unsplash.com/photo-1605649487212-47bdab064df7?w=400&h=300&fit=crop" } } },
          address: "Lotus Temple Rd, Delhi, India",
        },
        {
          location_id: "delhi_qutub_minar",
          name: "Qutub Minar",
          location_string: "Delhi, Delhi",
          description: "UNESCO World Heritage Site and tallest brick minaret",
          rating: "4.3",
          num_reviews: "15000+",
          photo: { images: { medium: { url: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop" } } },
          address: "Mehrauli, Delhi, India",
      }
    ],
    restaurants: [
      {
          location_id: "delhi_karims",
        name: "Karim's",
        location_string: "Delhi, Delhi",
        description: "Authentic Mughlai cuisine since 1913",
        rating: "4.2",
        num_reviews: "5000+",
          photo: { images: { medium: { url: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=400&h=300&fit=crop" } } },
          address: "Jama Masjid, Delhi, India",
        },
        {
          location_id: "delhi_bukhara",
          name: "Bukhara",
          location_string: "Delhi, Delhi",
          description: "World-famous North Indian restaurant",
          rating: "4.7",
          num_reviews: "8000+",
          photo: { images: { medium: { url: "https://images.unsplash.com/photo-1567337712385-da821b4bb6e3?w=400&h=300&fit=crop" } } },
          address: "ITC Maurya, Delhi, India",
        },
        {
          location_id: "delhi_paranthe",
          name: "Paranthe Wali Gali",
          location_string: "Delhi, Delhi",
          description: "Famous street food destination",
          rating: "4.0",
          num_reviews: "3000+",
          photo: { images: { medium: { url: "https://images.unsplash.com/photo-1596797038530-2c107229654b?w=400&h=300&fit=crop" } } },
          address: "Chandni Chowk, Delhi, India",
        }
      ],
      hotels: [
        {
          location_id: "delhi_oberoi",
          name: "The Oberoi New Delhi",
          location_string: "Delhi, Delhi",
          description: "Luxury hotel with world-class amenities",
          rating: "4.7",
          num_reviews: "8000+",
          photo: { images: { medium: { url: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400&h=300&fit=crop" } } },
          address: "Dr. Zakir Hussain Marg, Delhi, India",
        },
        {
          location_id: "delhi_leela",
          name: "The Leela Palace New Delhi",
          location_string: "Delhi, Delhi",
          description: "Opulent luxury hotel with royal architecture",
          rating: "4.8",
          num_reviews: "6000+",
          photo: { images: { medium: { url: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=400&h=300&fit=crop" } } },
          address: "Diplomatic Enclave, Delhi, India",
        }
      ]
    },
    Mumbai: {
      attractions: [
        {
          location_id: "mumbai_gateway",
          name: "Gateway of India",
          location_string: "Mumbai, Maharashtra",
          description: "Iconic arch monument overlooking the Arabian Sea",
          rating: "4.3",
          num_reviews: "30000+",
          photo: { images: { medium: { url: "https://images.unsplash.com/photo-1595658658481-d53d3f999875?w=400&h=300&fit=crop" } } },
          address: "Mumbai, Maharashtra, India",
        },
        {
          location_id: "mumbai_marine_drive",
          name: "Marine Drive",
          location_string: "Mumbai, Maharashtra",
          description: "Famous waterfront promenade",
          rating: "4.4",
          num_reviews: "25000+",
          photo: { images: { medium: { url: "https://images.unsplash.com/photo-1570168007204-dfb528c6958f?w=400&h=300&fit=crop" } } },
          address: "Marine Drive, Mumbai, India",
        },
        {
          location_id: "mumbai_elephanta",
          name: "Elephanta Caves",
          location_string: "Mumbai, Maharashtra",
          description: "UNESCO World Heritage rock-cut caves",
          rating: "4.2",
          num_reviews: "15000+",
          photo: { images: { medium: { url: "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=400&h=300&fit=crop" } } },
          address: "Elephanta Island, Mumbai, India",
        }
      ],
      restaurants: [
        {
          location_id: "mumbai_trishna",
        name: "Trishna",
        location_string: "Mumbai, Maharashtra",
        description: "Contemporary Indian seafood restaurant",
        rating: "4.6",
        num_reviews: "3000+",
          photo: { images: { medium: { url: "https://images.unsplash.com/photo-1567337712385-da821b4bb6e3?w=400&h=300&fit=crop" } } },
          address: "Fort, Mumbai, Maharashtra, India",
        },
        {
          location_id: "mumbai_leopold",
          name: "Leopold Cafe",
          location_string: "Mumbai, Maharashtra",
          description: "Historic cafe and backpacker hangout",
          rating: "4.1",
          num_reviews: "5000+",
          photo: { images: { medium: { url: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=400&h=300&fit=crop" } } },
          address: "Colaba, Mumbai, India",
        }
      ],
      hotels: [
        {
          location_id: "mumbai_taj",
          name: "The Taj Mahal Palace",
          location_string: "Mumbai, Maharashtra",
          description: "Iconic luxury heritage hotel",
          rating: "4.8",
          num_reviews: "12000+",
          photo: { images: { medium: { url: "https://images.unsplash.com/photo-1578774204375-826dc5d996ed?w=400&h=300&fit=crop" } } },
          address: "Apollo Bunder, Mumbai, India",
        }
      ]
    },
    "Uttar Pradesh": {
      attractions: [
        {
          location_id: "up_taj_mahal",
          name: "Taj Mahal",
          location_string: "Agra, Uttar Pradesh",
          description: "UNESCO World Heritage Site and symbol of love",
          rating: "4.8",
          num_reviews: "50000+",
          photo: { images: { medium: { url: "https://images.unsplash.com/photo-1564507592333-c60657eea523?w=400&h=300&fit=crop" } } },
          address: "Agra, Uttar Pradesh, India",
        },
        {
          location_id: "up_agra_fort",
          name: "Agra Fort",
          location_string: "Agra, Uttar Pradesh",
          description: "UNESCO World Heritage Mughal fort",
          rating: "4.5",
          num_reviews: "20000+",
          photo: { images: { medium: { url: "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=400&h=300&fit=crop" } } },
          address: "Agra, Uttar Pradesh, India",
        },
        {
          location_id: "up_varanasi_ghats",
          name: "Varanasi Ghats",
          location_string: "Varanasi, Uttar Pradesh",
          description: "Sacred steps leading to the Ganges River",
          rating: "4.6",
          num_reviews: "18000+",
          photo: { images: { medium: { url: "https://images.unsplash.com/photo-1561361513-2d000a50f0dc?w=400&h=300&fit=crop" } } },
          address: "Varanasi, Uttar Pradesh, India",
        }
      ],
      restaurants: [
        {
          location_id: "up_pinch_of_spice",
          name: "Pinch of Spice",
          location_string: "Agra, Uttar Pradesh",
          description: "Popular North Indian restaurant",
          rating: "4.3",
          num_reviews: "2500+",
          photo: { images: { medium: { url: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=400&h=300&fit=crop" } } },
          address: "Fatehabad Road, Agra, India",
        }
      ],
      hotels: [
        {
          location_id: "up_oberoi_amarvilas",
          name: "The Oberoi Amarvilas",
          location_string: "Agra, Uttar Pradesh",
          description: "Luxury hotel with Taj Mahal views",
          rating: "4.9",
          num_reviews: "5000+",
          photo: { images: { medium: { url: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400&h=300&fit=crop" } } },
          address: "Taj East Gate Road, Agra, India",
        }
      ]
    },
    Rajasthan: {
      attractions: [
        {
          location_id: "raj_hawa_mahal",
          name: "Hawa Mahal",
          location_string: "Jaipur, Rajasthan",
          description: "Palace of Winds with intricate facade",
          rating: "4.4",
          num_reviews: "22000+",
          photo: { images: { medium: { url: "https://images.unsplash.com/photo-1599661046827-dacde6c20adb?w=400&h=300&fit=crop" } } },
          address: "Jaipur, Rajasthan, India",
        },
        {
          location_id: "raj_amber_fort",
          name: "Amber Fort",
          location_string: "Jaipur, Rajasthan",
          description: "Magnificent hilltop fort palace",
          rating: "4.6",
          num_reviews: "28000+",
          photo: { images: { medium: { url: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop" } } },
          address: "Amer, Jaipur, Rajasthan, India",
        },
        {
          location_id: "raj_city_palace",
          name: "City Palace Udaipur",
          location_string: "Udaipur, Rajasthan",
          description: "Royal palace complex on Lake Pichola",
          rating: "4.7",
          num_reviews: "15000+",
          photo: { images: { medium: { url: "https://images.unsplash.com/photo-1605649487212-47bdab064df7?w=400&h=300&fit=crop" } } },
          address: "Udaipur, Rajasthan, India",
        }
      ],
      restaurants: [
        {
          location_id: "raj_lmb",
          name: "LMB (Laxmi Misthan Bhandar)",
          location_string: "Jaipur, Rajasthan",
          description: "Famous Rajasthani sweets and cuisine",
          rating: "4.2",
          num_reviews: "4000+",
          photo: { images: { medium: { url: "https://images.unsplash.com/photo-1596797038530-2c107229654b?w=400&h=300&fit=crop" } } },
          address: "Johari Bazaar, Jaipur, India",
        }
      ],
      hotels: [
        {
          location_id: "raj_taj_lake_palace",
          name: "Taj Lake Palace",
          location_string: "Udaipur, Rajasthan",
          description: "Floating palace hotel on Lake Pichola",
          rating: "4.9",
          num_reviews: "8000+",
          photo: { images: { medium: { url: "https://images.unsplash.com/photo-1578774204375-826dc5d996ed?w=400&h=300&fit=crop" } } },
          address: "Pichola Lake, Udaipur, India",
        }
      ]
    },
    Kerala: {
      attractions: [
        {
          location_id: "kerala_backwaters",
          name: "Alleppey Backwaters",
          location_string: "Alleppey, Kerala",
          description: "Serene network of canals and lagoons",
          rating: "4.6",
          num_reviews: "18000+",
          photo: { images: { medium: { url: "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=400&h=300&fit=crop" } } },
          address: "Alleppey, Kerala, India",
        },
        {
          location_id: "kerala_munnar",
          name: "Munnar Tea Gardens",
          location_string: "Munnar, Kerala",
          description: "Picturesque hill station with tea plantations",
          rating: "4.5",
          num_reviews: "25000+",
          photo: { images: { medium: { url: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=400&h=300&fit=crop" } } },
          address: "Munnar, Kerala, India",
        }
      ],
      restaurants: [
        {
          location_id: "kerala_dal_roti",
          name: "Dal Roti",
          location_string: "Kochi, Kerala",
          description: "Authentic Kerala cuisine",
          rating: "4.3",
          num_reviews: "2000+",
          photo: { images: { medium: { url: "https://images.unsplash.com/photo-1567337712385-da821b4bb6e3?w=400&h=300&fit=crop" } } },
          address: "Fort Kochi, Kerala, India",
      }
    ],
    hotels: [
      {
          location_id: "kerala_kumarakom",
          name: "Kumarakom Lake Resort",
          location_string: "Kumarakom, Kerala",
          description: "Luxury backwater resort",
        rating: "4.7",
          num_reviews: "4500+",
          photo: { images: { medium: { url: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=400&h=300&fit=crop" } } },
          address: "Kumarakom, Kerala, India",
        }
      ]
    },
    Goa: {
      attractions: [
        {
          location_id: "goa_baga_beach",
          name: "Baga Beach",
          location_string: "North Goa, Goa",
          description: "Popular beach with water sports and nightlife",
          rating: "4.2",
          num_reviews: "15000+",
          photo: { images: { medium: { url: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=400&h=300&fit=crop" } } },
          address: "Baga, North Goa, India",
        },
        {
          location_id: "goa_basilica",
          name: "Basilica of Bom Jesus",
          location_string: "Old Goa, Goa",
          description: "UNESCO World Heritage baroque church",
          rating: "4.4",
        num_reviews: "8000+",
          photo: { images: { medium: { url: "https://images.unsplash.com/photo-1605649487212-47bdab064df7?w=400&h=300&fit=crop" } } },
          address: "Old Goa, Goa, India",
        }
      ],
      restaurants: [
        {
          location_id: "goa_fishermans_wharf",
          name: "Fisherman's Wharf",
          location_string: "Goa, Goa",
          description: "Seafood restaurant with Goan specialties",
          rating: "4.3",
          num_reviews: "3500+",
          photo: { images: { medium: { url: "https://images.unsplash.com/photo-1567337712385-da821b4bb6e3?w=400&h=300&fit=crop" } } },
          address: "Cavelossim, Goa, India",
        }
      ],
      hotels: [
        {
          location_id: "goa_taj_exotica",
          name: "Taj Exotica Resort & Spa",
          location_string: "South Goa, Goa",
          description: "Luxury beach resort",
          rating: "4.6",
          num_reviews: "7000+",
          photo: { images: { medium: { url: "https://images.unsplash.com/photo-1578774204375-826dc5d996ed?w=400&h=300&fit=crop" } } },
          address: "Benaulim, South Goa, India",
        }
      ]
    },
    "Tamil Nadu": {
      attractions: [
        {
          location_id: "tn_meenakshi",
          name: "Meenakshi Temple",
          location_string: "Madurai, Tamil Nadu",
          description: "Historic Hindu temple with intricate architecture",
          rating: "4.7",
          num_reviews: "20000+",
          photo: { images: { medium: { url: "https://images.unsplash.com/photo-1605649487212-47bdab064df7?w=400&h=300&fit=crop" } } },
          address: "Madurai, Tamil Nadu, India",
        },
        {
          location_id: "tn_marina_beach",
          name: "Marina Beach",
          location_string: "Chennai, Tamil Nadu",
          description: "One of the longest urban beaches in the world",
          rating: "4.1",
          num_reviews: "25000+",
          photo: { images: { medium: { url: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=400&h=300&fit=crop" } } },
          address: "Chennai, Tamil Nadu, India",
        }
      ],
      restaurants: [
        {
          location_id: "tn_saravana_bhavan",
          name: "Saravana Bhavan",
          location_string: "Chennai, Tamil Nadu",
          description: "Famous South Indian vegetarian restaurant chain",
          rating: "4.4",
          num_reviews: "8000+",
          photo: { images: { medium: { url: "https://images.unsplash.com/photo-1596797038530-2c107229654b?w=400&h=300&fit=crop" } } },
          address: "Chennai, Tamil Nadu, India",
        }
      ],
      hotels: [
        {
          location_id: "tn_itc_grand_chola",
          name: "ITC Grand Chola",
          location_string: "Chennai, Tamil Nadu",
          description: "Luxury hotel with South Indian architecture",
          rating: "4.6",
          num_reviews: "6000+",
          photo: { images: { medium: { url: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=400&h=300&fit=crop" } } },
          address: "Guindy, Chennai, India",
        }
      ]
    }
  };

  // Return data for the specified state, or Delhi as fallback
  const stateData = stateBasedData[state] || stateBasedData.Delhi;
  return stateData[type] || stateData.attractions || [];
};

// Enhanced function to get tour guides/guiders data from Database
export const getGuiders = (state = "Delhi", filters = {}) => {
  try {
    return Database.getGuides(state, filters);
  } catch (error) {
    console.log("Error fetching guides from database:", error);
    return getGuidersFromStaticData(state);
  }
};

// Fallback function for static guider data
const getGuidersFromStaticData = (state = "Delhi") => {
  const guidersData = {
    Delhi: [
      {
        id: "guide_delhi_1",
        name: "Rajesh Kumar",
        location: "Delhi, India",
        speciality: "Historical Sites & Heritage Tours",
        languages: ["Hindi", "English", "Punjabi"],
        experience: "8 years",
        rating: "4.8",
        reviews: "250+",
        price_per_day: "₹2,500",
        photo: "https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=400&h=400&fit=crop&auto=format",
        description: "Expert guide specializing in Mughal architecture and Delhi's rich history. Fluent in multiple languages with deep knowledge of local culture.",
        contact: "+91 98765 43210",
        verified: true,
        tours_completed: 500
      },
      {
        id: "guide_delhi_2",
        name: "Priya Sharma",
        location: "Delhi, India",
        speciality: "Food Tours & Local Markets",
        languages: ["Hindi", "English"],
        experience: "5 years",
        rating: "4.9",
        reviews: "180+",
        price_per_day: "₹2,000",
        photo: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=400&fit=crop&auto=format",
        description: "Passionate food enthusiast who knows the best street food spots and local markets in Delhi. Perfect for culinary adventures.",
        contact: "+91 87654 32109",
        verified: true,
        tours_completed: 300
      }
    ],
    Mumbai: [
      {
        id: "guide_mumbai_1",
        name: "Arjun Patel",
        location: "Mumbai, Maharashtra",
        speciality: "Bollywood & Film City Tours",
        languages: ["Hindi", "English", "Marathi"],
        experience: "6 years",
        rating: "4.7",
        reviews: "320+",
        price_per_day: "₹3,000",
        photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&auto=format",
        description: "Former film industry professional offering exclusive behind-the-scenes Bollywood tours and celebrity spotting experiences.",
        contact: "+91 98765 12345",
        verified: true,
        tours_completed: 450
      },
      {
        id: "guide_mumbai_2",
        name: "Meera Joshi",
        location: "Mumbai, Maharashtra",
        speciality: "Heritage Walks & Architecture",
        languages: ["Hindi", "English", "Marathi", "Gujarati"],
        experience: "10 years",
        rating: "4.9",
        reviews: "400+",
        price_per_day: "₹2,800",
        photo: "https://images.unsplash.com/photo-1594736797933-d0501ba2fe65?w=400&h=400&fit=crop&auto=format",
        description: "Architecture historian specializing in colonial and Art Deco buildings of Mumbai. Author of several heritage walking guides.",
        contact: "+91 87654 98765",
        verified: true,
        tours_completed: 600
      }
    ],
    Rajasthan: [
      {
        id: "guide_rajasthan_1",
        name: "Vikram Singh",
        location: "Jaipur, Rajasthan",
        speciality: "Royal Palaces & Desert Tours",
        languages: ["Hindi", "English", "Rajasthani"],
        experience: "12 years",
        rating: "4.8",
        reviews: "500+",
        price_per_day: "₹3,500",
        photo: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=400&fit=crop",
        description: "Royal family descendant with insider access to palaces and deep knowledge of Rajasthani culture, traditions, and desert landscapes.",
        contact: "+91 94567 89012",
        verified: true,
        tours_completed: 800
      }
    ],
    Kerala: [
      {
        id: "guide_kerala_1",
        name: "Suresh Nair",
        location: "Kochi, Kerala",
        speciality: "Backwater Tours & Ayurveda",
        languages: ["Malayalam", "English", "Tamil"],
        experience: "7 years",
        rating: "4.6",
        reviews: "280+",
        price_per_day: "₹2,200",
        photo: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop",
        description: "Ayurveda practitioner and backwater expert offering holistic wellness tours combined with Kerala's natural beauty.",
        contact: "+91 95678 12345",
        verified: true,
        tours_completed: 350
      }
    ],
    Goa: [
      {
        id: "guide_goa_1",
        name: "Maria Fernandes",
        location: "Panaji, Goa",
        speciality: "Beach Tours & Portuguese Heritage",
        languages: ["English", "Hindi", "Portuguese", "Konkani"],
        experience: "4 years",
        rating: "4.7",
        reviews: "150+",
        price_per_day: "₹2,000",
        photo: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=400&fit=crop",
        description: "Local Goan with Portuguese ancestry offering authentic cultural experiences, beach activities, and historical church tours.",
        contact: "+91 93456 78901",
        verified: true,
        tours_completed: 200
      }
    ],
    "Tamil Nadu": [
      {
        id: "guide_tn_1",
        name: "Karthik Raman",
        location: "Chennai, Tamil Nadu",
        speciality: "Temple Tours & Classical Arts",
        languages: ["Tamil", "English", "Telugu"],
        experience: "9 years",
        rating: "4.8",
        reviews: "380+",
        price_per_day: "₹2,300",
        photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop",
        description: "Classical dancer and temple architecture expert offering spiritual and cultural tours of Tamil Nadu's ancient temples.",
        contact: "+91 98234 56789",
        verified: true,
        tours_completed: 450
      }
    ],
    "Uttar Pradesh": [
      {
        id: "guide_up_1",
        name: "Amit Agarwal",
        location: "Agra, Uttar Pradesh",
        speciality: "Taj Mahal & Mughal History",
        languages: ["Hindi", "English", "Urdu"],
        experience: "11 years",
        rating: "4.9",
        reviews: "600+",
        price_per_day: "₹3,000",
        photo: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop",
        description: "Mughal history specialist with exclusive access to restricted areas of Taj Mahal and Agra Fort. Certified by Archaeological Survey of India.",
        contact: "+91 91234 56789",
        verified: true,
        tours_completed: 750
      }
    ]
  };

  return guidersData[state] || guidersData.Delhi || [];
};

// Enhanced search function using Database
export const searchIndianPlaces = async (searchQuery, type = "attractions") => {
  try {
    // Use database global search for comprehensive results
    const searchResults = Database.globalSearch(searchQuery, { category: type });
    
    if (searchResults.places && searchResults.places.length > 0) {
      return searchResults.places.filter(place => place.category === type);
    }

    // Fallback to state-based search
    const states = ["Delhi", "Mumbai", "Goa", "Rajasthan", "Kerala", "Tamil Nadu", "Uttar Pradesh"];
    const query = searchQuery.toLowerCase();
    
    // City to state mapping
    const cityToState = {
      "mumbai": "Mumbai",
      "delhi": "Delhi", 
      "new delhi": "Delhi",
      "goa": "Goa",
      "panaji": "Goa",
      "jaipur": "Rajasthan",
      "udaipur": "Rajasthan",
      "jodhpur": "Rajasthan",
      "kochi": "Kerala",
      "thiruvananthapuram": "Kerala",
      "kovalam": "Kerala",
      "chennai": "Tamil Nadu",
      "madurai": "Tamil Nadu",
      "agra": "Uttar Pradesh",
      "varanasi": "Uttar Pradesh",
      "lucknow": "Uttar Pradesh"
    };
    
    let matchedState = null;
    
    // Try to find matching state
    for (const state of states) {
      if (query.includes(state.toLowerCase())) {
        matchedState = state;
        break;
      }
    }
    
    // Try to find matching city
    if (!matchedState) {
      for (const [city, state] of Object.entries(cityToState)) {
        if (query.includes(city)) {
          matchedState = state;
          break;
        }
      }
    }
    
    // If we found a match, get places for that state
    if (matchedState) {
      return await getIndiaPlacesData(type, matchedState);
    }
    
    // If no match found, return general India places
    return await getIndiaPlacesData(type, "Delhi");
    
  } catch (error) {
    console.log("Search error:", error);
    return Database.getPlaces("Delhi", type);
  }
};

// Export additional database functions for advanced usage
export const {
  getPlaceById,
  getGuideById,
  getPopularDestinations,
  getStats,
  globalSearch
} = Database;
