const { supabase } = require('../../startup/db');

class PartNr {
  static async create(PartNumber) {
    try {
      const { data, error } = await supabase
        .from('PartNumber')
        .insert([{ PartNumber }]);

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

  static async findById(PartNumber) {
    try {
      const { data, error } = await supabase
        .from('PartNumber')
        .select('*')
        .eq('PartNumber', PartNumber.toString());

      if (error) {
        throw error;
      }

      return data[0];
    } catch (error) {
      return error;
    }
  }

  static async updateById(PartNumber, obj) {
    try {
      const { error } = await supabase
        .from('PartNumber')
        .update(obj)
        .eq('PartNumber', PartNumber)

        if (error)
          throw error

        return true
    } catch (error) {
      console.log(error)
      return false
    }
  }

  static async deleteById(PartNumber) {
    try {
      const { error } = await supabase
        .from('PartNumber')
        .delete()
        .eq('PartNumber', PartNumber);

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
