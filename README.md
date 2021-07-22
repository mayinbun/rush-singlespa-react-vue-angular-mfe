# Microfrontends
Monorepo micro frontend example with Rush, SingleSpa, React, Vue, Angular and Webpack 5 Module Federation

### Getting started

Install [rush](https://rushjs.io/) globally
```javascript
npm i -g @microsoft/rush
```

Install dependencies
```javascript
rush update
```

Build applications
```javascript
rush build
```

Run locally for development
```javascript
rush start
```

Run locally for testing production distributions
```javascript
rush prod
```

The apps will run on the following ports:
- aragorn (remote angular app): `http://localhost:5000`
- gandalf (remote react app): `http://localhost:5001`
- saruman (remote react app): `http://localhost:5002`
- legolas (remote vue app): `http://localhost:5004`
- middle-earth (host/shell app): `http://localhost:9000`
- rivendel (backend for storing remote metadata): `http://localhost:9999`
