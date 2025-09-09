# 🏖️ Tour & Travel - India Travel Advisor App

<div align="center">
  <img src="./assets/hero.png" alt="Travel Advisor India" width="200" height="200"/>
  
  <h3>Discover Amazing Places • Create Unforgettable Memories • Explore India's Beautiful Destinations</h3>
  
  [![React Native](https://img.shields.io/badge/React%20Native-0.69.6-blue.svg)](https://reactnative.dev/)
  [![Expo](https://img.shields.io/badge/Expo-~46.0.16-black.svg)](https://expo.dev/)
  [![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)
  [![Build Status](https://img.shields.io/badge/Build-Passing-brightgreen.svg)](https://github.com/Tech-Anshika/Tour-Travel-apk)
</div>

## 🌟 Features

### 🔐 **Complete Authentication System**
- Beautiful SignIn/SignUp screens with modern UI
- Demo mode for instant access and exploration
- Secure user session management

### 🗺️ **Comprehensive India Travel Guide**
- **Discover Amazing Places**: Search and explore destinations across India
- **Smart Search**: Find places by city, state, or category
- **Three Main Categories**:
  - 🏛️ **Attractions**: Historical sites, monuments, natural wonders
  - 🏨 **Hotels**: Accommodations from budget to luxury
  - 🍽️ **Restaurants**: Local cuisine and dining experiences

### 🚨 **Emergency & Safety Features**
- **SOS Button**: Quick access to emergency services
- **Emergency Contacts**: Direct calling to Police (100), Ambulance (108)
- **Location Sharing**: Share your location for safety
- **Panic Assistant**: Multilingual emergency support

### 🚗 **Transport Integration**
- **Cab Booking Interface**: Ola/Uber style booking system
- **Vehicle Selection**: Choose from multiple transport options
- **Real-time Booking**: Seamless transport reservation

### 🌐 **Community Support**
- **Multilingual Support**: Available in 8 Indian languages
- **Emergency Phrases**: Quick access to help phrases
- **Community Guidelines**: Safe travel tips and advice

### 👤 **Profile Management**
- **Travel Statistics**: Track your journeys and experiences
- **Travel History**: View your past adventures
- **Settings & Preferences**: Customize your experience
- **Account Management**: Secure profile handling

## 📱 Screenshots

<div align="center">
  <img src="./assets/screenshots/home.png" alt="Home Screen" width="200"/>
  <img src="./assets/screenshots/discover.png" alt="Discover Screen" width="200"/>
  <img src="./assets/screenshots/profile.png" alt="Profile Screen" width="200"/>
  <img src="./assets/screenshots/transport.png" alt="Transport Screen" width="200"/>
</div>

## 🚀 Quick Start

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- Expo CLI
- Android Studio (for Android development)
- Xcode (for iOS development)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Tech-Anshika/Tour-Travel-apk.git
   cd Tour-Travel-apk
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Start the development server**
   ```bash
   npx expo start
   ```

4. **Run on your device**
   - Scan the QR code with Expo Go app (Android/iOS)
   - Or use an emulator/simulator

## 🔧 Development Scripts

```bash
# Start development server
npm start

# Run on Android
npm run android

# Run on iOS
npm run ios

# Run on Web
npm run web

# Build for Android
npm run build:android

# Build for iOS
npm run build:ios

# Build for production
npm run build:production
```

## 📁 Project Structure

```
Tour-Travel-apk/
├── 📁 api/                 # API integration and services
├── 📁 assets/              # Images, icons, and static assets
├── 📁 components/          # Reusable UI components
│   ├── ItemCarDontainer.js # Item card component
│   └── MenuContainer.js    # Menu navigation component
├── 📁 screens/             # App screens and pages
│   ├── Alert.js           # Emergency alerts
│   ├── Community.js       # Community features
│   ├── Discover.js        # Place discovery
│   ├── HomeScreen.js      # Main home screen
│   ├── ItemScreen.js      # Item details
│   ├── Profile.js         # User profile
│   ├── SignIn.js          # Authentication
│   ├── SignUp.js          # User registration
│   └── Transport.js       # Transport booking
├── App.js                 # Main app component
├── app.json              # Expo configuration
├── package.json          # Dependencies and scripts
└── README.md             # Project documentation
```

## 🛠️ Technologies Used

- **Frontend**: React Native, Expo
- **Navigation**: React Navigation v6
- **Styling**: TailwindCSS React Native
- **HTTP Client**: Axios
- **Maps**: Google Places API
- **Icons**: Expo Vector Icons
- **Animations**: React Native Animatable

## 🌍 API Integration

The app integrates with various APIs for comprehensive travel data:

- **Google Places API**: Location search and details
- **Travel Advisor API**: Attraction and restaurant data
- **Weather API**: Real-time weather information
- **Emergency Services**: Quick access to emergency contacts

## 📱 Build and Share

### Option 1: Development/Testing (Expo Go)
```bash
npx expo start
```
Share the QR code with friends (same WiFi required)

### Option 2: Android APK Build
```bash
# Install EAS CLI
npm install -g eas-cli

# Login to Expo
eas login

# Build APK
eas build -p android --profile preview
```

### Option 3: iOS TestFlight
```bash
# Build for iOS (requires Apple Developer Account)
eas build -p ios --profile preview

# Submit to TestFlight
eas submit -p ios
```

## 🎯 Key Highlights

✅ **Modern UI/UX**: Beautiful, intuitive interface design  
✅ **Cross-Platform**: Works on both Android and iOS  
✅ **Offline Support**: Core features work without internet  
✅ **Real-time Data**: Live travel information and updates  
✅ **Emergency Ready**: Built-in safety and emergency features  
✅ **Multilingual**: Support for 8 Indian languages  
✅ **Performance Optimized**: Fast loading and smooth animations  

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Google Places API** for location services
- **Expo Team** for the amazing development platform
- **React Native Community** for continuous support
- **Indian Tourism Board** for travel data and insights

## 📞 Support & Contact

- **Email**: anshika.tech@example.com
- **GitHub**: [@Tech-Anshika](https://github.com/Tech-Anshika)
- **Issues**: [Report a Bug](https://github.com/Tech-Anshika/Tour-Travel-apk/issues)

## 🗺️ Roadmap

- [ ] **v2.0**: Hotel booking integration
- [ ] **v2.1**: Flight booking system
- [ ] **v2.2**: Travel itinerary planner
- [ ] **v2.3**: Social features and reviews
- [ ] **v2.4**: AR-based navigation
- [ ] **v3.0**: AI travel recommendations

---

<div align="center">
  <h3>🎉 Happy Traveling! Explore Incredible India! 🇮🇳</h3>
  
  **Made with ❤️ by [Anshika](https://github.com/Tech-Anshika)**

  ## 📥 APK Download

[Download Application](application-c267b7dc-7b94-4732-8065-338bd638870c.apk)

  
  ⭐ Star this repo if you found it helpful!
</div># Tour-Travel-apk
