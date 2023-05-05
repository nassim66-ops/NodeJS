const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const blogRoutes = require("./routes/blogRoutes");
//express app
const app = express();

//Connect to mongoDB
const dataBaseURI =
  "mongodb+srv://netninja:testing123@cluster0.9onrjnm.mongodb.net/Cluster0?retryWrites=true&w=majority";

mongoose
  .connect(dataBaseURI)
  .then((result) => {
    console.log("Connected to the database successfully");
    app.listen(3000);
  })

  .catch((error) => {
    console.log("Error:", error);
  });

//Making the content of this folder public
app.use(express.static("public"));

//this let us use the data that we post from the browser,
//by saving them in an object that  we use later
app.use(express.urlencoded({ extended: true }));

//Register view engine
app.set("view engine", "ejs");

app.use(morgan("dev"));

//Routes
app.get("/", (request, response) => {
  response.redirect("blogs");
});

app.get("/about", (request, response) => {
  response.render("about", { title: "About" });
});

//Blog routes
app.use("/blogs/", blogRoutes);

//404 --> This code should be at the bottom of all the get methods
app.use((request, response) => {
  response.status(404).render("404", { title: "404" });
});
