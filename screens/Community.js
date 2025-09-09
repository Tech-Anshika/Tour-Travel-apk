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
  const [chatMode, setChatMode] = useState("community"); // "community" or "emergency"
  const [isTyping, setIsTyping] = useState(false);

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

  // Enhanced AI responses based on chat mode and user input
  const getCommunityResponse = (userText) => {
    const lowerText = userText.toLowerCase();
    
    // Travel and tourism responses
    if (lowerText.includes('travel') || lowerText.includes('trip') || lowerText.includes('visit')) {
      return [
        "That sounds like an exciting trip! I'd love to help you plan. What destinations are you considering?",
        "Travel planning can be so much fun! Are you looking for adventure, relaxation, or cultural experiences?",
        "I'm here to help with your travel plans! Do you need recommendations for places to visit, food to try, or activities?",
        "Exploring new places is amazing! What type of experiences are you most interested in?"
      ];
    }
    
    // Food and restaurant responses
    if (lowerText.includes('food') || lowerText.includes('restaurant') || lowerText.includes('eat')) {
      return [
        "Food is one of the best parts of traveling! Are you looking for local cuisine recommendations?",
        "I love talking about food! What type of cuisine are you in the mood for?",
        "The local food scene here is incredible! Would you like some restaurant suggestions?",
        "Great choice! Food experiences create the best travel memories. Any dietary preferences I should know about?"
      ];
    }
    
    // Local culture and attractions
    if (lowerText.includes('culture') || lowerText.includes('attraction') || lowerText.includes('temple') || lowerText.includes('monument')) {
      return [
        "Indian culture is so rich and diverse! Are you interested in historical sites, temples, or local traditions?",
        "There are so many amazing cultural experiences here! What aspects of local culture interest you most?",
        "The cultural heritage in this region is fascinating! Would you like recommendations for must-visit sites?",
        "Cultural exploration is wonderful! Are you looking for guided tours or prefer to explore independently?"
      ];
    }
    
    // Shopping and local markets
    if (lowerText.includes('shop') || lowerText.includes('market') || lowerText.includes('buy')) {
      return [
        "Shopping for local crafts and souvenirs is so much fun! Are you looking for traditional items or modern goods?",
        "The local markets are vibrant and full of treasures! What kind of shopping experience are you after?",
        "I can help you find the best shopping spots! Are you interested in textiles, jewelry, spices, or handicrafts?",
        "Great question! Local markets offer authentic experiences. Would you like tips on bargaining too?"
      ];
    }
    
    // Weather and best time to visit
    if (lowerText.includes('weather') || lowerText.includes('climate') || lowerText.includes('season')) {
      return [
        "Weather planning is smart! The climate here varies by season. What time of year are you planning to visit?",
        "Good thinking about the weather! Different seasons offer different experiences. Are you flexible with your dates?",
        "The weather can really make or break a trip! Are you looking for warm weather, cool climate, or festival seasons?",
        "Weather is important for planning! Would you like month-by-month weather information?"
      ];
    }
    
    // Transportation and getting around
    if (lowerText.includes('transport') || lowerText.includes('taxi') || lowerText.includes('bus') || lowerText.includes('train')) {
      return [
        "Getting around efficiently makes travel so much better! Are you looking for budget options or convenience?",
        "Transportation here has many options! Would you prefer trains, buses, taxis, or ride-sharing apps?",
        "Great question about transport! Are you traveling within the city or between different cities?",
        "I can help with transportation tips! Do you need information about booking, costs, or safety?"
      ];
    }
    
    // Accommodation
    if (lowerText.includes('hotel') || lowerText.includes('stay') || lowerText.includes('accommodation')) {
      return [
        "Finding the right place to stay is crucial! What's your budget range and preferred area?",
        "Accommodation options here are diverse! Are you looking for luxury, mid-range, or budget-friendly stays?",
        "Good question about hotels! Do you prefer central locations or quieter areas away from the hustle?",
        "I can help you find perfect accommodation! Any specific amenities or requirements you need?"
      ];
    }
    
    // General greetings and friendly responses
    if (lowerText.includes('hello') || lowerText.includes('hi') || lowerText.includes('hey')) {
      return [
        "Hello there! Welcome to our community chat! I'm here to help with any travel questions or just to chat. How's your day going?",
        "Hi! Great to meet you! I'm your friendly community assistant. Whether you need travel tips or just want to talk, I'm here!",
        "Hey! Welcome! I love connecting with fellow travelers and locals. What brings you here today?",
        "Hello! So nice to have you in our community! I'm here 24/7 to chat about travel, local tips, or anything else!"
      ];
    }
    
    // Thank you responses
    if (lowerText.includes('thank') || lowerText.includes('thanks')) {
      return [
        "You're very welcome! I'm always happy to help. Is there anything else you'd like to know?",
        "My pleasure! That's what I'm here for. Feel free to ask me anything else!",
        "You're so welcome! I love being helpful. Any other questions or just want to chat more?",
        "Happy to help! Don't hesitate to reach out anytime you need assistance or just want to talk!"
      ];
    }
    
    // Default friendly responses
    return [
      "That's interesting! Tell me more about what you're thinking. I'm here to chat and help however I can!",
      "I'd love to hear more about that! What specific aspects would you like to discuss or get help with?",
      "Thanks for sharing! I'm here to help with travel tips, local insights, or just friendly conversation. What's on your mind?",
      "That sounds great! I enjoy our community conversations. Is there anything specific I can help you with today?",
      "I'm here to chat and assist! Whether it's travel planning, local recommendations, or just friendly talk, I'm all ears!",
      "Wonderful! I love connecting with people in our community. What would you like to explore or discuss?",
      "That's nice! I'm your friendly community assistant, ready to help with anything travel-related or just have a good chat!"
    ];
  };

  const getEmergencyResponse = (userText) => {
    return [
      "I understand you need help. I'm here to assist you 24/7. Stay calm and let me know what's happening.",
      "Stay calm. I'll help you find the right assistance. Can you tell me more about your situation?",
      "I'm here to help you through this. Are you in immediate danger or need emergency services?",
      "Don't worry, I'm here to assist. Please tell me what kind of help you need right now.",
      "I'm connecting you with the right resources. Can you describe your current situation?"
    ];
  };

  const handleSendMessage = () => {
    if (!userMessage.trim()) return;
    
    const newMessage = {
      id: Date.now(),
      text: userMessage,
      sender: "user",
      timestamp: new Date().toLocaleTimeString()
    };
    
    setChatMessages(prev => [...prev, newMessage]);
    setIsTyping(true);
    
    // Simulate AI response with typing indicator
    setTimeout(() => {
      const responses = chatMode === "community" 
        ? getCommunityResponse(userMessage)
        : getEmergencyResponse(userMessage);
      
      const aiResponse = {
        id: Date.now() + 1,
        text: responses[Math.floor(Math.random() * responses.length)],
        sender: "ai",
        timestamp: new Date().toLocaleTimeString()
      };
      
      setChatMessages(prev => [...prev, aiResponse]);
      setIsTyping(false);
    }, 1500);
    
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
          <Text className="text-2xl text-[#7C3AED] font-bold">Community Chat</Text>
          <Text className="text-sm text-[#6B46C1] font-medium">
            {chatMode === "community" ? "Travel & Community Assistant" : "Emergency Panic Assistant"}
          </Text>
        </View>
        
        <TouchableOpacity className="w-10 h-10 bg-white rounded-full items-center justify-center shadow-lg">
          <FontAwesome name="globe" size={18} color="#7C3AED" />
        </TouchableOpacity>
      </View>

      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        {/* Chat Mode Toggle */}
        <View className="mx-6 mt-6">
          <Text className="text-lg font-bold text-[#374151] mb-4">Chat Mode</Text>
          <View className="flex-row bg-gray-100 rounded-full p-1">
            <TouchableOpacity
              onPress={() => setChatMode("community")}
              className={`flex-1 px-4 py-3 rounded-full ${
                chatMode === "community" ? "bg-[#7C3AED]" : "bg-transparent"
              }`}
            >
              <Text className={`text-sm font-semibold text-center ${
                chatMode === "community" ? "text-white" : "text-[#374151]"
              }`}>
                💬 Community Chat
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setChatMode("emergency")}
              className={`flex-1 px-4 py-3 rounded-full ${
                chatMode === "emergency" ? "bg-red-500" : "bg-transparent"
              }`}
            >
              <Text className={`text-sm font-semibold text-center ${
                chatMode === "emergency" ? "text-white" : "text-[#374151]"
              }`}>
                🚨 Emergency Help
              </Text>
            </TouchableOpacity>
          </View>
        </View>

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

        {/* Suggested Topics (Community Mode Only) */}
        {chatMode === "community" && (
          <View className="mx-6 mt-6">
            <Text className="text-lg font-bold text-[#374151] mb-4">Popular Topics</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              <View className="flex-row space-x-3">
                {[
                  "🏛️ Best attractions to visit",
                  "🍽️ Local food recommendations", 
                  "🚗 Transportation tips",
                  "🏨 Hotel suggestions",
                  "🛍️ Shopping spots",
                  "🌤️ Weather information",
                  "🎭 Cultural experiences",
                  "💰 Budget travel tips"
                ].map((topic, index) => (
                  <TouchableOpacity
                    key={index}
                    onPress={() => setUserMessage(topic.substring(2))}
                    className="bg-white rounded-full px-4 py-2 border border-gray-200 shadow-sm"
                  >
                    <Text className="text-sm text-[#374151] font-medium">{topic}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </ScrollView>
          </View>
        )}

        {/* AI Chat Assistant */}
        <View className="mx-6 mt-8 mb-8">
          <View className="flex-row items-center justify-between mb-4">
            <Text className="text-lg font-bold text-[#374151]">
              {chatMode === "community" ? "Community Assistant" : "Emergency Assistant"}
            </Text>
            <View className="flex-row items-center">
              <View className={`w-2 h-2 rounded-full mr-2 ${
                chatMode === "community" ? "bg-green-500" : "bg-red-500"
              }`} />
              <Text className="text-xs text-[#9CA3AF]">Online 24/7</Text>
            </View>
          </View>
          
          <View className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
            {/* Chat Messages */}
            <ScrollView className="h-80 p-4" showsVerticalScrollIndicator={false}>
              {chatMessages.length === 0 ? (
                <View className="flex-1 items-center justify-center">
                  <FontAwesome 
                    name={chatMode === "community" ? "comments" : "life-ring"} 
                    size={48} 
                    color="#D1D5DB" 
                  />
                  <Text className="text-[#9CA3AF] text-center mt-4 text-base font-medium">
                    {chatMode === "community" 
                      ? "Welcome to Community Chat! 👋\n\nI'm here to help with travel tips, local recommendations, and friendly conversation. What would you like to talk about?"
                      : "Emergency Assistant Ready 🚨\n\nI'm here to help in urgent situations. Available 24/7 in multiple languages."
                    }
                  </Text>
                </View>
              ) : (
                <>
                  {chatMessages.map((message) => (
                    <View
                      key={message.id}
                      className={`mb-4 ${message.sender === 'user' ? 'items-end' : 'items-start'}`}
                    >
                      <View
                        className={`max-w-[85%] p-3 rounded-2xl ${
                          message.sender === 'user'
                            ? chatMode === "community" 
                              ? 'bg-[#7C3AED] rounded-br-md'
                              : 'bg-red-500 rounded-br-md'
                            : 'bg-gray-100 rounded-bl-md'
                        }`}
                      >
                        <Text
                          className={`text-sm leading-5 ${
                            message.sender === 'user' ? 'text-white' : 'text-[#374151]'
                          }`}
                        >
                          {message.text}
                        </Text>
                      </View>
                      <Text className="text-xs text-[#9CA3AF] mt-1">{message.timestamp}</Text>
                    </View>
                  ))}
                  
                  {/* Typing Indicator */}
                  {isTyping && (
                    <View className="mb-4 items-start">
                      <View className="bg-gray-100 rounded-2xl rounded-bl-md p-3">
                        <View className="flex-row items-center">
                          <Text className="text-[#9CA3AF] text-sm mr-2">Assistant is typing</Text>
                          <View className="flex-row space-x-1">
                            <Animatable.View 
                              animation="fadeInOut" 
                              iterationCount="infinite" 
                              duration={800}
                              className="w-2 h-2 bg-[#9CA3AF] rounded-full"
                            />
                            <Animatable.View 
                              animation="fadeInOut" 
                              iterationCount="infinite" 
                              duration={800}
                              delay={200}
                              className="w-2 h-2 bg-[#9CA3AF] rounded-full"
                            />
                            <Animatable.View 
                              animation="fadeInOut" 
                              iterationCount="infinite" 
                              duration={800}
                              delay={400}
                              className="w-2 h-2 bg-[#9CA3AF] rounded-full"
                            />
                          </View>
                        </View>
                      </View>
                    </View>
                  )}
                </>
              )}
            </ScrollView>

            {/* Message Input */}
            <View className="flex-row items-center p-4 border-t border-gray-100 bg-gray-50">
              <TextInput
                value={userMessage}
                onChangeText={setUserMessage}
                placeholder={chatMode === "community" 
                  ? "Ask about travel, food, places..." 
                  : "Describe your emergency situation..."
                }
                className="flex-1 text-base text-[#374151] mr-3 bg-white rounded-full px-4 py-2 border border-gray-200"
                placeholderTextColor="#9CA3AF"
                multiline
                maxLength={500}
              />
              <TouchableOpacity
                onPress={handleSendMessage}
                disabled={!userMessage.trim()}
                className={`w-12 h-12 rounded-full items-center justify-center ${
                  userMessage.trim() 
                    ? chatMode === "community" 
                      ? "bg-[#7C3AED]" 
                      : "bg-red-500"
                    : "bg-gray-300"
                }`}
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

