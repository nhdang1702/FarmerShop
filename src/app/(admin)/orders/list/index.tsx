import { useAdminOrderList, useOrderByFarm2, useOrderByFarm3 } from "../../../../api/orders";
import OrderListItem from "../../../../components/OrderListItem";
import { Text,View, FlatList, ActivityIndicator } from "react-native";
export default function OrdersScreen() {

    const {data: orders, isLoading, error} = useOrderByFarm3({archived :false});

    if(isLoading) {
        return <ActivityIndicator/>
    };
    if(error) {
        return <Text>Failed to fetch</Text>
    }


    return (
        <FlatList 
            data={orders}
            renderItem={({item}) => <OrderListItem order={item}/>}
            contentContainerStyle={{gap: 10, padding: 10}}/>
    )
}