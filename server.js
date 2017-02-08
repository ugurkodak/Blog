let express = require("express");
let server = express();
let port = process.env.PORT || 5000;

server.set("views", __dirname + "/views");
server.set("view engine", "ejs");

//Routing
server.get("/", function(req, res)
			  {
					res.render("index",
								  {
										title: "Home"
								  });
			  });
server.get("/about", function(req, res)
			  {
					res.render("index",
								  {
										title: "About"
								  });
			  });
server.get("/projects", function(req, res)
			  {
					res.render("index",
								  {
										title: "Projects"
								  });
			  });
server.get("/services", function(req, res)
			  {
					res.render("index",
								  {
										title: "Services"
								  });
			  });
server.get("/contact", function(req, res)
			  {
					res.render("index",
								  {
										title: "Contacts"
								  });
			  });

server.use(express.static(__dirname + "/public"));
server.listen(port, function()
			  {
					console.log('Node app is running on port', port);
			  });
