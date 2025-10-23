import { ThemedView } from '@/components/ThemedView';
import { StyleSheet } from 'react-native';
import { FlashList } from '@shopify/flash-list';
import { favoritesFeed } from '@/constants/placeholder'; // Use favoritesFeed data
import { PostItem } from '@/components/PostItem'; // Reuse the PostItem component
import { GestureHandlerRootView } from 'react-native-gesture-handler'; // Import Root View

export default function FavoritesScreen() {
  return (
    // Wrap the entire screen with GestureHandlerRootView
    <GestureHandlerRootView style={{ flex: 1 }}>
       <ThemedView style={styles.container}>
        <FlashList
          data={favoritesFeed} // Use the correct data source
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

// Re-use similar styles as HomeScreen for consistency
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  listContent: {
    paddingTop: 10,
    paddingBottom: 10,
    paddingHorizontal: 5,
  },
});