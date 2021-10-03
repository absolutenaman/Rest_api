const express=require('express');
const bodyParser=require('body-parser');
const mongoose=require('mongoose')
const ejs=require('ejs');
const { response, Router } = require('express');
const app=express();
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended:true}))
app.use(express.static("public"));
mongoose.connect('mongodb://localhost:27017/wikiDB',{useNewUrlParser:true});
const blogSchema={
    title:String,
    content:String
}
const article_reference_table=mongoose.model("article",blogSchema);
app.get("/articles",async(req,res)=>
{
    // res.send("<h1>Moshi Moshi</h1>");
    try {
        const result=await article_reference_table.find({});
        res.send(result);
    } catch (error) {
        res.send("Error",error);        
    }
}
)
app.post("/articles",async(req,res)=>
{
    let x=req.body.title;
    let y=req.body.content;
  
    try {
        let obj=new article_reference_table(
            {
                title:x,
            content:y
            }
        );
        obj.save();
        res.send("Success");
    } catch (error) {
        res.send("Failed in saving data",error);
    }

})

app.delete("/articles",async(req,res)=>
{
    try {
        await article_reference_table.deleteMany({});
        res.send("All documents deleted");
    } catch (error) {
        res.send(error);
    }
}
)

//Specific article Rest

app.route("/articles/:articleTitle")
.get(async (req,res)=>
{
    try {
        let result=await article_reference_table.findOne({title:req.body.title});
        res.send(result);
    } catch (error) {
        res.send("Fetching of data was unsuccessful ,kindly check the input field");
    }
}
)
.post(async (req,res)=>
{
    try {
        let result=new article_reference_table
        ({
            title:req.body.title,
            content:req.body.content
        });
        result.save();
        res.send("Document saved successfully");
    } catch (error) {
        res.send("Insertion of data was unsuccessful ,kindly check the input field");
    }
}
)
.delete(async (req,res)=>
{
    try {
        await article_reference_table.deleteOne({title:req.body.title});
        res.send(req.body.title +"was successfullt deleted");
    } catch (error) {
        res.send("Deletion was unsuccessful ,kindly check the input field");
    }
}
)
.patch((req,res)=>
{

}
)
;

app.listen(3000);