import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { Text, TextInput, Button } from 'react-native-paper';
import { AuthService } from '../../service/AuthService';
import { Colors, Fonts } from '@utils/Constants';
import CustomText from '@components/ui/CustomText';
import { resetAndNavigate } from '@utils/NavigationUtils';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { RootStackParamList } from '@navigation/types';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;
type OTPVerificationRouteProp = RouteProp<RootStackParamList, 'OTPVerification'>;

const OTPVerification = () => {
  const navigation = useNavigation<NavigationProp>();
  const route = useRoute<OTPVerificationRouteProp>();
  const { phoneNumber, verificationId } = route.params;
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);
  const [timeLeft, setTimeLeft] = useState(30);

  useEffect(() => {
    if (timeLeft > 0) {
      const timerId = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timerId);
    }
  }, [timeLeft]);

  const handleVerifyOTP = async () => {
    if (otp.length !== 6) {
      Alert.alert('Invalid OTP', 'Please enter a valid 6-digit OTP');
      return;
    }

    setLoading(true);
    try {
      await AuthService.verifyOTP(verificationId, otp);
      // Navigation will be handled by the auth state listener
    } catch (error: any) {
      Alert.alert('Verification Failed', error.message || 'Please try again');
      setLoading(false);
    }
  };

  const handleResendOTP = async () => {
    try {
      setLoading(true);
      await AuthService.sendOTP(phoneNumber);
      setTimeLeft(30);
      Alert.alert('Success', 'OTP resent successfully');
    } catch (error: any) {
      Alert.alert('Failed to resend OTP', error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleBack = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <CustomText variant="h2" fontFamily={Fonts.Bold} style={styles.title}>
        Verify OTP
      </CustomText>
      
      <CustomText variant="h5" fontFamily={Fonts.Regular} style={styles.subtitle}>
        Enter the verification code sent to {phoneNumber}
      </CustomText>

      <TextInput
        mode="outlined"
        value={otp}
        onChangeText={(text: string) => setOtp(text.replace(/[^0-9]/g, '').slice(0, 6))}
        keyboardType="number-pad"
        maxLength={6}
        style={styles.input}
        disabled={loading}
      />

      <Button
        mode="contained"
        onPress={handleVerifyOTP}
        loading={loading}
        disabled={otp.length !== 6 || loading}
        style={styles.button}
      >
        Verify OTP
      </Button>

      <View style={styles.resendContainer}>
        {timeLeft > 0 ? (
          <Text>Resend OTP in {timeLeft}s</Text>
        ) : (
          <Button
            mode="text"
            onPress={handleResendOTP}
            disabled={loading}
          >
            Resend OTP
          </Button>
        )}
      </View>

      <Button
        mode="text"
        onPress={handleBack}
        disabled={loading}
        style={styles.backButton}
      >
        Change Phone Number
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  title: {
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    textAlign: 'center',
    marginBottom: 24,
    opacity: 0.7,
  },
  input: {
    marginBottom: 16,
    fontSize: 20,
    letterSpacing: 4,
  },
  button: {
    marginTop: 8,
  },
  resendContainer: {
    alignItems: 'center',
    marginTop: 24,
  },
  backButton: {
    marginTop: 8,
  },
});

export default OTPVerification;