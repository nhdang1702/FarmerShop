import React from 'react';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Link, Tabs } from 'expo-router';
import { Pressable } from 'react-native';

import Colors from '../../constants/Colors';
import { useColorScheme } from '../../components/useColorScheme';
import { useClientOnlyValue } from '../../components/useClientOnlyValue';

// You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>['name'];
  color: string;
}) {
  return <FontAwesome size={22} style={{ marginBottom: -3 }} {...props} />;
}

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        
        // Disable the static render of the header on web
        // to prevent a hydration error in React Navigation v6.
        headerShown: useClientOnlyValue(false, true),
      }}>
        
      
      <Tabs.Screen name="index" options={{href: null}}/>  
      <Tabs.Screen
        name="menu"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => <TabBarIcon name="home" color={color} />,
          headerShown: false,
          
        }}
      />
      <Tabs.Screen name="farm" 
        options={{
        headerShown: false,
        title:'Farm' ,
        tabBarIcon: ({ color }) => <TabBarIcon name="leaf" color={color} />,
         

      }}/>
      <Tabs.Screen
        name="orders"
        
        options={{
          title: 'Đơn hàng',
          headerShown: false,
          tabBarIcon: ({ color }) => <TabBarIcon name="cart-plus" color={color} />,
        }}
      />
      <Tabs.Screen name="profile" 
        options={{
        headerShown: false,
        title:'Tôi' ,
        tabBarIcon: ({ color }) => <TabBarIcon name="user" color={color} />,
         

      }}/>
      
    </Tabs>
  );
}
