import React, { useState } from 'react';
import { View, StyleSheet, Modal } from 'react-native';
import { Text, Button, TextInput, Rating } from 'react-native-paper';

interface ReviewModalProps {
  visible: boolean;
  onDismiss: () => void;
  onSubmit: (review: ReviewData) => void;
  orderId: string;
}

interface ReviewData {
  rating: number;
  comment: string;
  orderId: string;
}

export const ReviewModal: React.FC<ReviewModalProps> = ({
  visible,
  onDismiss,
  onSubmit,
  orderId,
}) => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');

  const handleSubmit = () => {
    onSubmit({
      rating,
      comment,
      orderId,
    });
    onDismiss();
  };

  return (
    <Modal visible={visible} onDismiss={onDismiss} transparent>
      <View style={styles.container}>
        <View style={styles.content}>
          <Text variant="titleLarge" style={styles.title}>
            Rate your experience
          </Text>
          
          <Rating
            value={rating}
            onValueChange={setRating}
            style={styles.rating}
          />
          
          <TextInput
            label="Your feedback"
            value={comment}
            onChangeText={setComment}
            multiline
            numberOfLines={3}
            style={styles.input}
          />
          
          <View style={styles.buttons}>
            <Button mode="outlined" onPress={onDismiss} style={styles.button}>
              Cancel
            </Button>
            <Button 
              mode="contained" 
              onPress={handleSubmit}
              disabled={rating === 0}
              style={styles.button}
            >
              Submit
            </Button>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  content: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 8,
    width: '90%',
  },
  title: {
    textAlign: 'center',
    marginBottom: 16,
  },
  rating: {
    marginVertical: 16,
  },
  input: {
    marginBottom: 16,
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    flex: 1,
    marginHorizontal: 8,
  },
}); 