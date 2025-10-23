import React, { useState } from 'react';
import { StyleSheet, View, TextInput, TouchableOpacity, Alert, Platform, Dimensions } from 'react-native';
import { Image } from 'expo-image';
import * as ImagePicker from 'expo-image-picker';
import { useRouter } from 'expo-router';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Colors } from '@/constants/Colors';

const screenWidth = Dimensions.get('window').width;

// Placeholder user data - replace with actual data source/context later
const initialUserProfile = {
  username: 'pink-flowers23131',
  profileImage: 'https://placedog.net/100/100?id=11', // Placeholder profile pic
};

export default function EditProfileScreen() {
  const router = useRouter();
  const [username, setUsername] = useState(initialUserProfile.username);
  const [imageUri, setImageUri] = useState<string | null>(initialUserProfile.profileImage);
  const colorScheme = Platform.OS === 'ios' ? useColorScheme() : 'light';

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission needed', 'Sorry, we need camera roll permissions to update your profile picture.');
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true, // Allow editing for profile pics
      aspect: [1, 1], // Square aspect ratio
      quality: 0.8,
    });

    if (!result.canceled) {
      setImageUri(result.assets[0].uri);
    }
  };

  const handleSaveChanges = () => {
    // In a real app, you would save the username and potentially upload the new imageUri
    console.log('Saving Profile:', { username, imageUri });
    Alert.alert('Profile Saved (Simulated)');
    // Navigate back to the profile screen
    if (router.canGoBack()) {
       router.back();
    } else {
        // Fallback if navigation history is unclear, go to profile tab
        router.replace('/profile');
    }
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      paddingTop: 40, // More padding at the top
      paddingHorizontal: 20,
      backgroundColor: colorScheme === 'dark' ? Colors.dark.background : Colors.light.background,
    },
    profileImageContainer: {
        marginBottom: 30,
    },
    profileImage: {
      width: 120,
      height: 120,
      borderRadius: 60, // Make it circular
      backgroundColor: '#ccc', // Placeholder bg
    },
    input: {
      width: '100%',
      height: 50,
      borderWidth: 1,
      borderColor: colorScheme === 'dark' ? Colors.dark.icon : Colors.light.icon,
      borderRadius: 8,
      paddingHorizontal: 15,
      marginBottom: 20,
      color: colorScheme === 'dark' ? Colors.dark.text : Colors.light.text,
      fontSize: 16,
    },
    button: {
      width: '100%',
      height: 50,
      backgroundColor: Colors.light.tint, // Teal button background
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 8,
    },
    buttonText: {
      color: Colors.dark.background, // Dark text on button
      fontSize: 16,
      fontWeight: 'bold',
    },
  });

  return (
    <ThemedView style={styles.container}>
      <TouchableOpacity onPress={pickImage} style={styles.profileImageContainer}>
        <Image
          source={{ uri: imageUri || undefined }} // Use imageUri, fallback can be handled by placeholder prop or style bg
          placeholder={require('@/assets/images/placeholder.png')} // Use generic placeholder
          style={styles.profileImage}
          contentFit="cover"
          transition={300}
        />
      </TouchableOpacity>

      <TextInput
        style={styles.input}
        placeholder="Username"
        placeholderTextColor={colorScheme === 'dark' ? Colors.dark.icon : Colors.light.icon}
        value={username}
        onChangeText={setUsername}
        autoCapitalize="none"
      />

      <TouchableOpacity style={styles.button} onPress={handleSaveChanges}>
        <ThemedText style={styles.buttonText}>Save profile</ThemedText>
      </TouchableOpacity>
    </ThemedView>
  );
}