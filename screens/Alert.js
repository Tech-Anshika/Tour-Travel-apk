import React, { useLayoutEffect, useRef, useEffect } from "react";
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Alert,
  Linking,
  Animated,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { FontAwesome } from "@expo/vector-icons";
import * as Animatable from "react-native-animatable";

const AlertScreen = () => {
  const navigation = useNavigation();
  const pulseAnim = useRef(new Animated.Value(1)).current;

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  // Pulsing animation for SOS button
  useEffect(() => {
    const pulse = () => {
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.1,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
      ]).start(() => pulse());
    };
    pulse();
  }, []);

  const handleSOSPress = () => {
    Alert.alert(
      "Emergency SOS",
      "Choose an emergency action:",
      [
        {
          text: "Call Police (100)",
          onPress: () => makeEmergencyCall("100"),
          style: "destructive",
        },
        {
          text: "Call Ambulance (108)",
          onPress: () => makeEmergencyCall("108"),
          style: "destructive",
        },
        {
          text: "Call Fire Service (101)",
          onPress: () => makeEmergencyCall("101"),
          style: "destructive",
        },
        {
          text: "Tourist Helpline (1363)",
          onPress: () => makeEmergencyCall("1363"),
        },
        {
          text: "Cancel",
          style: "cancel",
        },
      ],
      { cancelable: true }
    );
  };

  const makeEmergencyCall = (number) => {
    const phoneNumber = `tel:${number}`;
    Linking.canOpenURL(phoneNumber)
      .then((supported) => {
        if (supported) {
          return Linking.openURL(phoneNumber);
        } else {
          Alert.alert("Error", "Phone calls are not supported on this device");
        }
      })
      .catch((err) => console.error("An error occurred", err));
  };

  const quickActions = [
    {
      title: "Share Location",
      icon: "map-marker",
      color: "#4CAF50",
      action: () => {
        Alert.alert("Location Shared", "Your current location has been shared with emergency contacts.");
      },
    },
    {
      title: "Medical Info",
      icon: "heartbeat",
      color: "#FF5722",
      action: () => {
        Alert.alert("Medical Information", "Emergency medical information accessed.");
      },
    },
    {
      title: "Emergency Contacts",
      icon: "phone",
      color: "#2196F3",
      action: () => {
        Alert.alert("Emergency Contacts", "Calling emergency contact...");
      },
    },
    {
      title: "Safe Check-in",
      icon: "shield",
      color: "#9C27B0",
      action: () => {
        Alert.alert("Safe Check-in", "You have been marked as safe. Contacts notified.");
      },
    },
  ];

  return (
    <SafeAreaView className="flex-1 bg-gradient-to-b from-red-50 to-white pt-12">
      {/* Header */}
      <View className="flex-row items-center justify-between px-6 pt-8 pb-4">
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          className="w-10 h-10 bg-white rounded-full items-center justify-center shadow-lg"
        >
          <FontAwesome name="arrow-left" size={18} color="#DC2626" />
        </TouchableOpacity>
        
        <View className="items-center">
          <Text className="text-2xl text-[#DC2626] font-bold">Emergency Alert</Text>
          <Text className="text-sm text-[#7F1D1D] font-medium">Stay Safe While Traveling</Text>
        </View>
        
        <View className="w-10 h-10" />
      </View>

      <ScrollView 
        className="flex-1 px-6" 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 40 }}
      >
        {/* Main SOS Button */}
        <View className="items-center mt-8 mb-12">
          <Animatable.View
            animation="fadeIn"
            delay={300}
            className="items-center"
          >
            <Animated.View
              style={{
                transform: [{ scale: pulseAnim }],
              }}
            >
              <TouchableOpacity
                onPress={handleSOSPress}
                className="w-44 h-44 bg-[#DC2626] rounded-full items-center justify-center shadow-2xl border-4 border-white"
                style={{
                  shadowColor: '#DC2626',
                  shadowOffset: { width: 0, height: 8 },
                  shadowOpacity: 0.3,
                  shadowRadius: 16,
                  elevation: 12,
                }}
              >
                <Text className="text-white text-3xl font-bold mb-2">SOS</Text>
                <Text className="text-white text-xs font-medium text-center">
                  EMERGENCY{'\n'}TAP FOR HELP
                </Text>
              </TouchableOpacity>
            </Animated.View>
            
            <Text className="text-[#7F1D1D] text-center text-sm font-medium mt-6 px-4">
              Tap the SOS button to access emergency services and get immediate help
            </Text>
          </Animatable.View>
        </View>

        {/* Quick Actions */}
        <View className="mb-8">
          <Animatable.View
            animation="slideInUp"
            delay={600}
            className="w-full"
          >
            <Text className="text-lg text-[#374151] font-bold text-center mb-6">
              Quick Actions
            </Text>
            
            <View className="flex-row flex-wrap justify-between">
              {quickActions.map((action, index) => (
                <TouchableOpacity
                  key={index}
                  onPress={action.action}
                  className="w-[48%] bg-white rounded-2xl p-4 mb-4 items-center shadow-lg border border-gray-100"
                  style={{
                    shadowColor: action.color,
                    shadowOffset: { width: 0, height: 2 },
                    shadowOpacity: 0.1,
                    shadowRadius: 8,
                    elevation: 3,
                  }}
                >
                  <View
                    className="w-10 h-10 rounded-full items-center justify-center mb-2"
                    style={{ backgroundColor: `${action.color}15` }}
                  >
                    <FontAwesome name={action.icon} size={16} color={action.color} />
                  </View>
                  <Text
                    className="text-xs font-semibold text-center"
                    style={{ color: action.color }}
                  >
                    {action.title}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </Animatable.View>
        </View>

        {/* Emergency Numbers */}
        <View className="mb-8">
          <Animatable.View
            animation="fadeInUp"
            delay={900}
            className="w-full bg-white rounded-2xl p-6 shadow-lg border border-gray-100"
          >
            <Text className="text-base font-bold text-[#374151] mb-4 text-center">
              Important Emergency Numbers
            </Text>
            <View className="space-y-3">
              <View className="flex-row justify-between items-center py-1">
                <Text className="text-sm text-[#6B7280]">Police</Text>
                <Text className="text-sm font-semibold text-[#DC2626]">100</Text>
              </View>
              <View className="flex-row justify-between items-center py-1">
                <Text className="text-sm text-[#6B7280]">Fire Service</Text>
                <Text className="text-sm font-semibold text-[#DC2626]">101</Text>
              </View>
              <View className="flex-row justify-between items-center py-1">
                <Text className="text-sm text-[#6B7280]">Ambulance</Text>
                <Text className="text-sm font-semibold text-[#DC2626]">108</Text>
              </View>
              <View className="flex-row justify-between items-center py-1">
                <Text className="text-sm text-[#6B7280]">Tourist Helpline</Text>
                <Text className="text-sm font-semibold text-[#DC2626]">1363</Text>
              </View>
            </View>
          </Animatable.View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default AlertScreen;