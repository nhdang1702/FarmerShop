import { StyleSheet, Text, View, Image, FlatList, ActivityIndicator } from 'react-native';
import ProductListItem from '@components/ProductListItem';
import { useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { useQuery } from '@tanstack/react-query';
import { useProductList } from '@/api/products';


export default function MenuScreen() {
  const {data: products, error, isLoading} = useProductList();
  if (isLoading){
    return <ActivityIndicator/>
  }
  if(error) {
    return <Text>Failed to fetch products</Text>
  }
  return (
    <View>
      <FlatList
        data={products}
        renderItem={({item}) => <ProductListItem product={item}/>}
        numColumns={2}
        contentContainerStyle={{ gap: 10, padding:10}}
        columnWrapperStyle={{ gap: 10 }}/>
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
