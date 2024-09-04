const { supabase } = require('../../startup/db');

class Process {
  static async create(Name, CT, OEE, POT, MAEQnt, Type = "Shared", Order) {
    try {
      const { data, error } = await supabase
        .from('Process')
        .insert([{ Name, CT, OEE, POT, MAEQnt, Type, Order }]);

      if (error) {
        throw error;
      }

      return true;
    } catch (error) {
      return false;
    }
  }

  static async findAll() {
    try {
      const { data, error } = await supabase
        .from('Process')
        .select('*');

      if (error) {
        throw error;
      }

      return data;
    } catch (error) {
      return error;
    }
  }

  static async findById(id) {
    try {
      const { data, error } = await supabase
        .from('Process')
        .select('*')
        .eq('id', id);

      if (error) {
        throw error;
      }

      return data[0];
    } catch (error) {
      return error;
    }
  }

  static async updateById(id, obj) {
    try {
      const { error } = await supabase
        .from('Process')
        .update(obj)
        .eq('id', id)

      if (error)
         throw error

      return true
    } catch (error) {
      console.log(error)
      return false
    }
  }

  static async deleteById(id) {
    try {
      const { error } = await supabase
        .from('Process')
        .delete()
        .eq('id', id);

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
        .from('Process')
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

module.exports = Process;
