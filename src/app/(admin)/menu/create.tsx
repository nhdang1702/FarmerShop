import Button from '@/components/Button';
import Colors from '@/constants/Colors';
import { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TextInput, Image, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import {
  useDeleteProduct,
  useInsertProduct,
  useProduct,
  useUpdateProduct,
} from '@/api/products';

import { supabase } from '@/lib/supabase';


const CreateProductScreen = () => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState<string | null>('');
  const [errors, setErrors] = useState('');
  const [image, setImage] = useState<string | null>(null);

  const { id: idString } = useLocalSearchParams();
  const id = parseFloat(
    typeof idString === 'string' ? idString : idString?.[0]
  );
  const isUpdating = !!idString;

  const { mutate: insertProduct } = useInsertProduct();
  const { mutate: updateProduct } = useUpdateProduct();
  const { data: updatingProduct } = useProduct(id);
  const { mutate: deleteProduct } = useDeleteProduct();

  const router = useRouter();

  useEffect(() => {
    if (updatingProduct) {
      setName(updatingProduct.name);
      setPrice(updatingProduct.price.toString());
      setImage(updatingProduct.image);
      setDescription(updatingProduct.description);

    }
  }, [updatingProduct]);

  const resetFields = () => {
    setName('');
    setPrice('');
    setDescription('');
  };

  const validateInput = () => {
    setErrors('');
    if (!name) {
      setErrors('Name is required');
      return false;
    }
    if (!price) {
      setErrors('Price is required');
      return false;
    }
    if (isNaN(parseInt(price))) {
      setErrors('Price is not a number');
      return false;
    }
    return true;
  };

  const onSubmit = () => {
    if (isUpdating) {
      onUpdate();
    } else {
      onCreate();
    }
  };

  const onCreate = async () => {
    if (!validateInput()) {
      return;
    }

    insertProduct(
      { name, price: parseInt(price), image, description },
      {
        onSuccess: () => {
          resetFields();
          router.back();
        },
      }
    );
  };

  const onUpdate = async () => {
    if (!validateInput()) {
      return;
    }

    

    updateProduct(
      { id, name, price: parseFloat(price), image },
      {
        onSuccess: () => {
          resetFields();
          router.back();
        },
      }
    );
  };

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const onDelete = () => {
    deleteProduct(id, {
      onSuccess: () => {
        resetFields();
        router.replace('/(admin)');
      },
    });
  };

  const confirmDelete = () => {
    Alert.alert('Confirm', 'Are you sure you want to delete this product', [
      {
        text: 'Cancel',
      },
      {
        text: 'Delete',
        style: 'destructive',
        onPress: onDelete,
      },
    ]);
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
        <Text style={styles.label}>Mô tả</Text>
        <TextInput
            placeholder="Mô tả" 
            style={styles.input}
            value={description ?? ''}
            onChangeText={setDescription}/>
        <Button onPress={onSubmit} text={isUpdating ? 'Cập nhật sản phẩm' : 'Tạo sản phẩm'}/>
        {isUpdating && (<Text onPress={confirmDelete} style={styles.textButton}>
                            Xóa sản phẩm
                        </Text>)}
    </View>
);
};

export default CreateProductScreen;
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