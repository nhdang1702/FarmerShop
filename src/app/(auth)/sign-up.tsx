import { View, Text, TextInput, StyleSheet,ScrollView, ImageBackground, Dimensions } from 'react-native';
import React, { useState } from 'react';
import Button from '../../components/Button';
import Colors from '../../constants/Colors';
import { Link, Stack } from 'expo-router';
import { supabase } from '../../lib/supabase';
import { Alert } from 'react-native';

const SignUpScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  

  async function signUpWithEmail() {
    setLoading(true);
    
    const { error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) Alert.alert(error.message);
    setLoading(false);
    
  }

  return (
    <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
    <ImageBackground source={require('@assets/images/signin.png')} style={styles.background}>
      <View style={{flex:1, justifyContent:'center', alignItems: 'center'}}>
      <Text style={{color:'#ffffff', fontWeight:"bold", fontSize: 45}}>Farmer Net</Text>
      </View>
    </ImageBackground>
    <View style={styles.container}>
      <View style={{padding: 26}}>
      <Stack.Screen options={{ headerShown: false }} />
      <Text style={{fontSize: 30, color:'black' , justifyContent:'center', alignSelf:'center'}}>Tạo tài khoản</Text>
      <View style={{marginTop: 20}}>
      <Text style={styles.label}>Email</Text>
      <TextInput
        value={email}
        onChangeText={setEmail}
        placeholder="danguet@gmail.com"
        style={styles.input}
      />

      <Text style={styles.label}>Password</Text>
      <TextInput
        value={password}
        onChangeText={setPassword}
        placeholder=""
        style={styles.input}
        secureTextEntry
      />
      <Button onPress={signUpWithEmail} disabled={loading} text={loading ? "Tạo tài khoản..." : "Tạo tài khoản"} />
      <View style={{
        flexDirection: "row",
        justifyContent: "center",
        marginVertical: 22
      }}>
      <Text style={{fontSize:16, color:'black', }}>Bạn đã có tài khoản?</Text>
      <Link href="/sign-in" style={{fontSize: 16, color: Colors.light.tint, fontWeight:"bold", marginLeft: 6}}>
        Đăng nhập
      </Link>
      
      </View>
          </View>
      </View>
      </View>
    
    
    </ScrollView>
    
    
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1.5,
    backgroundColor: '#ffffff',
    bottom: 50,
    borderTopStartRadius: 60,
    borderTopEndRadius: 60,
   },
   label: {
     color: 'black',
     fontSize: 15,
     fontWeight: 'bold'
   },
   input: {
     borderWidth: 1,
     borderColor: 'gray',
     padding: 10,
     marginTop: 5,
     marginBottom: 20,
     backgroundColor: 'white',
     borderRadius: 8,
   },
   textButton: {
     alignSelf: 'center',
     fontWeight: 'bold',
     color: Colors.light.tint,
     marginVertical: 10,
   },
   background: {
     
     height: Dimensions.get('window').height / 2.5,
     
   },
   scrollView: {
     flex: 1,
     backgroundColor: '#ffffff',
   
   }
});

export default SignUpScreen;

