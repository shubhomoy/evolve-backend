/**
 * ImagesController
 *
 * @description :: Server-side logic for managing Images
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	upload : function(req, res) {
		
		var data = {
			user_id: req.headers.id,
			photo_date: req.body.image_date,
			name: req.body.image_name,
			description: req.body.image_description,
			lon: req.body.image_lon,
			lat: req.body.image_lat
		};
		Photo.create(data).exec(function(err, photo) {
			if(!err) {
				req.file('image').upload({
					dirname: sails.config.appPath+'/assets/images/'+req.headers.id,
					saveAs: photo.id+'.jpg'
				}, function(err, uploads) {
					if(err){
						console.log(err);
						res.status(500).json({msg:err});
					}
					res.status(200).json({msg:'image_uploaded', data:photo});
				});
			}else{
				console.log(err);
				res.status(500).json({msg:err});
			}
		});
				
			
	},

	fetchAll : function(req, res) {
		Photo.find({user_id: req.headers.id}).exec(function(err, result) {
			res.status(200).json({msg:'ok', data:result});
		});
	},

	deleteImage : function(req, res) {
		Photo.destroy({id:req.body.id, user_id:req.headers.id}).exec(function(err, result) {
			if(err) {
				console.log(err);
				return;
			}
			var fs = require('fs');
			fs.unlink(sails.config.appPath+'/assets/images/'+req.headers.id+'/'+req.body.id+'.jpg');
			res.status(200).json({msg:'image_deleted', data:result});
		});
	}
};