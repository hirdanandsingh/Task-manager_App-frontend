import {
  StyleSheet,
  View,
  Image,
  StatusBar,
  Text,
  Pressable,
  Alert,
  ScrollView,
  Dimensions,
} from 'react-native';
import React, {useEffect} from 'react';
import logo from '../Assets/images/pngwing.com.png';
import Input from '../Components/Input';
import Btn from '../Components/Btn';
import {loginAPI} from '../Services/allAPI';
import {FormProvider, useForm} from 'react-hook-form';
import asyncStorageService from '../Services/asyncService';
import {APP_TOKEN} from '../utils/constant';
import {postData} from '../Services/httpService';
import {useNavigation} from '@react-navigation/native';

const Login = ({navigation}) => {
  const windowHeight = Dimensions.get('window').height;
  const navigate = useNavigation();

  const formMethods = useForm();

  const handleLogin = async data => {
    const response = await postData(
      'api/auth/login',
      data,
      (customHeaders = {}),
    );
    if (response && response?.status === 200) {
      await asyncStorageService.saveItem(APP_TOKEN, response?.data?.token);
      navigate.navigate('Homescreen', {isLogin: true});
      Alert.alert('Login Successfully');
    } else {
      Alert.alert(response?.data?.message ?? 'Unable to proceed');
    }
  };

  useEffect(() => {
    const checkToken = async () => {
      try {
        const token = await asyncStorageService.getItem(APP_TOKEN);
        if (token) {
          navigate.navigate('Homescreen');
        }
      } catch (error) {
      } finally {
      }
    };

    checkToken();
  }, []);

  return (
    <ScrollView
      contentContainerStyle={{height: windowHeight}}
      showsVerticalScrollIndicator={false}>
      <StatusBar backgroundColor="black" />
      <View style={styles.container}>
        {/* Section 1 */}
        <View style={styles.top}>
          <Image source={logo} style={{height: 100, width: 100}} />
        </View>
        {/* Section 2 */}
        <View style={styles.bottom}>
          <Text
            style={{
              color: 'black',
              marginTop: 30,
              fontSize: 40,
              alignSelf: 'center',
            }}>
            Login
          </Text>
          {/* form */}
          <View style={styles.form}>
            {/* TextInputs */}
            <FormProvider {...formMethods}>
              <Input
                label="Email"
                name="email"
                rules={{required: 'Email cannot be empty!'}}
              />
              <Input
                label="Password"
                name="password"
                rules={{required: 'Password cannot be empty!'}}
                secureTextEntry
              />
            </FormProvider>
            {/* Button */}
            <Btn
              title="Login"
              onPress={formMethods.handleSubmit(handleLogin)}
            />
          </View>
          <View style={styles.footer}>
            <Pressable onPress={() => navigation.navigate('Register')}>
              <Text style={{color: 'black', fontSize: 15}}>
                Don't have any account? Sign Up
              </Text>
            </Pressable>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  top: {
    flex: 3,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bottom: {
    flex: 7,
    backgroundColor: '#ececec',
    borderTopStartRadius: 100,
  },
  form: {
    display: 'flex',
    rowGap: 30,
    padding: 30,
    marginTop: 40,
  },
  footer: {
    backgroundColor: '#ececec',
    alignItems: 'center',
    justifyContent: 'flex-end',
    flex: 1,
    paddingBottom: 30,
  },
});
