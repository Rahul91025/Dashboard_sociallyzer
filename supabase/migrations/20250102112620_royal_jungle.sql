/*
  # Create Social Media Engagement Table

  1. New Tables
    - `social_engagement`
      - `id` (uuid, primary key)
      - `post_type` (text)
      - `likes` (integer)
      - `shares` (integer)
      - `comments` (integer)
      - `created_at` (timestamp)
      - `user_id` (uuid, foreign key)

  2. Security
    - Enable RLS on `social_engagement` table
    - Add policies for authenticated users to manage their data
*/

CREATE TABLE IF NOT EXISTS social_engagement (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  post_type text NOT NULL,
  likes integer DEFAULT 0,
  shares integer DEFAULT 0,
  comments integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  user_id uuid REFERENCES auth.users(id)
);

-- Enable RLS
ALTER TABLE social_engagement ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Users can read own data"
  ON social_engagement
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own data"
  ON social_engagement
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- Insert sample data
INSERT INTO social_engagement (post_type, likes, shares, comments, user_id)
VALUES 
  ('Carousel', 1200, 300, 150, auth.uid()),
  ('Reel', 2500, 800, 450, auth.uid()),
  ('Story', 800, 100, 50, auth.uid()),
  ('Post', 1500, 400, 200, auth.uid()),
  ('Video', 3000, 1000, 600, auth.uid());