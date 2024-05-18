import { View,Text, Image, ActivityIndicator, FlatList, ScrollView, StyleSheet } from "react-native";
import React from "react";
import { useLocalSearchParams, Stack } from "expo-router";
import { useFarm } from "../../../api/farms";
import { useProductListByFarm } from "../../../api/products";
import ProductListItem from "../../../components/ProductListItem";
import { SafeAreaView } from "react-native-safe-area-context";


const FarmDetailScreen = () => {
    const { id: idString } = useLocalSearchParams();
    const id = parseFloat((typeof idString === 'string' ? idString : idString?.[0]) || 'NaN');

    const { data: farm, error, isLoading} = useFarm(id);
    const {data: products} = useProductListByFarm(id);

    if(isLoading) {
        return <ActivityIndicator/>;
    };
    if(error) {
        return <Text>Fail to fetch products</Text>
    };

    if (!farm) {
        return <ActivityIndicator />;
    }

    return (
            <View style={{ flex: 1 }}>
                
                <FlatList
                    ListHeaderComponent={
                    <>
                        <Image source={{ uri: farm.image || "https://transcode-v2.app.engoo.com/image/fetch/f_auto,c_limit,w_1200,h_630,dpr_1/https://assets.app.engoo.com/images/HWpVyuI9PeQRHiRqjOg8UAosMeUQTCM2sZqOJGjTUHs.jpeg" }} style={{ width: "100%", height: 160 }} />
                        <Text style={{ fontSize: 25, fontWeight: "600", marginTop: 7, marginHorizontal: 15 }}>{farm.name}</Text>
                        <Text style={{ marginTop: 7, marginBottom: 8, marginHorizontal: 15, fontWeight: "400", fontSize: 15.5 }}>{farm.description}</Text>
                    </>
                  }
                    data={products}
                    renderItem={({ item }) => <ProductListItem product={item} />}
                    numColumns={2}
                    contentContainerStyle={{ padding: 10 }}
                    columnWrapperStyle={{ justifyContent: 'space-between', gap: 10 }}
                />
            </View>
    
        
      );
};

export default FarmDetailScreen;

const styles = StyleSheet.create({
    container: {
      flex: 1.5,
      backgroundColor: '#ffffff',
      bottom: 50,
      borderTopStartRadius: 60,
      borderTopEndRadius: 60,
     },
});