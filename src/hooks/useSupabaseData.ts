import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

export interface EngagementData {
  id: string;
  post_type: string;
  likes: number;
  shares: number;
  comments: number;
}

export const useSupabaseData = () => {
  const [data, setData] = useState<EngagementData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data: engagementData, error } = await supabase
          .from('social_engagement')
          .select('*');

        if (error) throw error;
        setData(engagementData || []);
      } catch (err) {
        console.error('Error fetching data:', err);
        setError('Failed to fetch data. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { data, loading, error };
};