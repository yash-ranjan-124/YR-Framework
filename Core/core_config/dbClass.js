let DB = require('mysql-activerecord');

class Database{
    constructor(config){
        this.db = new DB.Adapter(config);
    }
    getAdapter(){
        return this.db;
    }
    Select(params){
        return new Promise((resolve,reject)=>{
            let query = "";
            if(params['select']){
                query = this.db.select(params['select']);
            }
            else{
                query = this.db.select("*");
            }
            if(params['conditions']){
                query = query.where(params['conditions']);
            }
            else{
                query = query;
            }
            query.get(params['table'],(error,results)=>{
                if(error){
                    reject(error);
                }
                else{
                    resolve(results);
                }
            });
        });
    }

}
module.exports = Database;