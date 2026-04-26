# Lecture 7: Monitoring, Auditing, and Logging

### 1. Lecture Topic
This lecture covers the fundamental concepts of logging, monitoring, and auditing in cloud environments, focusing specifically on the differences and use cases for Amazon CloudWatch and AWS CloudTrail.

### 2. Executive Summary
The lecture highlights the critical importance of visibility in cloud computing, emphasizing that operating without monitoring is like flying blind and will inevitably lead to dissatisfied customers. It introduces the differences between standard performance monitoring and auditing API calls. Amazon CloudWatch is presented as the primary tool for performance monitoring, capable of tracking metrics, aggregating logs, and triggering automated actions. Meanwhile, AWS CloudTrail is explained as the core auditing service that records every API call to answer "who did what, when, and from where." Together, these services enable automated responses to operational issues and ensure comprehensive system observability and security.

### 3. Key Concepts and Definitions
* **Observability / Visibility:** The ability to understand what is happening within your cloud resources; essential for maintaining performance, security, and customer satisfaction.
* **API Call:** Every interaction with AWS services—whether through code, CLI, or clicking in the AWS Management Console—is an API call that can be tracked.
* **Amazon CloudWatch:** A comprehensive monitoring service used to track operational metrics (e.g., CPU usage, network traffic, I/O operations), collect application/system logs, and trigger automated responses using alarms and rules.
* **AWS CloudTrail:** An auditing service that records API activity across an AWS account to track user and system actions for governance and compliance.
* **Amazon SNS (Simple Notification Service):** A decoupled messaging service used to route notifications (such as emails, SMS, or webhooks) when specific monitoring or auditing events occur.

### 4. Main Arguments or Theories
* **"Flying Blind" Without Monitoring:** Without proper logging and monitoring, it is impossible to know if a system is healthy until customers start complaining. Cloud environments require proactive visibility.
* **Separation of Concerns in AWS:** AWS follows a philosophy of building narrowly focused, single-purpose services rather than massive monolithic tools. Therefore, monitoring (CloudWatch), auditing (CloudTrail), and notifications (SNS) are distinct services that integrate seamlessly.
* **Monitoring Enables Automation:** The goal of logging and monitoring is not just to have humans stare at dashboards. Data from these services should be used to trigger automated actions, such as dynamically scaling resources or restarting failed virtual servers.

### 5. Important Examples
* **Automated Remediation:** Using CloudWatch Events/Rules to monitor the uptime of a virtual server and triggering an AWS Lambda function to automatically shut down or restart the server if it breaches a specific threshold.
* **Application vs. System Logging:** A server might appear healthy in terms of CPU and memory metrics, but application logs might reveal that a specific service (e.g., "Siim's cat pictures" website) is inaccessible. Both hardware metrics and application logs must be monitored.
* **Targeted Alerting:** Configuring an automated notification chain via Amazon SNS to alert only the specific administrator who is on-call that week, rather than overwhelming the entire team with notifications.

### 6. What the Professor Emphasized
* **Strict Exam Prerequisite:** The professor heavily emphasized that students must complete their lab assignments on time. Failure to finish the labs means the student will not be allowed to take the final exam.
* **CloudWatch vs. CloudTrail Distinction:** Understanding the exact difference between these two services is the most crucial takeaway from the lecture and is practically guaranteed to be an exam question.
* **Everything is an API Call:** Even simple clicks within the AWS Management Console execute API calls that CloudTrail logs.

### 7. Likely Exam-Relevant Takeaways
* **Amazon CloudWatch = Performance Monitoring:** Used for hardware metrics, system/application logs, and operational events.
* **AWS CloudTrail = Auditing:** Used for tracking API calls (who, what, when, where).
* **VPC (Virtual Private Cloud) Review:** Mentioned as a review item; know that a VPC is an isolated network environment within a shared cloud, and remember recommended subnet sizes (e.g., /16).
* **Auto Scaling Groups Review:** Mentioned as a review item; understand their purpose in automatically managing compute capacity based on load.

### 8. Review Questions
1. Why is having visibility into cloud services considered critical by the lecturer?
2. What fundamental AWS action is triggered and logged even when you simply click around the AWS Management Console?
3. Which AWS service is responsible for tracking performance metrics like CPU utilization and network traffic?
4. Which AWS service would you use to investigate who deleted a resource, when they did it, and from what IP address?
5. How does AWS's service design philosophy explain why monitoring and notifications are handled by separate tools?
6. According to the professor, what mandatory requirement must students meet before they are allowed to take the final exam?
7. What AWS service is specifically designed to distribute alerts (like emails or SMS) triggered by system events?
8. Why might hardware metrics alone be insufficient for determining if an application is running successfully?

### 9. Flashcards
**Q:** What is the primary purpose of Amazon CloudWatch?
**A:** To monitor performance metrics, collect logs, and trigger automated operational responses.

**Q:** What is the primary purpose of AWS CloudTrail?
**A:** To audit and record API activity (who did what, when, and from where) for governance and security.

**Q:** What service records every action taken by a user in the AWS Management Console?
**A:** AWS CloudTrail (because every action is an API call).

**Q:** If you want to trigger an automated script when a server's CPU usage spikes, which service handles the monitoring?
**A:** Amazon CloudWatch.

**Q:** Why does AWS use separate services for monitoring events and sending notifications?
**A:** AWS favors single-purpose, non-competing services that integrate together, rather than monolithic applications.

**Q:** Which AWS service handles routing emails or SMS messages when an alarm is triggered?
**A:** Amazon SNS (Simple Notification Service).

**Q:** Can on-premise system logs be ingested and monitored using cloud monitoring tools?
**A:** Yes, cloud logging tools can ingest and monitor logs from both cloud and on-premise systems.

**Q:** What is the strict prerequisite for taking the final exam in this course?
**A:** Completing all required lab assignments before the deadline.

**Q:** What problem does application-level log monitoring solve?
**A:** It detects software failures that might occur silently without triggering hardware metric alarms (e.g., CPU or memory spikes).

**Q:** What concept does the professor refer to as "flying blind"?
**A:** Running and managing cloud resources without having proper logging and monitoring configured.
