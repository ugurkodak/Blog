let express = require("express");

module.exports = function()
{	 
	 let app = express();

	 app.set('port', (process.env.PORT || 5000));
	 
	 app.set("views", __dirname + "/../app/views");
	 app.set("view engine", "ejs");
	 
	 require(__dirname + "/../app/routes/index.server.routes.js")(app);

	 app.use(express.static(__dirname + "/../public"));
	 
	 return app;
};


