let express = require(__dirname + "/config/express");

let app = express();

app.listen(app.get("port"), function()
			  {
					console.log('Node app is running on port', app.get('port'));
			  });
module.exports = app;
