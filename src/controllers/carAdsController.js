const CarAds =require('../models/CarAds')
const createNewAd=async(req,res)=>{
    try {
        const carAd = new CarAds(req.body);
        req.files.forEach(element => {
            carAd.car_image.push(element.filename);
        });
    
        carAd.car_make.make_name = req.body.car_make_name;
        carAd.car_make.make_id = req.body.car_make_id;
        carAd.car_make.madel_id = req.body.car_model_id;
        carAd.car_make.model_name = req.body.car_model_name;
    
        carAd.car_price = req.body.car_price;
        carAd.contact_number = req.body.contact_number;
        carAd.car_km_driven = req.body.car_km_driven;
        carAd.car_price = req.body.car_price;
        carAd.car_engine_type = req.body.car_engine_type;
        carAd.car_model_year = req.body.car_model_year;
        carAd.car_transmission_type = req.body.car_transmission_type;
        carAd.car_engine_capacity = req.body.car_engine_capacity;
        carAd.car_registration_type=req.body.car_registration_type;
        
        var varification_code = sms_service.generate_code();
    
        carAd.varification_code = varification_code;
     
        var message = sms_service.create_message(varification_code);
        try{
            sms_service.send_sms(carAd.contact_number, message, "MBZ");  
        }
        catch(error){
            
        }
       
        /*  formData.append("car_price",  this.model.car_price);
               formData.append("car_km_driven",  this.model.km_driven);
               formData.append("car_engine_type",  this.model.car_engine_type);
               formData.append("car_model_year",  this.model.car_model_year);
               formData.append("car_transmission_type",  this.model.car_transmission_type);
               formData.append("car_engine_capacity",  this.model.car_engine_capacity);
               formData.append("contact_number",  this.model.contact_number);
               formData.append("car_model_id",  this.model.car_model_id); */
    
        /* formData.append("car_make_name",this.selectedCarMakeName);
        formData.append("car_make_id",this.selectedCarMakeId);
        formData.append("car_model_id",this.selectedCarModelId);
        formData.append("car_model_name",this.selectedCarModelName);
        formData.append("car_description",  this.model.car_description);
    */
    } catch (error) {
        // Todo:return error message
       const a=10;
       const b=30
    }
   
}
