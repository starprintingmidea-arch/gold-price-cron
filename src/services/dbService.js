import { supabase } from '../config/supabase.js';

export async function getLastPrice() {
  const { data, error } = await supabase
    .from('gold_prices')
    .select('price')
    .order('created_at', { ascending: false })
    .limit(1);

  if (error) throw error;

  return data.length ? data[0].price : null;
}

export async function insertPrice(symbol, price) {
  const { error } = await supabase
    .from('gold_prices')
    .insert([{ symbol, price }]);

  if (error) throw error;
}