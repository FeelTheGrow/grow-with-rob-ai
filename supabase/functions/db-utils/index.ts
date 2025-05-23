
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.23.0";

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
        // Insert an asset record using RPC function
        const { data: insertData, error: insertError } = await supabase.rpc('insert_asset', {
          asset_name: params.asset_name,
          asset_path: params.asset_path,
          asset_type: params.asset_type,
          asset_size: params.asset_size,
          asset_mime: params.asset_mime,
          asset_category: params.asset_category,
          asset_alt: params.asset_alt
        });
          
        if (insertError) throw insertError;
        result = insertData;
        break;
        
      case 'delete_asset':
        // Delete an asset record using RPC function
        const { data: deleteData, error: deleteError } = await supabase.rpc('delete_asset', {
          asset_id: params.asset_id
        });
          
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
