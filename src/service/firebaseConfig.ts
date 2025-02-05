import { initializeApp } from '@react-native-firebase/app';

const firebaseConfig = {
  apiKey: 'AIzaSyB8lLfX9DYDgMN_x1ghVI0nSZl0PFNtYxU',
  authDomain: 'bandvagon-c6eb4.firebaseapp.com',
  projectId: 'bandvagon-c6eb4',
  storageBucket: 'bandvagon-c6eb4.firebasestorage.app',
  messagingSenderId: '685339786744',
  appId: '1:685339786744:web:3ee3e4c42a9880ecebaa0d',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
console.log('Firebase initialized:', app);

export { app };