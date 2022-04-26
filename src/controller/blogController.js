const blogModel = require("../models/blogModel")


const getblog = async function(req,res) {
try {    const result = await blogModel.find({isdeleted:false} , {ispublished:true})
    res.send(result)
    if(!result) return  res.status(404).send({ status: false, msg: "No document found" });

    res.send ({status:true , data:result})
} catch(error){
 res.status(400).send(error)
}
}


const filterblog = async function(req,res){
    const x = req.query
    let result = await blogModel.findById({authorId:x.authorId}).find({catagory:x.catagory})
     res.send(result)
}


module.exports.getblog = getblog
module.exports.filterblog = filterblog