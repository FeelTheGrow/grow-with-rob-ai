
-- Function to insert an asset
CREATE OR REPLACE FUNCTION public.insert_asset(
  asset_name TEXT,
  asset_path TEXT,
  asset_type TEXT,
  asset_size INTEGER,
  asset_mime TEXT,
  asset_category TEXT,
  asset_alt TEXT
)
RETURNS VOID
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public, ftg
AS $$
BEGIN
  INSERT INTO ftg.assets (
    name,
    file_path,
    file_type,
    file_size,
    mime_type,
    category,
    alt_text
  ) VALUES (
    asset_name,
    asset_path,
    asset_type,
    asset_size,
    asset_mime,
    asset_category,
    asset_alt
  );
END;
$$;

-- Function to delete an asset
CREATE OR REPLACE FUNCTION public.delete_asset(
  asset_id UUID
)
RETURNS VOID
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public, ftg
AS $$
BEGIN
  DELETE FROM ftg.assets WHERE id = asset_id;
END;
$$;
