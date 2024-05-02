import { View, Text , Image, StyleSheet, ActivityIndicator} from "react-native";
import React from "react";
import { useLocalSearchParams, Stack } from "expo-router";
import { defaultImage } from "@/components/ProductListItem";
import { useState } from "react";
import Button from "@/components/Button";
import { useCart } from "@/providers/CartProvider";
import { useRouter } from "expo-router";
import { useProduct } from "@/api/products";
const sizes = ['S', 'M', 'L', 'XL'];

const ProductDetailsScreen = () => {
    const { id: idString } = useLocalSearchParams();
    const id = parseFloat(typeof idString === 'string' ? idString : idString[0]);
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

    if(isLoading) {
        return <ActivityIndicator/>;
    };
    if(error) {
        return <Text>Fail to fetch products</Text>
    }
    return(
        <View style = {styles.container}>
            <Stack.Screen options={{title: product.name}}/>
            <Image style={styles.image} source ={{uri: product.image || defaultImage}}/>

            


            <Text style={styles.price}>Giá:  {product.price} VNĐ</Text>
            <View style={{marginTop: 150}}>
                <Button onPress={addToCart} text="Thêm vào giỏ hàng"/>
            </View>
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