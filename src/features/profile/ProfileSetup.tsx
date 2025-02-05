import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView, Alert } from 'react-native';
import { TextInput, Button, Avatar } from 'react-native-paper';
import { Colors, Fonts } from '@utils/Constants';
import CustomText from '@components/ui/CustomText';
import DateTimePicker from '@react-native-community/datetimepicker';
import * as ImagePicker from 'react-native-image-picker';
import storage from '@react-native-firebase/storage';
import firestore from '@react-native-firebase/firestore';
import { AuthService } from '@service/AuthService';

interface UserProfile {
  name: string;
  email: string;
  phone: string;
  dateOfBirth: Date | null;
  address: string;
  profileImage?: string;
}

export const ProfileSetup = () => {
  const [profile, setProfile] = useState<UserProfile>({
    name: '',
    email: '',
    phone: '',
    dateOfBirth: null,
    address: '',
  });
  const [loading, setLoading] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    try {
      const user = await AuthService.getCurrentUser();
      if (user) {
        const userDoc = await firestore()
          .collection('users')
          .doc(user.uid)
          .get();
        
        if (userDoc.exists) {
          const data = userDoc.data() as UserProfile;
          setProfile({
            ...data,
            dateOfBirth: data.dateOfBirth ? new Date(data.dateOfBirth) : null,
          });
        }
      }
    } catch (error) {
      console.error('Error loading profile:', error);
    }
  };

  const handleImagePick = async () => {
    try {
      const result = await ImagePicker.launchImageLibrary({
        mediaType: 'photo',
        quality: 0.8,
      });

      if (result.assets && result.assets[0].uri) {
        setUploading(true);
        const user = await AuthService.getCurrentUser();
        if (user) {
          const reference = storage().ref(`profiles/${user.uid}`);
          await reference.putFile(result.assets[0].uri);
          const url = await reference.getDownloadURL();
          setProfile(prev => ({ ...prev, profileImage: url }));
        }
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to upload image');
    } finally {
      setUploading(false);
    }
  };

  const handleSave = async () => {
    if (!profile.name || !profile.email || !profile.phone) {
      Alert.alert('Error', 'Please fill in all required fields');
      return;
    }

    setLoading(true);
    try {
      const user = await AuthService.getCurrentUser();
      if (user) {
        await firestore()
          .collection('users')
          .doc(user.uid)
          .set(profile, { merge: true });
        Alert.alert('Success', 'Profile updated successfully');
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.avatarContainer}>
        <Avatar.Image
          size={120}
          source={profile.profileImage ? { uri: profile.profileImage } : require('@assets/images/splash_logo.jpeg')}
        />
        <Button
          mode="text"
          onPress={handleImagePick}
          loading={uploading}
          style={styles.uploadButton}
        >
          Change Photo
        </Button>
      </View>

      <TextInput
        label="Full Name"
        value={profile.name}
        onChangeText={text => setProfile(prev => ({ ...prev, name: text }))}
        style={styles.input}
      />

      <TextInput
        label="Email"
        value={profile.email}
        onChangeText={text => setProfile(prev => ({ ...prev, email: text }))}
        keyboardType="email-address"
        style={styles.input}
      />

      <TextInput
        label="Phone"
        value={profile.phone}
        onChangeText={text => setProfile(prev => ({ ...prev, phone: text }))}
        keyboardType="phone-pad"
        style={styles.input}
        disabled
      />

      <Button
        mode="outlined"
        onPress={() => setShowDatePicker(true)}
        style={styles.input}
      >
        {profile.dateOfBirth 
          ? profile.dateOfBirth.toLocaleDateString()
          : 'Select Date of Birth'}
      </Button>

      {showDatePicker && (
        <DateTimePicker
          value={profile.dateOfBirth || new Date()}
          mode="date"
          onChange={(event, date) => {
            setShowDatePicker(false);
            if (date) {
              setProfile(prev => ({ ...prev, dateOfBirth: date }));
            }
          }}
        />
      )}

      <TextInput
        label="Address"
        value={profile.address}
        onChangeText={text => setProfile(prev => ({ ...prev, address: text }))}
        multiline
        numberOfLines={3}
        style={styles.input}
      />

      <Button
        mode="contained"
        onPress={handleSave}
        loading={loading}
        style={styles.saveButton}
      >
        Save Profile
      </Button>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: Colors.background,
  },
  avatarContainer: {
    alignItems: 'center',
    marginVertical: 20,
  },
  uploadButton: {
    marginTop: 8,
  },
  input: {
    marginBottom: 16,
    backgroundColor: Colors.white,
  },
  saveButton: {
    marginTop: 8,
  },
}); 