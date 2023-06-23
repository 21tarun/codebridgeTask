
const dogModel =require('../models/dogModel')
const getDogs= async function(req,res){
    try{
        let data = req.query;



        // Pagination variables
        let page = parseInt(req.query.page) || 1;
        let limit = parseInt(req.query.limit) || 10;
        let skip = (page - 1) * limit;
    
        let queries ={
            offset: skip,
            limit: limit,
        }
    
    
        if(data.attribute){
            if(!['weight','tail_length'].includes(data.attribute))return res.status(400).send({status:false,message:"attribute should only be weight or tail_length for sorting"})
            if(!data.order)data.order='ASC' // by default
            queries.order=[[data.attribute, data.order]] // if we have a query for sorting then we will add order query inside queries object
        }
        if(data.order){
            if(!['ASC',"DESC"].includes(data.order))return res.status(400).send({status:false,message:"order can be ASC or DESC"})
            if(!data.attribute)data.attribute='weight' // by default
            queries.order=[[data.attribute, data.order]] // if we have a query for sorting then we will add order query inside queries object
        }
    
        // Query the database with pagination options and with sorting
        let dogs = await dogModel.findAll(queries);
        res.status(200).send({status:true,Dogs:dogs})
    }
    catch(err){
        res.status(500).send({status:false,message:err.message})
    }
}

const createDog =async function(req,res){
    try{
        let data = req.body
        if(Object.keys(data).length==0)return res.status(400).send({status:false,message:"body is empty"})
    
        //validation for name
        if(!data.name || !data.name.trim()) return res.status(400).send({status:false,message:"name is required field"})
        data.name=data.name.trim()
    
    
        // validation for tail_length
        if(!data.tail_length) return res.status(400).send({status:false,message:"tail_length is required field"})
        if(data.tail_length<0 || !(data.tail_length*1==data.tail_length))return res.status(400).send({status:false,message:"tail_length should be vaild"})
    
        // validation for weight
        if(!data.weight) return res.status(400).send({status:false,message:"weight is required field"})
        if(data.weight<0 || !data.weight*1==data.weight)return res.status(400).send({status:false,message:"weight should be vaild"})
    
        // validation for color
        if(!data.color || !data.color.trim()) return res.status(400).send({status:false,message:"color is required field"})
        if(/\d/.test(data.color))return res.status(400).send({status:false,message:"color should be valid"})
        data.color=data.color.trim()
    
    
        // check with same name already another is presented or not in database
        // data.name=data.name.toUpperCase()
        const existingDog = await dogModel.findOne({
            where: { name: data.name },
        });
        
    
        if(existingDog)return res.status(400).send({status:false,message:"dog name already exist"})
    
        
        const newDog = await dogModel.create(data)
    
        res.status(201).send({status:true,message:"dog created successfully",data:newDog})
    }
    catch(err){
        res.status(500).send({status:false,message:err.message})
    }


    

        

}


module.exports.getDogs=getDogs
module.exports.createDog=createDog