import firestore from '@react-native-firebase/firestore';

export class BirthdayGiftService {
  static async checkBirthdayGiftEligibility(userId: string): Promise<boolean> {
    try {
      const userDoc = await firestore()
        .collection('users')
        .doc(userId)
        .get();
      
      const userData = userDoc.data();
      if (!userData?.dateOfBirth) return false;
      
      const today = new Date();
      const dob = new Date(userData.dateOfBirth);
      
      return today.getMonth() === dob.getMonth() && 
             today.getDate() === dob.getDate();
    } catch (error) {
      console.error('Error checking birthday gift eligibility:', error);
      return false;
    }
  }

  static async addBirthdayGiftToOrder(orderId: string) {
    try {
      await firestore()
        .collection('orders')
        .doc(orderId)
        .update({
          hasBirthdayGift: true,
          birthdayGiftDetails: {
            added: new Date(),
            type: 'BIRTHDAY_SPECIAL'
          }
        });
    } catch (error) {
      console.error('Error adding birthday gift:', error);
      throw error;
    }
  }
} 