const express = require("express");
const app = express();
const path = require("path");
const hbs = require("hbs");
const tempelatePath = path.join(__dirname, "../tempelates");
const collection = require("./mongo");
app.use(express.json());
//define what engine you are using. whether its ejs,hbs,bobjs

app.set("view engine", "hbs");

//here as we have created folder named tempelatepath we are setting views as temeplate.
//if we don't want to define and use tempelatePath rename the temeplate folder as views.
app.set("views", tempelatePath);
//The app.get() function in Node.js routes HTTP GET requests to a specified path and associates the requests with callback functions. The function's syntax is `app.get(path, callback)**, where:
//path: The path for which the middleware function is being called
//callback: Can be a middleware function or a series/array of middleware functions
//get() method of the express. js is used to handle the incoming get request from the client-side Basically is it intended for binding the middleware to your application. Parameters: path: It is the path for which the middleware function is being called.
//The app.get() method specifies a callback function that will be invoked whenever there is an HTTP GET request with a path ( '/' ) relative to the site root. The callback function takes a request and a response object as arguments, and calls send() on the response to return the string "Hello World!" .
//The app.get() function tells the server what to do when getting requests at a given route. For example, you can use the app.get() function to show a page when a user hits a specific URL.
//The get() method is used to handle the incoming get request from the client-side. Route paths can be strings, string patterns, or regular expressions.

app.use(express.urlencoded({ extended: false }));
app.get("/", (req, res) => {
  res.render("login");
});

app.get("/signup", (req, res) => {
  res.render("signup");
});

//app.post signup method will post the response to http requests coming from client/frontend. after user enters username, password it stores copy
//of that data into database. for that const data variable is defined which stores data in collection in mongodb.
//to work with monogdb use async await method/functions.
app.post("/signup", async (req, res) => {
  //define data as object. use attributes like name,password to define db column name.
  //these column names are same which are used in textbox field of hbs pages such as login,signup
  const data = {
    name: req.body.name,
    password: req.body.password,
  };
  await collection.insertMany([data]);
  res.render("home");
});

//this post method posts response from login page to mongodb and responds users with appropriate message.
app.post("/login", async (req, res) => {
  try {
    const check = await LogInCollection.findOne({ name: req.body.name });

    if (check.password === req.body.password) {
      res
        .status(201)
        .render("home", { naming: `${req.body.password}+${req.body.name}` });
    } else {
      res.send("incorrect password");
    }
  } catch (e) {
    res.send("wrong details");
  }
});

//port on which app will listen is defined in app.listen method
//write console message for listening.
app.listen(3000, () => {
  console.log("port connected");
});
