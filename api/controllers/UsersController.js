/**
 * UsersController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	login: function(req, res) {
		var findParams = {
			email : req.body.email,
			phone : req.body.phone
		};
		User.find(findParams).exec(function(err, found) {
			var token = "";
		    var possible = "0123456789";
		    for( var i=0; i < 5; i++ )
		        token += possible.charAt(Math.floor(Math.random() * possible.length));
		    var data = {
		    	email : req.body.email,
		    	phone : req.body.phone,
		    	otp : token
		    };

			if(found.length == 0) {
				User.create(data, function(err, found) {
					if(err) {
						res.status(500).json({msg:'unexpected_err'});
					}else{
						res.status(201).json({msg: "new user created", data: found});	
					}
				});
			}else{
				User.update(req.body, data, function(err, result) {
					if(err) {
						res.status(500).json({msg:'unexpected_err'});
					}else{
						res.status(200).json({msg:"user found", data: result[0]});
					}
				});
			}
		});
	},

	verify: function(req, res) {
		if(!req.body.hasOwnProperty('otp') || !req.body.hasOwnProperty('phone') || !req.body.hasOwnProperty('email')) {
			res.status(500).json({msg:'unexpected_err'});
			return;
		}
		User.find(req.body).exec(function(err, found) {
			if(found.length === 0) {
				res.status(404).json({msg:'not_found'});
			}else{
				var user = found[0];
				var token = "";
			    var possible = "QWERTYUIOPASDFGHJKLZXCVBNMqwertyuiopasdfghjklzxcvbnm0123456789";
			    for( var i=0; i < 32; i++ )
			        token += possible.charAt(Math.floor(Math.random() * possible.length));
				var data = {
					user_id: user.id,
					token: token
				};
				AccessToken.create(data, function(err, found) {
					if(!err) {
						User.findOne(req.body, function(err, user) {
							user.access_token = token;
							res.status(200).json({msg:'ok', data:user});
						});
					}else{
						res.json('err');
					}
				});
			}
		});
	}
};

