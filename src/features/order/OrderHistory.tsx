import React, { useState, useEffect } from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import { Card, Text, Chip } from 'react-native-paper';
import { Colors, Fonts } from '@utils/Constants';
import CustomText from '@components/ui/CustomText';

interface OrderItem {
  id: string;
  status: 'pending' | 'delivered' | 'cancelled';
  date: string;
  total: number;
  items: number;
}

export const OrderHistory = () => {
  const [orders, setOrders] = useState<OrderItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Implement order fetching logic
    loadOrders();
  }, []);

  const loadOrders = async () => {
    try {
      // TODO: Implement API call
      setOrders([
        {
          id: '1',
          status: 'delivered',
          date: '2024-02-20',
          total: 1299,
          items: 3
        }
      ]);
    } catch (error) {
      console.error('Error loading orders:', error);
    } finally {
      setLoading(false);
    }
  };

  const renderOrder = ({ item }: { item: OrderItem }) => (
    <Card style={styles.card}>
      <Card.Content>
        <View style={styles.header}>
          <CustomText variant="h6" fontFamily={Fonts.SemiBold}>
            Order #{item.id}
          </CustomText>
          <Chip 
            mode="flat"
            style={[
              styles.statusChip,
              { backgroundColor: item.status === 'delivered' ? Colors.success : Colors.warning }
            ]}
          >
            {item.status.toUpperCase()}
          </Chip>
        </View>
        
        <View style={styles.details}>
          <CustomText>Date: {item.date}</CustomText>
          <CustomText>Items: {item.items}</CustomText>
          <CustomText variant="h6" fontFamily={Fonts.Bold}>
            Total: ₹{item.total}
          </CustomText>
        </View>
      </Card.Content>
    </Card>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={orders}
        renderItem={renderOrder}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.list}
        refreshing={loading}
        onRefresh={loadOrders}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.backgroundSecondary,
  },
  list: {
    padding: 16,
  },
  card: {
    marginBottom: 16,
    elevation: 2,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  statusChip: {
    height: 24,
  },
  details: {
    gap: 4,
  },
}); 