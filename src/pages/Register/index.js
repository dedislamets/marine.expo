import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  KeyboardAvoidingView,
  Image,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
  ImageBackground,
} from 'react-native';

const Register = ({navigation}) => {
    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <KeyboardAvoidingView style={styles.container}>

                    
                <View style={styles.containerLogo}>
                    
                    <Image 
                    style={styles.imgLogo} 
                    source={require('../../assets/logo.png')} />
                    <Text 
                      style={styles.titleLogin}>Marine Business
                    </Text>
                </View>

                <View style={styles.containerInput}>
                    <TextInput
                        style={styles.inputFields}
                        placeholder="Full Name"
                        autoCorrect={false}
                        onChangeText={() => {}}
                    />
                    <TextInput
                        style={styles.inputFields}
                        placeholder="Email Address"
                        autoCorrect={false}
                        onChangeText={() => {}}
                    />
                    <TextInput
                        style={styles.inputFields}
                        placeholder="Phone"
                        autoCorrect={false}
                        onChangeText={() => {}}
                    />
                    <TextInput
                        style={styles.inputFields}
                        placeholder="Password"
                        secureTextEntry={true}
                        autoCorrect={false}
                        onChangeText={() => {}}
                    />

                    <TouchableOpacity 
                        style={styles.btnSubmit} 
                        onPress={() => navigation.navigate('MyTabNavigator', { screen: 'ActivityTab' })}>
                        <Text 
                            style={styles.btnText}>Register
                        </Text>
                    </TouchableOpacity>
                    <View style={styles.createAccount}>
                        <Text 
                            style={styles.btnRegister}>Already have an account?
                        </Text>
                        <TouchableOpacity 
                            style={[styles.btnRegister],{paddingLeft: 10, paddingTop: 5}} 
                            onPress={() => navigation.navigate('Loginto')}>
                            <Text 
                            style={[styles.btnRegisterText],{textDecorationLine: 'underline'}}>Sign in
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </KeyboardAvoidingView>
        </TouchableWithoutFeedback>
    )
}
export default Register

const styles = StyleSheet.create({
  imgLogo: {
    width: 150,
    height: 150
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  containerLogo: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  containerInput: {
    flex: 1.3,
    alignItems: 'center',
    width: '95%',
  },
  inputFields: {
    borderColor: '#40d5f0',
    borderRadius: 15,
    borderWidth: 2,
    padding: 15,
    marginBottom: 15,
    height: 50,
    fontSize: 18,
    color: '#40d5f0',
    width: '90%',
    backgroundColor: '#fff',
    textAlign: 'left',
  },
  btnSubmit: {
    width: '90%',
    marginBottom: 15,
    borderWidth: 1,
    borderRadius: 15,
    height: 50,
    padding: 15,
    borderColor: '#fff',
    backgroundColor: '#40d5f0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnText: {
    fontSize: 18,
    color: '#fff',
    fontWeight: '700',
  },
  btnRegister: {
    marginTop: 5,
    color: '#a6a6a6',
  },
  btnRegisterText: {
    fontSize: 14,
    color: '#FF8C00',
    fontWeight: '500',
    alignSelf: 'center',
  },
  titleLogin: {
    marginTop: 10,
    color: '#40d5f0',
    fontSize: 26,
    justifyContent: 'center',
    alignItems: 'center',
    fontWeight: 'bold',
  },
  bgImage: {
    flex: 1,
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    opacity: 0.95,
  },
  register: {
    color: '#a6a6a6',
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 5,
  },
  containerIcons: {
    flexDirection: 'row',
    flex: 1,
  },
  iconsRegister: {
    margin: 8,
  },
  textForgotPassword: {
    color:'#ff8c00',
    fontSize: 14,
  },
  createAccount: {
    flex: 1,
    flexDirection:'row',
    justifyContent: 'center',
    marginBottom: 15,
  },
  btnRecover: {
    marginBottom: 10,
  },
});