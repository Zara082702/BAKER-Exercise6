import { useRouter } from 'expo-router';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Button, ImageBackground, StyleSheet, Text, TextInput, View } from 'react-native';
import useThemeStore from '../src/store/useThemeStore';

const bgImage = require('../assets/images/bg.jpg');

export default function RegisterScreen() {
  const router = useRouter();
  const { colors, mode } = useThemeStore();

  const { control, handleSubmit, watch, formState: { errors } } = useForm({
    defaultValues: { email: '', password: '', confirmPassword: '' }
  });

  const pwd = watch('password');
  const onSubmit = () => router.replace('/setup');

  return (
    <ImageBackground source={bgImage} resizeMode="cover" style={styles.background}>
      <View style={[
        styles.container, 
        { backgroundColor: mode === 'light' ? 'rgba(255,255,255,0.4)' : 'rgba(0,0,0,0.75)' }
      ]}>
        <Text style={[styles.header, { color: colors.text }]}>Sign Up</Text>
        <Text style={[styles.subHeader, { color: colors.text }]}>Create an account to get started</Text>
        
        <Controller
          control={control}
          rules={{ required: 'Email is required' }}
          render={({ field: { onChange, value } }) => (
            <TextInput 
              style={[styles.input, { backgroundColor: mode === 'light' ? '#c96fd1' : '#333', color: mode === 'light' ? '#000' : '#fff' }]} 
              onChangeText={onChange} 
              value={value} 
              placeholder="Email" 
              placeholderTextColor={mode === 'light' ? '#000000' : '#ccc'}
            />
          )}
          name="email"
        />

        <Controller
          control={control}
          rules={{ required: 'Password is required' }}
          render={({ field: { onChange, value } }) => (
            <TextInput 
              style={[styles.input, { backgroundColor: mode === 'light' ? '#c96fd1' : '#333', color: mode === 'light' ? '#000' : '#fff' }]} 
              onChangeText={onChange} 
              value={value} 
              secureTextEntry 
              placeholder="Password" 
              placeholderTextColor={mode === 'light' ? '#000000' : '#ccc'}
            />
          )}
          name="password"
        />

        <Controller
          control={control}
          rules={{ validate: (val) => val === pwd || "No match" }}
          render={({ field: { onChange, value } }) => (
            <TextInput 
              style={[styles.input, { backgroundColor: mode === 'light' ? '#c96fd1' : '#333', color: mode === 'light' ? '#000' : '#fff' }]} 
              onChangeText={onChange} 
              value={value} 
              secureTextEntry 
              placeholder="Confirm Password" 
              placeholderTextColor={mode === 'light' ? '#000000' : '#ccc'}
            />
          )}
          name="confirmPassword"
        />
        {errors.confirmPassword && (
          <Text style={styles.errorText}>Passwords must match</Text>
        )}

        <View style={styles.buttonWrapper}>
          <Button title="Register" onPress={handleSubmit(onSubmit)} color={colors.primary} />
        </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: { flex: 1, width: '100%', height: '100%' },
  container: { flex: 1, padding: 30, justifyContent: 'center' },
  header: { fontFamily: 'MyCustomFont', fontSize: 36, fontWeight: 'bold', marginBottom: 5 },
  subHeader: { fontFamily: 'MyCustomFont', fontSize: 16, marginBottom: 30 },
  input: { fontFamily: 'MyCustomFont', borderWidth: 1, padding: 15, borderRadius: 12, marginBottom: 15, fontSize: 16 },
  buttonWrapper: { marginTop: 10, borderRadius: 12, overflow: 'hidden' },
  errorText: { color: '#ff4d4d', fontFamily: 'MyCustomFont', marginBottom: 10, fontWeight: 'bold' },
});