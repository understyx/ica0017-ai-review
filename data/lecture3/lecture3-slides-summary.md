# Lecture 3: Introduction to Cloud Technologies (AWS EC2, Nitro, and Serverless)

**1. Lecture topic**
This lecture introduces fundamental AWS cloud technologies, focusing extensively on Amazon EC2, the shared responsibility model, the AWS Nitro System's architecture for secure virtualization, micro-VMs using Firecracker, and the trade-offs of serverless computing with AWS Lambda.

**2. Executive summary**
The lecture provides a deep dive into AWS compute services and underlying security models. It clarifies the shared responsibility model, strongly distinguishing between security *of* the cloud (managed by AWS) and *in* the cloud (managed by the customer). A major focus is placed on Amazon EC2 and the AWS Nitro System, which offloads virtualization resources to dedicated hardware (Nitro Cards and Security Chip) to enhance security and deliver bare-metal-like performance. The presentation also introduces Firecracker, an open-source virtualization technology for secure micro-VMs. Finally, it outlines the pros and cons of serverless computing with AWS Lambda, emphasizing its varied use cases alongside developmental challenges like vendor lock-in.

**3. Key concepts and definitions**
* **Region:** A geographical area containing at least 2 Availability Zones (AZ).
* **AWS EC2 (Amazon Elastic Compute Cloud):** A web service that provides secure, resizable compute capacity in the cloud.
* **AMI (Amazon Machine Instance):** A pre-configured template used to launch instances on AWS EC2.
* **AWS Nitro System:** An advanced virtualization architecture where resources are offloaded to dedicated hardware and software to minimize the attack surface.
* **Nitro Hypervisor:** A lightweight hypervisor built on a modified, minimized Linux kernel solely responsible for partitioning CPU and memory, assigning virtual functions, and monitoring.
* **Firecracker:** An open-source Virtual Machine Monitor (VMM) using KVM to create secure, multi-tenant container and function-based micro-VMs.
* **AWS Lambda:** A serverless computing service that allows running code without provisioning or managing servers.

**4. Main arguments or theories explained simply**
* **Shared Responsibility Model:** AWS secures the physical infrastructure and hypervisor (security *of* the cloud), but customers must secure their own content, platforms, applications, and network configurations (security *in* the cloud).
* **Evolution of EC2 with Nitro:** By moving tasks like VPC networking, EBS storage, and system control to dedicated Nitro Cards, AWS achieves near bare-metal performance and significantly hardens security by removing the need for a general-purpose OS in the hypervisor.
* **The "Serverless" Trade-off:** While AWS Lambda removes the need to manage servers, it introduces new challenges such as sharing dependencies, vendor lock-in, deployment complexity, and difficult local testing.

**5. Important examples from the lecture**
* **Nitro Cards functionality:** Dedicated cards handle specific tasks like VPC networking, Amazon EBS, and Instance storage, taking the load off the main system CPU.
* **Serverless Use Cases:** AWS Lambda can be used for web applications, real-time file processing, IoT backends, and mobile backends. *(Note: The exact architectural diagrams for these are unclear from transcript as only slide titles are present).*

**6. What the professor emphasized**
* **Security as a top priority:** Heavily emphasized the AWS Nitro System's security features, including the hardware root of trust (Security Chip) and the lockdown security model that prohibits administrative access to eliminate human error.
* **High Availability:** The SLA commitment of 99.99% availability for each EC2 region, utilizing at least 3 availability zones per region.
* **Responsibility:** The customer's absolute responsibility for what they build and configure on top of AWS platforms.

**7. Likely exam-relevant takeaways**
* The strict distinction between security *of* the cloud versus security *in* the cloud.
* The purpose and specific components of the AWS Nitro System (Nitro Hypervisor, Security Chip, Nitro Cards).
* What Firecracker is and its role in micro-VM virtualization (reducing memory and attack surface).
* The core functionalities of AWS EC2 and what an AMI is.
* The main downsides of using serverless architectures (Lambda).

**8. Review questions**
* What is the difference between security *of* the cloud and security *in* the cloud?
* What is the SLA commitment for Amazon EC2 regional availability?
* What are the sole purposes of the Nitro Hypervisor?
* Which specific operational tasks are offloaded to Nitro Cards in the Nitro System?
* What is the function of the Security Chip in the Nitro System?
* What is Firecracker and what is it built for?
* Name three downsides of using serverless architectures like AWS Lambda.

**9. Flashcards**

* **Q:** What does a Region consist of in AWS?
  **A:** A geographical area consisting of at least 2 Availability Zones.
* **Q:** Whose responsibility is "security in the cloud"?
  **A:** The customer's responsibility.
* **Q:** Whose responsibility is "security of the cloud"?
  **A:** AWS's responsibility.
* **Q:** What does EC2 stand for?
  **A:** Amazon Elastic Compute Cloud.
* **Q:** What is an AMI?
  **A:** Amazon Machine Instance.
* **Q:** What is the primary benefit of the AWS Nitro System?
  **A:** Virtualization resources are offloaded to dedicated hardware and software, minimizing the attack surface and providing bare-metal performance.
* **Q:** What subsystem does the Nitro hypervisor use to program hardware virtualization features?
  **A:** The KVM subsystem.
* **Q:** Does the Linux kernel portion of the Nitro hypervisor support networking?
  **A:** No, it has no support for networking of any kind.
* **Q:** What are the operational components handled by Nitro Cards?
  **A:** VPC networking, Amazon EBS, Instance storage, and System controller.
* **Q:** What role does the Security Chip play in the Nitro System?
  **A:** It is integrated into the motherboard, protects hardware resources, and serves as a hardware root of trust.
* **Q:** What is Firecracker?
  **A:** An open-source virtualization technology for creating secure, multi-tenant container and function-based services.
* **Q:** What is AWS Lambda?
  **A:** A service to run code without thinking about managing servers (Serverless computing).
* **Q:** What are two significant downsides of Serverless technology?
  **A:** Vendor lock-in and difficulty in local testing (along with sharing dependencies and deployment complexity).
