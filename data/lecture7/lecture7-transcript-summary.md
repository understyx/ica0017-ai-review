Lecture topic: AWS Monitoring, Auditing, and Logging

Core concepts:
- The importance of observability, monitoring, and logging in a cloud environment.
- Using Amazon CloudWatch to monitor resource performance and operational health.
- Setting up CloudWatch Alarms to trigger automated actions (e.g., Auto Scaling).
- Using AWS CloudTrail for governance, compliance, and auditing of API activity.
- The fundamental difference between performance monitoring (CloudWatch) and API auditing (CloudTrail).
- Best practices for centralized logging and log retention.

Key definitions:
- Amazon CloudWatch: A monitoring and observability service that collects metrics (e.g., CPU utilization), logs, and events from AWS resources.
- CloudWatch Alarms: Configurable alerts that trigger automated actions (like sending notifications or scaling resources) when a specific metric breaches a defined threshold.
- AWS CloudTrail: A service that records all API calls made within an AWS account, answering the question "Who did what, when, and from where?"
- API Call: Any action taken in AWS (via Console, CLI, or SDK), such as launching an instance or deleting a bucket, which is then logged by CloudTrail.

Important examples:
- CloudWatch use case: Triggering an Auto Scaling event to add more EC2 instances when the average CPU utilization exceeds 80%.
- CloudTrail use case: Investigating a security incident to discover exactly which IAM user deleted a critical S3 bucket and from which IP address.

Likely exam points:
- Distinguishing clearly between Amazon CloudWatch (focuses on performance/metrics) and AWS CloudTrail (focuses on auditing/API logging).
- Understanding how CloudWatch Alarms integrate with Auto Scaling to maintain application availability.
- Knowing that CloudTrail is the go-to service for governance and compliance auditing.

Questions to review:
1. If you need to determine who terminated a specific EC2 instance last night, which AWS service would you check?
2. Which AWS service is responsible for tracking the CPU utilization of your servers?
3. What is the relationship between CloudWatch Alarms and Auto Scaling?

5-sentence plain-English recap:
This lecture clarifies how to maintain visibility and security within an AWS environment using two core services: CloudWatch and CloudTrail. Amazon CloudWatch is dedicated to performance monitoring; it tracks operational metrics, collects logs, and can trigger alarms to automate responses like scaling up servers when traffic spikes. Conversely, AWS CloudTrail acts as the account's security camera, meticulously logging every API call to create an audit trail of "who did what, when." Understanding the strict distinction between CloudWatch (performance) and CloudTrail (auditing) is crucial for both security management and certification exams. Finally, the lecture emphasizes best practices around keeping logs centralized and retained for compliance purposes.