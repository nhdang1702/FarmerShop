import { StyleSheet, Text, View, Image, FlatList, ActivityIndicator } from 'react-native';
import ProductListItemAdmin from '../../../components/ProductListItemAdmin';
import { useProductList } from '../../../api/products';
import { useFarmAdmin } from '../../../api/farms';
import { Stack } from 'expo-router';


export default function MenuScreen() {

  const {data: products, error, isLoading} = useProductList();
  const {data: farm} = useFarmAdmin();
  if (isLoading){
    return <ActivityIndicator/>
  }
  if(error) {
    return <Text>Failed to fetch products</Text>
  }
  if (!farm) {
    return <ActivityIndicator />;
}
  return (
    <View style={{flex:1}}>
      <Stack.Screen options={{title: "Your Farm"}}/>
      <Image source={{ uri: farm.image || "https://transcode-v2.app.engoo.com/image/fetch/f_auto,c_limit,w_1200,h_630,dpr_1/https://assets.app.engoo.com/images/HWpVyuI9PeQRHiRqjOg8UAosMeUQTCM2sZqOJGjTUHs.jpeg" }} style={{ width: "100%", height: 160 }} />
      <Text style={{ fontSize: 25, fontWeight: "600", marginTop: 7, marginHorizontal: 15,}}>{farm.name}</Text>
      <Text style={{
                marginTop: 7,
                marginBottom:7,
                marginHorizontal: 15,
                fontWeight: "400",
                fontSize: 15.5,
                }}>
                {farm.description}
      </Text>
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
  }
});
