import axios from "axios";

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

// New function for India Tourism Places using free Geoapify API
export const getIndiaPlacesData = async (type, state = "Delhi", limit = 20) => {
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
          filter: `place:${state},India`,
          limit: limit,
          apiKey: GEOAPIFY_API_KEY,
        },
      }
    );

    // Transform Geoapify data to match your app's expected format
    const transformedData = response.data.features?.map((place, index) => ({
      location_id: place.properties.place_id || `india_${index}`,
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
    // Return fallback India tourism data if API fails
    return getIndiaFallbackData(type, state);
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

// Search function for Indian cities and places
export const searchIndianPlaces = async (searchQuery, type = "attractions") => {
  try {
    // First try to match with our state list
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
    return getIndiaFallbackData(type, "Delhi");
  }
};
