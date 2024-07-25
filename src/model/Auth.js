const { supabase } = require('../../startup/db');

class Auth {
  static async findByEmail(email) {
    try {
      const { data, error } = await supabase
        .from('User')
        .select('*')
        .eq('Email', email);

      if (error) {
        throw error;
      }

      return data[0];
    } catch (error) {
      throw error;
    }
  }
}

module.exports = Auth;
