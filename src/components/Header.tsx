import {Image, StyleSheet, Text, TouchableOpacity, View, ActivityIndicator} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import { Stack, Link } from "expo-router";
import { Pressable } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import Colors from '@/constants/Colors';
import { useMyProfile } from '@/api/profiles';
const Header = () => {
  const {data: profiles, error, isLoading} = useMyProfile();
 
  if (isLoading){
    return <ActivityIndicator/>
  }
  if(error) {
    return <Text>Bạn chưa điền thông tin cá nhân</Text>
  }
  if (!profiles) {
    return <ActivityIndicator />;
  }

  return (
    <View style={styles.container}>
      <Image source={require('assets/images/avatar3.png')} style={styles.avatar} />
      <View style={styles.groupText}>
        <Text style={styles.nameDisplay}>
          <Text style={styles.bold}>Hi</Text>, <Text>{profiles.name}</Text>
        </Text>
        <Text style={styles.desc}>Hôm nay bạn muốn mua gì???</Text>
      </View>
      <Link href="/cart" asChild>
              
              <Pressable>
                {({ pressed }) => (
                  <Image source={require('assets/images/ic-checkout.png')} />
                )}
              </Pressable>
            </Link>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  nameDisplay: {
    fontSize: 16,
  },
  bold: {
    fontWeight: 'bold',
  },
  desc: {
    fontSize: 12,
    color: '#A1A1A1',
    marginTop: 4,
  },
  groupText: {
    flex: 1,
    marginLeft: 12,
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    backgroundColor: 'white',
    borderRadius: 20
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 70
  },
  badge: {
    position: 'absolute',
    backgroundColor: 'red',
    aspectRatio: 1,
    width: 20,
    borderRadius: 20,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    right: -5,
    top: -5,
  },
  badgeText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
});