/*
  # Fix RLS policies for social_engagement table
  
  1. Changes
    - Drop existing policies
    - Create new policies for authenticated users
    - Add policy for inserting data
  
  2. Security
    - Enable RLS
    - Add policies for CRUD operations
*/

-- Drop existing policies if any
DROP POLICY IF EXISTS "Users can read own data" ON social_engagement;
DROP POLICY IF EXISTS "Users can insert own data" ON social_engagement;

-- Create new policies
CREATE POLICY "Enable read access for authenticated users"
  ON social_engagement
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Enable insert access for authenticated users"
  ON social_engagement
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Enable update access for authenticated users"
  ON social_engagement
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);