import React, { useState } from 'react';
import { StyleSheet, View, Alert, Dimensions } from 'react-native';
import { Image } from 'expo-image';
import { GestureDetector, Gesture, GestureHandlerRootView } from 'react-native-gesture-handler';
import { runOnJS } from 'react-native-reanimated';
import { ThemedText } from './ThemedText'; // Assuming ThemedText is in components directory

interface PostItemProps {
  item: {
    id: string;
    image: string;
    caption: string;
    createdBy: string;
  };
}

const screenWidth = Dimensions.get('window').width;

export function PostItem({ item }: PostItemProps) {
  const [showCaption, setShowCaption] = useState(false);

  // --- Gesture Handlers ---
  const handleShowCaption = (shouldShow: boolean) => {
    'worklet'; // Indicate this runs on the UI thread potentially
    runOnJS(setShowCaption)(shouldShow); // Use runOnJS to update React state
  };

  const handleDoubleTap = () => {
    'worklet';
    runOnJS(Alert.alert)('Double Tap!', 'You double tapped the image.');
  };

  // --- Gestures ---
  const longPressGesture = Gesture.LongPress()
    .minDuration(500) // 500ms for long press
    .onStart(() => {
      handleShowCaption(true);
    })
    .onEnd(() => {
       // Optionally hide caption on release, or keep it visible until next interaction
       // For this task, let's hide it on release as specified implicitly
       handleShowCaption(false);
    })
     .onFinalize(() => {
       // Ensure caption is hidden if gesture cancels/fails
       handleShowCaption(false);
     });


  const doubleTapGesture = Gesture.Tap()
    .numberOfTaps(2)
    .onEnd((_event, success) => {
      if (success) {
        handleDoubleTap();
      }
    });

  // Combine gestures: Double tap takes priority if detected quickly, otherwise long press can activate.
  const composedGesture = Gesture.Exclusive(doubleTapGesture, longPressGesture);

  return (
    // Wrap individual item if needed, although FlashList might handle root view better
    // For safety, let's wrap the interactive part
    // <GestureHandlerRootView> // Wrapping the whole screen in index.tsx is usually sufficient
      <View style={styles.container}>
        <GestureDetector gesture={composedGesture}>
          <View>
            <Image
              source={{ uri: item.image }}
              style={styles.image}
              contentFit="cover"
              transition={300} // Smooth transition on load
            />
            {showCaption && (
              <View style={styles.captionOverlay}>
                <ThemedText style={styles.captionText}>{item.caption}</ThemedText>
              </View>
            )}
          </View>
        </GestureDetector>
      </View>
    // </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 16, // Space between items
    alignItems: 'center', // Center image if container is wider
  },
  image: {
    width: screenWidth * 0.95, // Make image take 95% of screen width
    aspectRatio: 1, // Make it square
    backgroundColor: '#ccc', // Placeholder background
    borderRadius: 8,
  },
  captionOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.6)', // Semi-transparent black background
    padding: 10,
    borderBottomLeftRadius: 8, // Match image border radius
    borderBottomRightRadius: 8,
  },
  captionText: {
    color: 'white',
    fontSize: 14,
    textAlign: 'center',
  },
});