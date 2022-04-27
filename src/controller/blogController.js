const blogModel=require("../models/blogModel")
const authorModel=require("../models/authorModel")
const validator=require("../utils/validator");
const { find } = require("../models/authorModel");

//creating blog by author id
const createBlog=async function(req,res){

const requestBody=req.body;
if(!validator.isValidRequestBody(requestBody)){
    return res.status(400).send({status:false,message:"invalid request parameters,please provide blog details"})
}

//extracting from params
const{title,body,authorId,tags,category,subcategory, isPublished}=requestBody

//validation starts
if(!validator.isValid(title)){
    return res.status(400).send({status:false,message:"Blog Title is required"})
}

if(!validator.isValid(body)){
    return res.status(400).send({status:false,message:"Blog body is required"})
}

if(!validator.isValid(authorId)){
    return res.status(400).send({status:false,message:"Author id is required"})
}

if(!validator.isValid(authorId)){
    return res.status(400).send({status:false,message:`${authorId}is not a valid author id`})
}

const findAuthor=await authorModel.findById(authorId)
if(!findAuthor){
    return res.status(400).send({status:false,message:"Author doesnot exist"})
}

if(!validator.isValid(category)){
    return res.status(400).send({status:false,message:"Blog Title is required"})
}
//validation ends
const blogData={
    title,body,authorId,category, isPublished:isPublished?isPublished:false,
    publishedAt:isPublished?new Date():null,
}


if(tags){
    if(Array.isArray(tags)){

        const uniqueTagArr=[...new Set(tags)];
        blogData["tags"]=uniqueTagArr;//using array constructor here
    }
}

if(subcategory){
    if(Array.isArray(subcategory)){

        const uniqueSubcategoryArr=[...new Set(subcategory)];
        blogData["tags"]=uniqueSubcategoryArr;//using array constructor here
    }
}
const newBlog= await blogModel.create(blogData)
res.status(201).send({status:true,message:"New blog created successfully",data:newBlog})


}


const getBlog = async function(req,res){
    let x = {
        isDeleted:false,
        deletedAt :null,
       isPublished:true
    }
    
    let queryParam = req.query
    const {authorId,tags,category,subcategory}= queryParam
    
    if(!validator.isValidString(authorId)){
        return res.status(400).send({status:false,message:"Author id is required"})

    }

    if(authorId){
        if(!validator.isValid(authorId)){
            return res.status(400).send({status:false,message:"Author id not valid"})
    
        }
    }

    if(!validator.isValidString(tags)){
        return res.status(400).send({status:false,message:"tags id is required"})

    }

    if(!validator.isValidString(category)){
        return res.status(400).send({status:false,message:"category id is required"})

    }

    if(!validator.isValidString(subcategory)) {
        return res.status(400).send({status:false,message:"subcatagory id is required"})

    }

    const result = await blogModel.find(x)
    res.send(result)
}






module.exports.createBlog=createBlog
module.exports.getBlog =getBlog
