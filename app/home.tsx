import { useLocalSearchParams, useRouter } from 'expo-router';
import React from 'react';
import { Image, ImageBackground, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import useThemeStore from '../src/store/useThemeStore'; // Added import

const bgImage = require('../assets/images/bg.jpg');

export default function HomeScreen() {
  const router = useRouter();
  const { firstName, lastName, profilePhoto } = useLocalSearchParams();
  
  // 1. Hook into the theme store
  const { colors, mode } = useThemeStore();

  return (
    <ImageBackground source={bgImage} resizeMode="cover" style={styles.background}>
      {/* 2. Theme-aware overlay */}
      <View style={[
        styles.container, 
        { backgroundColor: mode === 'light' ? 'rgba(255,255,255,0.3)' : 'rgba(0,0,0,0.8)' }
      ]}>
        
        <View style={styles.header}>
          <Text style={[styles.welcomeText, { color: mode === 'light' ? '#f0a1fa' : colors.text }]}>
            Glad You’re Here, {firstName} !😉
          </Text>
          <Text style={[styles.subText, { color: mode === 'light' ? '#f0a1fa' : colors.text }]}>
            You’re officially part of the inner circle. Ready to set things up? 🫶🏼
          </Text> 
        </View>

        {/* 3. Card background and border react to theme */}
        <View style={[styles.card, { backgroundColor: mode === 'light' ? '#fff' : '#1e1e1e' }]}>
          <View style={[styles.imageWrapper, { borderColor: colors.primary }]}>
            {profilePhoto ? (
              <Image source={{ uri: profilePhoto as string }} style={styles.avatar} />
            ) : (
              <View style={styles.placeholder}>
                <Text style={{ fontFamily: 'MyCustomFont' }}>No Photo</Text>
              </View>
            )}
          </View>

          <Text style={[styles.nameText, { color: colors.text }]}>
            {firstName} {lastName}
          </Text>
          <Text style={[styles.badge, { color: colors.primary, backgroundColor: mode === 'light' ? 'rgba(70, 48, 235, 0.1)' : 'rgba(255,255,255,0.1)' }]}>
            Active Member
          </Text>
        </View>

        {/* 4. Logout button uses the primary theme color */}
        <TouchableOpacity 
          style={[styles.logoutBtn, { backgroundColor: colors.primary }]} 
          onPress={() => router.replace('/')}
        >
          <Text style={styles.logoutBtnText}>Logout</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: { flex: 1, width: '100%', height: '100%' },
  container: { flex: 1, alignItems: 'center', padding: 25, justifyContent: 'center' },
  header: { marginBottom: 30, alignItems: 'center' },
  welcomeText: { 
    fontFamily: 'MyCustomFont', 
    fontSize: 32, 
    fontWeight: 'bold', 
    textAlign: 'center',
    textShadowColor: 'rgba(0, 0, 0, 0.8)',
    textShadowOffset: { width: 2, height: 1 },
    textShadowRadius: 10
  },
  subText: { 
    fontFamily: 'MyCustomFont',
    fontSize: 16, 
    textAlign: 'center'
  },
  card: { 
    width: '100%', 
    borderRadius: 20, 
    padding: 30, 
    alignItems: 'center',
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    marginBottom: 40
  },
  imageWrapper: {
    width: 140,
    height: 140,
    borderRadius: 70,
    borderWidth: 3,
    padding: 3,
    marginBottom: 20,
    overflow: 'hidden'
  },
  avatar: { width: '100%', height: '100%', borderRadius: 70 },
  placeholder: { flex: 1, backgroundColor: '#f0a1fa', justifyContent: 'center', alignItems: 'center', width: '100%' },
  nameText: { 
    fontFamily: 'MyCustomFont', 
    fontSize: 24, 
    fontWeight: 'bold', 
  },
  badge: { 
    fontFamily: 'MyCustomFont', 
    marginTop: 5, 
    fontWeight: '700',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 10,
    overflow: 'hidden',
    fontSize: 12
  },
  logoutBtn: { 
    width: '100%', 
    padding: 18, 
    borderRadius: 15, 
    alignItems: 'center',
    elevation: 5
  },
  logoutBtnText: { 
    fontFamily: 'MyCustomFont', 
    color: '#fff', 
    fontSize: 18, 
    fontWeight: 'bold' 
  }
});