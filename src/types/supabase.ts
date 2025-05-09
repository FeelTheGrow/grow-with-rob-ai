
import { Database } from '@/integrations/supabase/types';

// Extend the base Database type to include our custom ftg schema
export interface ExtendedDatabase extends Database {
  ftg: {
    Tables: {
      assets: {
        Row: {
          id: string;
          name: string;
          file_path: string;
          file_type: string;
          file_size: number;
          mime_type: string;
          category: string;
          description: string | null;
          alt_text: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          file_path: string;
          file_type: string;
          file_size: number;
          mime_type: string;
          category: string;
          description?: string | null;
          alt_text?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          file_path?: string;
          file_type?: string;
          file_size?: number;
          mime_type?: string;
          category?: string;
          description?: string | null;
          alt_text?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
    };
  };
}

// Re-export the Asset type to use throughout the app
export type Asset = ExtendedDatabase['ftg']['Tables']['assets']['Row'];
