'use strict';

import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as cors from 'cors';
import * as serverlessMiddleware from 'aws-serverless-express/middleware';

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(serverlessMiddleware.eventContext());

app.get('/yo', (req, res) => {
  return res.json({name: 'hello jeff'});
});

app.get('/yo/:myParam', (req, res) => {
  return res.json({parameter: req.params.myParam});
});

export = app