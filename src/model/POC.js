const { supabase } = require('../../startup/db');

class POC {
  static async create(processId, batchID, batchQnt, scrapQnt, operatorEDV, interditaded) {
    try {
      const { data, error } = await supabase
        .from('poc')
        .insert([{ processId, batchID, batchQnt, scrapQnt, operatorEDV, interditaded }]);

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
        .from('poc')
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
        .from('poc')
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
        .from('poc')
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
        .from('poc')
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

module.exports = POC;
