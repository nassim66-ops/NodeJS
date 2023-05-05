// importing the required modules
const http = require("http");
const fileSystem = require("fs");
const _ = require("lodash");

//Creating the server
const server = http.createServer((request, response) => {
  //lodash --> We are picking a random number between x and
  const number = _.random(0, 20);
  console.log("num", number);

  //We are using lodash to run this function just once even if we called multi times
  const greet = _.once(() => {
    console.log("object");
  });

  greet();

  response.setHeader("Content-Type", "text/html");

  let path = "./views/";
  switch (request.url) {
    case "/":
      path += "index.html";
      response.statusCode = 200;
      break;

    case "/about":
      path += "about.html";
      response.statusCode = 200;
      break;

    // case "/about-us":
    //   response.statusCode = 301;
    //   response.setHeader("Location", "/about");
    //   response.end();
    //   break;

    default:
      path += "404.html";
      response.statusCode = 404;
      break;
  }

  fileSystem.readFile(path, (error, data) => {
    if (error) {
      console.log(error);
      response.end();
    } else {
      response.end(data);
    }
  });
});

//Listening
server.listen(3000, "localhost", () => {
  console.log("Listening for requests on port 3000");
});
