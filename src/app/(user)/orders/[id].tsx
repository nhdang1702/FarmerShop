import { useLocalSearchParams, Stack } from "expo-router";
import { Text, View, FlatList, ActivityIndicator } from "react-native";
import OrderListItem from "../../../components/OrderListItem";
import OrderItemListItem from "../../../components/OrderItemListItem";
import { useOrderDetails } from "../../../api/orders";

export default function OrderDetailsScreen() {
    const { id: idString } = useLocalSearchParams();
    const id = parseFloat(typeof idString === 'string' ? idString : idString![0]);

    const {data: order, isLoading, error} = useOrderDetails(id);
    if(isLoading) {
        return <ActivityIndicator/>

    }
    if(error) {
        return <Text>Failed to fetch</Text>
    }
    
    if (!order) {
        return(<Text>Not Found</Text>)
    };
    return (
        <View style={{padding: 10, gap: 20}}>
            <Stack.Screen options={{title: `Đơn hàng #${id}`}}/>
            <FlatList
                data={order.order_items}
                renderItem={({ item }) => <OrderItemListItem item={item} />}
                contentContainerStyle={{ gap: 10 }}
                ListHeaderComponent={() => <OrderListItem order={order} />}
             />
        </View>
    );
}