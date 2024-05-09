import { supabase } from "../../lib/supabase";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Tables } from "../../types";
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