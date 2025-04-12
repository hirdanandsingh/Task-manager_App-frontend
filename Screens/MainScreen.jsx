import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React, {useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';
import asyncStorageService from '../Services/asyncService';
import {APP_TOKEN} from '../utils/constant';
import {useRoute} from '@react-navigation/native';

const WelcomeScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const handleLogout = async () => {
    try {
      await AsyncStorage.clear();
      navigation.replace('Login'); // replace 'Login' with your login screen name
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  useEffect(() => {
    (async () => {
      const token = await asyncStorageService.getItem(APP_TOKEN);
      const isLogin = route?.params?.isLogin ?? false;
      const isAuth = token ? false : isLogin ? false : true;
      console.log('token value -->>', token);

      if (isAuth) {
        navigation.navigate('Login');
      }
    })();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome! 🎉</Text>
      <Text style={styles.subtitle}>You have successfully signed in.</Text>
      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

export default WelcomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 10,
    color: 'black',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 40,
  },
  logoutButton: {
    backgroundColor: '#ff4d4d',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  logoutText: {
    color: '#fff',
    fontSize: 16,
  },
});
