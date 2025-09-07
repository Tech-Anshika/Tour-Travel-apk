import { StatusBar } from "expo-status-bar";
import { SafeAreaView, Text, View } from "react-native";
import { TailwindProvider } from "tailwindcss-react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "./screens/HomeScreen";
import SignIn from "./screens/SignIn";
import SignUp from "./screens/SignUp";
import Discover from "./screens/Discover";
import ItemScreen from "./screens/ItemScreen";
import AlertScreen from "./screens/Alert";
import Transport from "./screens/Transport";
import Community from "./screens/Community";
import Profile from "./screens/Profile";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <TailwindProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="SignIn" component={SignIn} />
          <Stack.Screen name="SignUp" component={SignUp} />
          <Stack.Screen name="Discover" component={Discover} />
          <Stack.Screen name="ItemScreen" component={ItemScreen} />
          <Stack.Screen name="Alert" component={AlertScreen} />
          <Stack.Screen name="Transport" component={Transport} />
          <Stack.Screen name="Community" component={Community} />
          <Stack.Screen name="Profile" component={Profile} />
        </Stack.Navigator>
      </NavigationContainer>
    </TailwindProvider>
  );
}
