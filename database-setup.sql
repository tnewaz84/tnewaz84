-- Create profiles table
CREATE TABLE IF NOT EXISTS profiles (
  id UUID REFERENCES auth.users ON DELETE CASCADE PRIMARY KEY,
  username TEXT UNIQUE,
  full_name TEXT,
  avatar_url TEXT,
  website TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create forum posts table
CREATE TABLE IF NOT EXISTS forum_posts (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  user_id UUID REFERENCES auth.users ON DELETE CASCADE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create forum comments table
CREATE TABLE IF NOT EXISTS forum_comments (
  id SERIAL PRIMARY KEY,
  post_id INTEGER REFERENCES forum_posts ON DELETE CASCADE NOT NULL,
  content TEXT NOT NULL,
  user_id UUID REFERENCES auth.users ON DELETE CASCADE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create chat messages table
CREATE TABLE IF NOT EXISTS chat_messages (
  id SERIAL PRIMARY KEY,
  content TEXT NOT NULL,
  user_id UUID REFERENCES auth.users ON DELETE CASCADE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Set up Row Level Security (RLS)
-- Enable RLS on all tables
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE forum_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE forum_comments ENABLE ROW LEVEL SECURITY;
ALTER TABLE chat_messages ENABLE ROW LEVEL SECURITY;

-- Create policies for profiles
CREATE POLICY "Public profiles are viewable by everyone" 
ON profiles FOR SELECT USING (true);

CREATE POLICY "Users can update their own profile" 
ON profiles FOR UPDATE USING (auth.uid() = id);

-- Create policies for forum posts
CREATE POLICY "Forum posts are viewable by everyone" 
ON forum_posts FOR SELECT USING (true);

CREATE POLICY "Authenticated users can create forum posts" 
ON forum_posts FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Users can update their own forum posts" 
ON forum_posts FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own forum posts" 
ON forum_posts FOR DELETE USING (auth.uid() = user_id);

-- Create policies for forum comments
CREATE POLICY "Forum comments are viewable by everyone" 
ON forum_comments FOR SELECT USING (true);

CREATE POLICY "Authenticated users can create forum comments" 
ON forum_comments FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Users can update their own forum comments" 
ON forum_comments FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own forum comments" 
ON forum_comments FOR DELETE USING (auth.uid() = user_id);

-- Create policies for chat messages
CREATE POLICY "Chat messages are viewable by everyone" 
ON chat_messages FOR SELECT USING (true);

CREATE POLICY "Authenticated users can create chat messages" 
ON chat_messages FOR INSERT WITH CHECK (auth.role() = 'authenticated');

-- Create function to handle new user creation
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, username, full_name, avatar_url, website)
  VALUES (
    NEW.id,
    NEW.email,
    '',
    '',
    ''
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger for new user creation
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

