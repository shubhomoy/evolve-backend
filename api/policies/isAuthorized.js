module.exports = function(req, res, next) {
	if(req.headers && req.headers.access_token && req.headers.id) {
		AccessToken.findOne({owner:req.headers.id, token:req.headers.access_token}).exec(function(err, result) {
			if(err || !result) {
				res.status(401).json({msg:'unauthorized'});
			}else if(result) {
				next();
			}
		});
	}else{
		res.status(401).json({msg:'unauthorized'});
	}
}