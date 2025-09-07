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

const SignUp = () => {
  const navigation = useNavigation();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [agreeToTerms, setAgreeToTerms] = useState(false);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  const handleSignUp = () => {
    // Demo functionality - no actual authentication
    if (!fullName || !email || !password || !confirmPassword) {
      Alert.alert("Missing Information", "Please fill in all fields.");
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert("Password Mismatch", "Passwords do not match.");
      return;
    }

    if (!agreeToTerms) {
      Alert.alert("Terms & Conditions", "Please agree to the terms and conditions.");
      return;
    }

    Alert.alert(
      "Welcome to Travel Advisor!",
      "Account created successfully! Start exploring incredible India.",
      [
        {
          text: "Start Exploring",
          onPress: () => navigation.navigate("Discover")
        }
      ]
    );
  };

  const handleDemoSignUp = () => {
    Alert.alert(
      "Demo Account Created",
      "Welcome! Your demo account is ready. Explore all features now.",
      [
        {
          text: "Start Exploring",
          onPress: () => navigation.navigate("Discover")
        }
      ]
    );
  };

  return (
    <SafeAreaView className="flex-1 bg-gradient-to-b from-green-50 to-white pt-16">
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
            <FontAwesome name="arrow-left" size={18} color="#10B981" />
          </TouchableOpacity>
          
          <View className="items-center">
            <Text className="text-xl text-[#10B981] font-bold">Join Us</Text>
            <Text className="text-sm text-[#6B7280] font-medium">Create your account</Text>
          </View>
          
          <View className="w-10 h-10" />
        </View>

        <ScrollView className="flex-1 px-6" showsVerticalScrollIndicator={false}>
          {/* Logo/Icon Section */}
          <Animatable.View 
            animation="bounceIn" 
            delay={300}
            className="items-center mt-2 mb-6"
          >
            <View className="w-18 h-18 bg-[#10B981] rounded-full items-center justify-center shadow-lg">
              <FontAwesome name="user-plus" size={32} color="white" />
            </View>
            <Text className="text-2xl font-bold text-[#1F2937] mt-3">Sign Up</Text>
            <Text className="text-sm text-[#6B7280] text-center mt-2 px-4">
              Join thousands of travelers exploring incredible India
            </Text>
          </Animatable.View>

          {/* Sign Up Form */}
          <Animatable.View animation="fadeInUp" delay={600}>
            {/* Full Name Input */}
            <View className="mb-3">
              <Text className="text-sm font-medium text-[#374151] mb-2">Full Name</Text>
              <View className="flex-row items-center bg-white rounded-2xl px-4 py-3 shadow-sm border border-gray-200">
                <FontAwesome name="user" size={16} color="#6B7280" />
                <TextInput
                  value={fullName}
                  onChangeText={setFullName}
                  placeholder="Enter your full name"
                  placeholderTextColor="#9CA3AF"
                  className="flex-1 ml-3 text-base text-[#1F2937]"
                />
              </View>
            </View>

            {/* Email Input */}
            <View className="mb-3">
              <Text className="text-sm font-medium text-[#374151] mb-2">Email Address</Text>
              <View className="flex-row items-center bg-white rounded-2xl px-4 py-3 shadow-sm border border-gray-200">
                <FontAwesome name="envelope" size={16} color="#6B7280" />
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
            <View className="mb-3">
              <Text className="text-sm font-medium text-[#374151] mb-2">Password</Text>
              <View className="flex-row items-center bg-white rounded-2xl px-4 py-3 shadow-sm border border-gray-200">
                <FontAwesome name="lock" size={16} color="#6B7280" />
                <TextInput
                  value={password}
                  onChangeText={setPassword}
                  placeholder="Create a password"
                  placeholderTextColor="#9CA3AF"
                  className="flex-1 ml-3 text-base text-[#1F2937]"
                  secureTextEntry={!showPassword}
                />
                <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                  <FontAwesome 
                    name={showPassword ? "eye" : "eye-slash"} 
                    size={16} 
                    color="#6B7280" 
                  />
                </TouchableOpacity>
              </View>
            </View>

            {/* Confirm Password Input */}
            <View className="mb-4">
              <Text className="text-sm font-medium text-[#374151] mb-2">Confirm Password</Text>
              <View className="flex-row items-center bg-white rounded-2xl px-4 py-3 shadow-sm border border-gray-200">
                <FontAwesome name="lock" size={16} color="#6B7280" />
                <TextInput
                  value={confirmPassword}
                  onChangeText={setConfirmPassword}
                  placeholder="Confirm your password"
                  placeholderTextColor="#9CA3AF"
                  className="flex-1 ml-3 text-base text-[#1F2937]"
                  secureTextEntry={!showConfirmPassword}
                />
                <TouchableOpacity onPress={() => setShowConfirmPassword(!showConfirmPassword)}>
                  <FontAwesome 
                    name={showConfirmPassword ? "eye" : "eye-slash"} 
                    size={16} 
                    color="#6B7280" 
                  />
                </TouchableOpacity>
              </View>
            </View>

            {/* Terms & Conditions */}
            <TouchableOpacity 
              onPress={() => setAgreeToTerms(!agreeToTerms)}
              className="flex-row items-center mb-5"
            >
              <View className={`w-5 h-5 rounded border-2 items-center justify-center mr-3 ${
                agreeToTerms ? 'bg-[#10B981] border-[#10B981]' : 'border-gray-300'
              }`}>
                {agreeToTerms && <FontAwesome name="check" size={12} color="white" />}
              </View>
              <Text className="text-sm text-[#6B7280] flex-1">
                I agree to the{' '}
                <Text 
                  className="text-[#10B981] font-medium"
                  onPress={() => Alert.alert("Terms", "Terms and conditions would be displayed here.")}
                >
                  Terms & Conditions
                </Text>
                {' '}and{' '}
                <Text 
                  className="text-[#10B981] font-medium"
                  onPress={() => Alert.alert("Privacy", "Privacy policy would be displayed here.")}
                >
                  Privacy Policy
                </Text>
              </Text>
            </TouchableOpacity>

            {/* Sign Up Button */}
            <TouchableOpacity
              onPress={handleSignUp}
              className="bg-[#10B981] rounded-2xl py-4 items-center shadow-lg mb-3"
              style={{
                shadowColor: '#10B981',
                shadowOffset: { width: 0, height: 4 },
                shadowOpacity: 0.3,
                shadowRadius: 8,
                elevation: 8,
              }}
            >
              <Text className="text-white text-lg font-bold">Create Account</Text>
            </TouchableOpacity>

            {/* Demo Sign Up Button */}
            <TouchableOpacity
              onPress={handleDemoSignUp}
              className="bg-purple-500 rounded-2xl py-4 items-center shadow-lg mb-5"
              style={{
                shadowColor: '#8B5CF6',
                shadowOffset: { width: 0, height: 4 },
                shadowOpacity: 0.3,
                shadowRadius: 8,
                elevation: 8,
              }}
            >
              <View className="flex-row items-center">
                <FontAwesome name="rocket" size={16} color="white" />
                <Text className="text-white text-lg font-bold ml-2">Quick Demo</Text>
              </View>
            </TouchableOpacity>

            {/* Social Sign Up */}
            <View className="mb-5">
              <Text className="text-center text-[#6B7280] text-sm mb-3">Or sign up with</Text>
              <View className="flex-row justify-center space-x-4">
                <TouchableOpacity 
                  onPress={() => Alert.alert("Demo", "Google sign-up would work here")}
                  className="w-12 h-12 bg-white rounded-full items-center justify-center shadow-sm border border-gray-200"
                >
                  <FontAwesome name="google" size={18} color="#EA4335" />
                </TouchableOpacity>
                
                <TouchableOpacity 
                  onPress={() => Alert.alert("Demo", "Facebook sign-up would work here")}
                  className="w-12 h-12 bg-white rounded-full items-center justify-center shadow-sm border border-gray-200"
                >
                  <FontAwesome name="facebook" size={18} color="#1877F2" />
                </TouchableOpacity>
                
                <TouchableOpacity 
                  onPress={() => Alert.alert("Demo", "Apple sign-up would work here")}
                  className="w-12 h-12 bg-white rounded-full items-center justify-center shadow-sm border border-gray-200"
                >
                  <FontAwesome name="apple" size={18} color="#000000" />
                </TouchableOpacity>
              </View>
            </View>

            {/* Sign In Link */}
            <View className="flex-row justify-center mb-8">
              <Text className="text-[#6B7280] text-base">Already have an account? </Text>
              <TouchableOpacity onPress={() => navigation.navigate("SignIn")}>
                <Text className="text-[#10B981] text-base font-medium">Sign In</Text>
              </TouchableOpacity>
            </View>
          </Animatable.View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default SignUp;