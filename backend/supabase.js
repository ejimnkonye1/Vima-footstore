const { createClient } = require('@supabase/supabase-js');

// Initialize Supabase
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const supabaseBucket = process.env.SUPABASE_BUCKET;

const supabase = createClient(supabaseUrl, supabaseKey);
 
module.exports = {
    supabase,
    supabaseBucket
}