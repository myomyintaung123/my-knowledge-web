// import { createClient } from '@supabase/supabase-js';

// const SUPABASE_URL = 'https://naafzakihmthkiiuojmb.supabase.co';
// const SUPABASE_ANON_KEY = 'sb_publishable_WH0MjaikmAHsxP2e5Vjfwg_4FK4orrt'; // ကူးလာတဲ့ Publishable key ကို ဤနေရာတွင် ထည့်ပါ

// export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);


import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

export const supabase = createClient(supabaseUrl, supabaseAnonKey)



