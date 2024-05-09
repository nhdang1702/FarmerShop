import { View, Text , Image, StyleSheet, ActivityIndicator} from "react-native";
import React from "react";
import { useLocalSearchParams, Stack } from "expo-router";
import { defaultImage } from "../../../components/ProductListItem";
import { useState } from "react";
import Button from "../../../components/Button";
import { useCart } from "../../../providers/CartProvider";
import { useRouter } from "expo-router";
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
    

    const addToCart = () => {
        if(!product) {
            return;
        }
        addItem(product);
        router.push('/cart');
    };

    if(isLoading) {
        return <ActivityIndicator/>;
    };
    if(error) {
        return <Text>Fail to fetch products</Text>
    };

    if (!product) {
        return <ActivityIndicator />;
    }
    console.log(product);
    return(
        <View style = {styles.container}>
            <Stack.Screen options={{title: product.name}}/>
            <Image style={styles.image} source ={{uri: product.image || defaultImage}}/>
            <View style={{padding: 10}}>
                <Text style={styles.productName}>{product.name}</Text>
                <Text style={styles.productInfo}>{product.description}</Text>
                <Text style={styles.price}>Giá:  {formatPrice(product.price)} VNĐ</Text>
            </View>
            
            <View style={{marginTop: 100}}>
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
        fontSize: 18,
        fontWeight: 'bold',
        color: 'orange',
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