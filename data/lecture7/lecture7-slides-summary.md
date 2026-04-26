# Lecture 7 Slides Summary

## 1. Lecture Topic
This lecture introduces AWS monitoring and logging services, specifically focusing on AWS CloudTrail for API audit logging and AWS CloudWatch for operational performance monitoring and log aggregation.

## 2. Executive Summary
The lecture focuses on the complexities and necessities of securing and monitoring cloud IT infrastructure. It details how AWS provides native tools like AWS CloudTrail and AWS CloudWatch to grant deep visibility into API calls and system performance. AWS CloudTrail is primarily used as an audit trail for management, data, and insight events, tracking who did what and when. In contrast, AWS CloudWatch is used for real-time operational monitoring, log aggregation, and alerting based on custom or built-in metrics. Additionally, the Simple Notification Service (SNS) is introduced as a mechanism to asynchronously deliver alerts and notifications related to monitoring events.

## 3. Key Concepts and Definitions
* **AWS CloudTrail:** A web service that records AWS API calls for your account, delivering log files for security and operational auditing.
* **Management Events:** Control plane operations in CloudTrail that record management actions like configuring security, routing, or logging.
* **Data Events:** Data plane operations in CloudTrail recording high-volume resource activities like S3 object-level APIs and Lambda executions.
* **Insight Events:** Events captured by CloudTrail that log unusual API call rates or error rate activities.
* **AWS CloudWatch:** A monitoring service for AWS cloud resources and applications that tracks metrics, collects logs, and triggers alarms.
* **CloudWatch Logs:** A component that aggregates and stores logs pushed from AWS services (including CloudTrail) and on-premises applications.
* **CloudWatch Events:** A near real-time stream of system events that trigger actionable items or rules matching specific targets.
* **SNS (Simple Notification Service):** A managed message delivery service that sends asynchronous notifications from publishers to subscribers via topics.

## 4. Main Arguments or Theories Explained Simply
* **Necessity of Cloud Visibility:** Because cloud environments are complex and constantly changing, organizations must know exactly who deployed or deleted resources and what caused application failures. Relying on default tools prevents blind spots.
* **Separation of Auditing and Monitoring:** CloudTrail and CloudWatch serve distinct but complementary purposes. CloudTrail answers "who made this API call and when?", establishing a secure audit trail. CloudWatch answers "how are my resources performing right now?", providing metrics and alarms.
* **Importance of Log Security:** CloudTrail logs can contain Personally Identifiable Information (PII) and sensitive configuration details. They must be secured using IAM policies, S3 bucket restrictions, and encryption (SSE-S3 or SSE-KMS).
* **Automated Workflows:** Monitoring is most effective when combined with automation. CloudWatch Events can detect specific changes and trigger automated responses via AWS Lambda or SNS to mitigate issues without human intervention.

## 5. Important Examples from the Lecture
* **Management Event Example:** Registering devices (e.g., creating a default VPC) or configuring security (attaching an IAM role policy).
* **Data Event Example:** Amazon S3 object-level API activity (GetObject, PutObject) or AWS Lambda function executions.
* **Insight Event Example:** A sudden spike from an average of 20 S3 deleteBucket API calls per minute to 100 per minute triggers an Insights event marking the unusual activity.
* **Automated Workflow Example:** A CloudWatch Event rule detecting a specific CloudTrail API call that triggers a target, such as terminating an oversized EC2 instance and notifying an admin via SNS.

## 6. What the Professor Emphasized
* **Security Complexity:** Securing IT infrastructure is inherently complex, expensive, and time-consuming to build, configure, and maintain.
* **Log Management and Integrity:** Users must manage the retention of CloudTrail logs in S3. The integrity of these logs is validated using SHA-256 hashing to ensure they haven't been modified or deleted.
* **Automated Reactions:** Monitoring should lead to automated responses. CloudTrail itself does nothing with logs; it relies on CloudWatch Events to define actionable workflows.

## 7. Likely Exam-Relevant Takeaways
* Understand the core difference between AWS CloudTrail (API auditing/logging) and AWS CloudWatch (resource monitoring and metrics).
* Know the three types of CloudTrail events: Management events (control plane), Data events (data plane), and Insight events (anomalies).
* Remember how CloudTrail logs are secured (IAM, S3 policies, encryption, restricting delete access) and validated (SHA-256).
* Know the components of CloudWatch (Metrics, Logs, Events/Alarms) and how CloudWatch Events can hook into targets like Lambda or SNS.
* Understand the function of AWS SNS as an asynchronous pub/sub messaging service.

## 8. Review Questions
1. What is the primary difference in purpose between AWS CloudTrail and AWS CloudWatch?
2. What are the three types of events recorded by AWS CloudTrail?
3. Give an example of a management event and a data event in CloudTrail.
4. How does AWS CloudTrail ensure the integrity of its log files?
5. Why is it important to secure CloudTrail logs, and what methods are recommended to do so?
6. What happens if CloudTrail detects an unusual spike in API error rates?
7. How does CloudWatch utilize the logs generated by CloudTrail?
8. What is a "topic" in the context of Amazon SNS?
9. Can CloudWatch be used to monitor on-premises or non-AWS workloads?

## 9. Flashcards
**Q: What AWS service is primarily used to record API calls for auditing purposes?**
A: AWS CloudTrail.

**Q: What AWS service is primarily used to monitor operational performance and resource utilization?**
A: AWS CloudWatch.

**Q: What type of CloudTrail event logs control plane operations like attaching IAM policies or creating VPCs?**
A: Management events.

**Q: What type of CloudTrail event logs high-volume resource operations like S3 PutObject or Lambda invokes?**
A: Data events.

**Q: What type of CloudTrail event captures unusual API call rates or error rate anomalies?**
A: Insight events.

**Q: Where are AWS CloudTrail event logs delivered and stored by default?**
A: An Amazon S3 bucket.

**Q: How does CloudTrail validate that log files have not been modified or deleted?**
A: By hashing every log file with SHA-256.

**Q: Why might CloudTrail logs be considered sensitive data?**
A: They may contain Personally Identifiable Information (PII) such as usernames, team memberships, and detailed configuration info.

**Q: Name two encryption methods recommended for securing CloudTrail logs in S3.**
A: SSE-S3 and SSE-KMS.

**Q: What CloudWatch component provides a near real-time stream of system events and AWS resource state changes?**
A: CloudWatch Events.

**Q: Does CloudTrail automatically take action when it records an API call?**
A: No, CloudTrail only records logs; it relies on CloudWatch Events to trigger workflows.

**Q: What AWS service provides managed message delivery from publishers to subscribers?**
A: Amazon Simple Notification Service (SNS).

**Q: In Amazon SNS, what is the logical access point and communication channel called?**
A: A topic.

**Q: Can CloudWatch Logs store metrics and logs from non-AWS/on-premises workloads?**
A: Yes.

**Q: How long is AWS CloudTrail enabled by default when you create an AWS account?**
A: It is enabled by default for 7 days.
