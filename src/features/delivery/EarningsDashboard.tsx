import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Card, Text, Button } from 'react-native-paper';
import { Colors, Fonts } from '@utils/Constants';
import CustomText from '@components/ui/CustomText';
import { LineChart } from 'react-native-chart-kit';

interface EarningsData {
  totalEarnings: number;
  todayEarnings: number;
  weeklyEarnings: number[];
  deliveriesCompleted: number;
}

export const EarningsDashboard = () => {
  const [earnings, setEarnings] = useState<EarningsData>({
    totalEarnings: 0,
    todayEarnings: 0,
    weeklyEarnings: [0, 0, 0, 0, 0, 0, 0],
    deliveriesCompleted: 0
  });

  useEffect(() => {
    loadEarningsData();
  }, []);

  const loadEarningsData = async () => {
    // TODO: Implement API call
    setEarnings({
      totalEarnings: 15000,
      todayEarnings: 1200,
      weeklyEarnings: [1200, 1500, 1000, 1800, 1300, 1600, 1200],
      deliveriesCompleted: 45
    });
  };

  return (
    <ScrollView style={styles.container}>
      <Card style={styles.totalCard}>
        <Card.Content>
          <CustomText variant="h6" fontFamily={Fonts.Regular}>
            Total Earnings
          </CustomText>
          <CustomText variant="h2" fontFamily={Fonts.Bold} style={styles.amount}>
            ₹{earnings.totalEarnings}
          </CustomText>
        </Card.Content>
      </Card>

      <View style={styles.row}>
        <Card style={[styles.card, styles.flex1]}>
          <Card.Content>
            <CustomText>Today's Earnings</CustomText>
            <CustomText variant="h5" fontFamily={Fonts.SemiBold}>
              ₹{earnings.todayEarnings}
            </CustomText>
          </Card.Content>
        </Card>

        <Card style={[styles.card, styles.flex1]}>
          <Card.Content>
            <CustomText>Deliveries</CustomText>
            <CustomText variant="h5" fontFamily={Fonts.SemiBold}>
              {earnings.deliveriesCompleted}
            </CustomText>
          </Card.Content>
        </Card>
      </View>

      <Card style={styles.chartCard}>
        <Card.Content>
          <CustomText variant="h6" fontFamily={Fonts.SemiBold} style={styles.chartTitle}>
            Weekly Earnings
          </CustomText>
          <LineChart
            data={{
              labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
              datasets: [{
                data: earnings.weeklyEarnings
              }]
            }}
            width={320}
            height={200}
            chartConfig={{
              backgroundColor: Colors.white,
              backgroundGradientFrom: Colors.white,
              backgroundGradientTo: Colors.white,
              decimalPlaces: 0,
              color: (opacity = 1) => Colors.primary,
            }}
            style={styles.chart}
          />
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
  totalCard: {
    marginBottom: 16,
    backgroundColor: Colors.primary,
  },
  amount: {
    color: Colors.white,
    marginTop: 8,
  },
  row: {
    flexDirection: 'row',
    gap: 16,
    marginBottom: 16,
  },
  card: {
    elevation: 2,
  },
  flex1: {
    flex: 1,
  },
  chartCard: {
    marginBottom: 16,
  },
  chartTitle: {
    marginBottom: 16,
  },
  chart: {
    borderRadius: 8,
  },
}); 