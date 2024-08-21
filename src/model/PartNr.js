const { supabase } = require('../../startup/db');

class PartNr {
  static async create(id) {
    try {
      const { data, error } = await supabase
        .from('PartNumber')
        .insert([{ id }]);

    console.log(data, error)
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
        .from('PartNumber')
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
        .from('PartNumber')
        .select('*')
        .eq('id', id.toString());

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
        .from('PartNumber')
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
        .from('PartNumber')
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
        .from('PartNumber')
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

module.exports = PartNr;
