import {
  View,
  Text,
  SafeAreaView,
  Image,
  TouchableOpacity,
} from "react-native";
import React, { useLayoutEffect } from "react";
import * as Animatable from "react-native-animatable";

import { useNavigation } from "@react-navigation/native";
import { HeroImage } from "../assets";

const HomeScreen = () => {
  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  return (
    <SafeAreaView className="bg-white flex-1 relative pt-8">
      {/* Background Bubbles - Larger and behind everything */}
      <View className="w-[300px] h-[300px] bg-[#00BCC9] opacity-20 rounded-full absolute top-28 -right-32 z-0"></View>
      <View className="w-[280px] h-[280px] bg-[#E99265] opacity-25 rounded-full absolute bottom-32 -left-32 z-0"></View>

      {/* First Section */}
      <View className="flex-row px-6 mt-8 items-center space-x-2 z-10 relative">
        <View className="w-16 h-16 bg-black rounded-full items-center justify-center">
          <Text className="text-[#00BCC9] text-3xl font-semibold">Go</Text>
        </View>

        <Text className="text-[#2A2B4B] text-3xl font-semibold">Travel</Text>
      </View>

      {/* Second Section */}
      <View className="px-6 mt-6 space-y-3 z-10 relative">
        <Text className="text-[#3C6072] text-[40px] leading-tight">Enjoy the trip with</Text>
        <Text className="text-[#00BCC9] text-[36px] font-bold leading-tight">
          Good Moments
        </Text>

        <Text className="text-[#3C6072] text-base leading-relaxed">
          Discover amazing places, create unforgettable memories, and explore India's most beautiful destinations with our travel guide.
        </Text>
      </View>

      {/* Image container */}
      <View className="flex-1 relative items-center justify-center z-10">
        <Animatable.Image
          animation="fadeIn"
          easing="ease-in-out"
          source={HeroImage}
          className="w-[120%] h-[110%] object-cover mt-16"
          style={{
            transform: [{ scale: 1.2 }]
          }}
        />

        <TouchableOpacity
          onPress={() => navigation.navigate("SignIn")}
          className="absolute bottom-20 w-24 h-24 border-l-2 border-r-2 border-t-4 border-[#00BCC9] rounded-full items-center justify-center z-20"
        >
          <Animatable.View
            animation={"pulse"}
            easing="ease-in-out"
            iterationCount={"infinite"}
            className="w-20 h-20 items-center justify-center rounded-full bg-[#00BCC9]"
          >
            <Text className="text-gray-50 text-[36px] font-semibold">Go</Text>
          </Animatable.View>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;
