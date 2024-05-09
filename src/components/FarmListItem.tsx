import { View, Text, StyleSheet, Pressable, Image } from 'react-native';
import React from 'react';
import { Tables } from '../types';
import { Link, useSegments } from 'expo-router';


type FarmListItemProps = {
  farm: Tables<'farms'>;
};

const FarmListItem = ({ farm }: FarmListItemProps) => {
  const segments = useSegments();

  return (
    <Link href={`/${segments[0]}/farm/${farm.id}` as `${string}:${string}`} asChild>
      <Pressable style={styles.restaurantContainer}>
        <Image style={styles.image} source={{uri: farm.image || "https://transcode-v2.app.engoo.com/image/fetch/f_auto,c_limit,w_1200,h_630,dpr_1/https://assets.app.engoo.com/images/HWpVyuI9PeQRHiRqjOg8UAosMeUQTCM2sZqOJGjTUHs.jpeg" }}/>
        <View style={styles.row}>
            <Text style={styles.title}>{farm.name}</Text>
        </View>
      </Pressable>
    </Link>
  );
};

const styles = StyleSheet.create({
    restaurantContainer: {
      width: "100%",
      marginVertical: 10,
    },
    image: {
      width: "100%",
      aspectRatio: 5 / 3,
      marginBottom: 5,
    },
    title: {
      fontSize: 16,
      fontWeight: "500",
      marginVertical: 5,
    },
    subtitle: {
      color: "grey",
    },
    row: {
      flexDirection: "row",
      alignItems: "center",
    },
    rating: {
      marginLeft: "auto",
      backgroundColor: "lightgray",
      width: 30,
      height: 30,
      alignItems: "center",
      justifyContent: "center",
      borderRadius: 20,
    },
  });

export default FarmListItem;