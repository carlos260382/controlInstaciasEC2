import boto3
import pandas as pd
import os
from dotenv import load_dotenv
from datetime import datetime
import boto3
region = 'us-east-1'
instances = ['i-06d0e4ddbe4a5afd5', 'i-0a224adeff823bed1']
ec2 = boto3.client('ec2', region_name=region)
load_dotenv()


class Base:
    def __init__(self):
        self.aws_access_key_id = os.environ.get("AWS_ID")
        self.aws_secret_access_key = os.environ.get("AWS_SECRET")

    def lambda_handler(event, context):
        ec2.stop_instances(InstanceIds=instances)
        print('stopped your instances: ' + str(instances))

    def lambda_handler(event, context):
        ec2.start_instances(InstanceIds=instances)
        print('started your instances: ' + str(instances))
