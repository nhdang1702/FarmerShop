import { StyleSheet, Text, View, Image, Pressable } from 'react-native';
import { Product } from '@assets/types';
import { Link, useSegments } from 'expo-router';
export const defaultImage = "https://dulichkhampha24.com/wp-content/uploads/2020/09/pizza-ha-noi.jpg";
type ProductListItemProps = {
    product: Product
}
const ProductListItem = ({product} : ProductListItemProps ) => {
  const segments = useSegments();
  const productRoute = `/${segments[0]}/menu/${product.id}` as `${string}:${string}`

    return(
      <Link href={productRoute} asChild>
        <Pressable style={styles.container}>
          <Image style={styles.image} source={{uri: product.image || defaultImage }} resizeMode="contain"/>
          <Text>{product.name}</Text>
          <Text>{product.price} VNĐ</Text>
        </Pressable>
      </Link>
    )
};

const styles = StyleSheet.create({
    container: {
      flex: 0.5,
      padding: 10,
      borderRadius: 20,     
      backgroundColor: 'white',
      maxWidth: '50%'
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
    }
  });

  export default ProductListItem;
  