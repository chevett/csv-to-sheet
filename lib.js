var path = require('path'),
	fs = require('fs'),
	google = require('googleapis'),
	drive = google.drive('v2');

module.exports = function(opt, cb){
	var csvLocation = path.resolve(process.cwd(), opt.file),
		pemLocation = path.resolve(process.cwd(), opt.pem),
		clientEmail = opt.clientEmail,
		userEmail = opt.userEmail || opt.clientEmail;

	function doUpload(){
		var jwtClient = new google.auth.JWT(
			clientEmail,
			pemLocation,
			null,
			[ 'https://www.googleapis.com/auth/drive'],
			userEmail
		 );

		jwtClient.authorize(function(err, tokens) {
			if (err){
				return cb(err);
			}

			drive.files.insert({ 
					auth: jwtClient,
					convert: true,
					resource: {
						title: path.basename(csvLocation).replace(/\.csv$/i, ''),
						mimeType: 'text/csv',
					},
					media: {
						mimeType: 'text/csv',
						body: fs.createReadStream(csvLocation),
					}
				},
				function(err, resp) {
					if (err){
						return cb(err);
					}

					cb(null, resp);
				}
			);
		});
	}

	fs.exists(csvLocation, function(csvExists){
		fs.exists(pemLocation, function(pemExists){
			if (!csvExists) return cb(new Error(csvLocation + ' does not exist.'));
			else if (!pemExists) return cb(new Error(pemLocation + ' does not exist.'));

			doUpload();
		}); 
	}); 
};
