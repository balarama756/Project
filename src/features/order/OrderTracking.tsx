import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Card, Text, ProgressBar } from 'react-native-paper';
import { Colors, Fonts } from '@utils/Constants';
import CustomText from '@components/ui/CustomText';
import MapView, { Marker } from 'react-native-maps';

interface OrderStatus {
  status: 'ordered' | 'confirmed' | 'preparing' | 'picked' | 'delivered';
  timestamp: Date;
}

interface DeliveryPartner {
  name: string;
  phone: string;
  location: {
    latitude: number;
    longitude: number;
  };
}

interface OrderDetails {
  id: string;
  status: OrderStatus;
  deliveryPartner?: DeliveryPartner;
  estimatedDelivery: Date;
  items: Array<{
    name: string;
    quantity: number;
    price: number;
  }>;
}

export const OrderTracking = () => {
  const [order, setOrder] = useState<OrderDetails | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadOrderDetails();
  }, []);

  const loadOrderDetails = async () => {
    try {
      // TODO: Implement API call
      setOrder({
        id: '123',
        status: {
          status: 'preparing',
          timestamp: new Date(),
        },
        deliveryPartner: {
          name: 'Vikram',
          phone: '+91987654321',
          location: {
            latitude: 12.9716,
            longitude: 77.5946,
          },
        },
        estimatedDelivery: new Date(Date.now() + 30 * 60000), // 30 mins from now
        items: [
          { name: 'Item 1', quantity: 2, price: 599 },
          { name: 'Item 2', quantity: 1, price: 999 },
        ],
      });
    } catch (error) {
      console.error('Error loading order:', error);
    } finally {
      setLoading(false);
    }
  };

  const getProgressValue = (status: string) => {
    const stages = ['ordered', 'confirmed', 'preparing', 'picked', 'delivered'];
    return stages.indexOf(status) / (stages.length - 1);
  };

  if (!order) return null;

  return (
    <ScrollView style={styles.container}>
      <Card style={styles.card}>
        <Card.Content>
          <CustomText variant="h5" fontFamily={Fonts.Bold}>
            Order #{order.id}
          </CustomText>
          
          <View style={styles.progressContainer}>
            <ProgressBar
              progress={getProgressValue(order.status.status)}
              color={Colors.primary}
              style={styles.progressBar}
            />
            <CustomText style={styles.status}>
              {order.status.status.toUpperCase()}
            </CustomText>
          </View>

          <CustomText style={styles.eta}>
            Estimated Delivery: {order.estimatedDelivery.toLocaleTimeString()}
          </CustomText>
        </Card.Content>
      </Card>

      {order.deliveryPartner && (
        <Card style={styles.card}>
          <Card.Content>
            <CustomText variant="h6" fontFamily={Fonts.SemiBold}>
              Your Delivery Partner
            </CustomText>
            <View style={styles.partnerInfo}>
              <CustomText>{order.deliveryPartner.name}</CustomText>
              <CustomText>{order.deliveryPartner.phone}</CustomText>
            </View>
            <MapView
              style={styles.map}
              initialRegion={{
                latitude: order.deliveryPartner.location.latitude,
                longitude: order.deliveryPartner.location.longitude,
                latitudeDelta: 0.005,
                longitudeDelta: 0.005,
              }}
            >
              <Marker
                coordinate={order.deliveryPartner.location}
                title={order.deliveryPartner.name}
              />
            </MapView>
          </Card.Content>
        </Card>
      )}

      <Card style={styles.card}>
        <Card.Content>
          <CustomText variant="h6" fontFamily={Fonts.SemiBold}>
            Order Items
          </CustomText>
          {order.items.map((item, index) => (
            <View key={index} style={styles.itemRow}>
              <CustomText>{item.name} x{item.quantity}</CustomText>
              <CustomText>₹{item.price * item.quantity}</CustomText>
            </View>
          ))}
          <View style={styles.total}>
            <CustomText variant="h6" fontFamily={Fonts.Bold}>
              Total
            </CustomText>
            <CustomText variant="h6" fontFamily={Fonts.Bold}>
              ₹{order.items.reduce((sum, item) => sum + item.price * item.quantity, 0)}
            </CustomText>
          </View>
        </Card.Content>
      </Card>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: Colors.backgroundSecondary,
  },
  card: {
    marginBottom: 16,
  },
  progressContainer: {
    marginVertical: 16,
  },
  progressBar: {
    height: 8,
    borderRadius: 4,
  },
  status: {
    marginTop: 8,
    textAlign: 'center',
    color: Colors.primary,
  },
  eta: {
    marginTop: 8,
  },
  partnerInfo: {
    marginVertical: 12,
  },
  map: {
    height: 200,
    marginTop: 8,
    borderRadius: 8,
  },
  itemRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 4,
  },
  total: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
  },
}); 