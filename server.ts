import * as express from "express";
import * as path from "path";
import * as fs from "fs-extra-promise";

var app = express();

app.use(express.static(__dirname));
app.get('/api/envProps', (req, res) => {
  res.sendFile(path.join(__dirname, 'data/envProps.json'));
});


app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});