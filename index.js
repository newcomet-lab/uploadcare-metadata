const express = require('express')
const cors = require('cors');
const path = require('path');
const fs = require('fs');

const config = require('./src/conf/config.json');

const app = express()
const port = process.env.PORT || 80 

app.use(cors());

var img_cnt = config.image_count;			// Total image count, text count is 4, production count 366

var cdnurl = ''
var localurl = ''
var wallet = ''

const prepareJsonByBoth = async function(file_idx) {
	fs.readFile('assets/json-input/' + file_idx + '.json', function(err, data) {
		if(err) console.log(err)
		else {
			var json_data = JSON.parse(data);
			json_data.image = 'https://ucarecdn.com/' + cdnurl + '/nth/' + file_idx + '/' + file_idx + '.png';
			json_data.properties.files[0].uri = 'https://ucarecdn.com/' + cdnurl + '/nth/' + file_idx + '/' + file_idx + '.png';
			json_data.properties.creators[0].address = wallet;
			fs.writeFileSync('assets/json-output/' + file_idx + '.json', JSON.stringify(json_data, null, 2), function(erro){
				if(erro) console.log("error : "+erro);
			});
		}
	});
}

const prepareJsonByBoth2 = async function(file_idx) {
	fs.readFile('assets/json-input/' + file_idx + '.json', function(err, data) {
		if(err) console.log(err)
		else {
			var json_data = JSON.parse(data);
			json_data.image = localurl + '/image/' + file_idx + '.png';
			json_data.properties.files[0].uri = localurl + '/image/' + file_idx + '.png';
			json_data.properties.creators[0].address = wallet;
			fs.writeFileSync('assets/json-output/' + file_idx + '.json', JSON.stringify(json_data, null, 2), function(erro){
				if(erro) console.log("error : "+erro);
			});
		}
	});
}

const prepareJsonByWallet = async function(file_idx) {
	fs.readFile('assets/json-output/' + file_idx + '.json', function(err, data) {
		if(err) console.log(err)
		else {
			var json_data = JSON.parse(data);
			json_data.properties.creators[0].address = wallet;
			fs.writeFileSync('assets/json-output/' + file_idx + '.json', JSON.stringify(json_data, null, 2), function(erro){
				if(erro) console.log("error : "+erro);
			});
		}
	});
}

app.use(express.static(path.join(__dirname, 'build')));
app.use(express.static(path.join(__dirname, 'static')));

app.get('/prepare/both', (req, res) => {
	cdnurl = req.query.cdnurl;
	wallet = req.query.wallet;
	if (!cdnurl || !wallet) {
		res.send('Missing parameter.');
		return;
	}

	for (var i = 0; i < img_cnt; i++) {
		prepareJsonByBoth(i);
	}

	res.send('Successful response.');
});

app.get('/prepare/both_nd', (req, res) => {
	localurl = req.query.localurl;
	wallet = req.query.wallet;
	if (!localurl || !wallet) {
		res.send('Missing parameter.');
		return;
	}

	for (var i = 0; i < img_cnt; i++) {
		prepareJsonByBoth2(i);
	}

	res.send('Successful response.');
});

app.get('/prepare/wallet', (req, res) => {
	wallet = req.query.wallet;
	if (!wallet) {
		res.send('Missing parameter.');
		return;
	}

	for (var i = 0; i < img_cnt; i++) {
		prepareJsonByWallet(i);
	}

	res.send('Successful response.');
});

app.listen(port, () => console.log(`API is live on port ${port}!`))