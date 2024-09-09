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

      return true;
    } catch (error) {
      return false
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
      return error;
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
      return error;
    }
  }

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
      return error;
    }
  }

  static async updateById(edv, obj) {
    try {
      const { error } = await supabase
        .from('User')
        .update(obj)
        .eq('EDV', edv)

        if (error)
          throw error

        return true
    } catch (error) {
      console.log(error)
      return false
    }
  }

  static async updateById_Token(edv, token) {
    try {
      const { error } = await supabase
        .from('User')
        .update({Recovery_Token: token})
        .eq('EDV', edv)

        if (error)
          throw error

        return true
    } catch (error) {
      console.log(error)
      return false
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
      return error;
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
      return error;
    }
  }
}

module.exports = User;
