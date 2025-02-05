import { Linking } from 'react-native';

export class SupportService {
  private static WHATSAPP_SUPPORT_NUMBER = '+1234567890'; // Replace with actual support number

  static async openWhatsAppSupport(initialMessage: string = 'Hi, I need help with my order') {
    const whatsappUrl = `whatsapp://send?phone=${this.WHATSAPP_SUPPORT_NUMBER}&text=${encodeURIComponent(initialMessage)}`;
    
    try {
      const canOpen = await Linking.canOpenURL(whatsappUrl);
      if (canOpen) {
        await Linking.openURL(whatsappUrl);
      } else {
        throw new Error('WhatsApp is not installed');
      }
    } catch (error) {
      console.error('Error opening WhatsApp:', error);
      // Fallback to web WhatsApp
      const webWhatsapp = `https://wa.me/${this.WHATSAPP_SUPPORT_NUMBER}?text=${encodeURIComponent(initialMessage)}`;
      await Linking.openURL(webWhatsapp);
    }
  }
} 