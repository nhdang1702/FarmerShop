import { View, ActivityIndicator, StyleSheet, SafeAreaView, TouchableOpacity, Image,Text } from 'react-native';
import React from 'react';
import { Link, Redirect, Stack } from 'expo-router';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Button from '@/components/Button';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/providers/AuthProvider';
import { AntDesign } from "@expo/vector-icons";
import Colors from '@/constants/Colors';
import { useMyProfile } from '@/api/profiles';


export default function Profile(){
    const {session, loading} = useAuth();
    const {data: profiles, error, isLoading} = useMyProfile();
    
  
    if(loading) {
      return <ActivityIndicator color={'grey'}/>;
    }
    if(!session) {
      return <Redirect href={'/sign-in'}/>;
    }
    if(error) {
      return <Text>Fail to fetch profile</Text>
  };
 
  if (isLoading){
    return <ActivityIndicator/>
  }
  
  if (!profiles) {
    return (
        <Link href={'/(user)/profile/create'} asChild>
          <Button text = "Điền thông tin cá nhân của bạn"/>
        </Link>
      
    )
  }
  

    return(
      <SafeAreaView>
      <Stack.Screen options={{headerShown: false}}/>
      <View style={styles.main}>
      <View style={styles.imageContainer}>
        <Image style={styles.image} source={require("assets/images/avatar3.png")} />
        <Text style={{ fontSize: 19, color: "black", fontWeight: "bold" }}>
          {profiles.name}
        </Text>
        
      </View>
    </View>
    <View style={styles.bottomContainer}>
      <Text style={{ fontSize: 16, color: 'grey', fontWeight: "bold", margin: 5 }}>
        Địa chỉ: {profiles.address}
      </Text>  
      <Text style={{ fontSize: 16, color: 'grey', fontWeight: "bold", margin: 5 }}>
        Số điện thoại: 0{profiles.phone}
      </Text> 
      
    </View>
      <Link href={'/(admin)'} asChild>
        <Button text="Gian hàng của tôi" />
      </Link>
      <Link href={'/(user)/profile/update'} asChild>
        <Button text="Chỉnh sửa" />
      </Link>
      
        <Button onPress={() => supabase.auth.signOut() } text="Đăng xuất"  />
      

      </SafeAreaView>
    )
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    userInfoSection: {
      paddingHorizontal: 30,
      marginBottom: 25,
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
    },
    caption: {
      fontSize: 14,
      lineHeight: 14,
      fontWeight: '500',
    },
    row: {
      flexDirection: 'row',
      marginBottom: 10,
    },
    infoBoxWrapper: {
      borderBottomColor: '#dddddd',
      borderBottomWidth: 1,
      borderTopColor: '#dddddd',
      borderTopWidth: 1,
      flexDirection: 'row',
      height: 100,
    },
    infoBox: {
      width: '50%',
      alignItems: 'center',
      justifyContent: 'center',
    },
    menuWrapper: {
      marginTop: 10,
    },
    menuItem: {
      flexDirection: 'row',
      paddingVertical: 15,
      paddingHorizontal: 30,
    },
    menuItemText: {
      color: '#777777',
      marginLeft: 20,
      fontWeight: '600',
      fontSize: 16,
      lineHeight: 26,
    },
    icons: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
    },
    back:{
      backgroundColor: 'blue',
      width: 45,
      height: 45,
      borderTopLeftRadius: 10,
      borderBottomRightRadius: 10,
      justifyContent: "center",
      alignItems: "center",
    },
    main: {
      marginTop: 30,
    },
    imageContainer: {
      justifyContent: "center",
      alignItems: "center",
    },
    image: {
      width: 150,
      height: 150,
      borderRadius: 50,
      marginBottom: 5,
    },
    middleSectionTextContainer: {
      flexDirection: "row",
      justifyContent: "space-evenly",
      marginTop: 20,
    },
    middleSectionText: {
      justifyContent: "center",
      alignItems: "center",
    },
    toptext: {
      fontSize: 16,
      color:  'white',
      fontWeight: "bold",
    },
    bottomtext: {
      fontSize: 16,
      color: 'gray',
      fontWeight: "700",
    },
    bottomContainer: {
      marginTop: 20,
      padding:10
    },
    completeContainer: {
      flexDirection: "row",
      justifyContent: "space-between",
      marginTop: 10,
    },
    card: {
      backgroundColor: Colors.secondary,
    },
    bottomSection: {
      justifyContent: "center",
      alignItems: "center",
      marginTop: 20,
    },
    bottomSectionText: {
      fontWeight: "bold",
      fontSize: 20,
      color: Colors.darkGray,
      borderBottomWidth: 1,
      marginBottom: 5,
      borderBottomColor: Colors.darkGray,
    }
  });