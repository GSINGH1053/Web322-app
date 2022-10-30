/*********************************************************************************
*  WEB322 – Assignment 02
*  I declare that this assignment is my own work in accordance with Seneca  Academic Policy.  
*  No part of this assignment has been copied manually or electronically from any other source 
*  (including 3rd party web sites) or distributed to other students.
* 
*  Name: gurtarnjit singh Student ID: 156805210 Date: 29/09/2022
*
*  Online (cyclic) Link: ttps://quaint-plum-cockatoo.cyclic.app
*
********************************************************************************/ 


var express = require("express");
var path = require("path");
var dataSrv = require("./data-service.js");

var app = express();
app.use(express.static('public/css'));

var HTTP_PORT = process.env.PORT || 8080;
function onHttpStart() {
  console.log("Express http server listening on: " + HTTP_PORT);
}

app.get("/", function(req,res){
    res.sendFile(path.join(__dirname,"/views/home.html"));
  });

app.get("/about", function(req,res){
    res.sendFile(path.join(__dirname,"/views/about.html"));
  });

  app.get("/employees", function(req,res){
    dataSrv.getAllEmployees()
                             .then((data) => {
                               console.log ("getAllEmployees JSON.");
                               res.json(data);
                             })
                             .catch((err) => {
                               console.log(err);
                               res.json(err);
                             })
  });
  app.get("/managers", function(req,res){
    dataSrv.getManagers()
                             .then((data) => {
                               console.log ("getManagers JSON.");
                               res.json(data);
                             })
                             .catch((err) => {
                               console.log(err);
                               res.json(err);
                             })
  });
  app.get("/departments", function(req,res){
   
   dataSrv.getDepartments()
                           .then((data) => {
                               console.log ("getDepartments JSON.");
                               res.json(data);
                           })
                           .catch((err) => {
                               console.log(err);
                               res.json(err);
                           })
  });
  
console.log ("Ready for initialize");
dataSrv.initialize()
                    .then(() => {
                          console.log ("initialize.then");
                          app.listen(HTTP_PORT, onHttpStart); 
                    })
                    .catch(err => {
                          console.log(err);
                    })