Lecture topic: AWS Compute Services: EC2, Containers, and Serverless

Core concepts:
- Amazon EC2 (Elastic Compute Cloud) as the foundation of IaaS computing in AWS.
- Managing control vs. management overhead across different compute options.
- EC2 pricing strategies and when to use them (On-Demand, Reserved, Spot).
- Containerization basics (Docker) and AWS orchestration services.
- Serverless computing with AWS Lambda: concept, benefits, and execution model.

Key definitions:
- Amazon EC2: Virtual machines in the cloud providing resizable compute capacity where the user manages the OS and software.
- On-Demand Instances: Pay-by-the-second/hour EC2 pricing model, offering high flexibility and guaranteed availability.
- Reserved Instances: EC2 pricing model requiring a 1-3 year commitment in exchange for significant discounts.
- Spot Instances: Highly discounted EC2 instances utilizing unused AWS capacity, but which can be interrupted/terminated by AWS on short notice.
- Containers: Packages of code and their dependencies that ensure consistent execution across different environments.
- Amazon ECS (Elastic Container Service): AWS's proprietary container orchestration service.
- Amazon EKS (Elastic Kubernetes Service): AWS's managed Kubernetes service for container orchestration.
- AWS Lambda: A serverless compute service (FaaS) that runs code automatically in response to triggers without requiring server provisioning or management.

Important examples:
- Using Spot instances for fault-tolerant, flexible tasks like batch processing to save money.
- Using AWS Lambda to automatically run code when an image is uploaded to an S3 bucket (event-driven).
- Using EC2 when you need full control over the underlying operating system and environment.

Likely exam points:
- Differentiating between the EC2 pricing models (Spot vs. On-Demand vs. Reserved).
- Identifying AWS Lambda as a serverless Function-as-a-Service (FaaS) solution.
- The differences between ECS (AWS native) and EKS (Kubernetes based) for container orchestration.
- Recognizing which compute service requires OS management (EC2) and which do not (Lambda).

Questions to review:
1. What are the three primary EC2 pricing models, and what are their trade-offs regarding cost and availability?
2. What are the key differences in management overhead between using an EC2 instance versus AWS Lambda?
3. How do ECS and EKS differ as container orchestration services on AWS?

5-sentence plain-English recap:
This lecture explores the various ways to run computing workloads on AWS, starting with Amazon EC2, which provides traditional virtual machines where users have full control over the operating system. It details the different EC2 pricing models, emphasizing cost optimization strategies like using Spot instances for flexible workloads. The lecture then moves up the abstraction layer to discuss Containers, highlighting ECS and EKS as the primary AWS services for orchestrating containerized applications. Finally, it covers Serverless computing through AWS Lambda, explaining how developers can run code in response to events without ever managing or provisioning a server. Understanding the trade-offs between control, cost, and management overhead is key to choosing the right compute service.