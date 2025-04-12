import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  Pressable,
  Alert,
  ScrollView,
  Dimensions,
} from 'react-native';
import Icons from 'react-native-vector-icons/AntDesign';
import React from 'react';
import Input from '../Components/Input';
import Btn from '../Components/Btn';
import {FormProvider, useForm} from 'react-hook-form';
import {postData} from '../Services/httpService';
import {APP_TOKEN} from '../utils/constant';
import {useNavigation} from '@react-navigation/native';
import asyncStorageService from '../Services/asyncService';

export default Register = ({navigation}) => {
  const navigate = useNavigation();

  const handleRegister = async data => {
    const response = await postData(
      'api/auth/signup',
      data,
      (customHeaders = {}),
    );
    console.log('response value --->>', response);

    if (
      response.data &&
      (response?.status === 201 ||
        response?.status === 202 ||
        response?.status === 203)
    ) {
      Alert.alert('Registered successfully');
      const token = response?.data?.token ?? '';
      console.log(token, 'token');
      await asyncStorageService.saveItem(APP_TOKEN, token);
      console.log();
      navigate.navigate('Homescreen');
    } else {
      Alert.alert(response?.data?.message ?? 'Unable to proceed your request');
    }
  };

  const windowHeight = Dimensions.get('window').height;

  const formMethods = useForm();

  return (
    <ScrollView
      contentContainerStyle={{height: windowHeight}}
      showsVerticalScrollIndicator={false}>
      <View style={styles.container}>
        <StatusBar backgroundColor="black" />
        {/* top */}
        <View style={styles.top}>
          <View style={{flex: 1, paddingLeft: 20}}>
            <Pressable onPress={() => navigation.navigate('Login')}>
              <Icons name="arrowleft" size={35} color="white" />
            </Pressable>
          </View>
          <View style={{flex: 2}}>
            <Text style={{color: 'white', fontSize: 35}}>Sign Up</Text>
          </View>
        </View>
        {/* bottom */}
        <View style={styles.bottom}>
          {/* form */}
          <View style={styles.form}>
            <FormProvider {...formMethods}>
              <Input
                label="Name"
                name="name"
                rules={{required: 'Name cannot be empty!'}}
              />
              <Input
                label="Email"
                name="email"
                rules={{
                  required: 'Email cannot be empty!',
                  pattern: {
                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                    message: 'Please Enter the valid email',
                  },
                }}
              />
              <Input
                label="Password"
                name="password"
                rules={{required: 'Password cannot be empty!'}}
                secureTextEntry
              />
            </FormProvider>
          </View>
          {/* button */}
          <View style={styles.footer}>
            <Btn
              title="Sign Up"
              onPress={formMethods.handleSubmit(handleRegister)}
            />
            <Pressable onPress={() => navigation.navigate('Login')}>
              <Text
                style={{
                  color: 'black',
                  fontSize: 15,
                  textAlign: 'center',
                  paddingTop: 20,
                }}>
                You have an account? Log In
              </Text>
            </Pressable>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  top: {
    flex: 1.5,
    flexDirection: 'row',
    alignItems: 'center',
  },
  bottom: {
    flex: 8.5,
    backgroundColor: '#ececec',
    borderTopStartRadius: 100,
  },
  form: {
    flex: 8,
    justifyContent: 'center',
    paddingHorizontal: 30,
    rowGap: 50,
  },
  footer: {
    flex: 2,
    justifyContent: 'center',
    paddingHorizontal: 30,
  },
});
