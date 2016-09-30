import * as express from "express";
import * as path from "path";
import * as fs from "fs-extra-promise";
import * as bodyParser from "body-parser";

const app = express();

app.use(express.static(__dirname));
app.use(bodyParser.json());
app.get('/api/envProps', (req, res) => {
  res.sendFile(path.join(__dirname, 'data/envProps.json'));
});

app.post('/api/envProps', (req, res) => {
  let envPropsPath = path.join(__dirname, 'data/envProps.json');
  console.log(req.body);
  fs.writeFileAsync(envPropsPath, JSON.stringify(req.body,null,2)).then(()=>res.send({success:true}));
});

app.get('/*',(req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});