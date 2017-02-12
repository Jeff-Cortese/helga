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

app.get('/yo', (req, res) => res.json({ name: 'hello jeff' }));
app.get('/yo/:myParam', (req, res) => res.json({ parameter: req.params.myParam }));
app.get('/myasync', (req, res) => new Promise((resolve) => resolve(res.json('yay async!'))));

export = app;