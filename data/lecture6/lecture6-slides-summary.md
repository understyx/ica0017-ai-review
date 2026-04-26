# Lecture 6: Introduction to Cloud Technologies - Networking in AWS

## 1. Lecture Topic
This lecture covers the fundamental networking services in AWS, focusing on Virtual Private Cloud (VPC) setup, network security, connectivity options, Load Balancing, and Content Delivery Networks (CDN).

## 2. Executive Summary
The lecture introduces AWS networking by deeply explaining the Virtual Private Cloud (VPC), its components (subnets, route tables, and gateways), and how it isolates cloud resources. It outlines the five key requirements for internet access within a VPC and discusses differences in IPv4 and IPv6 support. Network security is thoroughly addressed by comparing Security Groups (stateful, instance-level) and Network ACLs (stateless, subnet-level). Furthermore, the lecture details connectivity options like AWS VPN and Direct Connect for corporate networks, and distinguishes between Application Load Balancers (ALB) and Network Load Balancers (NLB). It concludes with an overview of CloudFront, AWS's CDN for caching content at edge locations to improve latency and security.

## 3. Key Concepts and Definitions
* **VPC (Virtual Private Cloud):** A logically isolated section of the AWS Cloud where you can control IP ranges, subnets, routing, and firewalls.
* **Subnets:** Subdivisions of a VPC created within specific Availability Zones (AZs).
* **CIDR (Classless Inter-Domain Routing):** A notation used to define IP address ranges (e.g., 172.31.0.0/16).
* **Network ACL (NACL):** A stateless, subnet-level firewall that supports both allow and deny rules and evaluates them in numerical order.
* **Security Group (SG):** A stateful, instance-level firewall that supports only allow rules and evaluates all rules before making a decision.
* **Elastic Load Balancer (ELB):** A single point of contact that distributes traffic across multiple instances. Includes classic ELB, ALB, and NLB.
* **ALB (Application Load Balancer):** A layer 7 load balancer (HTTP/HTTPS) supporting advanced routing, websockets, and lambda functions.
* **NLB (Network Load Balancer):** A layer 4 load balancer (TCP/UDP/TLS) providing extremely high performance and static IP addresses.
* **CloudFront:** AWS's Content Delivery Network (CDN) that caches content at edge locations globally to reduce latency.
* **Edge Location:** Locations where CloudFront caches content, distinct from Availability Zones.

## 4. Main Arguments or Theories Explained Simply
* **VPC Setup Best Practices:** Use private address ranges, avoid overlapping ranges if you plan to connect networks, use at least /24 subnets, and span multiple Availability Zones for high availability.
* **Internet Access Requirements:** A VPC requires five components for internet access: a Public IP, an Internet Gateway, a route to the gateway, an NACL allow rule, and a Security Group allow rule.
* **Security Groups vs. Network ACLs:** Security Groups are flexible, stateful (automatically allowing return traffic) rules applied directly to resources. NACLs act as a broader, stateless subnet boundary, requiring explicit rules for both incoming and outgoing traffic. They work together for defense-in-depth.
* **Load Balancer Evolution:** While classic ELB supports basic L4/L7 routing, newer ALB and NLB offer specialized capabilities like routing to IP addresses, specific L7 features (ALB), or ultra-fast, static-IP L4 routing (NLB).

## 5. Important Examples from the Lecture
* **CIDR Notation Examples:** Explaining ranges like 172.31.0.0/16 for VPCs and 172.31.0.0/24 for subnets across multiple Availability Zones (eu-west-1a, eu-west-1b).
* **IPv6 Setup Example:** Showing dual-stack VPCs combining IPv4 with fixed-size IPv6 blocks (/56 for VPC, /64 for subnets).
* **Security Group Rules Example:** Specifying a Protocol (e.g., 6 for TCP, 17 for UDP), Port Range (e.g., 22, 7000-8000), and source/destination ranges.

## 6. What the Professor Emphasized
* The 5 specific things required for internet access in a VPC.
* The stark architectural and functional differences between Security Groups and Network ACLs.
* Following the principle of least privilege when configuring security rules.
* The specific use cases and layer differences between Application Load Balancers (Layer 7) and Network Load Balancers (Layer 4).
* Edge Locations for CloudFront are not the same as Availability Zones.

## 7. Likely Exam-Relevant Takeaways
* Know the 5 requirements for an instance to access the internet.
* Be able to compare and contrast Security Groups (stateful, allow-only, instance-level) and Network ACLs (stateless, allow/deny, subnet-level).
* Understand how to divide a VPC (/16) into smaller subnets (/24) across different AZs.
* Know the difference between ALB (Layer 7, HTTP/2, websockets) and NLB (Layer 4, TCP/UDP, high performance, static IPs).
* Recognize that Edge Locations cache CloudFront data for lower latency.

## 8. Review Questions
1. What are the 5 things required for a resource in a VPC to access the internet?
2. What is the difference in how state is handled between Security Groups and Network ACLs?
3. Can a Security Group contain a "deny" rule?
4. At what level do Network ACLs operate compared to Security Groups?
5. Which load balancer operates exclusively at Layer 7 and supports websockets?
6. Which load balancer provides a static IP address and operates at Layer 4?
7. What is the difference between an Availability Zone and a CloudFront Edge Location?
8. What is the recommended minimum subnet size mentioned in the lecture?

## 9. Flashcards

**Q: What is a VPC?**
A: Virtual Private Cloud - a logically isolated section of the AWS Cloud where you control IP ranges, subnets, and routing.

**Q: What are the 5 requirements for internet access in a VPC?**
A: Public IP, Internet Gateway, route to gateway, NACL allow rule, and Security Group allow rule.

**Q: What is the recommended VPC CIDR block size?**
A: /16 (65,536 addresses).

**Q: What is the recommended subnet CIDR block size?**
A: At least /24 (254 addresses).

**Q: At what level does a Security Group operate?**
A: The instance level.

**Q: At what level does a Network ACL operate?**
A: The subnet level.

**Q: Are Security Groups stateful or stateless?**
A: Stateful (return traffic is automatically allowed).

**Q: Are Network ACLs stateful or stateless?**
A: Stateless (return traffic must be explicitly allowed).

**Q: Can you create 'deny' rules in a Security Group?**
A: No, Security Groups support 'allow' rules only.

**Q: Can you create 'deny' rules in a Network ACL?**
A: Yes, Network ACLs support both allow and deny rules.

**Q: What OSI layer does an Application Load Balancer (ALB) operate on?**
A: Layer 7 (HTTP/HTTPS).

**Q: What OSI layer does a Network Load Balancer (NLB) operate on?**
A: Layer 4 (TCP/UDP).

**Q: Which load balancer type can be assigned an Elastic IP (Static IP)?**
A: Network Load Balancer (NLB).

**Q: Which load balancer is best for HTTP/2, websockets, and Lambda functions?**
A: Application Load Balancer (ALB).

**Q: What is AWS CloudFront?**
A: A Content Delivery Network (CDN) that caches content at Edge Locations.

**Q: Is an Edge Location the same as an Availability Zone?**
A: No, Edge Locations are separate global caching nodes used by CloudFront.
