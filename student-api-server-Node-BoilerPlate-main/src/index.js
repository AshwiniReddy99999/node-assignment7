const express = require('express')
const app = express()
const bodyParser = require("body-parser");
const port = 8080
app.use(express.urlencoded());
const studentArray = require('./InitialData')
// Parse JSON bodies (as sent by API clients)
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
// your code goes here
let studid = studentArray.length;
app.get('/api/student', (req, res) => {
    res.json({ studentArray })
})

app.get('/api/student/:id', (req, res) => {
    let index = -1;
    for (let i = 0; i < studentArray.length; i++) {
        if (studentArray[i].id == req.params.id) {
            index = i;
        }
    }
    if (index >= 0) {
        const student = studentArray[index]
        res.json({ student });
    } else {
        res.status(404).json({
            status: "failure",
            message: "Invalid Id"
        })
    }
})
app.post('/api/student', (req, res) => {
    studid = studentArray[studentArray.length-1].id+1;
    let data = {
        id: studid,
        name: req.body.name,
        currentClass: req.body.currentClass,
        division: req.body.division

    }
    if(data.name!=undefined && data.currentClass!=undefined && data.division!=undefined){
    studentArray.push(data)
   
    res.json({ studid });
    }else{
        res.status(400).json({
            status:"400",
            message:"Incomplete details"
        })
    }
})

app.delete('/api/student/:id', (req, res) => {
    let index = -1;
    for (let i = 0; i < studentArray.length; i++) {
        if (studentArray[i].id == req.params.id) {
            index = i;
        }
    }
    if (index >= 0) {
        const student = studentArray.splice(index,1)
        res.json({ student });
    } else {
        res.status(404).json({
            status: "404",
            message: "Invalid Id"
        })
    }
})
app.put('/api/student/:id', (req, res) => {
    
    let index = -1;
    for (var i = 0; i < studentArray.length; i++) {
        if (studentArray[i].id == req.params.id) {
            index = i;
        }
    }
    console.log(index)
    if (index >= 0) {
       if(req.body.name!=undefined && req.body.currentClass!=undefined  && req.body.division!=undefined ){
        studentArray[index].name=req.body.name;
        studentArray[index].currentClass=req.body.currentClass;
        studentArray[index].division=req.body.division;
       }
      
        let student=studentArray[index]
      
        res.json({student });
    } else {
        res.status(400).json({
            status: "400",
            message: "Invalid Id"
        })
    }
})

app.listen(port, () => console.log(`App listening on port ${port}!`))

module.exports = app;