import { Redirect, Stack } from "expo-router";
import { Text, View, ActivityIndicator, SafeAreaView, FlatList, ScrollView } from "react-native";
import { Divider } from "react-native-elements";
import FarmListItem from "../../../components/FarmListItem";
import { useFarmList } from "../../../api/farms";
import Header from "@/components/Header";

export default function HomeScreen() {
    const {data: farms, error, isLoading} = useFarmList();
    if (isLoading){
        return <ActivityIndicator/>
    }
    if(error) {
        return <Text>Failed to fetch products</Text>
    }
    return (
        <View style={{backgroundColor: "#eee", flex: 1,marginTop: 50, padding: 12}}>
            <Stack.Screen options={{headerShown: false}}/>
            <FlatList
            ListHeaderComponent={
                <>
                  <Header />
                </>
              }
                data={farms}
                renderItem={({item}) => <FarmListItem farm={item}/>}
            />
            <Divider width={1}/> 
            
        </View>
        
    )
}