import { StyleSheet, Text, View, Image, Pressable, useWindowDimensions, Alert, TouchableOpacity  } from 'react-native';
import { Link, useSegments } from 'expo-router';
import { Tables } from '../types';
export const defaultImage = "https://dulichkhampha24.com/wp-content/uploads/2020/09/pizza-ha-noi.jpg";
import { useRouter } from 'expo-router';
import { useCart } from '@/providers/CartProvider';
type ProductListItemProps = {
    product: Tables<'products'>;
}
const ProductListItem = ({product} : ProductListItemProps ) => {
  const {addItem} = useCart();

    const router = useRouter();
    

    const addToCart = () => {
        if(!product) {
            return;
        }
        addItem(product);
        Alert.alert(`Thêm ${product.name} vào giỏ hàng`);
    };
  const window = useWindowDimensions();
  const ITEM_SIZE = (window.width - 2 * 14 - 14 - 8) / 2;
  const PADDING_INNER = 10;
  const segments = useSegments();
  const productRoute = `/${segments[0]}/menu/${product.id}` as `${string}:${string}`;
  const formatPrice = (price:number) => {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' '); // Insert spaces every three digits
  };

    return(
      <Link href={productRoute} asChild>
        <Pressable style={styles.container2}>
          <Image style={styles.image} source={{uri: product.image || defaultImage }} resizeMode="contain"/>
          <Text style={styles.name}>{product.name}</Text>
          <View style={styles.bottom}>
            <Text style={styles.priceView}>
              <Text style={styles.price}>{formatPrice(product.price)} VNĐ</Text>
              <Text> /Kg </Text>
            </Text>
            <TouchableOpacity
               onPress={addToCart}>
              <Image source={require('assets/images/ic-add.png')} />
           </TouchableOpacity>
        </View>
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
      width: '100%',
      marginBottom: 3,
      borderRadius: 14,
    },
    name: {
      fontSize: 13,
      fontWeight: '600',
      color: '#000000',
    },
    priceView: {
      fontSize: 12,
      color: '#A1A1A1',
    },
    price: {
      fontSize: 12,
      fontWeight: '600',
      color: '#000000',
    },
    container2: {
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 1,
      },
      shadowOpacity: 0.22,
      shadowRadius: 2.22,
  
      elevation: 3,
      backgroundColor: '#FFFFFF',
      margin: 2,
      borderRadius: 8,
      maxWidth: '48%',
      padding:10,
    },
    bottom: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
  });

  export default ProductListItem;
  