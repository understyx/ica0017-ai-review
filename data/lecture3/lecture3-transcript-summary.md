# Lecture 3 Summary

1. **Lecture topic in 1 sentence**
A deep dive into AWS cloud compute services, covering virtual servers (EC2), the AWS Nitro System architecture, container orchestration (ECS vs. EKS), and serverless computing (Lambda).

2. **Executive summary (4-6 sentences)**
This lecture transitions into the technical aspects of cloud infrastructure, beginning with the shared responsibility model, emphasizing that users are accountable for their configurations and usage costs. It explores virtual servers (EC2), including Amazon Machine Images (AMIs) and various pricing models like On-Demand, Reserved, and Spot instances. The professor details the AWS Nitro System, an innovative server architecture that significantly improves security and performance by utilizing specialized hardware cards and a lightweight hypervisor. Furthermore, the lecture covers Firecracker microVMs as the foundation for serverless containers (AWS Fargate) and serverless computing (AWS Lambda). Finally, it discusses container orchestration services, comparing the proprietary ECS with the Kubernetes-based EKS, and evaluates the benefits and drawbacks of serverless architectures, such as severe vendor lock-in and execution time limits.

3. **Key concepts and definitions**
- **Shared Responsibility Model**: Cloud providers secure the infrastructure, but users are responsible for how they configure, secure, and use the services (including unexpected high bills due to poor scripting).
- **Virtual Server (Amazon EC2)**: Flexible compute capacity where AWS manages the underlying infrastructure (network, storage) and provides a packaged, usable virtual instance.
- **Instance Types**: Pre-defined hardware configurations (amount of CPU, RAM, GPU, network speed) that cannot be granularly modified without changing the type entirely.
- **AMI (Amazon Machine Image)**: Pre-configured, ready-to-run templates containing an operating system, drivers, and monitoring tools tailored for the cloud environment.
- **AWS Nitro System**: A custom AWS architecture that separates network, storage, and management controllers onto dedicated hardware cards, utilizing a minimal hypervisor to enhance security and drastically reduce latency.
- **Firecracker**: An open-source, highly lightweight microVM technology created by AWS, providing extremely fast startup times and a small memory footprint (around 5MB) for running serverless containers and functions.
- **Amazon ECS (Elastic Container Service)**: AWS's proprietary container orchestration service where the control plane is provided for free.
- **Amazon EKS (Elastic Kubernetes Service)**: AWS's managed Kubernetes service, providing an industry-standard environment but requiring a monthly fee for the control plane.
- **AWS Fargate**: A serverless compute engine for containers where each container runs in an isolated microVM without the user needing to manage or provision underlying virtual machines.
- **AWS Lambda (Serverless Computing)**: A service that runs code (Python, Java, etc.) in response to triggers and events without the user managing servers, billed only for active execution time.

4. **Main arguments or theories explained simply**
- **Pricing Strategy Matters**: Choosing how you pay for computing power (On-Demand, Savings Plans, Spot) drastically impacts cost. Spot instances use excess capacity and are extremely cheap, but they come with the risk of being terminated at any time by AWS.
- **Security through Hardware Isolation**: The AWS Nitro System improves security by physically preventing AWS management tasks from interacting with the CPUs that process customer data. The thin hypervisor focuses solely on CPU and memory allocation, blocking back-door access.
- **Serverless is not truly "serverless"**: The term "serverless" is an oxymoron; the code still runs on physical hardware. However, technologies like Firecracker abstract this away so the user only worries about the code, while AWS handles the near-instantaneous provisioning of lightweight microVMs.
- **Vendor Lock-in is a Major Trade-off**: Adopting serverless services like AWS Lambda makes infrastructure management easier but deeply ties your application's architecture to AWS, making it incredibly difficult to migrate to other clouds like Azure or Google Cloud.

5. **Important examples from the lecture**
- **Billing Mistakes**: The professor gave examples of users writing bad scripts that incurred massive $100,000 bills overnight; while cloud providers sometimes forgive these mistakes once, users bear the ultimate responsibility and cannot expect refunds for their incompetence.
- **Nitro System vs. Traditional Servers**: Traditional virtualized servers have thick hypervisors managing storage, network, and management. AWS Nitro moves network and storage to external cards, leaving a thin hypervisor that drops latency massively.
- **AWS Lambda Use Cases**: An S3 image upload triggering a Lambda function to process a photo; or sensor data (e.g., a tractor filter needing replacement) triggering a Lambda function to order a part and schedule maintenance automatically.
- **Lars' Lambda Experience**: A guest speaker (Lars) shared practical experience using Lambda for grading automated lab assignments, noting its 15-minute timeout limit and the difficulty of finding logs and debugging compared to traditional servers.

