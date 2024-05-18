import { StyleSheet, Text, View, Image, Pressable } from 'react-native';
import { Link, useSegments } from 'expo-router';
import { Tables } from '../types';
export const defaultImage = "https://dulichkhampha24.com/wp-content/uploads/2020/09/pizza-ha-noi.jpg";
type ProductListItemProps = {
    product: Tables<'products'>;
}
const ProductListItemAdmin = ({product} : ProductListItemProps ) => {
  const segments = useSegments();
  const productRoute = `/${segments[0]}/menu/${product.id}` as `${string}:${string}`;
  const formatPrice = (price:number) => {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' '); // Insert spaces every three digits
  };

    return(
      <Link href={productRoute} asChild>
        <Pressable style={styles.container}>
          <View style={{ flex: 1 }}>
            <Text style={styles.dish}>{product.name}</Text>
            <Text style={styles.dishText}>{product.description}</Text>
            <Text style={styles.priceText}>{formatPrice(product.price)} VNĐ/Kg</Text>
          </View>
        <Image source={{uri: product.image || defaultImage }} resizeMode="contain" style={styles.dishImage} />
          
        </Pressable>
      </Link>
    )
};

const styles = StyleSheet.create({
    container: {
      backgroundColor: '#fff',
      padding: 16,
      flexDirection: 'row',
    },
    title: {
      fontSize: 20,
      fontWeight: 'bold',
    },
    separator: {
      marginVertical: 30,
      height: 1,
      width: '80%',
    },
    image: {
      aspectRatio: 1,
      width: '100%'
    },
    dishImage: {
      height: 80,
      width: 80,
      borderRadius: 4,
    },
    dish: {
      fontSize: 16,
      fontWeight: 'bold',
    },
    dishText: {
      fontSize: 14,
      color: 'grey',
      paddingVertical: 4,
      paddingRight:2,
    },
    priceText: {
      fontSize: 14,
      color: 'orange',
      paddingVertical: 4,
      fontWeight: "600",

    },
  });

  export default ProductListItemAdmin;
  