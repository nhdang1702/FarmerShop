import { View, Text , Image, StyleSheet} from "react-native";
import React from "react";
import { useLocalSearchParams, Stack } from "expo-router";
import products from "@assets/data/products";
import { defaultImage } from "@/components/ProductListItem";
import { useState } from "react";
import Button from "@/components/Button";
import { useCart } from "@/providers/CartProvider";
import { useRouter } from "expo-router";
const sizes = ['S', 'M', 'L', 'XL'];

const ProductDetailsScreen = () => {
    const { id } = useLocalSearchParams();
    const {addItem} = useCart();

    const router = useRouter();
    

    const [selectedSize, setSeltectedSize] = useState('M')
    const product = products.find((p) => p.id.toString() == id);

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
            <Stack.Screen options={{title: product.name}}/>
            <Image style={styles.image} source ={{uri: product.image || defaultImage}}/>

            <Text> Select size</Text>
            <View style={styles.sizes}>
                {sizes.map((size) => (
                    <View style={styles.size}>
                        <Text style={styles.sizeText} key={size}>{size}</Text>
                    </View>
                ))}
            </View>


            <Text style={styles.price}>{product.price} VNĐ</Text>
            <Button onPress={addToCart} text="Thêm vào giỏ hàng"/>
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
    }

})
export default ProductDetailsScreen;