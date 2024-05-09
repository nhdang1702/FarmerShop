import { View, Text , Image, StyleSheet, Pressable} from "react-native";
import React from "react";
import { useLocalSearchParams, Stack, Link } from "expo-router";
import { defaultImage } from "../../../components/ProductListItem";
import { useState } from "react";
import Button from "../../../components/Button";
import { useCart } from "../../../providers/CartProvider";
import { useRouter } from "expo-router";
import { FontAwesome } from "@expo/vector-icons";
import Colors from "../../../constants/Colors";
import { useProduct } from "../../../api/products";

const ProductDetailsScreen = () => {
    const formatPrice = (price:number) => {
        return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' '); // Insert spaces every three digits
      };
    const { id: idString } = useLocalSearchParams();
    const id = parseFloat((typeof idString === 'string' ? idString : idString?.[0]) || 'NaN');


    const { data: product, error, isLoading} = useProduct(id);
    const {addItem} = useCart();

    const router = useRouter();
    

    const [selectedSize, setSeltectedSize] = useState('M')


    const addToCart = () => {
        if(!product) {
            return;
        }
        addItem(product);
        router.push('/cart');
    }

    if (!product) {
        return <Text>Product not found</Text>
    }
    return(
        <View style = {styles.container}>
            <Stack.Screen 
            options={{title: 'Menu', 
                     headerRight: () => (
                        <Link href={`/(admin)/menu/create?id=${id}`} asChild>
                            <Pressable>
                            {({ pressed }) => (
                                <FontAwesome
                                name="pencil"
                                size={25}
                                color={Colors.light.tint}
                                style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
                                />
                            )}
                            </Pressable>
                        </Link>
            ),}}/>
            <Stack.Screen options={{title: product.name}}/>
            <Image style={styles.image} source ={{uri: product.image || defaultImage}}/>
            <Text style={styles.productInfo}>{product.description}</Text>
            


            <Text style={styles.price}>Giá:  {formatPrice(product.price)} VNĐ</Text>
        </View>
    )
};

const styles = StyleSheet.create({
    container:{
        backgroundColor: 'white',
        flex:1,
        padding: 10
    },
    image: {
        width: '100%',
        aspectRatio: 1,
    },
    price: {
        fontSize: 19,
        fontWeight: 'bold'
    },
    sizes:{
        flexDirection: 'row',
        justifyContent:'space-around',
        marginVertical: 10,
        marginBottom:90
    },
    size: {
        backgroundColor: 'gainsboro',
        width: 50,
        aspectRatio: 1,
        borderRadius: 25,
        alignItems: 'center',
        justifyContent: 'center'

    },
    sizeText: {
        fontSize:20,
        fontWeight: '500'
    },
    productName: {
        fontSize:24,
        fontWeight: 'bold',
    },
    productInfo: {
      fontSize: 14,
      color: 'grey',
      paddingVertical: 4,
    }

})
export default ProductDetailsScreen;