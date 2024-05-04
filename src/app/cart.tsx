import {View, Text, Platform, FlatList} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useContext } from 'react';
import { useCart } from '@/providers/CartProvider';
import CartListItem from '@/components/CartListItem';
import Button from '@/components/Button';

const CartScreen = () => {
    const {items, total, checkout} = useCart();
    return (
        <View style={{padding: 10}}>
            <FlatList 
                data={items}
                renderItem={({item}) => <CartListItem cartItem={item}/>}
                contentContainerStyle={{padding: 10, gap: 10}}/>
            <Text style={{ color: 'orange', marginTop: 20, fontSize: 17, fontWeight: '600'}}>Tổng cộng: {total} VNĐ</Text>
            <Button onPress={checkout}  text="Đặt hàng" />
            <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />

        </View>
    )
};

export default CartScreen;