import { useAuth } from "../../providers/AuthProvider";
import { supabase } from "../../lib/supabase";
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import { InsertTables, UpdateTables } from "../../types";


export const useAdminOrderList = ({archived = false}) => {
    const statuses = archived ? ['Completed'] : ['New', 'Shipping'];
    return useQuery({
        queryKey: ['orders', {archived}],
        queryFn: async () => {
          const {data, error} = await supabase.from('orders').select('*').in('status', statuses);
          if(error) {
            throw new Error(error.message);
          }
          return data;
        },
      });
};

export const useMyOrderList = () => {
  const { session } = useAuth();
  const id = session?.user.id;

  return useQuery({
    queryKey: ['orders', { userId: id }],
    queryFn: async () => {
      if (!id) return null;
      const { data, error } = await supabase
        .from('orders')
        .select('*')
        .eq('user_id', id)
        .order('created_at', { ascending: false });
      if (error) {
        throw new Error(error.message);
      }
      return data;
    },
  });
};

export const useOrderDetails = (id: number) => {
    return useQuery({
        queryKey: ['orders', id],
        queryFn: async () => {
          const {data, error} = await supabase.from('orders').select('*, order_items(*, products(*))').eq('id', id).single();
          if(error) {
            throw new Error(error.message);
          }
          return data;
        }
      });
};


export const useInsertOrder = () => {
    const queryClient = useQueryClient();
    const {session} = useAuth();
    const userId = session?.user.id;
    return useMutation({
      
      async mutationFn(data: InsertTables<'orders'> ) {
        
        const { error, data: newProduct } = await supabase
          .from('orders')
          .insert({...data, user_id: userId}).select()
          .single();
  
        if (error) {
          throw new Error(error.message);
        }
        return newProduct;
      },
      async onSuccess() {
        await queryClient.invalidateQueries({queryKey: ['orders']});
      },
    });
  };


  export const useInsertOrder2 = () => {
    const queryClient = useQueryClient();
    const { session } = useAuth();
    const userId = session?.user.id;
  
    return useMutation({
      async mutationFn(data: InsertTables<'orders'>) {
        if (!userId) {
          throw new Error('User ID is not available');
        }
        // Fetch the farm associated with the user
        const { data: farmData, error: farmError } = await supabase
          .from('farms')
          .select('id')
          .eq('user_id', userId)
          .single();
  
        if (farmError) {
          throw new Error(farmError.message);
        }
  
        const { error, data: newOrder } = await supabase
          .from('orders')
          .insert({...data, user_id: userId, farm_id: farmData.id}).select()
          .single();
  
        if (error) {
          throw new Error(error.message);
        }
  
        return newOrder;
      },
      async onSuccess() {
        await queryClient.invalidateQueries({queryKey: ['orders']});
      },
    });
  };

  export const useUpdateOrder = () => {
    const queryClient = useQueryClient();
  
    return useMutation({
      async mutationFn({
        id,
        updatedFields,
      }: {
        id: number;
        updatedFields: UpdateTables<'orders'>;
      }) {
        const { error, data: updatedOrder } = await supabase
          .from('orders')
          .update(updatedFields)
          .eq('id', id)
          .select()
          .single();
  
        if (error) {
          throw new Error(error.message);
        }
        return updatedOrder;
      },
      async onSuccess(_, { id }) {
        await queryClient.invalidateQueries({queryKey: ['orders']});
        await queryClient.invalidateQueries({queryKey:['orders', id]});
      },
    });
  };

  export const useOrderByFarm = () => {
    
    const { session } = useAuth();
    const userId = session?.user.id;
  
    return useQuery({
      queryKey: ['orders', { userId }],
      queryFn: async () => {
        if (!userId) return null;
        
        // Fetch farms associated with the user
        const { data: farmsData, error: farmsError } = await supabase
          .from('farms')
          .select('id')
          .eq('user_id', userId);
        
        if (farmsError) {
          throw new Error(farmsError.message);
        }
  
        // Extract farm IDs from the fetched farms data
        const farmIds = farmsData.map(farm => farm.id);
  
        // Fetch orders associated with the fetched farm IDs
        const { data: ordersData, error: ordersError } = await supabase
          .from('orders')
          .select('*')
          .in('farm_id', farmIds,)
          .order('created_at', { ascending: false });
  
        if (ordersError) {
          throw new Error(ordersError.message);
        }
  
        return ordersData;
      },
    });
  };

  export const useOrderByFarm2 = ({ archived = false }) => {
    const statuses = archived ? ['Completed'] : ['New', 'Shipping'];
  
    const { session } = useAuth();
    const userId = session?.user.id;
  
    return useQuery({
      queryKey: ['orders', { userId, archived }],
      queryFn: async () => {
        if (!userId) return null;
        
        // Fetch farms associated with the user
        const { data: farmsData, error: farmsError } = await supabase
          .from('farms')
          .select('id')
          .eq('user_id', userId);
        
        if (farmsError) {
          throw new Error(farmsError.message);
        }
  
        // Extract farm IDs from the fetched farms data
        const farmIds = farmsData.map(farm => farm.id);
  
        // Fetch all orders associated with the fetched farm IDs
        const { data: allOrdersData, error: allOrdersError } = await supabase
          .from('orders')
          .select('*')
          .in('farm_id', farmIds)
          .order('created_at', { ascending: false });
  
        if (allOrdersError) {
          throw new Error(allOrdersError.message);
        }
  
        // Filter orders based on statuses
        const ordersData = allOrdersData.filter(order => statuses.includes(order.status));
  
        return ordersData;
      },
    });
  };
  export const useOrderByFarm3 = ({ archived = true }) => {
    const statuses = archived ? ['Completed'] : ['New', 'Shipping'];
  
    const { session } = useAuth();
    const userId = session?.user.id;
  
    return useQuery({
      queryKey: ['orders', { userId, archived }],
      queryFn: async () => {
        if (!userId) return null;
        
        // Fetch farms associated with the user
        const { data: farmsData, error: farmsError } = await supabase
          .from('farms')
          .select('id')
          .eq('user_id', userId);
        
        if (farmsError) {
          throw new Error(farmsError.message);
        }
  
        // Extract farm IDs from the fetched farms data
        const farmIds = farmsData.map(farm => farm.id);
  
        // Fetch all orders associated with the fetched farm IDs
        const { data: allOrdersData, error: allOrdersError } = await supabase
          .from('orders')
          .select('*')
          .in('farm_id', farmIds)
          .order('created_at', { ascending: false });
  
        if (allOrdersError) {
          throw new Error(allOrdersError.message);
        }
  
        // Filter orders based on statuses
        const ordersData = allOrdersData.filter(order => statuses.includes(order.status));
  
        return ordersData;
      },
    });
  };
  