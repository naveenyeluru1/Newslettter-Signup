const express = require("express");
const bodyparser = require("body-parser");
const request = require("request");
const https = require("https");


const app = express(); 

app.use(express.static("public"));
app.use(bodyparser.urlencoded({extended:true}));


app.get("/",function(req,res){
    res.sendFile(__dirname + "/signup.html");
})

app.post("/",function(req,res){
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const email = req.body.email;

    


    const data = {
        members: [
            {
                email_address: email,
                status: "subscribed",
                merge_fields: {
                    FNAME: firstName,
                    LNAME: lastName
                }
            }
        ]
    };
        
    const jsondata = JSON.stringify(data);

    const url = "https://us6.api.mailchimp.com/3.0/lists/c8934fabd1";

    const options = {
        method: "POST",
        auth: "naveen1:5d44dbdd66edf01301a1a9c26c21dd19-us6"
    }
    

    const reqest = https.request(url,options,function(response){

        if(response.statusCode===200){
            res.sendFile(__dirname+"/success.html");
        } else {
            res.sendFile(__dirname+"/failure.html");
        }

        response.on("data",function(data){
            console.log(JSON.parse(data));
        });
    });

    reqest.write(jsondata);
    reqest.end();
    
})


app.post("/failure",function(req,res){

    res.redirect("/");
})






app.listen(process.env.PORT || 3000,function(){

    console.log("server up at 3000");
})



//5d44dbdd66edf01301a1a9c26c21dd19-us6
//uniqueid c8934fabd1