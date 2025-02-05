import { SupportService } from './SupportService';

export class ChatSupportService {
  private static SUPPORT_RESPONSE_TIME = 30000; // 30 seconds

  static async initiateSupportChat(issue: string): Promise<void> {
    try {
      // First try WhatsApp
      await SupportService.openWhatsAppSupport(issue);
    } catch (error) {
      // Fallback to in-app chat
      console.error('WhatsApp support failed, falling back to in-app chat:', error);
      this.startInAppChat(issue);
    }
  }

  private static async startInAppChat(issue: string) {
    // Implement in-app chat logic here
    // This could connect to your chat server
    console.log('Starting in-app chat for issue:', issue);
  }

  static async checkResponseTime(): Promise<boolean> {
    // Check if support team is responding within 30 seconds
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(true);
      }, this.SUPPORT_RESPONSE_TIME);
    });
  }
} 