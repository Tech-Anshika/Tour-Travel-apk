import {
  View,
  Text,
  SafeAreaView,
  Image,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  TextInput,
  PanResponder,
  Dimensions,
} from "react-native";
import React, { useEffect, useLayoutEffect, useState, useRef } from "react";
import { useNavigation } from "@react-navigation/native";
import { Attractions, Avatar, Hotels, NotFound, Restaurants } from "../assets";
import MenuContainer from "../components/MenuContainer";

import { FontAwesome } from "@expo/vector-icons";
import ItemCarDontainer from "../components/ItemCarDontainer";
import { getPlacesData, getIndiaPlacesData, searchIndianPlaces } from "../api";

const Discover = () => {
  const navigation = useNavigation();
  const screenWidth = Dimensions.get('window').width;

  const [type, setType] = useState("restaurants");
  const [isLoading, setIsLoading] = useState(false);
  const [mainData, setMainData] = useState([]);
  const [bl_lat, setBl_lat] = useState(null);
  const [bl_lng, setBl_lng] = useState(null);
  const [tr_lat, setTr_lat] = useState(null);
  const [tr_lng, setTr_lng] = useState(null);
  const [showIndiaPlaces, setShowIndiaPlaces] = useState(true);
  const [selectedState, setSelectedState] = useState("Delhi");
  const [searchText, setSearchText] = useState("");

  // Pan responder for swipe gestures
  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: (evt, gestureState) => {
        return Math.abs(gestureState.dx) > Math.abs(gestureState.dy) && Math.abs(gestureState.dx) > 20;
      },
      onPanResponderMove: (evt, gestureState) => {
        // Optional: Add visual feedback during swipe
      },
      onPanResponderRelease: (evt, gestureState) => {
        // Swipe left (dx < 0) to open Alert screen
        if (gestureState.dx < -50 && Math.abs(gestureState.dx) > Math.abs(gestureState.dy)) {
          navigation.navigate('Alert');
        }
        // Optional: Add swipe right functionality for other screens
        // if (gestureState.dx > 50 && Math.abs(gestureState.dx) > Math.abs(gestureState.dy)) {
        //   // Navigate to another screen
        // }
      },
    })
  ).current;

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  // Manual search function
  const handleManualSearch = async (searchQuery = null) => {
    const query = searchQuery || searchText.trim();
    if (query) {
      setIsLoading(true);
      try {
        if (showIndiaPlaces) {
          const results = await searchIndianPlaces(query, type);
          setMainData(results);
          
          // Also update the selected state based on search
          const states = ["Delhi", "Mumbai", "Goa", "Rajasthan", "Kerala", "Tamil Nadu", "Uttar Pradesh"];
          const cityToState = {
            "mumbai": "Mumbai",
            "delhi": "Delhi",
            "goa": "Goa",
            "jaipur": "Rajasthan",
            "kochi": "Kerala",
            "kerala": "Kerala",
            "chennai": "Tamil Nadu"
          };
          
          const lowerQuery = query.toLowerCase();
          for (const [city, state] of Object.entries(cityToState)) {
            if (lowerQuery.includes(city)) {
              setSelectedState(state);
              break;
            }
          }
        } else {
          // For international search, you could implement a different API call
          console.log("International search for:", query);
        }
      } catch (error) {
        console.log("Search error:", error);
      }
      setIsLoading(false);
    }
  };

  useEffect(() => {
    setIsLoading(true);
    
    if (showIndiaPlaces) {
      // Use India Tourism API
      getIndiaPlacesData(type, selectedState).then((data) => {
        setMainData(data);
        setInterval(() => {
          setIsLoading(false);
        }, 1500);
      });
    } else {
      // Use original international API
      getPlacesData(bl_lat, bl_lng, tr_lat, tr_lng, type).then((data) => {
        setMainData(data);
        setInterval(() => {
          setIsLoading(false);
        }, 2000);
      });
    }
  }, [bl_lat, bl_lng, tr_lat, tr_lng, type, showIndiaPlaces, selectedState]);

  return (
    <SafeAreaView className="flex-1 bg-gradient-to-b from-blue-50 to-white relative pt-8" {...panResponder.panHandlers}>
      <View className="flex-row items-center justify-between px-6 pt-6 pb-2">
        <View className="flex-1">
          <Text className="text-3xl text-[#0B646B] font-bold tracking-wide">Discover</Text>
          <Text className="text-lg text-[#527283] font-medium mt-1">the beauty today</Text>
        </View>

        <View className="flex-row items-center space-x-2">
          <TouchableOpacity
            onPress={() => navigation.navigate('Transport')}
            className="w-10 h-10 bg-blue-500 rounded-full items-center justify-center shadow-lg"
          >
            <FontAwesome name="car" size={14} color="white" />
          </TouchableOpacity>
          
          <TouchableOpacity
            onPress={() => navigation.navigate('Community')}
            className="w-10 h-10 bg-purple-500 rounded-full items-center justify-center shadow-lg"
          >
            <FontAwesome name="users" size={14} color="white" />
          </TouchableOpacity>
          
          <TouchableOpacity
            onPress={() => navigation.navigate('Alert')}
            className="w-10 h-10 bg-red-500 rounded-full items-center justify-center shadow-lg"
          >
            <Text className="text-white text-xs font-bold">SOS</Text>
          </TouchableOpacity>
          
          <TouchableOpacity
            onPress={() => navigation.navigate('Profile')}
            className="w-12 h-12 bg-white rounded-full items-center justify-center shadow-lg border-2 border-[#0B646B]/10"
          >
            <Image
              source={Avatar}
              className="w-10 h-10 rounded-full object-cover"
            />
          </TouchableOpacity>
        </View>
      </View>


      {/* Search Section */}
      <View className="mx-6 mt-6">
        {/* Search Input */}
        <View className="flex-row items-center bg-white rounded-2xl py-4 px-5 shadow-xl border border-gray-100">
          <FontAwesome name="search" size={18} color="#0B646B" className="mr-3" />
          <TextInput
            value={searchText}
            onChangeText={setSearchText}
            placeholder={showIndiaPlaces ? "Search Indian cities (e.g., Mumbai, Jaipur, Kochi)" : "Type destination"}
            className="flex-1 text-base text-gray-700"
            onSubmitEditing={handleManualSearch}
            placeholderTextColor="#9CA3AF"
          />
          <TouchableOpacity
            onPress={handleManualSearch}
            className="bg-[#0B646B] px-4 py-2.5 rounded-full ml-2"
          >
            <Text className="text-white text-sm font-semibold">Search</Text>
          </TouchableOpacity>
        </View>

        {/* Quick Search Suggestions */}
        <View className="mt-3">
          <Text className="text-sm text-[#527283] font-medium mb-2 px-2">
            Popular destinations:
          </Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View className="flex-row space-x-2 px-2">
              {["Mumbai", "Delhi", "Goa", "Jaipur", "Kerala", "Chennai"].map((city) => (
                <TouchableOpacity
                  key={city}
                  onPress={() => {
                    setSearchText(city);
                    handleManualSearch(city);
                  }}
                  className="bg-[#0B646B]/10 px-3 py-2 rounded-full border border-[#0B646B]/20"
                >
                  <Text className="text-[#0B646B] text-xs font-medium">{city}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>
        </View>
      </View>

      {/* Menu Container */}
      {isLoading ? (
        <View className="flex-1 items-center justify-center bg-white/50">
          <ActivityIndicator size="large" color="#0B646B" />
          <Text className="text-[#0B646B] text-base font-medium mt-4">Loading amazing places...</Text>
        </View>
      ) : (
        <ScrollView showsVerticalScrollIndicator={false} className="flex-1">
          <View className="flex-row items-center justify-evenly px-4 mt-8 bg-white/70 py-6 mx-4 rounded-2xl shadow-sm">
            <MenuContainer
              key={"hotels"}
              title="Hotels"
              imageSrc={Hotels}
              type={type}
              setType={setType}
            />

            <MenuContainer
              key={"attractions"}
              title="Attractions"
              imageSrc={Attractions}
              type={type}
              setType={setType}
            />

            <MenuContainer
              key={"restaurants"}
              title="Restaurants"
              imageSrc={Restaurants}
              type={type}
              setType={setType}
            />
          </View>

          <View className="mt-6">
            {/* India/International Toggle */}
            <View className="flex-row items-center justify-center px-6 mb-4">
              <View className="flex-row bg-gray-100 rounded-full p-1">
                <TouchableOpacity
                  onPress={() => setShowIndiaPlaces(true)}
                  className={`px-6 py-2 rounded-full ${
                    showIndiaPlaces ? "bg-[#0B646B]" : "bg-transparent"
                  }`}
                >
                  <Text className={`text-sm font-semibold ${
                    showIndiaPlaces ? "text-white" : "text-[#527283]"
                  }`}>
                    🇮🇳 India Tourism
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => setShowIndiaPlaces(false)}
                  className={`px-6 py-2 rounded-full ${
                    !showIndiaPlaces ? "bg-[#0B646B]" : "bg-transparent"
                  }`}
                >
                  <Text className={`text-sm font-semibold ${
                    !showIndiaPlaces ? "text-white" : "text-[#527283]"
                  }`}>
                    🌍 International
                  </Text>
                </TouchableOpacity>
              </View>
            </View>

            {/* State Selector for India */}
            {showIndiaPlaces && (
              <View className="px-6 mb-4">
                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                  <View className="flex-row space-x-3">
                    {["Delhi", "Mumbai", "Goa", "Rajasthan", "Kerala", "Tamil Nadu", "Uttar Pradesh"].map((state) => (
                      <TouchableOpacity
                        key={state}
                        onPress={() => setSelectedState(state)}
                        className={`px-4 py-2 rounded-full border ${
                          selectedState === state 
                            ? "bg-[#0B646B] border-[#0B646B]" 
                            : "bg-white border-gray-300"
                        }`}
                      >
                        <Text className={`text-xs font-medium ${
                          selectedState === state ? "text-white" : "text-[#527283]"
                        }`}>
                          {state}
                        </Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                </ScrollView>
              </View>
            )}

            <View className="flex-row items-start justify-between px-6 mt-4">
              <View className="flex-1 pr-4">
                <Text className="text-2xl text-[#2C7379] font-bold leading-7">
                  {showIndiaPlaces ? `${selectedState} ${type.charAt(0).toUpperCase() + type.slice(1)}` : "Top Recommendations"}
                </Text>
                <Text className="text-sm text-[#527283] font-medium mt-1 leading-5">
                  {showIndiaPlaces ? "Explore incredible India" : "Discover the best places"}
                </Text>
              </View>
              <TouchableOpacity className="flex-row items-center justify-center bg-[#0B646B]/10 px-4 py-2.5 rounded-full ml-2">
                <Text className="text-[#0B646B] text-sm font-semibold mr-2">
                  Explore
                </Text>
                <FontAwesome
                  name="long-arrow-right"
                  size={14}
                  color="#0B646B"
                />
              </TouchableOpacity>
            </View>

            <View className="px-4 mt-6 flex-row items-center justify-evenly flex-wrap">
              {mainData?.length > 0 ? (
                <>
                  {mainData?.map((data, i) => (
                    <ItemCarDontainer
                      key={i}
                      imageSrc={
                        data?.photo?.images?.medium?.url
                          ? data?.photo?.images?.medium?.url
                          : "https://cdn.pixabay.com/photo/2015/10/30/12/22/eat-1014025_1280.jpg"
                      }
                      title={data?.name}
                      location={data?.location_string}
                      data={data}
                    />
                  ))}
                </>
              ) : (
                <>
                  <View className="w-full h-[350px] items-center space-y-6 justify-center bg-gray-50/50 rounded-2xl mx-2 mt-4">
                    <Image
                      source={NotFound}
                      className="w-28 h-28 object-cover opacity-80"
                    />
                    <View className="items-center">
                      <Text className="text-xl text-[#428288] font-bold mb-2">
                        No Places Found
                      </Text>
                      <Text className="text-base text-[#527283] font-medium text-center px-8">
                        Try searching for a different location or check your internet connection
                      </Text>
                    </View>
                  </View>
                </>
              )}
            </View>
          </View>
        </ScrollView>
      )}
    </SafeAreaView>
  );
};

export default Discover;
