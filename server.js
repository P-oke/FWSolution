const express=require("express")
const {ValidationError} = require("joi");
const Joi=require("joi")
const app=express()


app.use(express.json())

const port=process.env.PORT||5000

app.listen(port, ()=>{
    console.log(`server running on port ${port}`);
})

app.get("/", (req, res)=>{
    res.status(200).send({
        "message":"My Rule-validation Api",
        "status":"success",
        "data":{
            "name":"Oke Paul Oluwaseun",
            "github":"@P-oke",
            "email":"paulayomikun@gmail.com",
            "mobile":"0812765194",
            "twitter":"@okepaul20"

        }

    })
})



app.post("/validate-rule", (req, res)=>{
    let rule=req.body;
        
    const validaterule = (rule) => {
        const schema = Joi.object().keys({

            field: Joi.object({
                card:Joi.string().required(),
                cardbody:Joi.string().required()
            }),

            condition: Joi.object({
            eq:Joi.string().required(),
            neq:Joi.string().invalid(Joi.ref("field")).required(),  
            gt:Joi.string().required(),
            gte:Joi.string().required(),
            contains:Joi.string().required(),

            }),


            condition_value: Joi.object({
            data:Joi.object({
                field:Joi.string().required()
            }),

            rule:Joi.object({
                condition:Joi.string().required()
            }),

            rule:Joi.object({
                condition_value:Joi.number().required()
            })
                    
            }),
            
            name: Joi.string().required(),
            crew: Joi.string().required(),
            age: Joi.number().required(),
            position: Joi.string().required(),
            missions: Joi.number().required(),
        })
   
    
      return schema.validate(rule)
    }

    const {error} =validaterule(rule)
    
    console.log(error);
 
   if(error) {
    res.status(400).send({
    "message": error.details[0].message,
    "status": "error",
    "data": null,
    rule:Object.assign(rule) 
})


} else{
    res.status(200).send({
        "message": "field mission successfully validated",
        "status": "success",
        "data": {
        "validation": {
            "error": false,
            "field": "missions",
            "field_value": 30,
            "condition": "gte",
            "condition_value": 30,
        }}
    })

}
 

})

