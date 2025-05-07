
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { Pool } from "https://deno.land/x/postgres@v0.17.0/mod.ts";

// CORS headers for browser access
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Create a database connection pool
const pool = new Pool({
  user: "uplo8ijbo2gjg",
  password: "_p9@$wv$f*6g",
  database: "db74s3hbdjhfej",
  hostname: "feelthegrow.com",
  port: 5432,
  tls: {
    enabled: true,
    enforce: false,
  },
}, 3, true);

serve(async (req: Request) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { 
      headers: corsHeaders,
      status: 204,
    });
  }

  try {
    // Parse the request body or use an empty object
    const requestData = req.method === 'POST' ? await req.json() : {};
    const { operation, table, data, query } = requestData;

    // Get a client from the pool
    const client = await pool.connect();
    let result;

    try {
      // Perform the requested database operation
      switch (operation) {
        case 'select':
          // Basic select query with optional WHERE clause
          const whereClause = query ? `WHERE ${query}` : '';
          result = await client.queryObject(`SELECT * FROM ${table} ${whereClause}`);
          break;
        
        case 'insert':
          // Insert data into a table
          if (!data || !Array.isArray(data)) {
            throw new Error('Data must be an array of objects');
          }
          
          // Extract column names from the first object
          const columns = Object.keys(data[0]);
          
          // Create placeholder values for each row
          const values = data.map((row, rowIndex) => {
            return `(${columns.map((_, colIndex) => `$${rowIndex * columns.length + colIndex + 1}`).join(', ')})`;
          }).join(', ');
          
          // Flatten all values into a single array
          const flatValues = data.flatMap(row => Object.values(row));
          
          result = await client.queryObject(
            `INSERT INTO ${table} (${columns.join(', ')}) VALUES ${values} RETURNING *`,
            flatValues
          );
          break;
        
        default:
          throw new Error(`Unsupported operation: ${operation}`);
      }
      
      return new Response(JSON.stringify({
        success: true,
        data: result.rows
      }), {
        headers: { 
          ...corsHeaders,
          'Content-Type': 'application/json' 
        }
      });
      
    } finally {
      // Release the client back to the pool
      client.release();
    }
    
  } catch (error) {
    console.error('Database error:', error);
    
    return new Response(JSON.stringify({
      success: false,
      error: error.message
    }), {
      headers: { 
        ...corsHeaders,
        'Content-Type': 'application/json' 
      },
      status: 500
    });
  }
});
