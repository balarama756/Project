import auth from '@react-native-firebase/auth';
import messaging from '@react-native-firebase/messaging';
import axios from 'axios';
import { BASE_URL } from './config';
import { getAuthTokens } from '@utils/storage';

interface DeliveryPartner {
  _id: string;
  name: string;
  email: string;
  phone: number;
  role: string;
  isActivated: boolean;
  address: string;
  branch: string;
  liveLocation: {
    latitude: number;
    longitude: number;
    address: string;
  };
}

interface LoginResponse {
  accessToken: string;
  refreshToken: string;
  deliveryPartner: DeliveryPartner;
  message: string;
}

interface LoginResult {
  success: boolean;
  user?: DeliveryPartner;
  tokens?: {
    accessToken: string;
    refreshToken: string;
  };
  message?: string;
}

export const deliveryLogin = async (email: string, password: string): Promise<LoginResult> => {
  if (!email || !password) {
    return {
      success: false,
      message: 'Email and password are required'
    };
  }

  try {
    const { data } = await axios.post<LoginResponse>(`${BASE_URL}/delivery/login`, {
      email,
      password
    });

    console.log('Login response:', data);

    if (!data.accessToken || !data.deliveryPartner) {
      return {
        success: false,
        message: 'Invalid response format from server'
      };
    }

    return {
      success: true,
      user: data.deliveryPartner,
      tokens: {
        accessToken: data.accessToken,
        refreshToken: data.refreshToken
      }
    };

  } catch (error: any) {
    console.error('Delivery Login Error:', error.response?.data || error.message);
    return {
      success: false,
      message: error.response?.data?.message || error.message || 'Login failed'
    };
  }
};

export class AuthService {
  static async getCurrentUser() {
    const user = auth().currentUser;
    return user;
  }

  /**
   * Send OTP to the provided phone number.
   * @param phoneNumber - The phone number to send the OTP to.
   * @returns The verification ID.
   * @throws Error if the phone number is null or if OTP sending fails.
   */
  static async sendOTP(phoneNumber: string): Promise<string> {
    try {
      console.log('Attempting to send OTP to:', phoneNumber);
      const confirmation = await auth().signInWithPhoneNumber(phoneNumber, false);
      console.log('OTP sent successfully');
      return confirmation.verificationId;
    } catch (error: any) {
      console.error('Firebase Auth Error:', error.code, error.message);
      if (error.code === 'auth/invalid-api-key') {
        throw new Error('Invalid Firebase configuration. Please check your setup.');
      }
      throw error;
    }
  }

  /**
   * Verify the OTP code.
   * @param verificationId - The verification ID received from `sendOTP`.
   * @param code - The OTP code entered by the user.
   * @returns The authenticated user.
   * @throws Error if OTP verification fails.
   */
  static async verifyOTP(verificationId: string, code: string) {
    try {
      const credential = auth.PhoneAuthProvider.credential(verificationId, code);
      const userCredential = await auth().signInWithCredential(credential);
      await this.setupPushNotifications(userCredential.user.uid);
      return userCredential.user;
    } catch (error) {
      console.error('Error verifying OTP:', error);
      throw error;
    }
  }

  static async setupPushNotifications(userId: string) {
    try {
      // Request permission
      const authStatus = await messaging().requestPermission();
      const enabled = 
        authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
        authStatus === messaging.AuthorizationStatus.PROVISIONAL;

      if (enabled) {
        // Get FCM token
        const fcmToken = await messaging().getToken();
        console.log('FCM Token:', fcmToken);

        // Save token to user profile
        await this.updateUserFCMToken(userId, fcmToken);

        // Listen to token refresh
        messaging().onTokenRefresh(async (token) => {
          await this.updateUserFCMToken(userId, token);
        });
      }
    } catch (error) {
      console.error('Error setting up push notifications:', error);
    }
  }

  static async updateUserFCMToken(userId: string, token: string) {
    // Here you would update your backend with the new token
    console.log('Updating FCM token for user:', userId, token);
  }

  static async refreshTokens() {
    try {
      const { refreshToken } = await getAuthTokens();
      if (!refreshToken) {
        throw new Error('No refresh token available');
      }
      // Implement your token refresh logic here
      return refreshToken;
    } catch (error) {
      console.error('Error refreshing tokens:', error);
      throw error;
    }
  }

  /**
   * Sign out the current user.
   * @throws Error if signing out fails.
   */
  static async signOut() {
    try {
      await auth().signOut();
    } catch (error) {
      console.error('Error signing out:', error);
      throw error;
    }
  }

  /**
   * Listen for changes in the authentication state.
   * @param callback - A callback function that receives the user object.
   * @returns A function to unsubscribe from the listener.
   */
  static onAuthStateChanged(callback: (user: any) => void) {
    return auth().onAuthStateChanged(callback);
  }
}