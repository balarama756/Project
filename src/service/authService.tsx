import { tokenStorage } from "@state/storage";
import { BASE_URL } from "./config";
import axios from "axios";
import { resetAndNavigate } from "@utils/NavigationUtils";
import { appAxios } from "./apiInterceptors";
import { Alert } from "react-native";

// Types
interface LoginResponse {
  accessToken: string;
  refreshToken: string;
  customer?: any; // Replace `any` with the actual type of `customer`
  deliveryPartner?: any; // Replace `any` with the actual type of `deliveryPartner`
}

interface User {
  // Define the structure of the user object
  id: string;
  role: string;
  // Add other fields as needed
}

// Customer Login
export const customerLogin = async (phone: string, setUser: (user: User) => void) => {
  try {
    const response = await axios.post<LoginResponse>(`${BASE_URL}/customer/login`, { phone });
    const { accessToken, refreshToken, customer } = response.data;

    console.log("Customer Login Success:", response.data);

    // Save tokens
    tokenStorage.set("accessToken", accessToken);
    tokenStorage.set("refreshToken", refreshToken);

    // Update user state
    setUser(customer);
  } catch (error: any) {
    console.error("Customer Login Error:", error.response?.data || error.message);
    Alert.alert("Login Failed", "Invalid phone number or server error");
  }
};

// Delivery Login
export const deliveryLogin = async (email: string, password: string, setUser: (user: User) => void) => {
  try {
    const response = await axios.post<LoginResponse>(`${BASE_URL}/delivery/login`, { email, password });
    const { accessToken, refreshToken, deliveryPartner } = response.data;

    console.log("Delivery Login Success:", response.data);

    // Save tokens
    tokenStorage.set("accessToken", accessToken);
    tokenStorage.set("refreshToken", refreshToken);

    // Update user state
    setUser(deliveryPartner);
  } catch (error: any) {
    console.error("Delivery Login Error:", error.response?.data || error.message);
    Alert.alert("Login Failed", "Invalid credentials or server error");
  }
};

// Refetch User Data
export const refetchUser = async (setUser: (user: User) => void) => {
  try {
    console.log("Refetching user data...");

    const response = await appAxios.get<{ user: User }>(`/user`);
    setUser(response.data.user);
  } catch (error: any) {
    console.error("Refetch User Error:", error.response?.data || error.message);
    Alert.alert("Error", "Failed to fetch user data");
  }
};

// Update User Location
export const updateUserLocation = async (data: any, setUser: (user: User) => void) => {
  try {
    const response = await appAxios.patch(`/user`, data);
    await refetchUser(setUser); // Refetch user data after updating location
  } catch (error: any) {
    console.error("Update User Location Error:", error.response?.data || error.message);
    Alert.alert("Error", "Failed to update user location");
  }
};

// Refresh Tokens
export const refresh_tokens = async () => {
  try {
    const refreshToken = tokenStorage.getString("refreshToken");

    if (!refreshToken) {
      console.error("No refresh token available. Redirecting to login...");
      tokenStorage.clearAll();
      resetAndNavigate("CustomerLogin");
      return;
    }

    console.log("Refreshing tokens...");
    const response = await axios.post<{ accessToken: string; refreshToken: string }>(`${BASE_URL}/refresh-token`, { refreshToken });

    const { accessToken, refreshToken: newRefreshToken } = response.data;

    console.log("Tokens Refreshed Successfully");
    console.log("New Access Token:", accessToken);
    console.log("New Refresh Token:", newRefreshToken);

    // Save new tokens
    tokenStorage.set("accessToken", accessToken);
    tokenStorage.set("refreshToken", newRefreshToken);

    return accessToken;
  } catch (error: any) {
    console.error("Refresh Token Error:", error.response?.data || error.message);

    tokenStorage.clearAll();
    resetAndNavigate("CustomerLogin");
    Alert.alert("Session Expired", "Please log in again.");
  }
};