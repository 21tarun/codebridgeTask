const express= require('express')
const router= express.Router()
const dogController= require('../controllers/dogController')

router.get('/ping',function(req,res){
    res.status(200).send({status:true,message:"Dogshouseservice.Version1.0.1"})
})


router.get('/dogs',dogController.getDogs)
router.post('/dog',dogController.createDog)









module.exports=router