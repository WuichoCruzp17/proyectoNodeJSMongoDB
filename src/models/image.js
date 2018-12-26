const mongoose = require('mongoose');
const {Schema} = mongoose;
const path =   require('path');
/**
 * Creacion del schema para guadar las imagenes
 */
const ImageShcema =new Schema({
    title:{type:String},
    description:{type:String},
    filename:{type:String},
    views:{type:Number, default:0},
    likes:{type:Number, default:0},
    timestamp:{type: Date, default: Date.now}
});

//Variable virtual
ImageShcema.virtual('uniqueId').get(function(){
    //Remuve la extension
    return this.filename.replace(path.extname(this.filename),'');
});

/**
 * Se cra el modelo.
 */
module.exports = mongoose.model('Image',ImageShcema)