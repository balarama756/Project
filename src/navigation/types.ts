import { NativeStackScreenProps } from '@react-navigation/native-stack';

export type RootStackParamList = {
  SplashScreen: undefined;
  CustomerLogin: undefined;
  DeliveryLogin: undefined;
  DeliveryDashboard: undefined;
  OTPVerification: {
    phoneNumber: string;
    verificationId: string;
  };
  ProductDashboard: undefined;
};

export type NavigationProps = NativeStackScreenProps<RootStackParamList>; 