# Angular2-DeploymentGuide
### Quick Start
#### 1. Get the latest version
```shell
git clone https://github.com/Asing1001/Angular2-DeploymentGuide.git myapp
cd my app
````
#### 2. Run `npm install`

This will install both run-time project dependencies and developer tools listed
in [package.json](./package.json) file.

#### 3. Run `npm start`
This command will build the app from the source files (`/src`) into the output
`/dist` folder. As soon as the initial build completes, it will start the
Node.js server (`node dist/server.js`) 
[http://localhost:3001/](http://localhost:3001/)

### How to build, develope

If you need just to build the app (without running a node server), simply run:

```shell
npm run build
```

If you want to develope in watch mode (Auto refresh by `webpack dev server` and `nodemon`) 
````shell 
npm run dev
````
Then browse in [http://localhost:3002/](http://localhost:3002/)



