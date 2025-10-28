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
  ActivityIndicator
} from "react-native";
import { Colors } from "@/constants/Colors";
import React, { useState } from "react";


export default function RegisterScreen() {
  const { register, authError, loadingAuthAction } = useAuth(); // Get loading state
  const colorScheme = useColorScheme() ?? "light";
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // Removed local loading state, use context's loadingAuthAction instead

  const handleRegister = async () => {
    // No need to set local loading state
    await register(email, password);
    // No need to unset local loading state
  };

  // Styles remain the same
  const styles = StyleSheet.create({
      container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 40,
        backgroundColor: Colors.dark.background,
      },
      logo: {
        width: 150,
        height: 100,
        resizeMode: "contain",
        marginBottom: 40,
      },
      title: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 30,
        color: Colors.dark.text,
      },
      input: {
        width: "100%",
        height: 50,
        borderWidth: 1,
        borderColor: Colors.dark.icon,
        borderRadius: 8,
        paddingHorizontal: 15,
        marginBottom: 15,
        color: Colors.dark.text,
        fontSize: 16,
      },
      button: {
        width: "100%",
        height: 50,
        backgroundColor: Colors.light.tint,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 8,
        marginBottom: 15,
        flexDirection: 'row',
      },
      buttonText: {
        color: Colors.dark.background,
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
        borderColor: Colors.light.tint,
      },
      linkButtonText: {
        color: Colors.light.tint,
        fontSize: 16,
      },
      link: {
         width: "100%",
      },
      errorText: {
       color: 'red',
       marginBottom: 10,
       textAlign: 'center',
       minHeight: 20, // Ensure space for error message
    }
    });


  return (
    <ThemedView style={styles.container}>
       <Image
        source={require("@/assets/images/logo.png")}
        style={styles.logo}
      />

      <ThemedText type="subtitle" style={styles.title}>
        Register
      </ThemedText>

      {/* Display Authentication Error */}
      <ThemedText style={styles.errorText}>{authError || ' '}</ThemedText>

      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor={Colors.dark.icon}
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
        editable={!loadingAuthAction} // Use context loading state
      />

      <TextInput
        style={styles.input}
        placeholder="Password"
        placeholderTextColor={Colors.dark.icon}
        value={password}
        onChangeText={setPassword}
        secureTextEntry={true}
        editable={!loadingAuthAction} // Use context loading state
      />

      <TouchableOpacity style={styles.button} onPress={handleRegister} disabled={loadingAuthAction}>
         {loadingAuthAction ? ( // Use context loading state
          <ActivityIndicator color={Colors.dark.background} />
        ) : (
          <ThemedText style={styles.buttonText}>Create Account</ThemedText>
        )}
      </TouchableOpacity>

      <Link href="/login" asChild style={styles.link}>
         <TouchableOpacity style={styles.linkButton} disabled={loadingAuthAction}>
             <ThemedText style={styles.linkButtonText}>Login to existing account</ThemedText>
         </TouchableOpacity>
      </Link>
    </ThemedView>
  );
}