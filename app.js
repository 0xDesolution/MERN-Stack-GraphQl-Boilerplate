const express = require('express');
const bodyParser = require('body-parser');
const graphqlHttp = require('express-graphql');
const mongoose = require('mongoose');
const graphQlSchema=require('./graphql/schema/index') ;
const graphQlResolvers=require('./graphql/resolvers/index');
const app = express();
const encodedPassword = encodeURIComponent(process.env.MONGO_PASSWORD);
const encodedUser = encodeURIComponent(process.env.MONGO_USER)
const isAuth = require('./middleware/is-auth');

app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST,GET,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }
  next();
});

app.use(isAuth);

app.use(
  '/graphql',
  graphqlHttp({
    schema: graphQlSchema,
    rootValue: graphQlResolvers,
    graphiql: true
  })
);


mongoose.connect(`mongodb+srv://${encodedUser}:${encodedPassword}@rhine-test-pvzja.azure.mongodb.net/${process.env.MONGO_DB}?retryWrites=true&w=majority`,{useNewUrlParser:true,useUnifiedTopology:true})
.then( ()=> {
  console.log('MongoDB Connected.')
  const port = process.env.PORT || 8000;
  app.listen(port, ()=> console.log(`Server started on port ${port}`));
})
.catch(err =>{ console.log(err);
});



