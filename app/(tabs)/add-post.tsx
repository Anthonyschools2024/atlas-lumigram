import React, { useState } from 'react';
import { StyleSheet, TextInput, TouchableOpacity, Alert, Platform, Dimensions, View } from 'react-native';
import { Image } from 'expo-image';
import * as ImagePicker from 'expo-image-picker';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Colors } from '@/constants/Colors';
import MaterialIcons from '@expo/vector-icons/MaterialIcons'; // For icon

const screenWidth = Dimensions.get('window').width;

export default function AddPostScreen() {
  const [imageUri, setImageUri] = useState<string | null>(null);
  const [caption, setCaption] = useState('');
  const colorScheme = Platform.OS === 'ios' ? useColorScheme() : 'light'; // Assuming dark mode isn't fully supported or needed here based on screenshot

  const pickImage = async () => {
    // Request permission if not granted
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission needed', 'Sorry, we need camera roll permissions to make this work!');
      return;
    }

    // Launch image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: false, // Or true if you want editing
      aspect: [1, 1], // Keep it square like Instagram
      quality: 0.8, // Compress image slightly
    });

    if (!result.canceled) {
      setImageUri(result.assets[0].uri);
    }
  };

  const handleAddPost = () => {
    if (!imageUri) {
      Alert.alert('No Image', 'Please select an image first.');
      return;
    }
    // In a real app, you'd upload the image and caption here
    Alert.alert('Post Added (Simulated)', `Image: ${imageUri}\nCaption: ${caption}`);
    // Optionally reset after posting
    // resetFields();
  };

  const resetFields = () => {
     setImageUri(null);
     setCaption('');
  };

  // Consistent styling with login/register
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      paddingTop: 20, // Add some padding at the top
      paddingHorizontal: 20,
       // Use light background based on screenshots, adjust if theme needed
       backgroundColor: colorScheme === 'dark' ? Colors.dark.background : Colors.light.background,
    },
    imageContainer: {
        width: screenWidth * 0.9,
        height: screenWidth * 0.9, // Square aspect ratio
        backgroundColor: '#e0e0e0', // Light grey placeholder background
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
        borderRadius: 8,
        overflow: 'hidden', // Ensure image stays within bounds
    },
    image: {
      width: '100%',
      height: '100%',
    },
    placeholderButton: {
      justifyContent: 'center',
      alignItems: 'center',
    },
    placeholderIcon: {
        // Style for the placeholder icon inside image container if needed
    },
    chooseButton: {
      width: '90%',
      height: 50,
      backgroundColor: Colors.light.tint, // Teal button background
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 8,
      marginBottom: 20,
      flexDirection: 'row', // Align icon and text
      gap: 10,
    },
    chooseButtonText: {
      color: Colors.dark.background, // Dark text on button
      fontSize: 16,
      fontWeight: 'bold',
    },
    input: {
      width: '90%',
      height: 50,
      borderWidth: 1,
      borderColor: colorScheme === 'dark' ? Colors.dark.icon : Colors.light.icon,
      borderRadius: 8,
      paddingHorizontal: 15,
      marginBottom: 15,
      color: colorScheme === 'dark' ? Colors.dark.text : Colors.light.text,
      fontSize: 16,
      textAlignVertical: 'top', // Align text to top for multiline potentially
    },
    button: {
      width: '90%',
      height: 50,
      backgroundColor: Colors.light.tint, // Teal button background
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 8,
      marginBottom: 15,
    },
    buttonText: {
      color: Colors.dark.background, // Dark text on button
      fontSize: 16,
      fontWeight: 'bold',
    },
    resetButtonText: {
       color: colorScheme === 'dark' ? Colors.dark.icon : Colors.light.icon, // Greyish text
       fontSize: 16,
    }
  });


  return (
    <ThemedView style={styles.container}>
      {!imageUri ? (
         // Show placeholder/button when no image is selected
         <>
         <View style={styles.imageContainer}>
             {/* Use the placeholder image asset */}
             <Image
                source={require('@/assets/images/placeholder.png')}
                style={styles.placeholderIcon} // Add specific styling if needed
                contentFit='contain'
            />
         </View>
         <TouchableOpacity style={styles.chooseButton} onPress={pickImage}>
            <MaterialIcons name="photo-library" size={24} color={Colors.dark.background} />
            <ThemedText style={styles.chooseButtonText}>Choose a photo</ThemedText>
         </TouchableOpacity>
         {/* Keep placeholders for caption/save but maybe disable or style differently */}
         <TextInput
            style={[styles.input, { backgroundColor: '#f0f0f0' }]} // Indicate disabled state
            placeholder="Add a caption..."
            placeholderTextColor={Colors.light.icon}
            editable={false} // Disable caption until image selected
          />
          <TouchableOpacity style={[styles.button, { backgroundColor: '#cccccc' }]} disabled>
            <ThemedText style={[styles.buttonText, { color: '#888888'}]}>Save</ThemedText>
          </TouchableOpacity>
          <TouchableOpacity onPress={resetFields} disabled>
             <ThemedText style={[styles.resetButtonText, { color: '#aaaaaa' }]}>Reset</ThemedText>
          </TouchableOpacity>
         </>

      ) : (
        // Show image, caption input, and buttons when an image IS selected
        <>
          <View style={styles.imageContainer}>
            <Image
              source={{ uri: imageUri }}
              style={styles.image}
              placeholder={require('@/assets/images/placeholder.png')} // Use placeholder while loading
              contentFit="cover"
              transition={300}
            />
          </View>

          <TextInput
            style={styles.input}
            placeholder="Add a caption..."
            placeholderTextColor={colorScheme === 'dark' ? Colors.dark.icon : Colors.light.icon}
            value={caption}
            onChangeText={setCaption}
            multiline // Allow multiline captions if desired
          />

          <TouchableOpacity style={styles.button} onPress={handleAddPost}>
            <ThemedText style={styles.buttonText}>Save</ThemedText>
          </TouchableOpacity>

          <TouchableOpacity onPress={resetFields}>
             <ThemedText style={styles.resetButtonText}>Reset</ThemedText>
          </TouchableOpacity>
        </>
      )}
    </ThemedView>
  );
}