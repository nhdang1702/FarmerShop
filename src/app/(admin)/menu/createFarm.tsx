import Button from '../../../components/Button';
import Colors from '../../../constants/Colors';
import { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TextInput, Image, Alert,KeyboardAvoidingView } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import { supabase } from '../../../lib/supabase';
import { useFarm, useFarmAdmin, useInsertFarm, useUpdateFarm } from '@/api/farms';

const UpdateFarmScreen = () => {
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [description, setDescription] = useState<string | null>('');
  const [errors, setErrors] = useState('');
  const [image, setImage] = useState('');

  

  const { mutate: insertFarm } = useInsertFarm();

  const router = useRouter();


  const resetFields = () => {
    setName('');
    setAddress('');
    setDescription('');
  };

  const validateInput = () => {
    setErrors('');
    if (!name) {
      setErrors('Name is required');
      return false;
    }
    if (!address) {
      setErrors('Price is required');
      return false;
    }
    return true;
  };

  const onSubmit = () => {
    console.log("Hello");
  };


  

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4,3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };
  const onCreate = async () => {
    if (!validateInput()) {
      return;
    }

    insertFarm(
      { name, address, image, description  },
      {
        onSuccess: () => {
          resetFields();
          router.back();
        },
      }
    );
  };


  return (
    
    <View style={styles.container}>
        <Stack.Screen options={{title: 'Tạo cửa hàng'}}/>
        <Image source={{uri: image || "https://cdn.pixabay.com/photo/2017/11/10/05/24/add-2935429_960_720.png"}} style={styles.image}  />
        <Text style={styles.textButton} onPress={pickImage}>Thêm ảnh</Text>
        <Text style={styles.label}>Tên cửa hàng</Text>
        <TextInput
            placeholder="Tên cửa hàng" 
            style={styles.input}
            value={name}
            onChangeText={setName}/>

        <Text style={styles.label}>Địa chỉ</Text>
        <TextInput 
            value={address}
            onChangeText={setAddress}
            placeholder="Địa chỉ" 
            style={styles.input} />
        <Text style={{color: 'red'}}>{errors}</Text>
        <Text style={styles.label}>Mô tả</Text>
        <TextInput
            placeholder="Giới thiệu" 
            style={styles.input}
            value={description ?? ''}
            onChangeText={setDescription}/>
        <Button onPress={onCreate} text={'Tạo cửa hàng'}/>
        
    </View>
    
);
};

export default UpdateFarmScreen;
const styles = StyleSheet.create({
    container: {
        flex:1,
        justifyContent: 'center',
        padding: 10, 
    },
    input: {
        backgroundColor: 'white',
        padding: 10,
        borderRadius: 5,
        marginTop: 5,
        marginBottom: 20,
    },
    label: {
        color: 'gray',
        fontSize: 16
    },
    image: {
        width: '50%',
        aspectRatio: 1,
        alignSelf: 'center',
        marginBottom: 10,
        

    },
    textButton: {
        alignSelf: 'center',
        fontWeight: 'bold',
        color: Colors.light.tint,
        marginVertical: 10,
        fontSize: 16

    },
    deleteContainer: {
        backgroundColor: 'red',
        padding: 15,
        alignItems: 'center',
        borderRadius: 100,
        marginVertical: 10,
      },
    delete: {
        fontSize: 16,
        fontWeight: '600',
        color: 'white',
      },

})