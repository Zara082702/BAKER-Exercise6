import * as ImagePicker from 'expo-image-picker';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Alert, Button, Image, ImageBackground, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import useThemeStore from '../src/store/useThemeStore';

const bgImage = require('../assets/images/bg.jpg');

export default function SetupScreen() {
  const router = useRouter();
  const { colors, mode } = useThemeStore();
  const [image, setImage] = useState<string | null>(null); 
  
  const { control, handleSubmit, formState: { errors } } = useForm({
    defaultValues: { firstName: '', lastName: '' }
  });

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission Needed', 'We need access to your gallery to upload a photo!');
      return;
    }
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images, 
      allowsEditing: true, 
      aspect: [1, 1], 
      quality: 1,
    });
    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const onCompleteSetup = (data: any) => {
    router.replace({
      pathname: '/home',
      params: { firstName: data.firstName, lastName: data.lastName, profilePhoto: image },
    }); 
  };

  return (
    <ImageBackground source={bgImage} resizeMode="cover" style={styles.background}>
      <View style={[
        styles.container, 
        { backgroundColor: mode === 'light' ? 'rgba(255,255,255,0.4)' : 'rgba(0,0,0,0.75)' }
      ]}>
        <Text style={[styles.header, { color: colors.text }]}>SET UP YOUR ACCOUNT</Text>
        <Text style={[styles.subHeader, { color: colors.text }]}>Tell Us About Yourself! </Text>

        <TouchableOpacity style={styles.photoContainer} onPress={pickImage}>
          <View style={[styles.photoCircle, { backgroundColor: mode === 'light' ? 'rgba(255, 255, 255, 0.9)' : '#333' }]}>
            {image ? (
              <Image source={{ uri: image }} style={styles.profileImage} />
            ) : (
              <Text style={[styles.photoText, { color: colors.primary }]}>Add Photo</Text>
            )}
          </View>
        </TouchableOpacity>

        <Text style={[styles.label, { color: colors.text }]}>First Name</Text>
        <Controller
          control={control}
          rules={{ required: 'First name is required' }}
          render={({ field: { onChange, value } }) => (
            <TextInput 
              style={[styles.input, { backgroundColor: mode === 'light' ? '#fff' : '#444', color: mode === 'light' ? '#000' : '#fff' }]} 
              onChangeText={onChange} 
              value={value} 
              placeholderTextColor={mode === 'light' ? '#000000' : '#ccc'} 
            />
          )}
          name="firstName"
        />

        <Text style={[styles.label, { color: colors.text }]}>Last Name</Text>
        <Controller
          control={control}
          rules={{ required: 'Last name is required' }}
          render={({ field: { onChange, value } }) => (
            <TextInput 
              style={[styles.input, { backgroundColor: mode === 'light' ? '#fff' : '#444', color: mode === 'light' ? '#000' : '#fff' }]} 
              onChangeText={onChange} 
              value={value} 
              placeholderTextColor={mode === 'light' ? '#000000' : '#ccc'} 
            />
          )}
          name="lastName"
        />

        <View style={styles.buttonWrapper}>
          <Button title="Complete Setup" onPress={handleSubmit(onCompleteSetup)} color={colors.primary} />
        </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: { flex: 1, width: '100%', height: '100%' },
  container: { flex: 1, padding: 25, justifyContent: 'center' },
  header: { fontFamily: 'MyCustomFont', fontSize: 32, fontWeight: 'bold', textAlign: 'center' },
  subHeader: { fontFamily: 'MyCustomFont', fontSize: 16, textAlign: 'center', marginBottom: 30 },
  photoContainer: { alignItems: 'center', marginBottom: 30 },
  photoCircle: { width: 120, height: 120, borderRadius: 60, borderWidth: 2, borderColor: '#bb498f', justifyContent: 'center', alignItems: 'center', overflow: 'hidden' },
  profileImage: { width: '100%', height: '100%' }, 
  photoText: { fontFamily: 'MyCustomFont', fontSize: 14, fontWeight: 'bold' },
  label: { fontFamily: 'MyCustomFont', fontSize: 14, fontWeight: '600', marginBottom: 5 },
  input: { fontFamily: 'MyCustomFont', borderWidth: 1, borderColor: '#ddd', padding: 15, borderRadius: 12, marginBottom: 15, fontSize: 16 },
  buttonWrapper: { marginTop: 10, borderRadius: 12, overflow: 'hidden' }
});