6. **What the professor emphasized**
- **The Shared Responsibility Model**: Strongly emphasized as an exam topic—if you configure a script poorly and incur a massive bill, it is your fault, not the cloud provider's.
- **Availability Zone Constraints**: Virtual servers cannot be moved easily between regions or data centers; their availability is tied to the specific data center they are deployed in.
- **EC2 Pricing Models**: Emphasized the definitions and trade-offs of On-Demand (flexible, most expensive), Savings Plans/Reserved (cheaper, long-term commitment), and Spot instances (cheapest, interruptible).
- **ECS vs. EKS Differences**: ECS is AWS-native and its control plane is free, while EKS is Kubernetes-based and charges a monthly fee for the control plane.

7. **Likely exam-relevant takeaways**
- Understanding the Shared Responsibility model regarding billing and configuration mistakes.
- The differences between EC2 pricing models (On-Demand vs. Savings Plans vs. Spot).
- Understanding what AMIs and Instance Types are.
- Knowing the differences between Amazon ECS and Amazon EKS regarding cost and management.
- Understanding AWS Lambda characteristics, including its primary downside (vendor lock-in) and limitations (15-minute maximum runtime).

8. **5-10 review questions based only on the transcript**
- Who is responsible if a misconfigured script generates a massive, unexpected AWS bill overnight?
- What is an Amazon Machine Image (AMI) and how does it differ from an Instance Type?
- What is a Spot instance and what is the primary risk associated with using one?
- How does the AWS Nitro System improve security and performance compared to traditional virtualized servers?
- What are the main differences between Amazon ECS and Amazon EKS regarding cost and architecture?
- What is Firecracker and how does it relate to serverless computing?
- What is AWS Fargate?
- According to the lecture, what is the biggest drawback of building an architecture heavily reliant on AWS Lambda?
- What is the maximum execution time for an AWS Lambda function as mentioned in the lecture?

9. **5-20 flashcards in Q/A format**
- **Q**: Under the Shared Responsibility Model, who pays if a user writes a script that runs up a massive cloud bill?
  **A**: The user. Cloud providers may forgive it once, but it is ultimately the user's responsibility.
- **Q**: What defines an EC2 "Instance Type"?
  **A**: A pre-defined combination of virtual hardware, such as CPU, RAM, and network capabilities, which cannot be individually modified.
- **Q**: What does AMI stand for and what is it?
  **A**: Amazon Machine Image; it is a pre-configured template containing an operating system and necessary drivers to run an instance.
- **Q**: Which EC2 pricing model is the most expensive and offers no long-term commitment?
  **A**: On-Demand.
- **Q**: Which EC2 pricing model offers highly discounted rates but can be interrupted by the cloud provider at any moment?
  **A**: Spot instances.
- **Q**: What is the AWS Nitro System?
  **A**: An AWS server architecture that offloads network, storage, and management controllers to dedicated hardware cards to improve security and performance.
- **Q**: What specific tasks does the ultra-thin Nitro hypervisor handle?
  **A**: Only CPU and memory allocation.
- **Q**: What is Firecracker?
  **A**: A highly lightweight, secure microVM technology developed by AWS for running containers and serverless functions with very low overhead.
- **Q**: What is Amazon ECS?
  **A**: Elastic Container Service, AWS's proprietary container orchestration tool where the control plane is free of charge.
- **Q**: What is Amazon EKS?
  **A**: Elastic Kubernetes Service, AWS's managed Kubernetes platform which charges a monthly fee for its control plane.
- **Q**: What is AWS Fargate?
  **A**: A serverless compute engine for containers where each container runs in its own isolated microVM without the user managing underlying servers.
- **Q**: What is AWS Lambda?
  **A**: A serverless computing service that runs code in response to events without requiring the user to provision or manage servers.
- **Q**: What is a significant strategic downside of using AWS Lambda?
  **A**: Severe vendor lock-in, making it difficult to migrate the architecture to Azure or Google Cloud.
- **Q**: What is the maximum execution runtime limit for an AWS Lambda function?
  **A**: 15 minutes.
- **Q**: What is a common difficulty when debugging AWS Lambda applications?
  **A**: Logs can be scattered and difficult to trace without a centralized logging solution.