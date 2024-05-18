import { useAuth } from "../../providers/AuthProvider";
import { supabase } from "../../lib/supabase";
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import { InsertTables, UpdateTables } from "../../types";

export const useMyProfile = () => {
    const { session } = useAuth();
    const id = session?.user.id;
  
    return useQuery({
      queryKey: ['profiles', { userId: id }],
      queryFn: async () => {
        if (!id) return null;
        const { data, error } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', id)
          .single();
        if (error) {
          throw new Error(error.message);
        }
        return data;
      },
    });
  };

  export const useProfileByOrder = (orderId: number) => {
    return useQuery({
      queryKey: ['profiles', { orderId }],
      queryFn: async () => {
        const { data: orderData, error: orderError } = await supabase
          .from('orders')
          .select('user_id')
          .eq('id', orderId)
          .single();
  
        if (orderError) {
          throw new Error(orderError.message);
        }
  
        const userId = orderData?.user_id;
  
        if (!userId) {
          throw new Error('User ID not found for the order');
        }
  
        const { data, error } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', userId)
          .single();
  
        if (error) {
          throw new Error(error.message);
        }
  
        return data;
      },
    });
  };

  export const useUpdateProfile = () => {
    const queryClient = useQueryClient();
    const { session } = useAuth();
    const userId = session?.user.id;
  
    return useMutation({
      async mutationFn(data: any) {
        if (!userId) return null;
  
        const { error, data: updatedProfile } = await supabase
          .from('profiles')
          .update({
            name: data.name,
            address: data.address,
            phone: data.phone,
          })
          .eq('id', userId)
          .select()
          .single();
  
        if (error) {
          throw new Error(error.message);
        }
        return updatedProfile;
      },
      async onSuccess(_, { userId }) {
        await queryClient.invalidateQueries({ queryKey: ['profiles']});
        await queryClient.invalidateQueries({queryKey: ['profiles', {userId}]});
      },
    });
  };

  export const useInsertProfile = () => {
    const queryClient = useQueryClient();
    const { session } = useAuth();
    const userId = session?.user.id;
  
    return useMutation({
      async mutationFn(data: InsertTables<'profiles'>) {
        if (!userId) return null;

        const { error, data: newProfile } = await supabase
          .from('profiles')
          .insert({
            id: userId,
            name: data.name,
            address: data.address,
            phone: data.phone,
            
          })
          .single();
  
        if (error) {
          throw new Error(error.message);
        }
        return newProfile;
      },
      async onSuccess() {
        await queryClient.invalidateQueries({queryKey: ['profiles']});
      },
    });
  };