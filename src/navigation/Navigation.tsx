import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootStackParamList } from './types';
import SplashScreen from '@features/auth/SplashScreen';
import CustomerLogin from '@features/auth/CustomerLogin';
import DeliveryLogin from '@features/auth/DeliveryLogin';
import DeliveryDashboard from '@features/delivery/DeliveryDashboard';
import OTPVerification from '@features/auth/OTPVerification';
import ProductDashboard from '@features/dashboard/ProductDashboard';

const Stack = createNativeStackNavigator<RootStackParamList>();

const Navigation = () => {
  return (
    <Stack.Navigator
      initialRouteName="SplashScreen"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="SplashScreen" component={SplashScreen} />
      <Stack.Screen name="CustomerLogin" component={CustomerLogin} />
      <Stack.Screen name="DeliveryLogin" component={DeliveryLogin} />
      <Stack.Screen name="DeliveryDashboard" component={DeliveryDashboard} />
      <Stack.Screen name="OTPVerification" component={OTPVerification} />
      <Stack.Screen name="ProductDashboard" component={ProductDashboard} />
    </Stack.Navigator>
  );
};

export default Navigation;  