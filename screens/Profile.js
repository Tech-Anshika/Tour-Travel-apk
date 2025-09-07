import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Image,
  Alert,
  Switch,
} from "react-native";
import React, { useLayoutEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { FontAwesome, MaterialIcons } from "@expo/vector-icons";
import { Avatar } from "../assets";
import * as Animatable from "react-native-animatable";

const Profile = () => {
  const navigation = useNavigation();
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [locationEnabled, setLocationEnabled] = useState(true);
  const [darkMode, setDarkMode] = useState(false);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  const profileStats = [
    { title: "Places Visited", count: "24", icon: "map-marker", color: "#10B981" },
    { title: "Reviews Written", count: "12", icon: "star", color: "#F59E0B" },
    { title: "Photos Shared", count: "48", icon: "camera", color: "#3B82F6" },
    { title: "Travel Days", count: "156", icon: "calendar", color: "#8B5CF6" }
  ];

  const menuItems = [
    {
      title: "Edit Profile",
      icon: "edit",
      color: "#3B82F6",
      action: () => Alert.alert("Edit Profile", "Profile editing feature coming soon!")
    },
    {
      title: "Travel History",
      icon: "history",
      color: "#10B981",
      action: () => Alert.alert("Travel History", "Your travel history will be displayed here.")
    },
    {
      title: "Saved Places",
      icon: "bookmark",
      color: "#F59E0B",
      action: () => Alert.alert("Saved Places", "Your saved places and favorites.")
    },
    {
      title: "Emergency Contacts",
      icon: "phone",
      color: "#EF4444",
      action: () => Alert.alert("Emergency Contacts", "Manage your emergency contacts here.")
    },
    {
      title: "Payment Methods",
      icon: "credit-card",
      color: "#8B5CF6",
      action: () => Alert.alert("Payment Methods", "Manage your payment methods and cards.")
    },
    {
      title: "Language & Region",
      icon: "globe",
      color: "#06B6D4",
      action: () => Alert.alert("Language Settings", "Choose your preferred language and region.")
    },
    {
      title: "Help & Support",
      icon: "question-circle",
      color: "#84CC16",
      action: () => Alert.alert("Help & Support", "Get help and contact our support team.")
    },
    {
      title: "About",
      icon: "info-circle",
      color: "#6B7280",
      action: () => Alert.alert("About", "Travel Advisor v1.0\nYour trusted travel companion for exploring incredible India!")
    }
  ];

  const handleLogout = () => {
    Alert.alert(
      "Logout",
      "Are you sure you want to logout?",
      [
        { text: "Cancel", style: "cancel" },
        { 
          text: "Logout", 
          style: "destructive",
          onPress: () => {
            Alert.alert("Logged Out", "You have been successfully logged out.");
            navigation.navigate("Home");
          }
        }
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
          <Text className="text-2xl text-[#1F2937] font-bold">Profile</Text>
          <Text className="text-sm text-[#6B7280] font-medium">Manage your account</Text>
        </View>
        
        <TouchableOpacity className="w-10 h-10 bg-white rounded-full items-center justify-center shadow-lg">
          <FontAwesome name="cog" size={18} color="#1F2937" />
        </TouchableOpacity>
      </View>

      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        {/* Profile Info */}
        <View className="items-center mt-6 mb-8">
          <Animatable.View animation="bounceIn" delay={300}>
            <View className="relative">
              <Image
                source={Avatar}
                className="w-24 h-24 rounded-full border-4 border-white shadow-lg"
              />
              <TouchableOpacity className="absolute bottom-0 right-0 w-8 h-8 bg-[#3B82F6] rounded-full items-center justify-center border-2 border-white">
                <FontAwesome name="camera" size={12} color="white" />
              </TouchableOpacity>
            </View>
          </Animatable.View>
          
          <Text className="text-2xl font-bold text-[#1F2937] mt-4">Anshika Tyagi</Text>
          <Text className="text-base text-[#6B7280]">tyagianshika410@gmail.com</Text>
          <Text className="text-sm text-[#9CA3AF] mt-1">Member since January 2024</Text>
          
          <View className="flex-row items-center mt-3 bg-green-100 px-3 py-1 rounded-full">
            <FontAwesome name="check-circle" size={14} color="#10B981" />
            <Text className="text-green-700 text-sm font-medium ml-1">Verified Traveler</Text>
          </View>
        </View>

        {/* Stats */}
        <View className="mx-6 mb-8">
          <Text className="text-lg font-bold text-[#1F2937] mb-4">Travel Stats</Text>
          <View className="flex-row flex-wrap justify-between">
            {profileStats.map((stat, index) => (
              <Animatable.View
                key={index}
                animation="fadeInUp"
                delay={400 + index * 100}
                className="w-[48%] bg-white rounded-2xl p-4 mb-4 items-center shadow-sm border border-gray-100"
              >
                <View
                  className="w-12 h-12 rounded-full items-center justify-center mb-2"
                  style={{ backgroundColor: `${stat.color}15` }}
                >
                  <FontAwesome name={stat.icon} size={20} color={stat.color} />
                </View>
                <Text className="text-2xl font-bold text-[#1F2937]">{stat.count}</Text>
                <Text className="text-sm text-[#6B7280] text-center">{stat.title}</Text>
              </Animatable.View>
            ))}
          </View>
        </View>

        {/* Settings */}
        <View className="mx-6 mb-8">
          <Text className="text-lg font-bold text-[#1F2937] mb-4">Quick Settings</Text>
          <View className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <View className="flex-row items-center justify-between px-4 py-3 border-b border-gray-100">
              <View className="flex-row items-center">
                <FontAwesome name="bell" size={16} color="#6B7280" />
                <Text className="text-base text-[#1F2937] ml-3">Push Notifications</Text>
              </View>
              <Switch
                value={notificationsEnabled}
                onValueChange={setNotificationsEnabled}
                trackColor={{ false: "#D1D5DB", true: "#3B82F6" }}
                thumbColor={notificationsEnabled ? "#FFFFFF" : "#FFFFFF"}
              />
            </View>
            
            <View className="flex-row items-center justify-between px-4 py-3 border-b border-gray-100">
              <View className="flex-row items-center">
                <FontAwesome name="map-marker" size={16} color="#6B7280" />
                <Text className="text-base text-[#1F2937] ml-3">Location Services</Text>
              </View>
              <Switch
                value={locationEnabled}
                onValueChange={setLocationEnabled}
                trackColor={{ false: "#D1D5DB", true: "#10B981" }}
                thumbColor={locationEnabled ? "#FFFFFF" : "#FFFFFF"}
              />
            </View>
            
            <View className="flex-row items-center justify-between px-4 py-3">
              <View className="flex-row items-center">
                <FontAwesome name="moon-o" size={16} color="#6B7280" />
                <Text className="text-base text-[#1F2937] ml-3">Dark Mode</Text>
              </View>
              <Switch
                value={darkMode}
                onValueChange={setDarkMode}
                trackColor={{ false: "#D1D5DB", true: "#6B46C1" }}
                thumbColor={darkMode ? "#FFFFFF" : "#FFFFFF"}
              />
            </View>
          </View>
        </View>

        {/* Menu Items */}
        <View className="mx-6 mb-8">
          <Text className="text-lg font-bold text-[#1F2937] mb-4">Account</Text>
          <View className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            {menuItems.map((item, index) => (
              <TouchableOpacity
                key={index}
                onPress={item.action}
                className={`flex-row items-center justify-between px-4 py-4 ${
                  index !== menuItems.length - 1 ? 'border-b border-gray-100' : ''
                }`}
              >
                <View className="flex-row items-center">
                  <View
                    className="w-8 h-8 rounded-full items-center justify-center mr-3"
                    style={{ backgroundColor: `${item.color}15` }}
                  >
                    <FontAwesome name={item.icon} size={14} color={item.color} />
                  </View>
                  <Text className="text-base text-[#1F2937]">{item.title}</Text>
                </View>
                <FontAwesome name="chevron-right" size={12} color="#9CA3AF" />
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Logout Button */}
        <View className="mx-6 mb-8">
          <TouchableOpacity
            onPress={handleLogout}
            className="bg-red-500 rounded-2xl py-4 items-center shadow-lg"
            style={{
              shadowColor: '#EF4444',
              shadowOffset: { width: 0, height: 4 },
              shadowOpacity: 0.3,
              shadowRadius: 8,
              elevation: 8,
            }}
          >
            <View className="flex-row items-center">
              <FontAwesome name="sign-out" size={18} color="white" />
              <Text className="text-white text-lg font-bold ml-2">Logout</Text>
            </View>
          </TouchableOpacity>
        </View>

        {/* App Info */}
        <View className="items-center mb-8">
          <Text className="text-sm text-[#9CA3AF]">Travel Advisor</Text>
          <Text className="text-xs text-[#9CA3AF]">Version 1.0.0</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Profile;

