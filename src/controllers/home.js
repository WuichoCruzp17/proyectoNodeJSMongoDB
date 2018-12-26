const ctrl = {};
const {Image} =require('../models');
ctrl.index = async (req, res)=>{
  const images = await Image.find().sort({timestap:'-1'});
  res.render('index', {images});
};
module.exports = ctrl;