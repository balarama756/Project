import firebase from '@react-native-firebase/app';

// Get this config from Firebase Console -> Project Settings -> General -> Your Apps -> Web App (</>)
const firebaseConfig = {
  apiKey: "AIzaSyBK4NxJZlWHNgH_CvYHlvRx5h34F9xIzPo",
  authDomain: "bandvagon-a6a8f.firebaseapp.com",
  projectId: "bandvagon-a6a8f",
  storageBucket: "bandvagon-a6a8f.appspot.com",
  messagingSenderId: "654919224959",
  appId: "1:654919224959:android:0a4ad21a9874c6e0d4f1d4",
  databaseURL: "https://bandvagon-a6a8f-default-rtdb.firebaseio.com"
};

// Initialize Firebase only if it hasn't been initialized
if (!firebase.apps.length) {
  try {
    firebase.initializeApp(firebaseConfig);
    console.log('Firebase initialized successfully');
  } catch (error) {
    console.error('Firebase init error:', error);
  }
}

export { firebase }; 