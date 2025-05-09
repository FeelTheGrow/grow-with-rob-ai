
import { serve } from 'http/server';
import { createClient } from '@supabase/supabase-js';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  // Get the request body
  const body = await req.json();
  const { action, params } = body;

  // Initialize Supabase client
  const supabaseUrl = Deno.env.get('SUPABASE_URL') || '';
  const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') || '';
  const supabase = createClient(supabaseUrl, supabaseKey);

  try {
    let result;

    switch (action) {
      case 'insert_asset':
        // Insert an asset record
        const { data: insertData, error: insertError } = await supabase
          .from('ftg.assets')
          .insert({
            name: params.asset_name,
            file_path: params.asset_path,
            file_type: params.asset_type,
            file_size: params.asset_size,
            mime_type: params.asset_mime,
            category: params.asset_category,
            alt_text: params.asset_alt
          });
          
        if (insertError) throw insertError;
        result = insertData;
        break;
        
      case 'delete_asset':
        // Delete an asset record
        const { data: deleteData, error: deleteError } = await supabase
          .from('ftg.assets')
          .delete()
          .eq('id', params.asset_id);
          
        if (deleteError) throw deleteError;
        result = deleteData;
        break;
        
      default:
        return new Response(
          JSON.stringify({ error: 'Invalid action' }),
          { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 400 }
        );
    }

    return new Response(
      JSON.stringify(result),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 500 }
    );
  }
});
