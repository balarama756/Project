import { View, Text, StyleSheet, Image, FlatList, ScrollView } from 'react-native';
import React, { FC } from 'react';
import ScalePress from '@components/ui/ScalePress';
import { navigate } from '@utils/NavigationUtils';
import CustomText from '@components/ui/CustomText';
import { Fonts } from '@utils/Constants';

const CategoryContainer: FC<{ data: any[] }> = ({ data }) => {
    const renderItems = ({ item }: { item: any }) => (
        <ScalePress onPress={() => navigate('ProductCategories')} style={styles.item}>
            <View style={styles.imageContainer}>
                <Image source={item.image} style={styles.image} />
            </View>
            <CustomText style={styles.text} variant="h8" fontFamily={Fonts.Medium}>
                {item.name}
            </CustomText>
        </ScalePress>
    );

    return (
        <FlatList
            data={data}
            numColumns={4}
            renderItem={renderItems}
            keyExtractor={(item, index) => index.toString()}
            contentContainerStyle={styles.container}
        />
    );
};

const styles = StyleSheet.create({
    container: {
        marginVertical: 15,
    },
    text: {
        textAlign: 'center',
    },
    item: {
        flex: 1,
        marginHorizontal: 5,
        alignItems: 'center',
    },
    imageContainer: {
        width: '100%',
        height: 80,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        padding: 6,
        backgroundColor: '#E5F3F3',
        marginBottom: 8,
    },
    image: {
        width: '100%',
        height: '100%',
        resizeMode: 'contain',
    },
});

export default CategoryContainer;
