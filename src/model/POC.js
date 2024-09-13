const { supabase } = require('../../startup/db');

class POC {
  static async create(ProcessId, BatchId, BatchQnt, ScrapQnt, PartNumber, Movement, EDV, Interditated) {
    console.log({ ProcessId, BatchId, BatchQnt, ScrapQnt, PartNumber, Movement, EDV, Interditated })
    try {
      const { data, error } = await supabase
        .from('POC')
        .insert([{ ProcessId, BatchId, BatchQnt, ScrapQnt, PartNumber, Movement, EDV, Interditated }]);

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
        .from('POC')
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
        .from('POC')
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

  static async updateById(id, obj) {
    try {
      const { error } = await supabase
        .from('POC')
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
        .from('POC')
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
        .from('POC')
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
