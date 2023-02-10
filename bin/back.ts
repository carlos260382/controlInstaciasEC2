#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { BackStack } from '../lib/back-stack';
import { ACCOUNT, APP_NAME, REGION } from '../config';

const app = new cdk.App();
new BackStack(app, APP_NAME, {
  env: { account: ACCOUNT, region: REGION },
});
