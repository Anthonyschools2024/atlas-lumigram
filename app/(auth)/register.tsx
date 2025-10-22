import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { useAuth } from "@/contexts/AuthContext";
import { Link } from "expo-router";
import {
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
  useColorScheme,
  Platform,
} from "react-native";
import { Colors } from "@/constants/Colors"; // Import Colors
import { useState } from "react";


export default function RegisterScreen() {
  const { login } = useAuth(); // Simulate login after registration
  const colorScheme = useColorScheme() ?? "light";
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Re-use styles similar to LoginScreen for consistency
  const styles = StyleSheet.create({
      container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 40,
        backgroundColor: Colors.dark.background, // Dark background
      },
      logo: {
        width: 150, // Adjust size as needed
        height: 100, // Adjust size as needed
        resizeMode: "contain",
        marginBottom: 40,
      },
      title: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 30,
        color: Colors.dark.text, // White text
      },
      input: {
        width: "100%",
        height: 50,
        borderWidth: 1,
        borderColor: Colors.dark.icon, // Use a subtle border color
        borderRadius: 8,
        paddingHorizontal: 15,
        marginBottom: 15,
        color: Colors.dark.text, // White text for input
        fontSize: 16,
      },
      button: {
        width: "100%",
        height: 50,
        backgroundColor: Colors.light.tint, // Teal button background
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 8,
        marginBottom: 15,
      },
      buttonText: {
        color: Colors.dark.background, // Dark text on button
        fontSize: 16,
        fontWeight: "bold",
      },
      linkButton: {
        width: "100%",
        height: 50,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 8,
        borderWidth: 1,
        borderColor: Colors.light.tint, // Teal border for secondary button
      },
      linkButtonText: {
        color: Colors.light.tint, // Teal text for secondary button link
        fontSize: 16,
      },
      link: {
         width: "100%", // Make link take full width for touch area
      },
    });


  return (
    <ThemedView style={styles.container}>
       {/* Assuming logo.png is in assets/images */}
       <Image
        source={require("@/assets/images/logo.png")}
        style={styles.logo}
      />

      <ThemedText type="subtitle" style={styles.title}>
        Register
      </ThemedText>

      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor={Colors.dark.icon} // Lighter placeholder text
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <TextInput
        style={styles.input}
        placeholder="Password"
        placeholderTextColor={Colors.dark.icon} // Lighter placeholder text
        value={password}
        onChangeText={setPassword}
        secureTextEntry={true} // Hide password
      />

      <TouchableOpacity style={styles.button} onPress={login}>
        <ThemedText style={styles.buttonText}>Create Account</ThemedText>
      </TouchableOpacity>

      <Link href="/login" asChild style={styles.link}>
         <TouchableOpacity style={styles.linkButton}>
             <ThemedText style={styles.linkButtonText}>Login to existing account</ThemedText>
         </TouchableOpacity>
      </Link>
    </ThemedView>
  );
}