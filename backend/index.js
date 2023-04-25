// express'i dahil edelim,
const app = require('express')()
var express = require('express');
const { exec } = require("child_process");
var fs = require("fs");
const path = require('path');
var fileupload = require("express-fileupload");
app.use(fileupload());
app.use(express.static('../yolov5/runs/detect/'))
app.use(express.static(__dirname + 'public')); //Serves resources from public folder

console.log("Web Server Started at : http://localhost/")

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/index.html'));
})

app.post('/upload', (req, res) => {
    var file = req.files.file
    file.mv("./public/a.jpeg", (err) => {
        if (err) {
            console.log("err")
          return res.status(500).send(err);
        }
        exec("python ../yolov5/detect.py --weights ../last.pt --img 640 --conf 0.25 --source ./public/a.jpeg ", (error, stdout, stderr) => {
            fs.readdir("../yolov5/runs/detect", (err,files)=>{
                var len = files.length
                return res.send({ path: "exp"+len.toString()});
            })
        });
      });
})

app.listen(80)