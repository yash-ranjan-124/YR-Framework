let config = require('../config.json');
let DB = require('./dbClass');
class Model extends DB{
    constructor(){
         super(config.db.mysql.dev.default);

    }
    dbclass(){
        return this;
    }
}
module.exports = Model;