'use strict';

import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as cors from 'cors';
import * as serverlessMiddleware from 'aws-serverless-express/middleware';
import * as stormpathExpress from 'express-stormpath';
import * as stormpath from 'stormpath';

const app: any = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(serverlessMiddleware.eventContext());

let now: any = new Date();


/* --- Using the stormpath express*/
app.use(stormpathExpress.init(app, {
  apiKey: {
    id: 'YOUR_KEY_ID',
    secret: 'YOUR_KEY_SECRET'
  },
  application: {
    href: `YOUR_APPLICATION_URL`
  }
}));

app.on('stormpath.ready', function () {
  let then: any = new Date();
  console.log(`Stormpath Ready in ${then - now} ms`);
});


/* --- Manually using the stormpath client to authenticate --- */
app.get('/alternateLogin', (request, response) => {
  let spClient = new stormpath.Client({
    apiKey: {
      id: 'YOUR_KEY_ID',
      secret: 'YOUR_KEY_SECRET'
    },
  });

  spClient.getApplication(`YOUR_APPLICATION_URL`, (err, spApplication) => {
    let creds = {
      username: 'fezoha@fun64.com',
      password: 'Password1'
    };
    spApplication.authenticateAccount(creds, (err, result) => {
      result.getAccount(function (err, account) {
        console.log(account);
        response.json(account);
      });
    })
  });
});


/* --- Other example express endpoints --- */
app.get('/yo', (req, res) => res.json({ name: 'hello jeff' }));
app.get('/yo/:myParam', (req, res) => res.json({ parameter: req.params.myParam }));
app.get('/myasync', (req, res) => new Promise((resolve) => resolve(res.json('yay async!'))));

export = app;