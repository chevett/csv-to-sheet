#! /usr/bin/env node

var argv = require('yargs')
	.usage('Usage: $0  -a xxx@developer.gserviceaccount.com -p file.pem file.csv')
	.demand(['a','p', 'u'])
	.help('h')
	.alias('a', 'account')
	.nargs('a', 1)
	.describe('a', 'Email address for the google service account')
	.alias('p', 'pem')
	.describe('p', 'Path to the pem file') 
	.alias('u', 'user')
	.describe('u', 'The email address to impersonate')
	.alias('h', 'help')
	.demand(1)
	.argv;

var lib = require('./lib');

lib({
	clientEmail: argv.a,
	userEmail: argv.u,
	file: argv._[0],
	pem: argv.p,
}, function(err, res){
	if (err) {
		process.stderr.write(err.toString()+'\n');
		return process.exit(1);
	}

	console.dir(res);
	process.exit(0);
});

