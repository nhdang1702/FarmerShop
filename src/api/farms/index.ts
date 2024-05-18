import { supabase } from "../../lib/supabase";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Tables, InsertTables } from "../../types";
import { useAuth } from "../../providers/AuthProvider";
export const useFarmList = () => {
    return useQuery({
        queryKey: ['farms'],
        queryFn: async () => {
          const {data, error} = await supabase.from('farms').select('*');
          if(error) {
            throw new Error(error.message);
          }
          return data;
        },
      });
};

export const useFarm = (id: number) => {
    return useQuery({
        queryKey: ['farms', id],
        queryFn: async () => {
          const {data, error} = await supabase.from('farms').select('*').eq('id', id).single();
          if(error) {
            throw new Error(error.message);
          }
          return data;
        }
      });
};

export const useFarmAdmin = () => {
  const queryClient = useQueryClient();
  const { session } = useAuth();
  const userId = session?.user.id;
  return useQuery({
    
      queryKey: ['farms', { userId }],
      queryFn: async () => {
        if (!userId) return null;
        const {data, error} = await supabase.from('farms').select('*').eq('user_id', userId).single();
        if(error) {
          throw new Error(error.message);
        }
        return data;
      }
    });
};

export const useFarmByOrder = (orderId: number) => {
  return useQuery({
    queryKey: ['farms', { orderId }],
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
        .from('farms')
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

export const useUpdateFarm = () => {
  const queryClient = useQueryClient();
  const { session } = useAuth();
  const userId = session?.user.id;

  return useMutation({
    async mutationFn(data: any) {
      if (!userId) return null;

      const { error, data: updatedFarm } = await supabase
        .from('farms')
        .update({
          name: data.name,
          image: data.image,
          address: data.address,
          description: data.description,
        })
        .eq('user_id', userId)
        .select()
        .single();

      if (error) {
        throw new Error(error.message);
      }
      return updatedFarm;
    },
    async onSuccess(_, { userId }) {
      await queryClient.invalidateQueries({ queryKey: ['farms']});
      await queryClient.invalidateQueries({queryKey: ['farms', {userId}]});
    },
  });
};

export const useInsertFarm = () => {
  const queryClient = useQueryClient();
  const { session } = useAuth();
  const userId = session?.user.id;

  return useMutation({
    async mutationFn(data: InsertTables<'farms'>) {
      if (!userId) return null;

      const { error, data: newFarm} = await supabase
        .from('farms')
        .insert({
          user_id: userId,
          name: data.name,
          address: data.address,
          image: data.image,
          description: data.description,
          
        })
        .single();

      if (error) {
        throw new Error(error.message);
      }
      return newFarm;
    },
    async onSuccess() {
      await queryClient.invalidateQueries({queryKey: ['profiles']});
    },
  });
};