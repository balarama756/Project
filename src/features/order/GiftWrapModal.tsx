import React, { useState } from 'react';
import { Modal, StyleSheet, View } from 'react-native';
import { Text, TextInput, Button } from 'react-native-paper';

interface GiftWrapModalProps {
  visible: boolean;
  onDismiss: () => void;
  onConfirm: (details: GiftWrapDetails) => void;
}

interface GiftWrapDetails {
  recipientName: string;
  occasion: string;
  message: string;
}

export const GiftWrapModal: React.FC<GiftWrapModalProps> = ({
  visible,
  onDismiss,
  onConfirm,
}) => {
  const [details, setDetails] = useState<GiftWrapDetails>({
    recipientName: '',
    occasion: '',
    message: '',
  });

  const handleConfirm = () => {
    onConfirm(details);
    onDismiss();
  };

  return (
    <Modal visible={visible} onDismiss={onDismiss} transparent>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text variant="titleLarge">Gift Wrap Service</Text>
          <Text variant="bodyMedium" style={styles.freeText}>
            (Free Service)
          </Text>
          
          <TextInput
            label="Recipient Name"
            value={details.recipientName}
            onChangeText={(text) => setDetails({ ...details, recipientName: text })}
            style={styles.input}
          />
          
          <TextInput
            label="Occasion"
            value={details.occasion}
            onChangeText={(text) => setDetails({ ...details, occasion: text })}
            style={styles.input}
          />
          
          <TextInput
            label="Gift Message"
            value={details.message}
            onChangeText={(text) => setDetails({ ...details, message: text })}
            multiline
            numberOfLines={3}
            style={styles.input}
          />
          
          <View style={styles.buttonContainer}>
            <Button onPress={onDismiss} mode="outlined" style={styles.button}>
              Cancel
            </Button>
            <Button 
              onPress={handleConfirm} 
              mode="contained" 
              style={styles.button}
            >
              Confirm
            </Button>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 8,
    width: '90%',
  },
  freeText: {
    color: 'green',
    marginBottom: 16,
  },
  input: {
    marginBottom: 12,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
  },
  button: {
    flex: 1,
    marginHorizontal: 8,
  },
}); 