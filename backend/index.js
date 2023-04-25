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

        exec("python C:/Users/oguzh/OneDrive/Belgeler/GitHub/Yapay_Zeka/yolov5/detect.py --weights C:/Users/oguzh/OneDrive/Belgeler/GitHub/Yapay_Zeka/last.pt --img 640 --conf 0.25 --source C:/Users/oguzh/OneDrive/Belgeler/GitHub/Yapay_Zeka/backend/public/a.jpeg ", (error, stdout, stderr) => {
         
            fs.readdir("C:/Users/oguzh/OneDrive/Belgeler/GitHub/Yapay_Zeka/yolov5/runs/detect", (err,files)=>{
                console.log(files)
                var len = files.length
                console.log(len)
                return res.send({ path: "exp"+len.toString()});

            })

        });

        
      });
})


// Uygulama 3000 portundan çalışacak.
app.listen(80)