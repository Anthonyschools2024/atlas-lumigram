import React from 'react';
import { StyleSheet, View, TouchableOpacity, Dimensions, Platform } from 'react-native';
import { Image } from 'expo-image';
import { FlashList } from '@shopify/flash-list';
import { useRouter } from 'expo-router';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { profileFeed } from '@/constants/placeholder'; // Assuming data is here
import { Colors } from '@/constants/Colors';

const screenWidth = Dimensions.get('window').width;
const numColumns = 3;
const imageMargin = 2;
const imageSize = (screenWidth - (numColumns + 1) * imageMargin) / numColumns;

// Placeholder user data - replace with actual data source later
const userProfile = {
  username: 'pink-flowers23131',
  profileImage: 'https://placedog.net/100/100?id=11', // Placeholder profile pic
};

export default function ProfileScreen() {
  const router = useRouter();

  const navigateToEditProfile = () => {
    router.push('/edit-profile');
  };

  const renderGridItem = ({ item }: { item: typeof profileFeed[0] }) => (
    <View style={styles.imageWrapper}>
       <Image
         source={{ uri: item.image }}
         style={styles.gridImage}
         contentFit="cover"
         transition={100} // Faster transition for grid
       />
    </View>
   );


  return (
    <ThemedView style={styles.container}>
       <View style={styles.profileHeader}>
          <TouchableOpacity onPress={navigateToEditProfile}>
             <Image
                source={{ uri: userProfile.profileImage }}
                style={styles.profileImage}
             />
          </TouchableOpacity>
          <ThemedText style={styles.username}>{userProfile.username}</ThemedText>
       </View>

       <FlashList
          data={profileFeed}
          renderItem={renderGridItem}
          keyExtractor={(item, index) => `${item.id}-${index}`} // Ensure unique keys if IDs repeat
          numColumns={numColumns}
          estimatedItemSize={imageSize}
          contentContainerStyle={styles.gridContainer}
          showsVerticalScrollIndicator={false}
       />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // Use default background from ThemedView
  },
  profileHeader: {
    alignItems: 'center',
    paddingVertical: 20,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: Colors.light.icon, // Adjust color based on theme if needed
    marginBottom: imageMargin * 2,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
    backgroundColor: '#ccc', // Placeholder bg
  },
  username: {
    fontSize: 18,
    // fontWeight: 'bold', // Username in screenshot doesn't look bold
  },
  gridContainer: {
    paddingHorizontal: imageMargin,
  },
   imageWrapper: {
     margin: imageMargin,
     backgroundColor: '#eee', // Placeholder bg for image cell
   },
  gridImage: {
    width: imageSize,
    height: imageSize,
  },
});