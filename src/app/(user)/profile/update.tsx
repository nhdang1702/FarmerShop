import Button from '../../../components/Button';
import Colors from '../../../constants/Colors';
import { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TextInput, Image, Alert,KeyboardAvoidingView } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import { supabase } from '../../../lib/supabase';
import { useMyProfile, useUpdateProfile } from '@/api/profiles';

const UpdateProfileScreen = () => {
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');

  const [errors, setErrors] = useState('');
  const [image, setImage] = useState<string | null>(null);


  const { mutate: updateProfile } = useUpdateProfile();
  const { data: updatingProfile } = useMyProfile();

  const router = useRouter();

  useEffect(() => {
    if (updatingProfile) {
      setName(updatingProfile.name);
      setAddress(updatingProfile.address);
      setPhone(0+updatingProfile.phone.toString());

    }
  }, [updatingProfile]);

  const resetFields = () => {
    setName('');
    setAddress('');
    setPhone('');
  };

  const validateInput = () => {
    setErrors('');
    if (!name) {
      setErrors('Name is required');
      return false;
    }
    if (!address) {
      setErrors('Address is required');
      return false;
    }
    if (!phone) {
      setErrors('Phone number is required');
      return false;
    }
    return true;
  };




  const onUpdate = async () => {
    if (!validateInput()) {
      return;
    }
    updateProfile(
      { name, address, phone },
      {
        onSuccess: () => {
          resetFields();
          router.back();
          console.log("Update!")
        },
      }
    );
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

  return (
    
    <View style={styles.container}>
        <Stack.Screen options={{title: 'Chỉnh sửa'}}/>
        
        <Text style={styles.label}>Tên hiển thị</Text>
        <TextInput
            placeholder="Tên hiển thị" 
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
        <Text style={styles.label}>Số điện thoại</Text>
        <TextInput
            placeholder="Số điện thoại" 
            style={styles.input}
            value={phone ?? ''}
            onChangeText={setPhone}/>
        <Button onPress={onUpdate} text={'Cập nhật'}/>
        
    </View>
    
);
};

export default UpdateProfileScreen;
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