import { View, Text, StyleSheet, Image } from 'react-native';
import React from 'react';
import Colors from '../constants/Colors';
import { defaultImage } from './ProductListItem';
import { Tables } from '../types';

type OrderItemListItemProps = {
  item: { products: Tables<'products'> } & Tables<'order_items'>;
};

const OrderItemListItem = ({ item }: OrderItemListItemProps) => {
  const formatPrice = (price:number) => {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' '); // Insert spaces every three digits
  };
  return (
    <View style={styles.container}>
      <Image
        source={{ uri: item.products.image || defaultImage }}
        style={styles.image}
        resizeMode="contain"
      />
      <View style={{ flex: 1 }}>
        <Text style={styles.title}>{item.products.name}</Text>
        <View style={styles.subtitleContainer}>
          <Text style={styles.price}>{formatPrice(item.products.price * item.quantity)} VNĐ</Text>
          
        </View>
      </View>
      <View style={styles.quantitySelector}>
        <Text style={styles.quantity}>{item.quantity}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 5,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  image: {
    width: 75,
    aspectRatio: 1,
    alignSelf: 'center',
    marginRight: 10,
  },
  title: {
    fontWeight: '500',
    fontSize: 16,
    marginBottom: 5,
  },
  subtitleContainer: {
    flexDirection: 'row',
    gap: 5,
  },
  quantitySelector: {
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center',
    marginVertical: 10,
  },
  quantity: {
    fontWeight: '500',
    fontSize: 18,
    marginRight: 10
  },
  price: {
    color: Colors.light.tint,
    fontWeight: 'bold',
  },
});

export default OrderItemListItem;