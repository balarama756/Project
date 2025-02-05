import { View, StyleSheet, SafeAreaView, FlatList, RefreshControl, ActivityIndicator } from 'react-native'
import React, { FC, useEffect, useState } from 'react'
import { Colors } from '@utils/Constants'
import { useAuthStore } from '@state/authStore'
import DeliveryHeader from '@components/delivery/DeliveryHeader'
import TabBar from '@components/delivery/TabBar'
import { fetchOrders } from '@service/orderService'
import CustomText from '@components/ui/CustomText'
import OrderItem from '../../components/delivery/OrderItem'
import Geolocation from '@react-native-community/geolocation'
import { reverseGeocode } from '@service/mapService'
import { Text, Card, Button, Chip } from 'react-native-paper'
import { DeliveryTracking } from './DeliveryTracking'
import { getStoredUser } from '@service/authService'

interface Order {
  id: string;
  status: 'pending' | 'picked' | 'delivered';
  customerName: string;
  address: string;
  amount: number;
  requiresVideo: boolean;
}

const DeliveryDashboard:FC = () => {

  const user = useAuthStore(state => state.user)
  const accessToken = useAuthStore(state => state.accessToken)
  const [selectedTab, setSelectedTab] = useState<'available' | 'delivered'>('available')
  const [loading, setLoading] = useState(true)
  const [data, setData] = useState<Order[]>([])
  const [refreshing, setRefreshing] = useState(false)
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null)
  const [earnings, setEarnings] = useState(0)

  const updateUser=()=>{
    Geolocation.getCurrentPosition(
      position=>{
        const {latitude,longitude}=position.coords
        reverseGeocode(latitude,longitude,user)
      },
      err => console.log(err),
      {
        enableHighAccuracy: false,
        timeout: 15000
      }
    )
  }

  useEffect(() => {
    const loadUser = async () => {
      try {
        const userData = await getStoredUser();
        if (userData) {
          user(userData);
        }
        setLoading(false);
      } catch (error) {
        console.error('Error loading user:', error);
        setLoading(false);
      }
    };

    loadUser();
  }, [user]);
  
  const renderOrderItem=({item,index}:any)=>{
    return(
      <Card style={styles.orderCard}>
        <Card.Content>
          <Text variant="titleMedium">{item.customerName}</Text>
          <Text variant="bodyMedium">{item.address}</Text>
          <Text variant="bodyMedium">₹{item.amount}</Text>
          {item.requiresVideo && (
            <Chip icon="video" style={styles.chip}>
              Video Required
            </Chip>
          )}
        </Card.Content>
        <Card.Actions>
          <Button 
            mode="contained"
            onPress={() => setSelectedOrder(item)}
          >
            View Details
          </Button>
        </Card.Actions>
      </Card>
    )
  }

  const fetchData = async () => {
    setData([])
    setRefreshing(true)
    setLoading(true)
    const data = await fetchOrders(selectedTab, user?._id, user?.branch)
    setData(data)
    setRefreshing(false)
    setLoading(false)
  }

  useEffect(()=>{
      fetchData()
  },[selectedTab])

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color={Colors.primary} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <SafeAreaView>
        <DeliveryHeader name={user?.name} email={user?.email} />
      </SafeAreaView>
      <View style={styles.subContainer}>
        <TabBar selectedTab={selectedTab} onTabChange={setSelectedTab} />

        <FlatList
          data={data}
          refreshControl={
            <RefreshControl 
            refreshing={refreshing}
            onRefresh={async()=>await fetchData()}
          />
          }
          ListEmptyComponent={()=>{
            if(loading){
              return(
                <View style={styles.center}>
                  <ActivityIndicator color={Colors.secondary} size='small'/>
                  </View>
              )
            }
            return(
              <View style={styles.center}>
                <CustomText>No Orders found yet!</CustomText>
              </View>
            )
          }}

          renderItem={renderOrderItem}
          keyExtractor={(item)=> item.id}
          contentContainerStyle={styles.flastListContainer}

        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.primary,
    flex: 1
  },
  subContainer: {
    backgroundColor: Colors.backgroundSecondary,
    flex: 1,
    padding: 6
  },
  flastListContainer: {
    padding: 2
  },
  center: {
    flex: 1,
    marginTop: 60,
    justifyContent: 'center',
    alignItems: 'center'
  },
  orderCard: {
    marginBottom: 16,
  },
  chip: {
    marginTop: 8,
    alignSelf: 'flex-start',
  },
})

export default DeliveryDashboard