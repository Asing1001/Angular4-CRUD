import * as express from "express";
import * as path from "path";
import * as fs from "fs-extra";
import * as bodyParser from "body-parser";

const app = express();

app.use('/node_modules', express.static(path.join(__dirname, 'node_modules')));
app.use(express.static(path.join(__dirname, 'dist')));
app.use(bodyParser.json());
app.get('/api/envProps', (req: express.Request, res: express.Response) => {
  let targetFile = path.join(__dirname, 'data/' + req.query.projectName + 'envProps.json');
  let isTargetFileExist = fs.existsSync(targetFile);
  if (!isTargetFileExist) {
    fs.ensureFileSync(targetFile);
    fs.writeFileSync(targetFile, '[]');
  }
  res.sendFile(targetFile);
});

app.post('/api/envProps', (req, res) => {
  let targetFile = path.join(__dirname, 'data/' + req.body.projectName + 'envProps.json');
  console.log(req.body);
  fs.writeFile(targetFile, JSON.stringify(req.body.envProps, null, 2), (error) => {
    if (error) {
      console.log(error);
      return res.send({ success: false })
    }
    res.send({ success: true })
  })
});

app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/index.html'));
});

let port = process.env.PORT || 3001;
app.listen(port, function () {
  console.log('Example app listening on port', port);
});