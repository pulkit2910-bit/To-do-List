const { urlencoded } = require('express');
const express = require('express');
const app = express();
const alert = require('alert');
app.set('view engine', 'ejs');
app.use(express.urlencoded())

app.use(express.static("public"));

var items = [];
var workItems = [];
var groceryItems = [];

app.listen(5000, () => {
    console.log("server started at port 5000");
})

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html");
})

// When Home button is pressed
app.post('/home-route', (req, res) => {
    res.redirect("/home");
})

// When Work button is pressed
app.post('/work-route', (req, res) => {
    res.redirect("/work");
})

// When Grocery button is pressed
app.post('/grocery-route', (req, res) => {
    res.redirect("/grocery");
})

app.get("/home", (req, res) => {
    var today = new Date();
    
    var options = {
        weekday: 'long',
        day: 'numeric',
        month: 'short',
        year: 'numeric'
    }
    var day = today.toLocaleString("en-US", options);
    res.render('list', {listFor: "LIST FOR HOME", today: day, newListItems: items}); //res.render() will look in the views folder for 'list.ejs'
})

app.get("/work", (req, res) => {
    var today = new Date();
    
    var options = {
        weekday: 'long',
        day: 'numeric',
        month: 'short',
        year: 'numeric'
    }
    var day = today.toLocaleString("en-US", options);
    res.render('list', {listFor: "TO DO LIST", today: day, newListItems: workItems})
})

app.get("/grocery", (req, res) => {
    var today = new Date();
    
    var options = {
        weekday: 'long',
        day: 'numeric',
        month: 'short',
        year: 'numeric'
    }
    var day = today.toLocaleString("en-US", options);
    res.render('list', {listFor: "GROCERY LIST", today: day, newListItems: groceryItems})
})

app.post("/", (req, res) => {
    if (req.body.list === "LIST FOR HOME") {
        var inputItem = req.body.newItem;
        if (inputItem === '') {
            alert("Please add something to your list !");
        }
        else {
            items.push(inputItem);
            res.redirect("/home");
        }
    }

    else if (req.body.list === "TO DO LIST") {
        var item = req.body.newItem;
        if (item === '') {
            alert("Please add something to your To do list !");
        }
        else {
            workItems.push(item);
            res.redirect("/work");
        }
    }

    else if (req.body.list === "GROCERY LIST") {
        var item = req.body.newItem;
        if (item === '') {
            alert("Please add something to your Grocery do list !");
        }
        else {
            groceryItems.push(item);
            res.redirect("/grocery");
        }
    }
})
