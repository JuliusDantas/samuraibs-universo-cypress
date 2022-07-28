const { defineConfig } = require("cypress");
const { Pool } = require('pg')

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
      // Conexão com o banco de dados
      const pool = new Pool({
        host:'salt.db.elephantsql.com',
        user:'qysbjzkr',
        password:'BJwt9j8ethbzow5vurcQuDg9HZidf4dv',
        database:'qysbjzkr',
        port:5432
      })
      
      on('task', {
        removeUser(email){
          return new Promise(function(resolve){
            pool.query('DELETE FROM public.users WHERE email = $1', [email], function(error, result){
              if(error){
                throw error;
              }
              resolve({sucess: result})
            })
          })
          
        }
      })
    },
    baseUrl: 'http://localhost:3000',    
  },
  // These settings apply everywhere unless overridden
  defaultCommandTimeout: 10000,
  viewportWidth: 1440,
  viewportHeight: 900   
  
});

