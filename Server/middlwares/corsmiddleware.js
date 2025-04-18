const express=require ('express')
const Link =((req,res,next)=>{
const allowedOrigins=['http://localhost:5173']
const origin=req.header.origin
if(allowedOrigins.includes(origin)){
    res.setHeader(('Access-Control-Allow-Origin'),origin)

    //allowed methods
    res.setHeader('Access-control-Allow-Methods',"Get,POST,PUT,DELETE")

     // Allowed headers
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type,Authorization');

  // Allow credentials (cookies, authorization headers)
  res.setHeader('Access-Control-Allow-Credentials', true);

  // Handle preflight OPTIONS requests
  if (req.method === 'OPTIONS') {
    return res.sendStatus(204); // No Content success status for OPTIONS
  }

  next(); 
}});
module.exports=Link