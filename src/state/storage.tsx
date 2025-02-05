import AsyncStorage from '@react-native-async-storage/async-storage';

class Storage {
  async setItem(key: string, value: string) {
    try {
      await AsyncStorage.setItem(key, value);
    } catch (error) {
      console.error('Error saving data:', error);
    }
  }

  async getItem(key: string) {
    try {
      return await AsyncStorage.getItem(key);
    } catch (error) {
      console.error('Error reading data:', error);
      return null;
    }
  }

  async removeItem(key: string) {
    try {
      await AsyncStorage.removeItem(key);
    } catch (error) {
      console.error('Error removing data:', error);
    }
  }

  getString(key: string): string | null {
    return AsyncStorage.getItem(key);
  }

  setString(key: string, value: string) {
    return AsyncStorage.setItem(key, value);
  }
}

export const tokenStorage = new Storage();

export const  storage =  new Storage();

export const mmkvStorage ={
    setItem:(key:string, value:string)=>{
        storage.setItem(key, value)
    },
    getItem:(key:string)=>{
        const value = storage.getItem(key)
        return value ?? null;
    },
    removeItem:(key:string)=>{
        storage.removeItem(key)
    }
}