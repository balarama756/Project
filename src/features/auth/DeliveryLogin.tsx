import { View, Text, Alert, StyleSheet, ScrollView } from 'react-native'
import React, { FC, useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import type { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { RootStackParamList } from '@navigation/types'
import { deliveryLogin } from '@service/authService'
import CustomSafeAreaView from '@components/global/CustomSafeAreaView'
import { screenHeight } from '@utils/Scaling'
import LottieView from 'lottie-react-native'
import CustomText from '@components/ui/CustomText'
import { Fonts } from '@utils/Constants'
import CustomInput from '@components/ui/CustomInput'
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { RFValue } from 'react-native-responsive-fontsize'
import Icon from 'react-native-vector-icons/Ionicons'
import CustomButton from '@components/ui/CustomButton'
import { useAuthStore } from '@state/authStore'

type NavigationProp = NativeStackNavigationProp<RootStackParamList>

const DeliveryLogin: FC = () => {

  const navigation = useNavigation<NavigationProp>()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const setAuth = useAuthStore(state => state.setAuth)

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please enter both email and password');
      return;
    }

    setLoading(true);
    try {
      const result = await deliveryLogin(email, password);
      console.log('Login result:', result);

      if (result?.success && result?.user && result?.tokens) {
        setAuth(result.user, result.tokens);
        navigation.replace('DeliveryDashboard');
      } else {
        Alert.alert(
          'Login Failed',
          result?.message || 'Please check your credentials and try again'
        );
      }
    } catch (error: any) {
      console.error('Login error:', error);
      Alert.alert(
        'Login Failed',
        error?.message || 'An unexpected error occurred'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <CustomSafeAreaView>
        <ScrollView keyboardShouldPersistTaps='handled' keyboardDismissMode='on-drag'>
          <View style={styles.container}>

            <View style={styles.lottieContainer}>
              <LottieView autoPlay loop style={styles.lottie} source={require('@assets/animations/delivery_man.json')} />
            </View>

            <CustomText variant='h3' fontFamily={Fonts.Bold}>
              Delivery Partner Portal
            </CustomText>

            <CustomText variant='h6' style={styles.text} fontFamily={Fonts.SemiBold}>
              Faster than Flash⚡
            </CustomText>

            <CustomInput
              onChangeText={setEmail}
              value={email}
              left={<Icon
                name='mail'
                color='#F8890E'
                style={{ marginLeft: 10 }}
                size={RFValue(18)} />}
              placeholder='Email'
              inputMode='email'
              right={false}
            />

            <CustomInput
              onChangeText={setPassword}
              value={password}
              left={<Icon
                name='key-sharp'
                color='#F8890E'
                style={{ marginLeft: 10 }}
                size={RFValue(18)} />}
              placeholder='Password'
              secureTextEntry
              right={false}
            />

            <CustomButton 
            disabled={email.length===0 || password.length<8}
            title='Login'
            onPress={handleLogin}
            loading={loading}
             />

          </View>

        </ScrollView>
      </CustomSafeAreaView>
    </GestureHandlerRootView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignItems: 'center'
  },
  lottie: {
    height: '100%',
    width: '100%',
  },
  lottieContainer: {
    height: screenHeight * 0.12,
    width: '100%'
  },
  text: {
    marginTop: 2,
    marginBottom: 25,
    opacity: 0.8
  }
})

export default DeliveryLogin