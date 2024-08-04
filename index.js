import express from "express";
import bodyParser from "body-parser";
// import { dirname } from "path";
// import { fileURLToPath } from "url";
// const __dirname = dirname(fileURLToPath(import.meta.url));

const app=express();
const port=3000;

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));
app.use(dataCapture);

var blogs=[];
var editIndex;
var deleteIndex;
var titles=[];

function replace()
{
    blogs
}

function dataCapture(req,res,next)
{
    if (req.path=='/submit') {
        
        blogs.push(req.body.newBlog);
        titles.push(req.body.title);
    }
    else if(req.path=='/edit')
    {
        editIndex=req.body.index;
    }
    else if(req.path=='/edited')
    {
        titles[editIndex]=req.body.title;
        blogs[editIndex]=req.body.newBlog;
    }
    else if(req.path=='/delete')
    {
        deleteIndex=req.body.index;
        blogs.splice(deleteIndex, 1);
        titles.splice(deleteIndex, 1);
    }

    next();
}


app.listen(port,()=>
{
    console.log(`Listening thorugh PORT ${port}`);
})

app.get("/",(req,res)=>
{
    res.render("./index.ejs",
        {
            content:blogs,
            title:titles,
        });
});

app.get("/create",(req,res)=>
{
   res.render("./createBlog.ejs");
});

app.post("/submit",(req,res)=>
{
    res.redirect("/");
});
       
app.post("/edit",(req,res)=>
{
    let title=titles[editIndex];
    let content=blogs[editIndex];
    console.log(title);
    console.log(content);
    res.render("./createBlog.ejs",
        {
            newTitle:title,
            newContent:content,
            editButton:"Edit",
            edit:true,
        });
});


app.post("/edited",(req,res)=>
{
    res.redirect("/");
});

app.post("/delete",(req,res)=>
{
    res.redirect("/");
});
            