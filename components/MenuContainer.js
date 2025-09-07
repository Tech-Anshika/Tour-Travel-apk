import { View, Text, TouchableOpacity, Image } from "react-native";
import React from "react";

const MenuContainer = ({ title, imageSrc, type, setType }) => {
  const handlePress = () => {
    setType(title.toLowerCase());
  };
  const isActive = type === title.toLowerCase();
  
  return (
    <TouchableOpacity
      className="items-center justify-center space-y-3 flex-1"
      onPress={handlePress}
    >
      <View
        className={`w-20 h-20 p-2 shadow-lg rounded-2xl items-center justify-center ${
          isActive 
            ? "bg-[#0B646B] shadow-[#0B646B]/25" 
            : "bg-gray-50 border-2 border-gray-200"
        }`}
      >
        <Image 
          source={imageSrc} 
          className="w-full h-full"
          resizeMode="cover"
          style={{
            backgroundColor: isActive ? 'transparent' : '#f8f9fa',
            transform: [{ scale: 1.2 }]
          }}
        />
      </View>
      <Text 
        className={`text-sm font-semibold text-center ${
          isActive ? "text-[#0B646B]" : "text-[#527283]"
        }`}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export default MenuContainer;
