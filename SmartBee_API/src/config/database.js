const { createClient } = require('@supabase/supabase-js');
const config = require('./index');

let supabase = null;

if (config.supabase.url && config.supabase.key) {
  supabase = createClient(config.supabase.url, config.supabase.key);
}

module.exports = { supabase, isSupabaseConfigured: () => Boolean(supabase) };
