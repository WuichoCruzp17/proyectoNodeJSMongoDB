const helpers ={};
const moment = require('moment');

helpers.timeAGo =timestamp =>{
   return  moment(timestamp).startOf('minute').fromNow();
};

module.exports = helpers;  