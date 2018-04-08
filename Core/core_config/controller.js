let path = require('path');
class Controller{

    loadModel(modelname){
        let model = require(path.join(__dirname,'../../application/Models/'+modelname));
        return model;
    }
}
module.exports = Controller;