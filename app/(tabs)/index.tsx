import { ThemedView } from '@/components/ThemedView';
import { StyleSheet, View } from 'react-native';
import { FlashList } from '@shopify/flash-list';
import { homeFeed } from '@/constants/placeholder'; // Updated path
import { PostItem } from '@/components/PostItem'; // Import the new component
import { GestureHandlerRootView } from 'react-native-gesture-handler'; // Import Root View

export default function HomeScreen() {
  return (
    // Wrap the entire screen with GestureHandlerRootView
    <GestureHandlerRootView style={{ flex: 1 }}>
       <ThemedView style={styles.container}>
        <FlashList
          data={homeFeed}
          renderItem={({ item }) => <PostItem item={item} />}
          keyExtractor={(item) => item.id}
          estimatedItemSize={400} // Adjust based on your image size + margin
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
        />
      </ThemedView>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // Remove centering if list should fill screen
    // justifyContent: 'center',
    // alignItems: 'center',
  },
  listContent: {
    paddingTop: 10, // Add some padding at the top
    paddingBottom: 10, // Add some padding at the bottom
    paddingHorizontal: 5, // Add horizontal padding if needed
  },
});