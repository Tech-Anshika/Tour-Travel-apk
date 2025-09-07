import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Alert,
  Linking,
} from "react-native";
import React, { useLayoutEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { FontAwesome, MaterialIcons } from "@expo/vector-icons";
import * as Animatable from "react-native-animatable";

const Community = () => {
  const navigation = useNavigation();
  const [selectedLanguage, setSelectedLanguage] = useState("english");
  const [userMessage, setUserMessage] = useState("");
  const [chatMessages, setChatMessages] = useState([]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  const languages = [
    { id: "english", name: "English", flag: "🇺🇸", code: "en" },
    { id: "hindi", name: "हिंदी", flag: "🇮🇳", code: "hi" },
    { id: "bengali", name: "বাংলা", flag: "🇧🇩", code: "bn" },
    { id: "tamil", name: "தமிழ்", flag: "🇮🇳", code: "ta" },
    { id: "telugu", name: "తెలుగు", flag: "🇮🇳", code: "te" },
    { id: "marathi", name: "मराठी", flag: "🇮🇳", code: "mr" },
    { id: "gujarati", name: "ગુજરાતી", flag: "🇮🇳", code: "gu" },
    { id: "punjabi", name: "ਪੰਜਾਬੀ", flag: "🇮🇳", code: "pa" }
  ];

  const emergencyPhrases = {
    english: {
      help: "I need help!",
      emergency: "This is an emergency!",
      lost: "I am lost, please help me.",
      police: "Please call the police.",
      hospital: "I need to go to a hospital.",
      tourist: "I am a tourist and need assistance.",
      location: "Can you help me find this location?",
      translator: "Do you speak English?"
    },
    hindi: {
      help: "मुझे मदद चाहिए!",
      emergency: "यह एक आपातकाल है!",
      lost: "मैं खो गया हूँ, कृपया मेरी मदद करें।",
      police: "कृपया पुलिस को बुलाएं।",
      hospital: "मुझे अस्पताल जाना है।",
      tourist: "मैं एक पर्यटक हूँ और मुझे सहायता चाहिए।",
      location: "क्या आप इस स्थान को खोजने में मेरी मदद कर सकते हैं?",
      translator: "क्या आप अंग्रेजी बोलते हैं?"
    },
    bengali: {
      help: "আমার সাহায্য দরকার!",
      emergency: "এটি একটি জরুরি অবস্থা!",
      lost: "আমি হারিয়ে গেছি, দয়া করে আমাকে সাহায্য করুন।",
      police: "দয়া করে পুলিশ ডাকুন।",
      hospital: "আমাকে হাসপাতালে যেতে হবে।",
      tourist: "আমি একজন পর্যটক এবং আমার সহায়তা প্রয়োজন।",
      location: "আপনি কি এই স্থানটি খুঁজে পেতে আমাকে সাহায্য করতে পারেন?",
      translator: "আপনি কি ইংরেজি বলতে পারেন?"
    },
    tamil: {
      help: "எனக்கு உதவி தேவை!",
      emergency: "இது அவசரநிலை!",
      lost: "நான் தொலைந்து போனேன், தயவுசெய்து எனக்கு உதவுங்கள்.",
      police: "தயவுசெய்து காவல்துறையை அழையுங்கள்.",
      hospital: "நான் மருத்துவமனைக்கு செல்ல வேண்டும்.",
      tourist: "நான் ஒரு சுற்றுலாப் பயணி, எனக்கு உதவி தேவை.",
      location: "இந்த இடத்தைக் கண்டுபிடிக்க நீங்கள் எனக்கு உதவ முடியுமா?",
      translator: "உங்களுக்கு ஆங்கிலம் தெரியுமா?"
    }
  };

  const quickActions = [
    {
      title: "Call Emergency",
      icon: "phone",
      color: "#DC2626",
      action: () => {
        Alert.alert(
          "Emergency Call",
          "Choose emergency service:",
          [
            { text: "Police (100)", onPress: () => Linking.openURL("tel:100") },
            { text: "Ambulance (108)", onPress: () => Linking.openURL("tel:108") },
            { text: "Tourist Helpline (1363)", onPress: () => Linking.openURL("tel:1363") },
            { text: "Cancel", style: "cancel" }
          ]
        );
      }
    },
    {
      title: "Share Location",
      icon: "map-marker",
      color: "#059669",
      action: () => {
        Alert.alert("Location Shared", "Your location has been shared with emergency contacts and local authorities.");
      }
    },
    {
      title: "Find Embassy",
      icon: "building",
      color: "#7C3AED",
      action: () => {
        Alert.alert("Embassy Locator", "Finding nearest embassy or consulate...");
      }
    },
    {
      title: "Translate Text",
      icon: "language",
      color: "#DC2626",
      action: () => {
        Alert.alert("Text Translator", "Camera translator activated. Point camera at text to translate.");
      }
    }
  ];

  const handleSendMessage = () => {
    if (!userMessage.trim()) return;
    
    const newMessage = {
      id: Date.now(),
      text: userMessage,
      sender: "user",
      timestamp: new Date().toLocaleTimeString()
    };
    
    setChatMessages(prev => [...prev, newMessage]);
    
    // Simulate AI response
    setTimeout(() => {
      const responses = [
        "I understand you need help. I'm here to assist you 24/7.",
        "Stay calm. I'll help you find the right assistance.",
        "I've noted your location. Emergency services have been notified.",
        "Don't worry, help is on the way. Keep this chat open.",
        "I'm connecting you with local volunteers who speak your language."
      ];
      
      const aiResponse = {
        id: Date.now() + 1,
        text: responses[Math.floor(Math.random() * responses.length)],
        sender: "ai",
        timestamp: new Date().toLocaleTimeString()
      };
      
      setChatMessages(prev => [...prev, aiResponse]);
    }, 1000);
    
    setUserMessage("");
  };

  const speakPhrase = (phrase) => {
    Alert.alert("Voice Assistant", `Speaking: "${phrase}" in ${languages.find(l => l.id === selectedLanguage)?.name}`);
  };

  return (
    <SafeAreaView className="flex-1 bg-gradient-to-b from-purple-50 to-white pt-12">
      {/* Header */}
      <View className="flex-row items-center justify-between px-6 pt-8 pb-4">
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          className="w-10 h-10 bg-white rounded-full items-center justify-center shadow-lg"
        >
          <FontAwesome name="arrow-left" size={18} color="#7C3AED" />
        </TouchableOpacity>
        
        <View className="items-center">
          <Text className="text-2xl text-[#7C3AED] font-bold">Community Help</Text>
          <Text className="text-sm text-[#6B46C1] font-medium">Multilingual Panic Assistant</Text>
        </View>
        
        <TouchableOpacity className="w-10 h-10 bg-white rounded-full items-center justify-center shadow-lg">
          <FontAwesome name="globe" size={18} color="#7C3AED" />
        </TouchableOpacity>
      </View>

      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        {/* Language Selection */}
        <View className="mx-6 mt-6">
          <Text className="text-lg font-bold text-[#374151] mb-4">Select Your Language</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View className="flex-row space-x-3">
              {languages.map((lang) => (
                <TouchableOpacity
                  key={lang.id}
                  onPress={() => setSelectedLanguage(lang.id)}
                  className={`bg-white rounded-2xl p-3 items-center shadow-sm border-2 min-w-[80px] ${
                    selectedLanguage === lang.id 
                      ? "border-[#7C3AED] bg-purple-50" 
                      : "border-gray-100"
                  }`}
                >
                  <Text className="text-2xl mb-1">{lang.flag}</Text>
                  <Text className={`text-xs font-medium text-center ${
                    selectedLanguage === lang.id ? "text-[#7C3AED]" : "text-[#374151]"
                  }`}>
                    {lang.name}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>
        </View>

        {/* Quick Emergency Actions */}
        <View className="mx-6 mt-8">
          <Text className="text-lg font-bold text-[#374151] mb-4">Quick Actions</Text>
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
                  className="w-12 h-12 rounded-full items-center justify-center mb-3"
                  style={{ backgroundColor: `${action.color}15` }}
                >
                  <FontAwesome name={action.icon} size={20} color={action.color} />
                </View>
                <Text
                  className="text-sm font-semibold text-center"
                  style={{ color: action.color }}
                >
                  {action.title}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Emergency Phrases */}
        <View className="mx-6 mt-6">
          <Text className="text-lg font-bold text-[#374151] mb-4">Emergency Phrases</Text>
          <View className="bg-white rounded-2xl p-4 shadow-lg border border-gray-100">
            {Object.entries(emergencyPhrases[selectedLanguage] || emergencyPhrases.english).map(([key, phrase]) => (
              <TouchableOpacity
                key={key}
                onPress={() => speakPhrase(phrase)}
                className="flex-row items-center justify-between py-3 border-b border-gray-100 last:border-b-0"
              >
                <Text className="text-base text-[#374151] flex-1 mr-3">{phrase}</Text>
                <View className="flex-row items-center">
                  <TouchableOpacity className="p-2">
                    <FontAwesome name="volume-up" size={16} color="#7C3AED" />
                  </TouchableOpacity>
                  <TouchableOpacity className="p-2">
                    <FontAwesome name="copy" size={16} color="#6B7280" />
                  </TouchableOpacity>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* AI Chat Assistant */}
        <View className="mx-6 mt-8 mb-8">
          <Text className="text-lg font-bold text-[#374151] mb-4">AI Panic Assistant</Text>
          <View className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
            {/* Chat Messages */}
            <ScrollView className="h-64 p-4" showsVerticalScrollIndicator={false}>
              {chatMessages.length === 0 ? (
                <View className="flex-1 items-center justify-center">
                  <FontAwesome name="comments" size={48} color="#D1D5DB" />
                  <Text className="text-[#9CA3AF] text-center mt-4">
                    Start a conversation with our AI assistant.{'\n'}
                    Available 24/7 in multiple languages.
                  </Text>
                </View>
              ) : (
                chatMessages.map((message) => (
                  <View
                    key={message.id}
                    className={`mb-3 ${message.sender === 'user' ? 'items-end' : 'items-start'}`}
                  >
                    <View
                      className={`max-w-[80%] p-3 rounded-2xl ${
                        message.sender === 'user'
                          ? 'bg-[#7C3AED] rounded-br-md'
                          : 'bg-gray-100 rounded-bl-md'
                      }`}
                    >
                      <Text
                        className={`text-sm ${
                          message.sender === 'user' ? 'text-white' : 'text-[#374151]'
                        }`}
                      >
                        {message.text}
                      </Text>
                    </View>
                    <Text className="text-xs text-[#9CA3AF] mt-1">{message.timestamp}</Text>
                  </View>
                ))
              )}
            </ScrollView>

            {/* Message Input */}
            <View className="flex-row items-center p-4 border-t border-gray-100">
              <TextInput
                value={userMessage}
                onChangeText={setUserMessage}
                placeholder="Type your message..."
                className="flex-1 text-base text-[#374151] mr-3"
                placeholderTextColor="#9CA3AF"
                multiline
              />
              <TouchableOpacity
                onPress={handleSendMessage}
                className="w-10 h-10 bg-[#7C3AED] rounded-full items-center justify-center"
              >
                <FontAwesome name="send" size={16} color="white" />
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Emergency Contact Banner */}
        <View className="mx-6 mb-8">
          <Animatable.View
            animation="pulse"
            iterationCount="infinite"
            duration={2000}
            className="bg-red-500 rounded-2xl p-4 items-center shadow-lg"
          >
            <FontAwesome name="exclamation-triangle" size={24} color="white" />
            <Text className="text-white text-lg font-bold mt-2">In Immediate Danger?</Text>
            <Text className="text-red-100 text-sm text-center mt-1 mb-3">
              Call emergency services immediately
            </Text>
            <TouchableOpacity
              onPress={() => Linking.openURL("tel:100")}
              className="bg-white rounded-full px-6 py-2"
            >
              <Text className="text-red-500 font-bold">CALL 100 NOW</Text>
            </TouchableOpacity>
          </Animatable.View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Community;

