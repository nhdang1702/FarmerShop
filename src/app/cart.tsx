import {View, Text, Platform, FlatList, TouchableOpacity, StyleSheet} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useContext } from 'react';
import { useCart } from '../providers/CartProvider';
import CartListItem from '../components/CartListItem';
import Button from '../components/Button';

const CartScreen = () => {
    const {items, total, checkout} = useCart();
    return (
        <View style={styles.container}>
            
            <Text style={styles.title}>Giỏ hàng của bạn</Text>
            <FlatList 
                data={items}
                renderItem={({item}) => <CartListItem cartItem={item}/>}
                contentContainerStyle={{padding: 5, gap: 10}}/>
            
            
            <View style = {styles.line1}>
                <View style={{paddingHorizontal: 16}}>
                    
                    <View style={styles.line} />
                    <View style={styles.row}>
                        <Text style={styles.text2}>Tổng cộng: </Text>
                        <Text style={styles.text2}>{total} VNĐ</Text>
                    </View>
                    <TouchableOpacity onPress={checkout} style={styles.btnCheckout}>
                        <Text style={styles.txtCheckout}>Đặt hàng</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />

        </View>
    )
};

export default CartScreen;

const styles = StyleSheet.create({
    line1: {
      height: 15,
      backgroundColor: '#F8F8F8',
      width: '100%',
      marginBottom: 160,
    },
    btnCheckout: {
      backgroundColor: '#26E698',
      padding: 14,
      alignItems: 'center',
      marginTop: 20,
      borderRadius: 10,
    },
    txtCheckout: {
      fontSize: 17,
      color: '#FFFFFF',
      fontWeight: "bold"
    },
    row: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    text1: {
      fontSize: 11,
      color: '#959595',
    },
    text2: {
      fontSize: 17,
      fontWeight: 'bold',
      color: 'orange'
    },
    line: {
      width: '100%',
      borderWidth: 1,
      borderStyle: 'dashed',
      borderColor: '#E0E0E0',
      marginVertical: 20,
    },
  
    container: {
      flex: 1,
      backgroundColor: '#FFFFFF',
      padding:10,
    },
  
    flexView: {
      flex: 1,
    },
  
    headerContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: 16,
    },
    imageButton: {
      width: 36,
      height: 36,
    },
    headerText: {
      fontSize: 16,
      fontWeight: 'bold',
    },
    middle: {
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'center',
    },
  
    title: {
      fontSize: 22,
      fontWeight: 'bold',
      color: '#121212',
      marginTop: 10,
      marginBottom: 5,
    },
  
    scrollView: {
      flex: 1,
      paddingHorizontal: 16,
    },
  });