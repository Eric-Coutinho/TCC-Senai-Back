const { supabase } = require('../../startup/db');

class VSM {
  static async findAll() {
    try {
      const { data, error } = await supabase
        .from('POC')
        .select(`
            id,
            Process (
                id,
                Name,
                CT,
                OEE,
                POT, 
                MAEQnt,
                Type, 
                Order,
                created_at
            ),
            BatchId,
            BatchQnt,
            ScrapQnt,
            PartNumber (
                PartNumber,
                created_at
            ),
            Movement,
            User (
                EDV,
                FirstName,
                LastName,
                DisplayName,
                Email,
                Birth,
                BoschId,
                Password,
                created_at
            ),
            Interditated,
            created_at
        `)

      if (error) {
        throw error;
      }

      return data;
    } catch (error) {
      throw error;
    }
  }

  static async findFiltered(days) {
    try {
      // console.log(days)
      var today = new Date();
      var priorDate = new Date(new Date().setDate(today.getDate() - days));
      const { data, error } = await supabase
        .from('POC')
        .select(`
            id,
            Process (
                id,
                Name,
                CT,
                OEE,
                POT, 
                MAEQnt,
                Type, 
                Order,
                created_at
            ),
            BatchId,
            BatchQnt,
            ScrapQnt,
            PartNumber (
                PartNumber,
                created_at
            ),
            Movement,
            User (
                EDV,
                FirstName,
                LastName,
                DisplayName,
                Email,
                Birth,
                BoschId,
                Password,
                created_at
            ),
            Interditated,
            created_at
        `)
        .gte('created_at', priorDate.toISOString())

      if (error) {
        throw error;
      }

      return data;
    } catch (error) {
      throw error;
    }
  }

}

module.exports = VSM;
