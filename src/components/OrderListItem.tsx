import { View, Text, StyleSheet, Pressable, ActivityIndicator } from 'react-native';
import React from 'react';
import { Tables } from '../types';
import relativeTime from 'dayjs/plugin/relativeTime';
import dayjs from 'dayjs';
import { Link, useSegments } from 'expo-router';
import { useFarm } from '@/api/farms';
import { useEffect } from 'react';

dayjs.extend(relativeTime);

type OrderListItemProps = {
  order: Tables<'orders'>;
};

const OrderListItem = ({ order }: OrderListItemProps) => {
  const farmQuery = useFarm(order.farm_id);
  const segments = useSegments();

  useEffect(() => {
    // Ensure farmQuery is populated before rendering
    if (!farmQuery.isLoading && !farmQuery.error && !farmQuery.data) {
      farmQuery.refetch(); // Refetch farm data if not yet available
    }
  }, [farmQuery]);

  if (farmQuery.isLoading) {
    return <ActivityIndicator />;
  }

  if (farmQuery.error || !farmQuery.data) {
    return <Text>Error fetching farm data</Text>;
  }

  const farm = farmQuery.data;

  return (
    <Link href={`/${segments[0]}/orders/${order.id}` as `${string}:${string}`} asChild>
      <Pressable style={styles.container}>
        <View>
          <View>
            <Text style={styles.title}>{farm.name} #{order.id}</Text>
          </View>
          <Text style={styles.time}>{dayjs(order.created_at).fromNow()}</Text>
        </View>

        <Text style={styles.status}>{order.status}</Text>
      </Pressable>
    </Link>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontWeight: 'bold',
    marginVertical: 5,
  },
  time: {
    color: 'gray',
  },
  status: {
    fontWeight: '500',
  },
});

export default OrderListItem;