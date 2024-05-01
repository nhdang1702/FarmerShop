import orders from "@assets/data/orders";
import { useLocalSearchParams, Stack } from "expo-router";
import { Text, View, FlatList } from "react-native";
import OrderListItem from "@/components/OrderListItem";
import OrderItemListItem from "@/components/OrderItemListItem";

export default function OrderDetailsScreen() {
    const { id } = useLocalSearchParams();

    const order = orders.find((o) => o.id.toString() === id);

    if (!order) {
        return(<Text>Not Found</Text>)
    }
    return (
        <View style={{padding: 10, gap: 20}}>
            <Stack.Screen options={{title: `Order #${id}`}}/>
            <OrderListItem order={order}/>
            <FlatList 
                data={order.order_items}
                renderItem={({item}) => <OrderItemListItem item={item}/>}
            />
        </View>
    );
}