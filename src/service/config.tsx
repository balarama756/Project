import { initializeApp } from '@react-native-firebase/app';
import auth from '@react-native-firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyB8lLfX9DYDgMN_x1ghVI0nSZl0PFNtYxU",
  authDomain: "bandvagon-c6eb4.firebaseapp.com",
  projectId: "bandvagon-c6eb4",
  storageBucket: "bandvagon-c6eb4.firebasestorage.app",
  messagingSenderId: "685339786744",
  appId: "1:685339786744:web:3ee3e4c42a9880ecebaa0d"
};

export const initializeFirebase = () => {
  if (!auth().app) {
    initializeApp(firebaseConfig);
  }
};

export const GOOGLE_MAP_API = 'AIzaSyD0rjMA7fkfz6LdhUIQzAnHVF902pE48m8'
export const BASE_URL = 'http://192.168.1.5:3000/api'
export const SOCKET_URL = 'http://192.168.1.5:3000'



// USE YOUR NETWORK IP PR HOSTED URL

