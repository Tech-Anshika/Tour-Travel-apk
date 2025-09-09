import { View, Text, TouchableOpacity, Image } from "react-native";
import React from "react";

const MenuContainer = ({ title, imageSrc, type, setType }) => {
  const handlePress = () => {
    setType(title.toLowerCase());
  };
  const isActive = type === title.toLowerCase();
  
  return (
    <TouchableOpacity
      className="items-center justify-center space-y-3 flex-1 mx-1"
      onPress={handlePress}
    >
      <View
        className={`shadow-lg rounded-2xl items-center justify-center overflow-hidden ${
          isActive 
            ? "bg-[#0B646B] shadow-[#0B646B]/25" 
            : "bg-white border-2 border-gray-200"
        }`}
        style={{
          width: 72,
          height: 72,
        }}
      >
        <Image 
          source={imageSrc} 
          style={{
            width: 68,
            height: 68,
            borderRadius: 16,
            opacity: isActive ? 0.9 : 1,
          }}
          resizeMode="cover"
        />
        {isActive && (
          <View 
            style={{
              position: 'absolute',
              width: 68,
              height: 68,
              borderRadius: 16,
              backgroundColor: 'rgba(11, 100, 107, 0.3)',
            }}
          />
        )}
      </View>
      <Text 
        className={`text-xs font-semibold text-center leading-4 ${
          isActive ? "text-[#0B646B]" : "text-[#527283]"
        }`}
        numberOfLines={1}
        adjustsFontSizeToFit
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export default MenuContainer;
