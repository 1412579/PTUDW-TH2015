// server.js
// setup 
// setup 
var express  = require('express');
var session  = require('express-session');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var morgan = require('morgan');
var exphbs = require('express-handlebars');
var wnumb = require('wnumb');

var moment = require('moment');

var app      = express();
var port     = process.env.PORT || 3000;

var passport = require('passport');
var flash    = require('connect-flash');
 const pool = require('./model/pg');

require('./config/passport')(passport,pool);

var hbs = exphbs.create({ defaultLayout: 'main-user' , 
 	extname: '.hbs',
	helpers: {
		inc : function(value, options)
			{
			    return parseInt(value) + 1;
			},
		ifCond: function (v1, operator, v2, options) {
			//console.log(v2);
			//console.log(v1);
		    switch (operator) {
		        case '==':
		            return (v1 == v2) ? options.fn(this) : options.inverse(this);
		        case '===':
		            return (v1 === v2) ? options.fn(this) : options.inverse(this);
		        case '!=':
		            return (v1 != v2) ? options.fn(this) : options.inverse(this);
		        case '!==':
		            return (v1 !== v2) ? options.fn(this) : options.inverse(this);
		        case '<':
		            return (v1 < v2) ? options.fn(this) : options.inverse(this);
		        case '<=':
		            return (v1 <= v2) ? options.fn(this) : options.inverse(this);
		        case '>':
		            return (v1 > v2) ? options.fn(this) : options.inverse(this);
		        case '>=':
		            return (v1 >= v2) ? options.fn(this) : options.inverse(this);
		        case '&&':
		            return (v1 && v2) ? options.fn(this) : options.inverse(this);
		        case '||':
		            return (v1 || v2) ? options.fn(this) : options.inverse(this);
		        default:
		            return options.inverse(this);
		    }
		},
		fmNum: function(value) {
		    var parts = value.toString().split(".");
		    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ".");
		    return parts.join(".");
		},
		tenPercent: function(value) {
		    return parseInt(value) + parseInt(value*0.1);
		},
		total: function(value,qty) {
			value = value*qty;
			var parts = value.toString().split(".");
		    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ".");
		    return parts.join(".");
		},
		section: function(name, options){ 
			if(!this._sections) this._sections = {};
			this._sections[name] = options.fn(this); 
			return null;
		},
		dateFormat: function(date){ 
			return moment(date).format("YYYY-MM-DD HH:mm:ss").toUpperCase()
		},
		for: function(n, block){ 
			var accum = '';
			for(var i = 0; i < n; ++i)
				accum += block.fn(i);
			return accum;
		},
		number_format: n => {
            var nf = wnumb({
                thousand: ','
            });
            return nf.to(n);
        }
	},
});



require('./config/express')(app,hbs,express, session,morgan,cookieParser,bodyParser,passport,flash);
//require('./config/express')(app,hbs,express, session,morgan,cookieParser,bodyParser,flash);

// routes ======================================================================
require('./route/routes.js')(app, passport, pool); // load our routes and pass in our app and fully configured passport

//require('./app/controller/ImageController.js')(app) //load controller hỗ trợ up ảnh



// launch ======================================================================
app.listen(port,function(){
	console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
});
console.log('Server started on port ' + port);
