//It's your job to build the back end, connect the two, and then deploy the entire application to Heroku.

const express = require("express");
const fs = require("fs");
const PORT = 3001;
const app = express();
let notes = require("./db/db.json")
const path = require("path")

//we'll be using json data is all this is saying
app.use(express.json());
//Encode to URL-encoded format or decode from it with various advanced options. Our site has an easy to use online tool to convert your data
app.use(express.urlencoded({extended:true}))
//start all routes as the public, in the public, that is were the html is located
app.use(express.static("public"))

//we need to confirm the correct path for the api
app.get("/api/notes",(req, res) => res.json(notes))

//we need a front end call to render the information with the method res.sendfile. Be sure to include path.jon which dynamically gets the absolute path.
app.get("/",(req, res) => res.sendFile(path.join(__dirname,"./public/index.html")))

//we need a front end call to render the information with the method res.sendfile. Be sure to include path.jon which dynamically gets the absolute path.
app.get("/notes",(req, res) => res.sendFile(path.join(__dirname,"./public/notes.html")))

//we need to confirm the correct path for the api
app.post("/api/notes",(req, res) => {
    req.body.id=notes.length+1
    notes.push(req.body)
    fs.writeFileSync("./db/db.json", JSON.stringify(notes))
    res.json(notes)
})


//this initates the server to listen for a call. This is final line
app.listen(PORT,() => console.log(`App listening at http://localhost:${PORT}`));




