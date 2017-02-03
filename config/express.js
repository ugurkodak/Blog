let express = require("express");

module.exports = function()
{
	 let app = express();
	 require("../app/routes/index.server.routes.js")(app);
	 return app;
};
