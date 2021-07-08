# Angularushpack
Monorepo micro frontend example with Angular, Rush and Webpack 5 Module Federation

### Getting started

Install [rush](https://rushjs.io/) globally
```javascript
npm i -g @microsoft/rush
```

Install dependencies
```javascript
rush update
```

Running locally
```javascript
rush start
```

The apps will run on the following ports:
- middle-earth (host/shell app): `http://localhost:3000`
- aragorn (remote angular app): `http://localhost:5000`
- gandalf (remote react app wrapped in custom-element): `http://localhost:5001`
- saruman (remote react app wrapped in custom-element): `http://localhost:5002`

### Webpack
The webpack configs are auto generated with [@angular-architects/module-federation](https://github.com/angular-architects/module-federation-plugin) package
