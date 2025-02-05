import React, { useState } from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import { Text, Button } from 'react-native-paper';

interface GiftWrapProps {
  onGiftWrapSelect: (details: GiftWrapDetails) => void;
}

interface GiftWrapDetails {
  recipientName: string;
  occasion: string;
  message: string;
}

export const GiftWrapService: React.FC<GiftWrapProps> = ({ onGiftWrapSelect }) => {
  const [details, setDetails] = useState<GiftWrapDetails>({
    recipientName: '',
    occasion: '',
    message: '',
  });

  return (
    <View style={styles.container}>
      <Text variant="titleMedium">Gift Wrap Service (Free)</Text>
      <TextInput
        style={styles.input}
        placeholder="Recipient Name"
        value={details.recipientName}
        onChangeText={(text) => setDetails({ ...details, recipientName: text })}
      />
      <TextInput
        style={styles.input}
        placeholder="Occasion"
        value={details.occasion}
        onChangeText={(text) => setDetails({ ...details, occasion: text })}
      />
      <TextInput
        style={styles.input}
        placeholder="Gift Message"
        multiline
        value={details.message}
        onChangeText={(text) => setDetails({ ...details, message: text })}
      />
      <Button 
        mode="contained" 
        onPress={() => onGiftWrapSelect(details)}
      >
        Add Gift Wrap
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  input: {
    marginVertical: 8,
    padding: 8,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
  },
}); 