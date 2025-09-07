import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
import React, { useLayoutEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { FontAwesome } from "@expo/vector-icons";
import * as Animatable from "react-native-animatable";

const SignIn = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  const handleSignIn = () => {
    // Demo functionality - no actual authentication
    if (!email || !password) {
      Alert.alert("Missing Information", "Please enter both email and password.");
      return;
    }

    Alert.alert(
      "Welcome Back!",
      "Sign in successful! Exploring incredible India awaits you.",
      [
        {
          text: "Continue",
          onPress: () => navigation.navigate("Discover")
        }
      ]
    );
  };

  const handleDemoSignIn = () => {
    Alert.alert(
      "Demo Sign In",
      "Welcome to the demo! You can now explore all features.",
      [
        {
          text: "Start Exploring",
          onPress: () => navigation.navigate("Discover")
        }
      ]
    );
  };

  const handleForgotPassword = () => {
    Alert.alert(
      "Password Recovery",
      "Demo: Password recovery link would be sent to your email."
    );
  };

  return (
    <SafeAreaView className="flex-1 bg-gradient-to-b from-blue-50 to-white pt-16">
      <KeyboardAvoidingView 
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="flex-1"
      >
        {/* Header */}
        <View className="flex-row items-center justify-between px-6 pt-4 pb-6">
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            className="w-10 h-10 bg-white rounded-full items-center justify-center shadow-lg"
          >
            <FontAwesome name="arrow-left" size={18} color="#3B82F6" />
          </TouchableOpacity>
          
          <View className="items-center">
            <Text className="text-xl text-[#3B82F6] font-bold">Welcome Back</Text>
            <Text className="text-sm text-[#6B7280] font-medium">Sign in to continue</Text>
          </View>
          
          <View className="w-10 h-10" />
        </View>

        <ScrollView className="flex-1 px-6" showsVerticalScrollIndicator={false}>
          {/* Logo/Icon Section */}
          <Animatable.View 
            animation="bounceIn" 
            delay={300}
            className="items-center mt-4 mb-8"
          >
            <View className="w-20 h-20 bg-[#3B82F6] rounded-full items-center justify-center shadow-lg">
              <FontAwesome name="user" size={36} color="white" />
            </View>
            <Text className="text-2xl font-bold text-[#1F2937] mt-4">Sign In</Text>
            <Text className="text-sm text-[#6B7280] text-center mt-2 px-4">
              Access your travel companion for exploring incredible India
            </Text>
          </Animatable.View>

          {/* Sign In Form */}
          <Animatable.View animation="fadeInUp" delay={600}>
            {/* Email Input */}
            <View className="mb-4">
              <Text className="text-sm font-medium text-[#374151] mb-2">Email Address</Text>
              <View className="flex-row items-center bg-white rounded-2xl px-4 py-4 shadow-sm border border-gray-200">
                <FontAwesome name="envelope" size={18} color="#6B7280" />
                <TextInput
                  value={email}
                  onChangeText={setEmail}
                  placeholder="Enter your email"
                  placeholderTextColor="#9CA3AF"
                  className="flex-1 ml-3 text-base text-[#1F2937]"
                  keyboardType="email-address"
                  autoCapitalize="none"
                />
              </View>
            </View>

            {/* Password Input */}
            <View className="mb-4">
              <Text className="text-sm font-medium text-[#374151] mb-2">Password</Text>
              <View className="flex-row items-center bg-white rounded-2xl px-4 py-4 shadow-sm border border-gray-200">
                <FontAwesome name="lock" size={18} color="#6B7280" />
                <TextInput
                  value={password}
                  onChangeText={setPassword}
                  placeholder="Enter your password"
                  placeholderTextColor="#9CA3AF"
                  className="flex-1 ml-3 text-base text-[#1F2937]"
                  secureTextEntry={!showPassword}
                />
                <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                  <FontAwesome 
                    name={showPassword ? "eye" : "eye-slash"} 
                    size={18} 
                    color="#6B7280" 
                  />
                </TouchableOpacity>
              </View>
            </View>

            {/* Forgot Password */}
            <TouchableOpacity 
              onPress={handleForgotPassword}
              className="items-end mb-6"
            >
              <Text className="text-sm text-[#3B82F6] font-medium">Forgot Password?</Text>
            </TouchableOpacity>

            {/* Sign In Button */}
            <TouchableOpacity
              onPress={handleSignIn}
              className="bg-[#3B82F6] rounded-2xl py-4 items-center shadow-lg mb-4"
              style={{
                shadowColor: '#3B82F6',
                shadowOffset: { width: 0, height: 4 },
                shadowOpacity: 0.3,
                shadowRadius: 8,
                elevation: 8,
              }}
            >
              <Text className="text-white text-lg font-bold">Sign In</Text>
            </TouchableOpacity>

            {/* Demo Sign In Button */}
            <TouchableOpacity
              onPress={handleDemoSignIn}
              className="bg-green-500 rounded-2xl py-4 items-center shadow-lg mb-6"
              style={{
                shadowColor: '#10B981',
                shadowOffset: { width: 0, height: 4 },
                shadowOpacity: 0.3,
                shadowRadius: 8,
                elevation: 8,
              }}
            >
              <View className="flex-row items-center">
                <FontAwesome name="play" size={16} color="white" />
                <Text className="text-white text-lg font-bold ml-2">Try Demo</Text>
              </View>
            </TouchableOpacity>

            {/* Social Sign In */}
            <View className="mb-6">
              <Text className="text-center text-[#6B7280] text-sm mb-4">Or continue with</Text>
              <View className="flex-row justify-center space-x-4">
                <TouchableOpacity 
                  onPress={() => Alert.alert("Demo", "Google sign-in would work here")}
                  className="w-12 h-12 bg-white rounded-full items-center justify-center shadow-sm border border-gray-200"
                >
                  <FontAwesome name="google" size={20} color="#EA4335" />
                </TouchableOpacity>
                
                <TouchableOpacity 
                  onPress={() => Alert.alert("Demo", "Facebook sign-in would work here")}
                  className="w-12 h-12 bg-white rounded-full items-center justify-center shadow-sm border border-gray-200"
                >
                  <FontAwesome name="facebook" size={20} color="#1877F2" />
                </TouchableOpacity>
                
                <TouchableOpacity 
                  onPress={() => Alert.alert("Demo", "Apple sign-in would work here")}
                  className="w-12 h-12 bg-white rounded-full items-center justify-center shadow-sm border border-gray-200"
                >
                  <FontAwesome name="apple" size={20} color="#000000" />
                </TouchableOpacity>
              </View>
            </View>

            {/* Sign Up Link */}
            <View className="flex-row justify-center mb-8">
              <Text className="text-[#6B7280] text-base">Don't have an account? </Text>
              <TouchableOpacity onPress={() => navigation.navigate("SignUp")}>
                <Text className="text-[#3B82F6] text-base font-medium">Sign Up</Text>
              </TouchableOpacity>
            </View>
          </Animatable.View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default SignIn;