import { Stack, Link } from "expo-router";
export default function HomeStack() {
    return( 
    <Stack >
        <Stack.Screen name="index" options={{title: 'Home'}}/>
    </Stack>
    );
}