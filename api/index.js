import axios from "axios";

// Free Geoapify API key for India tourism places (free tier: 3000 requests/day)
const GEOAPIFY_API_KEY = "68db5c276a3e488cbaf7b8c10be0c65d";

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

// New function for India Tourism Places using free Geoapify API
export const getIndiaPlacesData = async (type, place, limit = 20) => {
  try {
    // Map your app types to Geoapify categories
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
          filter: `place:${place},India`,
          limit: limit,
          apiKey: GEOAPIFY_API_KEY,
        },
      }
    );

    // Transform Geoapify data to match your app's expected format
    const transformedData = response.data.features?.map((placeResponse, index) => ({
      location_id: placeResponse.properties.place_id || `india_${index}`,
      name: placeResponse.properties.name || "Unknown Place",
      location_string: `${placeResponse.properties.city || place}, ${placeResponse.properties.state || "India"}`,
      description: placeResponse.properties.formatted || placeResponse.properties.name,
      rating: placeResponse.properties.rating || "4.0",
      num_reviews: placeResponse.properties.datasource?.raw?.["contact:website"] ? "100+" : "50+",
      photo: {
        images: {
          medium: {
            url: placeResponse.properties.image || "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=400&h=300&fit=crop"
          }
        }
      },
      address: placeResponse.properties.formatted || `${place}, India`,
      phone: placeResponse.properties.datasource?.raw?.phone || "",
      website: placeResponse.properties.datasource?.raw?.website || "",
      latitude: placeResponse.geometry.coordinates[1],
      longitude: placeResponse.geometry.coordinates[0],
    })) || [];

    return transformedData;
  } catch (error) {
    console.log("India Places API Error:", error);
    // Return fallback India tourism data if API fails
    return getIndiaFallbackData(type, place);
  }
};

// Fallback data for popular India tourism places
const getIndiaFallbackData = (type, state) => {
  const fallbackData = {
    attractions: [
      {
        location_id: "india_taj_mahal",
        name: "Taj Mahal",
        location_string: "Agra, Uttar Pradesh",
        description: "UNESCO World Heritage Site and symbol of love",
        rating: "4.8",
        num_reviews: "50000+",
        photo: {
          images: {
            medium: {
              url: "https://images.unsplash.com/photo-1564507592333-c60657eea523?w=400&h=300&fit=crop"
            }
          }
        },
        address: "Agra, Uttar Pradesh, India",
      },
      {
        location_id: "india_red_fort",
        name: "Red Fort",
        location_string: "Delhi, Delhi",
        description: "Historic fortified palace and UNESCO World Heritage Site",
        rating: "4.5",
        num_reviews: "25000+",
        photo: {
          images: {
            medium: {
              url: "https://images.unsplash.com/photo-1587474260584-136574528ed5?w=400&h=300&fit=crop"
            }
          }
        },
        address: "Delhi, India",
      },
      {
        location_id: "india_gateway",
        name: "Gateway of India",
        location_string: "Mumbai, Maharashtra",
        description: "Iconic arch monument overlooking the Arabian Sea",
        rating: "4.3",
        num_reviews: "30000+",
        photo: {
          images: {
            medium: {
              url: "https://images.unsplash.com/photo-1595658658481-d53d3f999875?w=400&h=300&fit=crop"
            }
          }
        },
        address: "Mumbai, Maharashtra, India",
      }
    ],
    restaurants: [
      {
        location_id: "india_restaurant_1",
        name: "Karim's",
        location_string: "Delhi, Delhi",
        description: "Authentic Mughlai cuisine since 1913",
        rating: "4.2",
        num_reviews: "5000+",
        photo: {
          images: {
            medium: {
              url: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=400&h=300&fit=crop"
            }
          }
        },
        address: "Jama Masjid, Delhi, India",
      },
      {
        location_id: "india_restaurant_2",
        name: "Trishna",
        location_string: "Mumbai, Maharashtra",
        description: "Contemporary Indian seafood restaurant",
        rating: "4.6",
        num_reviews: "3000+",
        photo: {
          images: {
            medium: {
              url: "https://images.unsplash.com/photo-1567337712385-da821b4bb6e3?w=400&h=300&fit=crop"
            }
          }
        },
        address: "Fort, Mumbai, Maharashtra, India",
      }
    ],
    hotels: [
      {
        location_id: "india_hotel_1",
        name: "The Oberoi New Delhi",
        location_string: "Delhi, Delhi",
        description: "Luxury hotel with world-class amenities",
        rating: "4.7",
        num_reviews: "8000+",
        photo: {
          images: {
            medium: {
              url: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400&h=300&fit=crop"
            }
          }
        },
        address: "Dr. Zakir Hussain Marg, Delhi, India",
      }
    ]
  };

  return fallbackData[type] || fallbackData.attractions;
};

// Function to get tour guides/guiders data
export const getGuiders = (state = "Delhi") => {
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

// Search function for Indian cities and places
export const searchIndianPlaces = async (searchQuery, type = "attractions") => {
  try {
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
    
    // Check for a direct city match first
    for (const [city, state] of Object.entries(cityToState)) {
      if (query.includes(city)) {
        return await getIndiaPlacesData(type, city);
      }
    }
    
    // If no city match, check for a state match
    const states = ["Delhi", "Mumbai", "Goa", "Rajasthan", "Kerala", "Tamil Nadu", "Uttar Pradesh"];
    for (const state of states) {
      if (query.includes(state.toLowerCase())) {
        const stateToCityMap = {
          "Rajasthan": "Jaipur",
          "Kerala": "Kochi",
          "Tamil Nadu": "Chennai",
          "Uttar Pradesh": "Agra",
          "Delhi": "Delhi",
          "Mumbai": "Mumbai",
          "Goa": "Goa"
        };
        const city = stateToCityMap[state] || state;
        return await getIndiaPlacesData(type, city);
      }
    }
    
    // If no match found, default to a broad search on the query itself
    return await getIndiaPlacesData(type, searchQuery);
    
  } catch (error) {
    console.log("Search error:", error);
    return getIndiaFallbackData(type, "Delhi");
  }
};
