export interface DeliveryPartner {
  _id: string;
  name: string;
  email: string;
  phone: number;
  role: string;
  isActivated: boolean;
  address: string;
  branch: string;
  liveLocation: {
    latitude: number;
    longitude: number;
    address: string;
  };
} 