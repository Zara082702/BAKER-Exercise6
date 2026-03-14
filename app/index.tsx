import { useRouter } from 'expo-router';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Button, ImageBackground, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import useThemeStore from '../src/store/useThemeStore';

const bgImage = require('../assets/images/bg.jpg');

export default function LoginScreen() {
  const router = useRouter();
  const { colors, mode, toggleTheme } = useThemeStore(); // Get colors and mode

  const { control, handleSubmit, formState: { errors } } = useForm({
    defaultValues: { email: '', password: '' }
  });

  const onSubmit = (data: any) => {
    console.log('Login Success:', data);
    router.replace('/home'); 
  };

  return (
    <ImageBackground source={bgImage} resizeMode="cover" style={styles.background}>
      {/* THIS IS THE KEY CHANGE: 
          We change the overlay's background color based on the theme.
          We use 'rgba' or Hex with transparency so you can still see the image, 
          but the "vibe" changes from Light to Dark.
      */}
      <View style={[
        styles.overlay, 
        { backgroundColor: mode === 'light' ? 'rgba(255,255,255,0.4)' : 'rgba(0,0,0,0.75)' }
      ]}>
        
        <Pressable 
          onPress={toggleTheme} 
          style={[styles.themeBtn, { backgroundColor: colors.primary }]}
        >
          <Text style={{ color: 'white', fontWeight: 'bold' }}>
            {mode === 'light' ? '🌙 Set Dark' : '☀️ Set Light'}
          </Text>
        </Pressable>

        {/* Text colors now react to the theme store */}
        <Text style={[styles.header, { color: colors.text }]}>Greetings!</Text>
        <Text style={[styles.subHeader, { color: colors.text }]}>
            Ready to get started? Log in to continue your journey.
        </Text>
        
        <Controller
          control={control}
          rules={{ required: 'Email is required' }}
          render={({ field: { onChange, value } }) => (
            <TextInput 
              style={[styles.input, { backgroundColor: mode === 'light' ? '#f584ff' : '#333' }]} 
              onChangeText={onChange} 
              value={value} 
              placeholder="Email Address"
              placeholderTextColor={mode === 'light' ? '#000' : '#ccc'}
              autoCapitalize="none"
            />
          )}
          name="email"
        />
        
        <Controller
          control={control}
          rules={{ required: 'Password is required' }}
          render={({ field: { onChange, value } }) => (
            <TextInput 
              style={[styles.input, { backgroundColor: mode === 'light' ? '#f584ff' : '#333' }]} 
              onChangeText={onChange} 
              value={value} 
              secureTextEntry 
              placeholder="Password" 
              placeholderTextColor={mode === 'light' ? '#000' : '#ccc'}
            />
          )}
          name="password"
        />

        <View style={styles.buttonContainer}>
          <Button title="Sign In" onPress={handleSubmit(onSubmit)} color={colors.primary} />
        </View>

        <Pressable onPress={() => router.push('/register')} style={styles.link}>
          <Text style={[styles.linkText, { color: colors.primary }]}>New here? Create an account</Text>
        </Pressable>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: { flex: 1, width: '100%', height: '100%' },
  overlay: { 
    flex: 1, 
    padding: 30, 
    justifyContent: 'center' 
  },
  themeBtn: {
    alignSelf: 'flex-end',
    padding: 10,
    borderRadius: 20,
    marginBottom: 40,
  },
  header: { fontSize: 32, fontWeight: 'bold', fontFamily: 'MyCustomFont' },
  subHeader: { fontSize: 16, marginBottom: 30, fontWeight: '500', fontFamily: 'MyCustomFont' },
  input: { 
    borderWidth: 1, 
    padding: 15, 
    borderRadius: 10, 
    marginBottom: 15, 
    fontSize: 16, 
  },
  buttonContainer: { marginTop: 10, borderRadius: 10, overflow: 'hidden' },
  link: { marginTop: 20, alignItems: 'center' },
  linkText: { fontWeight: '700' }
});