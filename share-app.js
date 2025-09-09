#!/usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs');

console.log('🚀 Travel Advisor India - App Sharing Tool\n');

// Check if required tools are installed
function checkTools() {
  try {
    execSync('expo --version', { stdio: 'ignore' });
    console.log('✅ Expo CLI found');
  } catch (error) {
    console.log('❌ Expo CLI not found. Installing...');
    execSync('npm install -g @expo/cli', { stdio: 'inherit' });
  }

  try {
    execSync('eas --version', { stdio: 'ignore' });
    console.log('✅ EAS CLI found');
  } catch (error) {
    console.log('❌ EAS CLI not found. Installing...');
    execSync('npm install -g eas-cli', { stdio: 'inherit' });
  }
}

// Display sharing options
function showOptions() {
  console.log('\n📱 Choose how to share your app:\n');
  console.log('1. 🔗 Quick Share (Expo Go - Same WiFi)');
  console.log('2. 📦 Build Android APK (Share anywhere)');
  console.log('3. 🍎 Build iOS TestFlight (Apple Developer required)');
  console.log('4. 🌐 Deploy to Web (Netlify/Vercel)');
  console.log('5. 📋 Show sharing instructions');
  console.log('0. ❌ Exit\n');
}

// Main function
function main() {
  console.log('Welcome to Travel Advisor India sharing tool!\n');
  
  // Check tools
  checkTools();
  
  // Show options
  showOptions();
  
  console.log('📖 For detailed instructions, see BUILD_AND_SHARE.md');
  console.log('\n🎯 Quick Commands:');
  console.log('- Development: npx expo start');
  console.log('- Android APK: eas build -p android --profile preview');
  console.log('- iOS TestFlight: eas build -p ios --profile preview');
  
  console.log('\n✨ Your app features:');
  console.log('• Beautiful SignIn/SignUp screens');
  console.log('• India travel guide with attractions, hotels, restaurants');
  console.log('• Emergency SOS features with Indian emergency numbers');
  console.log('• Transport booking (Ola/Uber style)');
  console.log('• Multilingual community support (8 Indian languages)');
  console.log('• Complete profile management');
  
  console.log('\n🚀 Ready to share your amazing travel app with friends!');
}

if (require.main === module) {
  main();
}



