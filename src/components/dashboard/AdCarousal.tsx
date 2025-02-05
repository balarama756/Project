import { View, StyleSheet, Image } from 'react-native';
import React, { FC } from 'react';
import { useSharedValue } from 'react-native-reanimated';
import Carousel from 'react-native-reanimated-carousel';
import { screenWidth } from '@utils/Scaling'; // Ensure this is defined
import ScalePress from '@components/ui/ScalePress';

const AdCarousal: FC<{ adData: any[] }> = ({ adData }) => {
  const progressValue = useSharedValue(0);

  // Ensure values are integers for better precision handling
  const roundedScreenWidth = Math.round(screenWidth);

  const baseOptions = {
    vertical: false,
    width: roundedScreenWidth, // Rounded to ensure no floating-point precision issues
    height: Math.round(roundedScreenWidth * 0.5), // Same here
  };

  return (
    <View style={{ left: -15, marginVertical: 20 }}>
      <Carousel
        {...baseOptions}
        loop={false}
        pagingEnabled={false}
        snapEnabled={false}
        autoPlay={false}
        autoPlayInterval={2000}
        mode="parallax"
        data={adData}
        modeConfig={{
          parallaxScrollingOffset: Math.round(50), // Ensure integer
          parallaxScrollingScale: 0.95, // Float as required
        }}
        renderItem={({ item }: { item: any }) => { // Explicitly typing 'itemm
          return (
            <ScalePress style={styles.imageContainer}>
              <Image
                source={item}
                style={styles.img}
                 // Log errors
              />
            </ScalePress>
          );
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  imageContainer: {
    width: '100%',
    height: '100%',
  },
  img: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
    borderRadius: 20,
  },
});

export default AdCarousal;
