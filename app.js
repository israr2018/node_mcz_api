const config = require('./config/index');
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
var  CarAds=require('./models/CarAds');
var  CarMakes=require('./models/CarMakes');
var  CarModels=require('./models/CarModels');
var  UserModel=require('./models/UserModel')

app.use('/uploads',express.static('uploads'));
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

var carAdsRouter=require('./Routes/CarAdsRoutes')(CarAds);
var carMakesRouter=require('./Routes/CarMakesRoutes')(CarMakes);
var carModelsRouter=require('./Routes/CarModelsRoutes')(CarModels);
var authRouter=require('./Routes/authRoute')(UserModel);
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