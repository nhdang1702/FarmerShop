import { useLocalSearchParams, Stack } from "expo-router";
import { Text, View, FlatList, Pressable, ActivityIndicator, StyleSheet } from "react-native";
import OrderListItem from "../../../components/OrderListItem";
import OrderItemListItem from "../../../components/OrderItemListItem";
import { OrderStatusList } from "../../../types";
import Colors from "../../../constants/Colors";
import { useOrderDetails, useUpdateOrder } from "../../../api/orders";
import { useProfileByOrder } from "@/api/profiles";


export default function OrderDetailsScreen() {
  const formatPrice = (price:number) => {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' '); // Insert spaces every three digits
  };
  const { id: idString } = useLocalSearchParams();
  const id = parseFloat((typeof idString === 'string' ? idString : idString?.[0]) || 'NaN');


  const {data: order, isLoading, error} = useOrderDetails(id);
  const {data: profile} = useProfileByOrder(id);
  const { mutate: updateOrder} = useUpdateOrder();

  const updateStatus = (status:string) => {
    updateOrder({id: id,updatedFields: {status} })
  }

  if(isLoading) {
      return <ActivityIndicator/>

  }
  if(error) {
      return <Text>Failed to fetch</Text>
  }

  if (!order) {
      return(<Text>Not Found</Text>)
  }
  if (!profile) {
    return(<Text>Not Found</Text>)
  }
    return (
        <View style={{padding: 10, gap: 20}}>
            <Stack.Screen options={{title: `Đơn hàng #${id}`}}/>
            
            <FlatList 
                data={order.order_items}
                renderItem={({item}) => <OrderItemListItem item={item}/>}
                contentContainerStyle={{ gap: 10 }}
                ListHeaderComponent={() => <OrderListItem order={order} />}
                ListFooterComponent={() => (
                    <>
                      <View style={{alignItems: 'flex-end', padding: 5}}>
                        <Text style={{fontSize: 17, color: 'orange' , fontWeight: 'bold'}}>Tổng cộng: {formatPrice(order.total)} VNĐ</Text>
                      </View>
                      <View style={{paddingBottom: 10, paddingTop: 10}}>
                        <Text style={{fontSize:17,  color:'gray'}}>Người nhận: {profile.name}</Text>
                        <Text style={{fontSize:17, color:'gray'}}>Địa chỉ: {profile.address}</Text>
                      </View>
                      
                      <Text style={{ fontWeight: 'bold', fontSize: 16 }}>Trạng thái đơn hàng</Text>
                      <View style={{ flexDirection: 'row', gap: 5 }}>
                        {OrderStatusList.map((status) => (
                          <Pressable
                            key={status}
                            onPress={() => updateStatus(status)}
                            style={{
                              borderColor: Colors.light.tint,
                              borderWidth: 1,
                              padding: 10,
                              borderRadius: 5,
                              marginVertical: 10,
                              backgroundColor:
                                order.status === status
                                  ? 'green'
                                  : 'transparent',
                            }}
                          >
                            <Text
                              style={{
                                color:
                                  order.status === status ? 'white' : "black",
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'flex-start', 
    flexDirection: 'row', 
  },
  child: {
    alignSelf: 'flex-end', // Căn lề sát phải của thành phần con
    width: 50,
    height: 50,
    backgroundColor: 'red',
  },
});