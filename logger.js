function log(req,res,next){
  console.log("req.method:",req.method);
  next();
}

module.exports = log