const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://wtdrpcuamkuejzdaabst.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Ind0ZHJwY3VhbWt1ZWp6ZGFhYnN0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjEzMDM0MzgsImV4cCI6MjAzNjg3OTQzOH0.RznKoISO21c6arvJU4mek4LfL8XP8hvLOInJney_RSs';

const supabase = createClient(supabaseUrl, supabaseKey);

async function connectToDB() {
  try {
    await supabase.auth.signInAnonymously(); // Optional: sign in if you need authentication

    console.log('Connected to Supabase');
    return supabase;
  } catch (error) {
    console.error('Error connecting to Supabase:', error.message);
  }
}

module.exports = {
  connectToDB,
  supabase
};
