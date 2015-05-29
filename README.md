csv-to-sheet
============

Got a google service account and a csv?  Then upload it.

Install
-------
```bash
sudo npm install -g csv-to-sheet
```

Command-line usage
```bash
Usage: csv-to-sheet  -a xxx@developer.gserviceaccount.com -p file.pem file.csv

Options:
  -h, --help     Show help  [boolean]
  -a, --account  Email address for the google service account  [required]
  -p, --pem      Path to the pem file  [required]
  -u, --user     The email address to impersonate  [required]
```

Node usage
```js
var csvToSheet = require('csv-to-sheet');
csvToSheet({
	clientEmail: argv.a,
	userEmail: argv.u,
	file: argv._[0],
	pem: argv.p,
}, function(err, res){



});
```




