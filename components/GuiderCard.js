import { View, Text, TouchableOpacity, Image, Alert, Linking } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import React from "react";

const GuiderCard = ({ guider }) => {
  const navigation = useNavigation();
  const handleBookGuide = () => {
    Alert.alert(
      "Book Tour Guide",
      `Would you like to contact ${guider.name} for booking?\n\nSpeciality: ${guider.speciality}\nPrice: ${guider.price_per_day}/day\nContact: ${guider.contact}`,
      [
        {
          text: "Cancel",
          style: "cancel"
        },
        {
          text: "Call Now",
          onPress: () => {
            const phoneNumber = guider.contact.replace(/\s/g, '');
            Linking.openURL(`tel:${phoneNumber}`);
          }
        },
        {
          text: "WhatsApp",
          onPress: () => {
            const phoneNumber = guider.contact.replace(/[\s+-]/g, '');
            const message = `Hi ${guider.name}, I'm interested in booking your tour guide services for ${guider.speciality}. Can you please provide more details?`;
            Linking.openURL(`whatsapp://send?phone=${phoneNumber}&text=${encodeURIComponent(message)}`);
          }
        }
      ]
    );
  };

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(parseFloat(rating));
    const hasHalfStar = parseFloat(rating) % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <FontAwesome key={i} name="star" size={12} color="#FFD700" />
      );
    }

    if (hasHalfStar) {
      stars.push(
        <FontAwesome key="half" name="star-half-empty" size={12} color="#FFD700" />
      );
    }

    const emptyStars = 5 - Math.ceil(parseFloat(rating));
    for (let i = 0; i < emptyStars; i++) {
      stars.push(
        <FontAwesome key={`empty-${i}`} name="star-o" size={12} color="#FFD700" />
      );
    }

    return stars;
  };

  const handleViewDetails = () => {
    // Transform guider data to be compatible with ItemScreen
    const transformedData = {
      ...guider,
      name: guider.name,
      location_string: guider.location,
      description: guider.description,
      rating: guider.rating,
      price_per_day: guider.price_per_day,
      contact: guider.contact,
      speciality: guider.speciality,
      languages: guider.languages,
      experience: guider.experience,
      photo: {
        images: {
          large: {
            url: guider.photo
          },
          medium: {
            url: guider.photo
          }
        }
      },
      address: guider.location
    };
    
    navigation.navigate("ItemScreen", { param: transformedData });
  };

  return (
    <TouchableOpacity
      onPress={handleViewDetails}
      className="rounded-2xl border border-gray-100 space-y-3 p-4 shadow-lg bg-white w-[300px] my-3 mx-2"
      style={{
        shadowColor: '#0B646B',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 5,
      }}
    >
      {/* Guide Photo and Verification Badge */}
      <View className="relative">
        <Image
          source={{ uri: guider.photo }}
          className="w-full h-40 rounded-xl object-cover"
        />
        {guider.verified && (
          <View className="absolute top-2 right-2 bg-green-500 rounded-full p-1.5">
            <FontAwesome name="check" size={10} color="white" />
          </View>
        )}
        <View className="absolute bottom-2 left-2 bg-black/70 rounded-full px-2 py-1">
          <Text className="text-white text-xs font-medium">{guider.experience}</Text>
        </View>
      </View>

      {/* Guide Information */}
      <View className="space-y-2">
        {/* Name and Rating */}
        <View className="flex-row items-center justify-between">
          <Text className="text-[#2C7379] text-lg font-bold flex-1">
            {guider.name}
          </Text>
          <View className="flex-row items-center space-x-1">
            {renderStars(guider.rating)}
            <Text className="text-[#527283] text-xs ml-1">({guider.reviews})</Text>
          </View>
        </View>

        {/* Location */}
        <View className="flex-row items-center space-x-2">
          <FontAwesome name="map-marker" size={14} color="#0B646B" />
          <Text className="text-[#527283] text-sm font-medium flex-1">
            {guider.location}
          </Text>
        </View>

        {/* Speciality */}
        <View className="flex-row items-center space-x-2">
          <FontAwesome name="star" size={14} color="#0B646B" />
          <Text className="text-[#527283] text-sm font-medium flex-1">
            {guider.speciality}
          </Text>
        </View>

        {/* Languages */}
        <View className="flex-row items-center space-x-2">
          <FontAwesome name="language" size={14} color="#0B646B" />
          <Text className="text-[#527283] text-sm font-medium flex-1">
            {guider.languages.join(", ")}
          </Text>
        </View>

        {/* Price and Tours Completed */}
        <View className="flex-row items-center justify-between pt-2">
          <View className="bg-[#0B646B]/10 px-3 py-1.5 rounded-full">
            <Text className="text-[#0B646B] text-sm font-bold">
              {guider.price_per_day}/day
            </Text>
          </View>
          <Text className="text-[#527283] text-xs">
            {guider.tours_completed} tours completed
          </Text>
        </View>

        {/* Description */}
        <Text className="text-[#527283] text-xs leading-4 mt-2">
          {guider.description.length > 100 
            ? `${guider.description.substring(0, 100)}...` 
            : guider.description
          }
        </Text>

        {/* Book Button */}
        <TouchableOpacity
          onPress={handleBookGuide}
          className="bg-[#0B646B] py-3 rounded-xl mt-3"
        >
          <Text className="text-white text-center font-semibold">
            Book Now
          </Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

export default GuiderCard;
