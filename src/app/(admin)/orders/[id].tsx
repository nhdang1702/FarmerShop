import orders from "@assets/data/orders";
import { useLocalSearchParams, Stack } from "expo-router";
import { Text, View, FlatList, Pressable } from "react-native";
import OrderListItem from "@/components/OrderListItem";
import OrderItemListItem from "@/components/OrderItemListItem";
import { OrderStatusList } from "@assets/types";
import Colors from "@/constants/Colors";
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
                ListFooterComponent={() => (
                    <>
                      <Text style={{ fontWeight: 'bold' }}>Status</Text>
                      <View style={{ flexDirection: 'row', gap: 5 }}>
                        {OrderStatusList.map((status) => (
                          <Pressable
                            key={status}
                            onPress={() => console.warn('Update')}
                            style={{
                              borderColor: Colors.light.tint,
                              borderWidth: 1,
                              padding: 10,
                              borderRadius: 5,
                              marginVertical: 10,
                              backgroundColor:
                                order.status === status
                                  ? Colors.light.tint
                                  : 'transparent',
                            }}
                          >
                            <Text
                              style={{
                                color:
                                  order.status === status ? 'white' : Colors.light.tint,
                              }}
                            >
                              {status}
                            </Text>
                          </Pressable>
                        ))}
                      </View>
                    </>
                  )}
            />
        </View>
    );
}