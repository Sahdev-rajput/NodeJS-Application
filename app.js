const express=require("express");
const request=require("request");
const app=express();
const https=require("https");
const bodyParser=require("body-parser");
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));






app.get("/",function(req,res)
{
    res.sendFile(__dirname+"/signup.html");
})
app.post("/",function(req,res)
{
    const email=req.body.mail;
    const firstname=req.body.fname;
    const lastname=req.body.lname;
    const dob=req.body.DOB;
    const Class=req.body.class;
    //console.log(firstname+" "+lastname+" "+contactnumber+" "+Class+" "+"Address")


    const data={
        members:[
            {
            email_address: email,
            status: "subscribed",
            merge_fields: {
                FNAME: firstname,
                LNAME: lastname,
                DATEOFBIR: dob,
                CLASS: Class
            }
        }
]};
var jsondata=JSON.stringify(data);
const url="https://us21.api.mailchimp.com/3.0/lists/3de5a62dc1"
const options={
    method:"POST",
    auth: "SahdevRajput:eed9430e0733b73d2b0a05cd5036a694-us21"
}
const request=https.request(url,options,function(response)
{
   response.on("data",function(data)
   {
    console.log(JSON.parse(data));
   })
   if(response.statusCode==200)
{
    res.sendFile(__dirname+"/success.html");
}
else
{
    res.sendFile(__dirname+"/failure.html");
}
})
request.write(jsondata);
request.end();
});


app.post("/failure",function(req,res)
{
    res.redirect("/");
})




app.listen(process.env.PORT || 3000,function()
{
    console.log("the server is running on the port 3000");
})




//Your APi
//c99713d8a37895ad3cc49aa9245f5507-us21


//list id
//3de5a62dc1
