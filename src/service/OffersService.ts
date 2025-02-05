import { firebase } from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

export class OffersService {
  static async getWeekendOffers() {
    const today = new Date();
    const isWeekend = today.getDay() === 0 || today.getDay() === 6;
    
    if (!isWeekend) return [];
    
    try {
      const offersSnapshot = await firestore()
        .collection('offers')
        .where('type', '==', 'weekend')
        .where('active', '==', true)
        .get();
        
      return offersSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
    } catch (error) {
      console.error('Error fetching weekend offers:', error);
      return [];
    }
  }

  static async getBirthdayOffer(userId: string) {
    try {
      const userDoc = await firestore()
        .collection('users')
        .doc(userId)
        .get();
      
      const userData = userDoc.data();
      if (!userData?.dateOfBirth) return null;
      
      const today = new Date();
      const dob = new Date(userData.dateOfBirth);
      
      if (today.getMonth() === dob.getMonth() && 
          today.getDate() === dob.getDate()) {
        return {
          type: 'birthday',
          message: 'Happy Birthday! 🎉 You get a free gift with your order today!',
          value: 'FREE_GIFT'
        };
      }
      return null;
    } catch (error) {
      console.error('Error checking birthday offer:', error);
      return null;
    }
  }
} 