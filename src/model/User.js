const { supabase } = require('../../startup/db');

class User {
  static async create(EDV, FirstName, LastName, DisplayName, Email, Password, Birth, BoschId) {
    try {
      const { data, error } = await supabase
        .from('User')
        .insert([{ EDV, FirstName, LastName, DisplayName, Email, Password, Birth, BoschId }]);

      if (error) {
        throw error;
      }

      return data;
    } catch (error) {
      throw error;
    }
  }

  static async findAll() {
    try {
      const { data, error } = await supabase
        .from('User')
        .select('*');

      if (error) {
        throw error;
      }

      return data;
    } catch (error) {
      throw error;
    }
  }

  static async findById(edv) {
    try {
      const { data, error } = await supabase
        .from('User')
        .select('*')
        .eq('EDV', edv.toString());

      if (error) {
        throw error;
      }

      return data[0];
    } catch (error) {
      throw error;
    }
  }

  static async deleteById(edv) {
    try {
      const { error } = await supabase
        .from('User')
        .delete()
        .eq('EDV', edv);

      if (error) {
        throw error;
      }

      return true;
    } catch (error) {
      throw error;
    }
  }

  static async deleteAll() {
    try {
      const { error } = await supabase
        .from('User')
        .delete();

      if (error) {
        throw error;
      }

      return true;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = User;
