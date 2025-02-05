import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Camera } from 'react-native-vision-camera';
import { Button, Text } from 'react-native-paper';

interface VideoRecordingProps {
  orderId: string;
  onRecordingComplete: (videoUri: string) => void;
}

export const VideoRecording: React.FC<VideoRecordingProps> = ({
  orderId,
  onRecordingComplete,
}) => {
  const [isRecording, setIsRecording] = useState(false);
  const [camera, setCamera] = useState<Camera | null>(null);

  const startRecording = async () => {
    if (camera) {
      setIsRecording(true);
      try {
        const video = await camera.startRecording({
          flash: 'off',
          onRecordingFinished: (video) => {
            onRecordingComplete(video.path);
          },
          onRecordingError: (error) => {
            console.error('Recording error:', error);
          },
        });
      } catch (error) {
        console.error('Error starting recording:', error);
      }
    }
  };

  const stopRecording = async () => {
    if (camera) {
      await camera.stopRecording();
      setIsRecording(false);
    }
  };

  return (
    <View style={styles.container}>
      <Camera
        ref={(ref) => setCamera(ref)}
        style={styles.camera}
        device={devices.back}
        isActive={true}
      />
      <Button
        mode="contained"
        onPress={isRecording ? stopRecording : startRecording}
      >
        {isRecording ? 'Stop Recording' : 'Start Recording'}
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  camera: {
    flex: 1,
  },
}); 