const config = require('./src/config/index');
var express=require('express');
var app=express();
var cors=require('cors');
app.use(cors({credentials: true, origin: true}));

// //const logger = require('morgan');
var bodyParser=require('body-parser');
var mongoose=require('mongoose');
var db=mongoose.connect(config.database.connection).then(()=>{
console.log("Successfully connected to the database.")
},(error)=>{
console.log(`Could not connect to database something goes wrong:${error}`);
});
var  CarAds=require('./src/models/CarAds');
var  CarMakes=require('./src/models/CarMakes');
var  CarModels=require('./src/models/CarModels');
var  UserModel=require('./src/models/UserModel')

app.use('/uploads',express.static('uploads'));
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

var carAdsRouter=require('./src/routes/carAdsRoutes')(CarAds);
var carMakesRouter=require('./src/routes/carMakesRoutes')(CarMakes);
var carModelsRouter=require('./src/routes/carModelsRoutes')(CarModels);
var authRouter=require('./src/routes/authRoute')(UserModel);
app.use("/api/CarAds",carAdsRouter);
app.use("/api/CarMakes",carMakesRouter);
app.use("/api/CarModels",carModelsRouter);
app.use("/api/authenticate",authRouter);
const port=process.env.PORT||8080;

app.get('/',function(req,res) {
    res.send("Welcome to the MCZ Restfull  Web Services ");
});
app.listen(port,function () {
    console.log("MCZ restfull api are running on port:"+port);

});