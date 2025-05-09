
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

  // Initialize Supabase client with service role key (admin access)
  const supabaseUrl = Deno.env.get('SUPABASE_URL') || '';
  const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') || '';
  const supabase = createClient(supabaseUrl, supabaseKey);

  try {
    const { action, data } = await req.json();
    
    let result;
    
    switch (action) {
      case 'getAssets':
        // Get all assets
        const { data: assets, error: getError } = await supabase
          .from('ftg.assets')
          .select('*')
          .order('created_at', { ascending: false });
        
        if (getError) throw getError;
        result = assets;
        break;
        
      case 'insertAsset':
        // Insert an asset
        const { data: newAsset, error: insertError } = await supabase
          .from('ftg.assets')
          .insert(data)
          .select();
        
        if (insertError) throw insertError;
        result = newAsset;
        break;
        
      case 'deleteAsset':
        // Delete an asset
        const { data: deletedAsset, error: deleteError } = await supabase
          .from('ftg.assets')
          .delete()
          .eq('id', data.id)
          .select();
        
        if (deleteError) throw deleteError;
        result = deletedAsset;
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
    console.error('Error in assets function:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 500 }
    );
  }
});
