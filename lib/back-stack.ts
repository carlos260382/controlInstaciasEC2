import { Duration, Stack, StackProps, Tags } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as path from 'path';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as rds from 'aws-cdk-lib/aws-rds';
import * as iam from 'aws-cdk-lib/aws-iam';
import * as ec2 from 'aws-cdk-lib/aws-ec2';
import * as ecs from 'aws-cdk-lib/aws-ecs';
import { ScheduledFargateTask } from 'aws-cdk-lib/aws-ecs-patterns';
import { CUSTOMER, PROJECT } from '../config';
import { FargatePlatformVersion } from 'aws-cdk-lib/aws-ecs';
import { Schedule } from 'aws-cdk-lib/aws-events';

export class BackStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    //Creating a Fargate schedueld task
    // const scheduledTask = new ScheduledFargateTask(this, 'ScheduledTask', {
    //   cluster: cluster,
    //   platformVersion: FargatePlatformVersion.LATEST,
    //   desiredTaskCount: 1,
    //   schedule: Schedule.expression('cron(0 17 * * ? *)'),
    //   taskDefinition: fargateTaskDefinition,
    // });
  }

  addCustomerTags = (scope: Construct) => {
    Tags.of(scope).add('customer', CUSTOMER);
    Tags.of(scope).add('type', 'customer');
  };

  buildLambda(cluster?: rds.DatabaseInstance) {
    // Lambda resolver
    const dockerfile = path.join(__dirname, '../api');
    const dockerLambda = new lambda.DockerImageFunction(
      this,
      `${CUSTOMER}_${PROJECT}_DockerLambda`,
      {
        functionName: `${CUSTOMER}_${PROJECT}_DockerLambda`,
        code: lambda.DockerImageCode.fromImageAsset(dockerfile),
        memorySize: 1024,
        timeout: Duration.seconds(60),
        environment: {
          SECRET_ID: cluster?.secret?.secretArn || '',
          AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
        },
      }
    );
    this.addCustomerTags(dockerLambda);

    if (cluster) {
      // Grant access to Secrets manager to fetch the secret
      dockerLambda.addToRolePolicy(
        new iam.PolicyStatement({
          effect: iam.Effect.ALLOW,
          actions: ['secretsmanager:GetSecretValue'],
          resources: [cluster.secret?.secretArn || ''],
        })
      );
    }
  
  // const executionRolePolicy = new iam.PolicyStatement({
  //     effect: iam.Effect.ALLOW,
  //     resources: ['*'],
  //     actions: [
  //       'ecr:GetAuthorizationToken',
  //       'ecr:BatchCheckLayerAvailability',
  //       'ecr:GetDownloadUrlForLayer',
  //       'ecr:BatchGetImage',
  //       'logs:CreateLogStream',
  //       'logs:PutLogEvents',
  //     ],
  //   });

    return dockerLambda;
  }
 
}
