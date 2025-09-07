import { View, Text, TouchableOpacity, Image } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import React from "react";
import { useNavigation } from "@react-navigation/native";

const ItemCarDontainer = ({ imageSrc, title, location, data }) => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      onPress={() => navigation.navigate("ItemScreen", { param: data })}
      className="rounded-2xl border border-gray-100 space-y-3 p-4 shadow-lg bg-white w-[180px] my-3 mx-1"
      style={{
        shadowColor: '#0B646B',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 5,
      }}
    >
      <View className="relative">
        <Image
          source={{ uri: imageSrc }}
          className="w-full h-36 rounded-xl object-cover"
        />
        <View className="absolute top-2 right-2 bg-white/90 rounded-full p-2">
          <FontAwesome name="heart-o" size={14} color="#0B646B" />
        </View>
      </View>

      {title ? (
        <>
          <View className="space-y-2">
            <Text className="text-[#2C7379] text-base font-bold leading-5">
              {title?.length > 16 ? `${title.slice(0, 16)}...` : title}
            </Text>

            <View className="flex-row items-center space-x-2">
              <FontAwesome name="map-marker" size={14} color="#0B646B" />
              <Text className="text-[#527283] text-xs font-medium flex-1">
                {location?.length > 20 ? `${location.slice(0, 20)}...` : location}
              </Text>
            </View>
          </View>
        </>
      ) : (
        <></>
      )}
    </TouchableOpacity>
  );
};

export default ItemCarDontainer;
