import { View, Text, StyleSheet, TextInput, Image, Alert, Pressable} from 'react-native';
import Button from '@/components/Button';
import { useState } from 'react';
import { defaultImage } from '@/components/ProductListItem';
import Colors from '@/constants/Colors';
import * as ImagePicker from 'expo-image-picker';
import { useLocalSearchParams, Stack } from 'expo-router';


const CreateProductScreen = () => {
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [errors, setErrors] = useState('');
    const [image, setImage] = useState<string | null>(null);
    
    const { id } = useLocalSearchParams();
    const isUpdating = !!id;


    const resetFields = () => {
        setName('');
        setPrice('');
    };

    const onSubmit = () => {
        if(isUpdating) {
            onUpdate();
        }else {
            onCreate();
        }
    }

    const onCreate = () => {
        if(!validateInput()) {
            return;
        }
        console.warn("Creating Product", name);
        resetFields();
    };
    const onUpdate = () => {
        if(!validateInput()) {
            return;
        }
        console.warn("Update Product", name);
        resetFields();
    };
    const onDelete = () => {
        console.warn('DELETE!');
    }

    const confirmDelete = () => {
        Alert.alert('Xác nhận xóa ?', 'Bạn có chắc chắn muốn xóa sản phẩm này?', [
            {
                text: 'Cancel',
            },
            {
                text: 'Delete',
                style: 'destructive',
                onPress: onDelete
            }
        ])
    }

    const validateInput = () => {
        if(!name) {
            setErrors('Name is required');
            return false;
        }
        if(!price) {
            setErrors('Price is required');
            return false;
        }
        return true;
        
    };
    const pickImage = async () => {
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          allowsEditing: true,
          aspect: [4, 3],
          quality: 1,
        });
    
        console.log(result);
    
        if (!result.canceled) {
          setImage(result.assets[0].uri);
        }
      };

    


    return (
        <View style={styles.container}>
            <Stack.Screen options={{title: isUpdating ? 'Cập nhật sản phẩm' : 'Thêm sản phẩm'}}/>
            <Image source={{uri: image || "https://cdn.pixabay.com/photo/2017/11/10/05/24/add-2935429_960_720.png"}} style={styles.image}  />
            <Text style={styles.textButton} onPress={pickImage}>Thêm ảnh</Text>
            <Text style={styles.label}>Tên sản phẩm</Text>
            <TextInput
                placeholder="Tên sản phẩm" 
                style={styles.input}
                value={name}
                onChangeText={setName}/>

            <Text style={styles.label}>Giá (VNĐ)</Text>
            <TextInput 
                value={price}
                onChangeText={setPrice}
                placeholder="Giá" 
                style={styles.input} 
                keyboardType='numeric'/>
            <Text style={{color: 'red'}}>{errors}</Text>
            <Button onPress={onSubmit} text={isUpdating ? 'Cập nhật sản phẩm' : 'Tạo sản phẩm'}/>
            {isUpdating && <Pressable onPress={confirmDelete} style={styles.deleteContainer}><Text style={styles.delete}>Xóa sản phẩm</Text></Pressable>}
        </View>
    );
};

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

export default CreateProductScreen;
