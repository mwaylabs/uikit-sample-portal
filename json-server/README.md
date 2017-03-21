# How to set up Travis with CodeDeploy to deploy the node server on an AWS instance
You can also follow this article [Comprehensive AWS EC2 Deployment with TravisCI Guide](https://medium.com/@itsdavidthai/comprehensive-aws-ec2-deployment-with-travisci-guide-7cafa9c754fc#.spxn1ttcq)

## 1. Setup up policies
### EC2-Access-S3-Policy
- Set up a [policy](https://console.aws.amazon.com/iam/home?region=eu-central-1#/policies) with the type `Create your own policy`
- Set a name for the policy e.g. `EC2AccessS3` and set the `Policy Document`
```json
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Action": [
                "s3:Get*",
                "s3:List*"
            ],
            "Effect": "Allow",
            "Resource": "*"
        }
    ]
}
```

### 2. Travis-Access-S3-Policy
- Set up another [policy](https://console.aws.amazon.com/iam/home?region=eu-central-1#/policies) with the type `Create your own policy`
- Set a name for the policy e.g. `TravisAccessS3` and set the `Policy Document`
```json
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Effect": "Allow",
            "Action": [
                "s3:PutObject"
            ],
            "Resource": [
                "*"
            ]
        }
    ]
}
```

### 3. Travis-Code-Deploy-Policy
- Set up another [policy](https://console.aws.amazon.com/iam/home?region=eu-central-1#/policies) with the type `Create your own policy`
- Set a name for the policy e.g. `TravisCodeDeploy` and set the `Policy Document`
```json
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Effect": "Allow",
            "Action": [
                "codedeploy:RegisterApplicationRevision",
                "codedeploy:GetApplicationRevision"
            ],
            "Resource": [
                "arn:aws:codedeploy:ServerRegionHERE:{{ACC_ID}}:application:{{NAME_OF_THE_APPLICATION}}"
            ]
        },
        {
            "Effect": "Allow",
            "Action": [
                "codedeploy:CreateDeployment",
                "codedeploy:GetDeployment"
            ],
            "Resource": [
                "*"
            ]
        },
        {
            "Effect": "Allow",
            "Action": [
                "codedeploy:GetDeploymentConfig"
            ],
            "Resource": [
                "arn:aws:codedeploy:{{SERVER_REGION}}:{{ACC_ID}}:deploymentconfig:CodeDeployDefault.OneAtATime",
                "arn:aws:codedeploy:{{SERVER_REGION}}:{{ACC_ID}}:deploymentconfig:CodeDeployDefault.HalfAtATime",
                "arn:aws:codedeploy:{{SERVER_REGION}}:{{ACC_ID}}:deploymentconfig:CodeDeployDefault.AllAtOnce"
            ]
        }
    ]
}
```

- Replace `{{ACC_ID}}` with your [amazon account id](http://docs.aws.amazon.com/IAM/latest/UserGuide/console_account-alias.html)
- Replace `{{SERVER_REGION}}` with your server region
- Replace `{{NAME_OF_THE_APPLICATION}}` with any name you like for your application e.g. `NodeApp`

## 4. Create a travis User
- Add a new [user](https://console.aws.amazon.com/iam/home?region=eu-central-1#/users)
- Give him a name e.g. `TravisDeployer`
- Give him `Programmatic Access`
- Attach Existing Policies Directly and attach
  - `TravisCodeDeploy`
  - `TravisAccessS3`
  
## 5. Create a role for the EC2 instance
- Add a new [role](https://console.aws.amazon.com/iam/home?region=eu-central-1#/roles)
- Give it a name e.g. `EC2InstanceRole`
- Select the role Type `Amazon EC2`
- Attach the Policy `EC2AccessS3Policy`

## 6. Create a role for the Code Deploy Application
- Add a new [role](https://console.aws.amazon.com/iam/home?region=eu-central-1#/roles)
- Give it a name e.g. `Code-Deploy-Service-Role`
- Select the role type `AWS CodeDeploy`
- Attach the Policy `AWSCodeDeployRole`

## 7. Create an EC2 Instance
- [Launch a new instance](https://eu-central-1.console.aws.amazon.com/ec2/v2/home?region=eu-central-1#LaunchInstanceWizard:)
- Select e.g. Ubuntu Server xx.xx ...
- Choose an instance type
- Click on Configure Instance Details (!Do not launch yet)
- Set IAM role `EC2AccessS3Policy` that you created in step 5 [[Create a role for the Code Deploy Application]]
- Click on `Review and Launch`
- Click on `Edit Security Groups`
- Add rules to allow `http` and `https` for all IPs
- Launch instance

## 8. Add tag to created instance
- Open the [instances view](https://eu-central-1.console.aws.amazon.com/ec2/v2/home?region=eu-central-1#Instances:sort=instanceId)
  and select the instance that you have just created
- Click on `Actions > Instance Settings > Add/Edit Tags`
- Create a tag with a key e.g. `CodeDeployInstance`

## 9. Create CodeDeploy Application 
- Create a new [Code Deploy Application](https://eu-central-1.console.aws.amazon.com/codedeploy/home?region=eu-central-1#/applications/new)
- Set the application name that you used in step 3 ([[Travis-Code-Deploy-Policy]]) e.g. `NodeApp`
- Set a Deployment Group name e.g. `NodeAppDeployGroup`
- For the instance choose the tag that you gave your instance in the previous step 8 ([[Add tag to created instance]])
- Set the Deployment configuration to `OneAtATime`
- Set the service role to the role that you created in step 6 ([[Create a role for the Code Deploy Application]]) e.g. `AWSCodeDeployRole`
- Create the application

## 10. Create S3 Bucket
- Create a [new bucket](https://console.aws.amazon.com/s3/home?region=eu-central-1)
- Give it name e.g. `code-deploy-bucket`
- Select a region
- Create bucket

## 11. Modify .travis.yml
- Open the file `travis.yml` that can be found in the root folder
- Update the following lines

```yml
...
deploy:
  - provider: s3
    access_key_id: ACCESS ID OF THE TRAVIS USER THAT YOU CREATED IN STEP 4
    secret_access_key:
      secure: ACCESS KEY OF THE TRAVIS USER THAT YOU CREATED IN STEP 4 MAKE SURE TO ENCRYPT IT WITH TRAVIS (travis encrypt)
    bucket: BUCKET NAME OF THE BUCKET THAT YOU CREATED IN STEP 10
    region: SET THE REGION THAT YOU USED
    ...
    
  - provider: codedeploy
    access_key_id: ACCESS ID OF THE TRAVIS USER THAT YOU CREATED IN STEP 4
    secret_access_key: 
      secure: ACCESS KEY OF THE TRAVIS USER THAT YOU CREATED IN STEP 4 MAKE SURE TO ENCRYPT IT WITH TRAVIS (travis encrypt)
    deployment_group: SET THE DEPLOYMENT GROUP THAT YOU SET UP IN STEP 9
    region: SET THE REGION THAT YOU USED
    bucket: BUCKET NAME OF THE BUCKET THAT YOU CREATED IN STEP 10
    ...
```

 

