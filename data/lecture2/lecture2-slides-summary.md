# Lecture 2 Slides Summary: Introduction to Cloud Technologies

**1. Lecture topic**
An introduction to cloud technologies, focusing on Amazon Web Services (AWS), its service portfolio across compute, storage, networking, AI, and management, and the shared responsibility model for security.

**2. Executive summary**
Cloud computing delivers on-demand compute power, database storage, and IT resources over the internet with pay-as-you-go pricing. This lecture provides a comprehensive overview of the Amazon Web Services (AWS) ecosystem. It categorizes AWS services into distinct domains, including compute (e.g., EC2, Lambda), storage (e.g., S3, EBS), networking (e.g., VPC, CloudFront), and management tools (e.g., CloudWatch, CloudFormation). The infrastructure is organized hierarchically into Regions, Availability Zones (AZs), and Edge Locations. Finally, the lecture introduces the AWS Shared Responsibility Model, which distinguishes between the security "of" the cloud (managed by AWS) and security "in" the cloud (managed by the customer).

**3. Key concepts and definitions**
* **Cloud computing:** On-demand delivery of IT resources through a cloud platform via the internet with pay-as-you-go pricing.
* **AWS (Amazon Web Services):** A secure cloud services platform offering compute power, storage, and other functionality.
* **Infrastructure Hierarchy:**
  * **Regions:** Geographic locations containing multiple Availability Zones.
  * **Availability Zones (AZs):** Distinct locations within a region, connected by low-latency links (<2ms apart).
  * **Edge Locations:** Used for caching content closer to users (e.g., CloudFront).
* **Shared Controls:** Security controls that apply to both the infrastructure layer (AWS) and the customer layers, but in different contexts (e.g., Patch Management, Configuration Management).
* **CLI (Command Line Interface):** An open-source tool for interacting with AWS services via shell commands.
* **SDK/CDK:** Language-specific APIs providing programmatic access to AWS services.

**4. Main arguments or theories explained simply**
* **Service Categorization:** AWS provides a vast array of services tailored to different IT needs. These are grouped into logical categories such as Compute, Storage, Databases, Network/CDN, AI, Management Tools, and Security. By understanding the categories, users can select the right tools for their infrastructure.
* **Shared Responsibility Model:** Security is not solely the responsibility of the cloud provider. AWS is responsible for securing the underlying infrastructure (the hardware, global network, and physical facilities). The customer is responsible for securing what they put into the cloud, such as their data, applications, and operating systems.

**5. Important examples from the lecture**
* **Top AWS Customers:** Examples of major companies using AWS include Netflix ($19 million monthly spend), Twitch, LinkedIn, Facebook, and the BBC.
* **Shared Control Examples:**
  * **Patch Management:** AWS patches the underlying infrastructure; customers patch their guest operating systems and applications.
  * **Configuration Management:** AWS configures its infrastructure devices; customers configure their databases and applications.
  * **Training:** AWS trains its own employees; customers must train their employees.

**6. What the professor emphasized**
* The hierarchical structure of AWS global infrastructure: Edge Locations > Availability Zones > Regions.
* The high-speed connectivity between Availability Zones, noting they are less than 2ms apart, with up to 25Tbps peak inter-AZ traffic.
* The clear distinction between "Security OF the Cloud" and "Security IN the Cloud" within the Shared Responsibility Model.

**7. Likely exam-relevant takeaways**
* Definitions and use-cases for core AWS services:
  * **Compute:** EC2 (virtual servers), LightSail, ECS/EKS (containers), Lambda/Fargate (serverless).
  * **Storage:** S3 (object storage), EBS (block storage), EFS (network file system), Glacier (archival).
  * **Databases:** RDS (relational), DynamoDB (NoSQL), RedShift (data warehouse).
  * **Networking:** VPC (virtual private cloud), CloudFront (CDN).
  * **Management:** CloudWatch (monitoring), CloudFormation (infrastructure-as-code), CloudTrail (auditing).
  * **Security:** IAM (identity and access), Inspector (vulnerability reporting), KMS (key management).
* The specific elements of the AWS Shared Responsibility Model (who patches what, who configures what).
* The relationship between Regions and Availability Zones.

**8. Review questions**
1. What is the definition of cloud computing as presented in the lecture?
2. What are the three main components of AWS global infrastructure hierarchy?
3. Which AWS service is used for serverless computing and containers?
4. What is the primary difference between S3 and EBS storage?
5. Which AWS database service is described as a highly available, high-performance NoSQL service?
6. What does CloudFormation do?
7. In the Shared Responsibility Model, what is AWS responsible for regarding patch management?
8. What is the purpose of the AWS CloudTrail service?

**9. Flashcards**
* **Q:** What is cloud computing?
  **A:** The on-demand delivery of compute power, database storage, applications, and other IT resources via the internet with pay-as-you-go pricing.
* **Q:** What does AWS stand for?
  **A:** Amazon Web Services.
* **Q:** What is the hierarchy of AWS physical infrastructure?
  **A:** Edge Locations > Availability Zones > Regions.
* **Q:** What is Amazon EC2?
  **A:** A compute service providing virtual servers for Windows and Linux (Elastic Compute Cloud).
* **Q:** What are Lambda and Fargate used for?
  **A:** They are serverless services for running code and containers.
* **Q:** What is Amazon S3?
  **A:** Simple Storage Service, used for storing objects like files, images, and videos. It cannot be used to install an OS.
* **Q:** What is Amazon EBS?
  **A:** Elastic Block Storage, providing block storage space for EC2 virtual servers.
* **Q:** Which service provides ultra-low cost archival storage?
  **A:** Amazon Glacier.
* **Q:** What is Amazon RDS?
  **A:** Relational Database Service, a managed service for databases like MySQL, PostgreSQL, and Oracle.
* **Q:** What is DynamoDB?
  **A:** A highly available, high-performance NoSQL database service.
* **Q:** What is an Amazon VPC?
  **A:** Virtual Private Cloud, a virtual data center that allows isolating cloud resources.
* **Q:** What is CloudFront?
  **A:** A Content Delivery Network (CDN) that allows caching data worldwide.
* **Q:** What is CloudWatch?
  **A:** A monitoring tool for AWS environments and services that can trigger alerts.
* **Q:** What is CloudFormation?
  **A:** An automation tool that uses infrastructure-as-code principles to deliver environments.
* **Q:** What does IAM stand for and what does it manage?
  **A:** Identity and Access Management; it manages users, roles, groups, and privileges.
* **Q:** What is the Shared Responsibility Model?
  **A:** A security framework dividing responsibilities between AWS (security OF the cloud) and the customer (security IN the cloud).
* **Q:** In the Shared Responsibility Model, who patches the guest operating system?
  **A:** The customer.
* **Q:** What is the AWS CLI?
  **A:** The AWS Command Line Interface, an open-source tool to interact with AWS services via shell commands.
