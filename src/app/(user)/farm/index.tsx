import { Redirect } from "expo-router";
import { Text, View, ActivityIndicator, SafeAreaView, FlatList } from "react-native";
import { Divider } from "react-native-elements";
import FarmListItem from "../../../components/FarmListItem";
import { useFarmList } from "../../../api/farms";

export default function HomeScreen() {
    const {data: farms, error, isLoading} = useFarmList();
    if (isLoading){
        return <ActivityIndicator/>
    }
    if(error) {
        return <Text>Failed to fetch products</Text>
    }
    return (
        <SafeAreaView style={{backgroundColor: "#eee", flex: 1}}>
            <FlatList
                data={farms}
                renderItem={({item}) => <FarmListItem farm={item}/>}
            />
            <Divider width={1}/> 
            
        </SafeAreaView>
        
    )
}