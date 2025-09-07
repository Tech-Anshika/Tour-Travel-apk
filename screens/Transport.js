import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Image,
  Alert,
} from "react-native";
import React, { useLayoutEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { FontAwesome, MaterialIcons } from "@expo/vector-icons";
import * as Animatable from "react-native-animatable";

const Transport = () => {
  const navigation = useNavigation();
  const [pickup, setPickup] = useState("");
  const [destination, setDestination] = useState("");
  const [selectedVehicle, setSelectedVehicle] = useState("auto");

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  const vehicleTypes = [
    {
      id: "auto",
      name: "Auto Rickshaw",
      price: "₹45-60",
      time: "3 mins",
      icon: "🛺",
      description: "Affordable local rides"
    },
    {
      id: "bike",
      name: "Bike Taxi",
      price: "₹25-35",
      time: "2 mins",
      icon: "🏍️",
      description: "Quick & economical"
    },
    {
      id: "car",
      name: "Cab",
      price: "₹80-120",
      time: "5 mins",
      time: "5 mins",
      icon: "🚗",
      description: "Comfortable rides"
    },
    {
      id: "premium",
      name: "Premium",
      price: "₹150-200",
      time: "7 mins",
      icon: "🚙",
      description: "Luxury vehicles"
    }
  ];

  const quickLocations = [
    { name: "Airport", icon: "plane" },
    { name: "Railway Station", icon: "train" },
    { name: "Hospital", icon: "hospital-o" },
    { name: "Mall", icon: "shopping-bag" },
    { name: "Hotel", icon: "bed" },
    { name: "Restaurant", icon: "cutlery" }
  ];

  const handleBookRide = () => {
    if (!pickup || !destination) {
      Alert.alert("Missing Information", "Please enter both pickup and destination locations.");
      return;
    }

    const selectedVehicleData = vehicleTypes.find(v => v.id === selectedVehicle);
    Alert.alert(
      "Booking Confirmed!",
      `${selectedVehicleData.name} booked successfully!\nFrom: ${pickup}\nTo: ${destination}\nEstimated fare: ${selectedVehicleData.price}\nArrival time: ${selectedVehicleData.time}`,
      [
        { text: "Track Ride", onPress: () => console.log("Tracking ride...") },
        { text: "OK" }
      ]
    );
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-50 pt-12">
      {/* Header */}
      <View className="flex-row items-center justify-between px-6 pt-8 pb-4">
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          className="w-10 h-10 bg-white rounded-full items-center justify-center shadow-lg"
        >
          <FontAwesome name="arrow-left" size={18} color="#1F2937" />
        </TouchableOpacity>
        
        <View className="items-center">
          <Text className="text-2xl text-[#1F2937] font-bold">Transport</Text>
          <Text className="text-sm text-[#6B7280] font-medium">Book your ride</Text>
        </View>
        
        <TouchableOpacity className="w-10 h-10 bg-white rounded-full items-center justify-center shadow-lg">
          <FontAwesome name="user" size={18} color="#1F2937" />
        </TouchableOpacity>
      </View>

      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        {/* Location Input Section */}
        <View className="mx-6 mt-6 bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
          <Text className="text-lg font-bold text-[#1F2937] mb-4">Where to?</Text>
          
          {/* Pickup Location */}
          <View className="flex-row items-center mb-4">
            <View className="w-3 h-3 bg-green-500 rounded-full mr-4 mt-1" />
            <View className="flex-1">
              <Text className="text-xs text-[#6B7280] mb-1">PICKUP</Text>
              <TextInput
                value={pickup}
                onChangeText={setPickup}
                placeholder="Enter pickup location"
                className="text-base text-[#1F2937] border-b border-gray-200 pb-2"
                placeholderTextColor="#9CA3AF"
              />
            </View>
            <TouchableOpacity className="ml-2">
              <MaterialIcons name="my-location" size={24} color="#10B981" />
            </TouchableOpacity>
          </View>

          {/* Destination */}
          <View className="flex-row items-center">
            <View className="w-3 h-3 bg-red-500 rounded-full mr-4 mt-1" />
            <View className="flex-1">
              <Text className="text-xs text-[#6B7280] mb-1">DESTINATION</Text>
              <TextInput
                value={destination}
                onChangeText={setDestination}
                placeholder="Where are you going?"
                className="text-base text-[#1F2937] border-b border-gray-200 pb-2"
                placeholderTextColor="#9CA3AF"
              />
            </View>
            <TouchableOpacity className="ml-2">
              <FontAwesome name="bookmark-o" size={20} color="#EF4444" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Quick Locations */}
        <View className="mx-6 mt-6">
          <Text className="text-lg font-bold text-[#1F2937] mb-4">Quick Destinations</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View className="flex-row space-x-3">
              {quickLocations.map((location, index) => (
                <TouchableOpacity
                  key={index}
                  onPress={() => setDestination(location.name)}
                  className="bg-white rounded-2xl p-4 items-center shadow-sm border border-gray-100 min-w-[80px]"
                >
                  <FontAwesome name={location.icon} size={24} color="#3B82F6" />
                  <Text className="text-xs text-[#1F2937] font-medium mt-2 text-center">
                    {location.name}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>
        </View>

        {/* Vehicle Selection */}
        <View className="mx-6 mt-8">
          <Text className="text-lg font-bold text-[#1F2937] mb-4">Choose Vehicle</Text>
          <View className="space-y-3">
            {vehicleTypes.map((vehicle) => (
              <TouchableOpacity
                key={vehicle.id}
                onPress={() => setSelectedVehicle(vehicle.id)}
                className={`bg-white rounded-2xl p-4 shadow-sm border-2 ${
                  selectedVehicle === vehicle.id 
                    ? "border-[#3B82F6] bg-blue-50" 
                    : "border-gray-100"
                }`}
              >
                <View className="flex-row items-center justify-between">
                  <View className="flex-row items-center flex-1">
                    <Text className="text-2xl mr-4">{vehicle.icon}</Text>
                    <View className="flex-1">
                      <Text className="text-base font-bold text-[#1F2937]">
                        {vehicle.name}
                      </Text>
                      <Text className="text-sm text-[#6B7280]">
                        {vehicle.description}
                      </Text>
                    </View>
                  </View>
                  <View className="items-end">
                    <Text className="text-base font-bold text-[#1F2937]">
                      {vehicle.price}
                    </Text>
                    <Text className="text-xs text-[#6B7280]">
                      {vehicle.time} away
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Additional Options */}
        <View className="mx-6 mt-6 bg-white rounded-2xl p-4 shadow-lg border border-gray-100">
          <Text className="text-base font-bold text-[#1F2937] mb-3">Ride Options</Text>
          <View className="space-y-3">
            <TouchableOpacity className="flex-row items-center justify-between">
              <View className="flex-row items-center">
                <FontAwesome name="clock-o" size={16} color="#6B7280" />
                <Text className="text-sm text-[#1F2937] ml-3">Schedule for later</Text>
              </View>
              <FontAwesome name="chevron-right" size={12} color="#9CA3AF" />
            </TouchableOpacity>
            
            <TouchableOpacity className="flex-row items-center justify-between">
              <View className="flex-row items-center">
                <FontAwesome name="users" size={16} color="#6B7280" />
                <Text className="text-sm text-[#1F2937] ml-3">Share ride</Text>
              </View>
              <FontAwesome name="chevron-right" size={12} color="#9CA3AF" />
            </TouchableOpacity>
            
            <TouchableOpacity className="flex-row items-center justify-between">
              <View className="flex-row items-center">
                <FontAwesome name="credit-card" size={16} color="#6B7280" />
                <Text className="text-sm text-[#1F2937] ml-3">Payment method</Text>
              </View>
              <View className="flex-row items-center">
                <Text className="text-sm text-[#6B7280] mr-2">Cash</Text>
                <FontAwesome name="chevron-right" size={12} color="#9CA3AF" />
              </View>
            </TouchableOpacity>
          </View>
        </View>

        {/* Book Ride Button */}
        <View className="mx-6 mt-8 mb-8">
          <Animatable.View animation="pulse" iterationCount="infinite" duration={2000}>
            <TouchableOpacity
              onPress={handleBookRide}
              className="bg-[#3B82F6] rounded-2xl py-4 px-6 shadow-lg items-center"
              style={{
                shadowColor: '#3B82F6',
                shadowOffset: { width: 0, height: 4 },
                shadowOpacity: 0.3,
                shadowRadius: 8,
                elevation: 8,
              }}
            >
              <Text className="text-white text-lg font-bold">Book Ride Now</Text>
              <Text className="text-blue-100 text-sm mt-1">
                {vehicleTypes.find(v => v.id === selectedVehicle)?.name} • {vehicleTypes.find(v => v.id === selectedVehicle)?.price}
              </Text>
            </TouchableOpacity>
          </Animatable.View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Transport;

