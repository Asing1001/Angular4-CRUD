# Angular2-DeploymentGuide
### Quick Start
#### 1. Get the latest version
```shell
git clone https://github.com/Asing1001/Angular2-DeploymentGuide.git Angular2-DeploymentGuide
cd Angular2-DeploymentGuide
````
#### 2. Run `npm install`

This will install project dependencies listed in [package.json](./package.json) file.

#### 3. Run `npm start`
This command will build the app from the source files `/src` into 
`/public` folder. As soon as the build completes, it will start [deployd](http://deployd.com/) server on 
[http://localhost:3001/](http://localhost:3001/)

### How to build, develope

If you want to build the app, simply run:

```shell
npm run build
```

If you want to develope in watch mode (Auto refresh by `webpack dev server`) 
````shell 
npm run dev
````
Then browse in [http://localhost:3002/](http://localhost:3002/)
