import * as express from "express";
import * as path from "path";
import * as fs from "fs-extra-promise";
import * as bodyParser from "body-parser";

const app = express();

app.use('/node_modules',express.static(path.join(__dirname,'node_modules')));
app.use(express.static(path.join(__dirname,'dist')));
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
  res.sendFile(path.join(__dirname, 'dist/index.html'));
});

let port = process.env.PORT || 3001;
app.listen(port, function () {
  console.log('Example app listening on port',port);
});