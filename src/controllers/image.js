const path = require('path');
const {randomNumbe} = require('../helpers/libs'); 
const fs =require('fs-extra');
const {Image,Comment} =require('../models/index');
const md5 = require('md5');
const ctrl = {};

ctrl.index = async (req, res)=>{ 
   const image = await Image.findOne({filename:{$regex:req.params.image_id}});
    const comments =await Comment.find({image_id:image._id});   
   res.render('image',{image, comments});
};
ctrl.create = (req, res)=>{

    const saveImage = async function(){
        const nombreRandom = randomNumbe();
        const images =    await Image.find({filename:nombreRandom});
        if(images.length>0){
            saveImage();
        }else{

        console.log(nombreRandom);
        const imageTempPath = req.file.path;
        const ext =path.extname(req.file.originalname).toLowerCase();
        const targetPaht = path.resolve(`src/public/upload/${nombreRandom}${ext}`);
        if(ext==='.png' || ext ==='.jpg' || ext ==='.jpeg' || ext =='.gif'){
          await fs.rename(imageTempPath, targetPaht);
          const newImage =  new Image({
                title:req.body.title,
                description:req.body.description,
                filename:nombreRandom + ext,
            });
    
          const imageSave = await newImage.save();
          res.redirect('/images/'+nombreRandom);
          
        }else{
           await fs.unlink(imageTempPath);
           res.status(500).json({error:'Only Image are allowed'});
        }
        
        }
        
    };
    saveImage();
   
};

ctrl.like = (req, res)=>{

};

ctrl.comment = async(req, res)=>{
   const image = await Image.findOne({filename:{$regex:req.params.image_id}});
   if(image){
    const newComment = new Comment(req.body);  
    newComment.gravatar = md5(newComment.email);
    newComment.image_id = image._id; 
    await newComment.save();
    console.log(newComment);  
    res.redirect('/images/'+image.uniqueId);
   }
   
  
};

ctrl.remove = (req, res)=>{

};
module.exports = ctrl;