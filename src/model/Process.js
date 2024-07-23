const { supabase } = require('../../startup/db');

class Process {
  static async create(Name, CT, OEE, POT, MAEQnt, Type = "Shared") {
    try {
      const { data, error } = await supabase
        .from('Process')
        .insert([{ Name, CT, OEE, POT, MAEQnt, Type }]);

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
        .from('Process')
        .select('*');

      if (error) {
        throw error;
      }

      return data;
    } catch (error) {
      throw error;
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
      throw error;
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
      throw error;
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
      throw error;
    }
  }
}

module.exports = Process;
