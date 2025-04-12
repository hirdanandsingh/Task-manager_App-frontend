import AsyncStorage from '@react-native-async-storage/async-storage';
import {isValidJSON} from '../utils/helper';

const asyncStorageService = {
  // Save data to AsyncStorage
  saveItem: async (key, value) => {
    try {
      if (typeof value === 'string') {
        await AsyncStorage.setItem(key, value);
      } else if (value) {
        await AsyncStorage.setItem(key, JSON.stringify(value));
      }
      console.log(`Data saved under the key: ${key}`);
      console.log(`Data saved under the value: ${value}`);
    } catch (error) {
      console.error(`Error saving data: ${error}`);
    }
  },

  // Retrieve data from AsyncStorage
  getItem: async key => {
    try {
      const value = await AsyncStorage.getItem(key);
      if (value && isValidJSON(value)) {
        return JSON.parse(value);
      }
      return value;
    } catch (error) {
      console.error(`Error getting data: ${error}`);
      return null;
    }
  },

  // Remove an item from AsyncStorage
  removeItem: async key => {
    try {
      await AsyncStorage.removeItem(key);
      console.log(`Data removed under the key: ${key}`);
    } catch (error) {
      console.error(`Error removing data: ${error}`);
    }
  },

  // Clear all data from AsyncStorage
  clearAll: async () => {
    try {
      await AsyncStorage.clear();
      console.log('All data cleared');
    } catch (error) {
      console.error(`Error clearing data: ${error}`);
    }
  },

  // Get multiple items at once
  multiGetItems: async keys => {
    try {
      const result = await AsyncStorage.multiGet(keys);
      return result.map(([key, value]) => ({
        key,
        value: value ? JSON.parse(value) : null,
      }));
    } catch (error) {
      console.error(`Error getting multiple items: ${error}`);
      return [];
    }
  },

  // Set multiple items at once
  multiSetItems: async data => {
    try {
      const formattedData = data.map(([key, value]) => [
        key,
        JSON.stringify(value),
      ]);
      await AsyncStorage.multiSet(formattedData);
      console.log('Multiple items saved');
    } catch (error) {
      console.error(`Error saving multiple items: ${error}`);
    }
  },

  // Remove multiple items at once
  multiRemoveItems: async keys => {
    try {
      await AsyncStorage.multiRemove(keys);
      console.log('Multiple items removed');
    } catch (error) {
      console.error(`Error removing multiple items: ${error}`);
    }
  },
};

export default asyncStorageService;
