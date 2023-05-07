// express'i dahil edelim,
const app = require('express')()
var express = require('express');
const { exec } = require("child_process");
var fs = require("fs");
const path = require('path');
var fileupload = require("express-fileupload");
app.use(fileupload());
app.use(express.static('../yolov5/runs/detect/'))
app.use(express.static(__dirname )); //Serves resources from public folder

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
            console.log(stdout)
            console.log(error)
            console.log(stderr)
            fs.readdir("../yolov5/runs/detect", (err,files)=>{
                var len = files.length
                var path = "exp"+len.toString()

                                
                try {
                    let txtPath = "../yolov5/runs/detect/" + path + "/labels/a.txt"
                    const content = fs.readFileSync(txtPath, 'utf8');
                                        
                    // Her satırı boşluklara göre ayır ve bir diziye kaydet
                    const lines = content.split('\n');
                    const data = [];

                    lines.forEach((line) => {
                    const values = line.split(' ');
                    
                    // Her bir dizi öğesini bir JSON nesnesi olarak biçimlendir
                    const json = {
                        class: parseInt(values[0]),
                        value1: parseFloat(values[1]),
                        value2: parseFloat(values[2]),
                        value3: parseFloat(values[3]),
                        value4: parseFloat(values[4])
                    };
                    data.push(json);

                    // JSON nesnelerini bir diziye ekleyin
                    });
                    data.pop()
                    console.log(data)
                        
                    return res.send({ 
                        path ,
                        data
                    });
                } catch (err) {
                    console.error(err);
                }
                
            })
        });
      });
})

app.listen(80)