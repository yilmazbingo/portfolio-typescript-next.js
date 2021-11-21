you dont need to manage servers anymore. you still have server but dont manage them. we just deploy functions. Serverless=<FaaS> Function as a Service.

## Amazon Lambda

Virtual functions. we provision the code and functions run. Limited by time, short executions upto 15 minutes in lambda. They run on demand. So you will be billed when your functions are running. Free tier lambda 1.000.000 lambda requests.
<NOTE>: Docker just got support by lambda.
AWS INTEGRATIONS :::
Api Gateway is to create Rest Api and they will invoke our lambda functions. Kinesis will be using Lambda to do some transformations on the fly. DynamoDb will be used to create some triggers.
we are doing synchronous invocation when we use cli,sdk,Api gateway or application load balancer.
