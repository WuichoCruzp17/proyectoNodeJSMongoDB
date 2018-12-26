const helpers ={};

helpers.randomNumbe = ()=>{
    const possible ='abcdefghijklmnoqrstuvwxyz0123456789';
    var randomNumbe ="";
    for(let i=0; i<6;i++){
        randomNumbe += possible.charAt(Math.floor(Math.random()*possible.length));

    }
    return randomNumbe;
};

module.exports = helpers;