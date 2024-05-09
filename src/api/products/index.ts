import { supabase } from "../../lib/supabase";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Tables } from "../../types";
import { useAuth } from "../../providers/AuthProvider";
export const useProductList = () => {
    return useQuery({
        queryKey: ['products'],
        queryFn: async () => {
          const {data, error} = await supabase.from('products').select('*');
          if(error) {
            throw new Error(error.message);
          }
          return data;
        },
      });
};

export const useProduct = (id: number) => {
    return useQuery({
        queryKey: ['products', id],
        queryFn: async () => {
          const {data, error} = await supabase.from('products').select('*').eq('id', id).single();
          if(error) {
            throw new Error(error.message);
          }
          return data;
        }
      });
};


export const useInsertProduct = () => {
    const queryClient = useQueryClient();
  
    return useMutation({
      async mutationFn(data: any) {
        const { error, data: newProduct } = await supabase
          .from('products')
          .insert({
            name: data.name,
            image: data.image,
            price: data.price,
            
          })
          .single();
  
        if (error) {
          throw new Error(error.message);
        }
        return newProduct;
      },
      async onSuccess() {
        await queryClient.invalidateQueries({queryKey: ['products']});
      },
    });
  };
  export const useInsertProduct2 = () => {
    const queryClient = useQueryClient();
    const { session } = useAuth();
    const userId = session?.user.id;
  
    return useMutation({
      async mutationFn(data: any) {
        if (!userId) {
          throw new Error('User ID is not available');
        }
        const { data: farmData, error: farmError } = await supabase
          .from('farms')
          .select('id')
          .eq('user_id', userId)
          .single();
        if (farmError) {
            throw new Error(farmError.message);
        }
        const { error, data: newProduct } = await supabase
          .from('products')
          .insert({
            name: data.name,
            image: data.image,
            price: data.price,
            farm_id: farmData?.id,
            
          }).select()
          .single();
  
        if (error) {
          throw new Error(error.message);
        }
        return newProduct;
      },
      async onSuccess() {
        await queryClient.invalidateQueries({queryKey: ['products']});
      },
    });
  };

export const useUpdateProduct = () => {
    const queryClient = useQueryClient();
  
    return useMutation({
      async mutationFn(data: any) {
        const { error, data: updatedProduct } = await supabase
          .from('products')
          .update({
            name: data.name,
            image: data.image,
            price: data.price,
            description: data.description,
          })
          .eq('id', data.id)
          .select()
          .single();
  
        if (error) {
          throw new Error(error.message);
        }
        return updatedProduct;
      },
      async onSuccess(_, { id }) {
        await queryClient.invalidateQueries({ queryKey: ['products']});
        await queryClient.invalidateQueries({queryKey: ['products', id]});
      },
    });
  };


export const useDeleteProduct = () => {
    const queryClient = useQueryClient();

    return useMutation({
        async mutationFn(id: number){
            await supabase.from('products').delete().eq('id', id);
        },
        async onSuccess() {
            await queryClient.invalidateQueries({queryKey: ['products']});
        }
    })
};

export const useProductListByFarm = (farmId:number) => {
  return useQuery({
      queryKey: ['products', farmId], // Include farmId in the query key to differentiate queries by farm
      queryFn: async () => {
        const {data, error} = await supabase.from('products').select('*').eq('farm_id', farmId);
        if(error) {
          throw new Error(error.message);
        }
        return data;
      },
    });
};