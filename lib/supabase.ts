import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://vxohjvdzytaoefmgffof.supabase.co';
const supabaseAnonKey = 'sb_publishable_8zl5V9z1nOSKxlB5tgwG4g_1bO0_79A';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);