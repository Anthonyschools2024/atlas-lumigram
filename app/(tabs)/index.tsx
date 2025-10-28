import { ThemedView } from '@/components/ThemedView';
import { StyleSheet, View } from 'react-native';
import { FlashList } from '@shopify/flash-list';
import { homeFeed } from '@/constants/placeholder';
import { PostItem } from '@/components/PostItem';
// No GestureHandlerRootView import needed here anymore

export default function HomeScreen() {
  return (
    // No GestureHandlerRootView wrapper needed here anymore
     <ThemedView style={styles.container}>
      <FlashList
        data={homeFeed}
        renderItem={({ item }) => <PostItem item={item} />}
        keyExtractor={(item) => item.id}
        estimatedItemSize={400}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />
    </ThemedView>
  );
}

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