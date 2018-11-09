var express=require('express');
const mongoose=require('mongoose');

const Schema=mongoose.Schema;
var routes=function(CarMakes)
 {
    var carMakesRouter=express.Router();
    carMakesRouter.route('/')
    .post(function (req,res) {
    
        const carMakes=new CarMakes(req.body);
        console.log(`req.body.car_make:${req.body.car_make}`);
        
        CarMakes.create(carMakes,function(err,result){
            if(err){
                console.log(`error:${err}`);
                res.status(500).json({message:"Internal Server Error"});
            }
            else{
                console.log("New Car make is successfully created");
                res.status(201).json({_id:result._id,car_make:result.car_make});
            }
        });
    })
    .get(function (req,res) {
        
       // console.log(" get method is called");
        var query={};
        if(req.query._id){
           query._id=req.query._id;
        }
      
       // res.send(resJson);
      CarMakes.find(query,function (err,carMakes) {
         // return res.status(501).json({"message":"error"});
           if(!err)
           {
            res.status(200).json(carMakes);
            
           } 
       });
    });
    carMakesRouter.use('/:carMakesId', function(req,res,next){
        console.log("middleware getting parameters:"+req.params.carMakesId);
        CarMakes.findById(req.params.carMakesId, function(err,carMakes){
            if(err)
                res.status(500).send(err);
            else if(carMakes)
            {
                req.carMakes = carMakes;
                next();
            }
            else
            {
                res.status(404).send('no CarMakes found');
            }
        });
    });
    
    carMakesRouter.route('/:carMakesId')
    .get(function(req,res){

      //  res.json(req.carMakes);

      CarMakes.findById(req.params.carMakesId, function(err,carMakes){
        if(err)
            res.status(500).send(err);
        else 
        {
            //req.carMakes = carMakes;
            //next();
            res.status(200).json(carMakes);
        }
       
    });

    })
    .put(function(req,res){
      const _id= req.params.carMakesId;
      console.log(`_id:${_id}`);
      if(_id){
        CarMakes.findById(_id,function(err1,make){
            if(err1){
                res.status(500).json({
                    "message":"Internal Server Error"
                })
            }
            else{
                make.car_make=req.body.car_make;
                console.log(`req.body.car_make:${req.body.car_make}`)
                make.save(function(err2,result){
                    if(err2){
                        res.status(501).json({
                            "message":"Internal Server Error"
                        })
                    }
                    else{
                        console.log("Car Make is updated Successfully");
                        res.status(200).json({
                            
                                "message":"Car Make updated successfully"
                            }
                    );
                    }
                   })
            }

        });
      }
      else{
          res.status(404).json({
            "message":"Car Make  does not exists"
          })
      }

    })
    .patch(function(req,res){
        if(req.body._id)
            delete req.body._id;

        for(var p in req.body)
        {
            req.CarMakes[p] = req.body[p];
        }

        req.CarMakes.save(function(err){
            if(err)
                res.status(500).send(err);
            else{
                res.json(req.CarMakes);
            }
        });
    })
    .delete(function(req,res){
        req.carMakes.remove(function(err){

            if(err){

                res.status(500).send(err);
            }
            else{
                res.status(204).send('Removed');

            }

        })

    })
  
return carMakesRouter;
}

module.exports=routes;