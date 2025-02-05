import React, { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';
import MapView, { Marker } from 'react-native-maps';

interface DeliveryTrackingProps {
  orderId: string;
  deliveryPartner?: {
    name: string;
    location: {
      latitude: number;
      longitude: number;
    };
  };
}

export const DeliveryTracking: React.FC<DeliveryTrackingProps> = ({
  orderId,
  deliveryPartner,
}) => {
  const [region, setRegion] = useState({
    latitude: deliveryPartner?.location.latitude || 0,
    longitude: deliveryPartner?.location.longitude || 0,
    latitudeDelta: 0.005,
    longitudeDelta: 0.005,
  });

  useEffect(() => {
    if (deliveryPartner?.location) {
      setRegion({
        ...region,
        latitude: deliveryPartner.location.latitude,
        longitude: deliveryPartner.location.longitude,
      });
    }
  }, [deliveryPartner?.location]);

  return (
    <View style={styles.container}>
      {deliveryPartner && (
        <View style={styles.partnerInfo}>
          <Text variant="titleMedium">
            {deliveryPartner.name} will be delivering your order
          </Text>
        </View>
      )}
      
      <MapView
        style={styles.map}
        region={region}
        showsUserLocation
      >
        {deliveryPartner?.location && (
          <Marker
            coordinate={{
              latitude: deliveryPartner.location.latitude,
              longitude: deliveryPartner.location.longitude,
            }}
            title={`${deliveryPartner.name} - Your Delivery Partner`}
          />
        )}
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
  partnerInfo: {
    padding: 16,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
}); 