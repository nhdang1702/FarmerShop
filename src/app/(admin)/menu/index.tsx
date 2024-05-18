import { StyleSheet, Text, View, Image, FlatList, ActivityIndicator, Pressable } from 'react-native';
import ProductListItemAdmin from '../../../components/ProductListItemAdmin';
import {  useProductByFarm, useProductList } from '../../../api/products';
import { useFarmAdmin } from '../../../api/farms';
import { Stack, Link } from 'expo-router';
import Button from '@/components/Button';


export default function MenuScreen() {

  const {data: products} = useProductByFarm();
  const {data: farm, error, isLoading} = useFarmAdmin();
  if (isLoading){
    return <ActivityIndicator/>
  }
  if (!farm) {
    return (
      
      <Link href={'/(admin)/menu/createFarm'} asChild>
        <Button text = "Tạo của hàng của riêng bạn"/>
      </Link>
    
  )
  if(error) {
    return <Text>Fail to fetch farm</Text>
};
}
  return (
    <View style={{flex:1}}>
      <Stack.Screen options={{title: "My Farm"}}/>
      <Image source={{ uri: farm.image || "https://transcode-v2.app.engoo.com/image/fetch/f_auto,c_limit,w_1200,h_630,dpr_1/https://assets.app.engoo.com/images/HWpVyuI9PeQRHiRqjOg8UAosMeUQTCM2sZqOJGjTUHs.jpeg" }} style={{ width: "100%", height: 160 }} />
      <View style={{justifyContent:'space-between', flexDirection: 'row'}}>
         <Text style={{ fontSize: 26, fontWeight: "600", marginTop: 7, marginHorizontal: 15,}}>{farm.name}</Text>
         <Link href="/(admin)/menu/updateFarm" asChild>
          <Pressable>
          <Image style={styles.settings} source={require('assets/images/settings.png')}/>
          </Pressable>
         </Link>
      </View>
      
      
      <Text style={{
                marginTop: 7,
                marginBottom:7,
                marginHorizontal: 15,
                fontWeight: "400",
                fontSize: 15.5,
                }}>
                {farm.description}
      </Text>
      <Text style={{fontSize: 19, fontWeight: 'bold', padding: 10}}>Danh sách sản phẩm</Text>
      <FlatList
        data={products}
        renderItem={({item}) => <ProductListItemAdmin product={item}/>}
        
        contentContainerStyle={{ gap: 10, padding:10}}/>
    </View>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
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
  settings: {
    height: 20,
    width: 20,
    padding: 18,
    marginRight: 10,
    marginTop: 5,
  }
});
