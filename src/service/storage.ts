import AsyncStorage from '@react-native-async-storage/async-storage';

export const storeAuthData = async (
  accessToken: string,
  refreshToken: string,
  user: any
) => {
  try {
    await AsyncStorage.multiSet([
      ['accessToken', accessToken],
      ['refreshToken', refreshToken],
      ['user', JSON.stringify(user)]
    ]);
  } catch (error) {
    console.error('Error storing auth data:', error);
    throw error;
  }
};

export const getAuthData = async () => {
  try {
    const [[, accessToken], [, refreshToken], [, userStr]] = await AsyncStorage.multiGet([
      'accessToken',
      'refreshToken',
      'user'
    ]);
    return {
      accessToken,
      refreshToken,
      user: userStr ? JSON.parse(userStr) : null
    };
  } catch (error) {
    console.error('Error getting auth data:', error);
    return null;
  }
};

export const clearAuthData = async () => {
  try {
    await AsyncStorage.multiRemove(['accessToken', 'refreshToken', 'user']);
  } catch (error) {
    console.error('Error clearing auth data:', error);
  }
}; 