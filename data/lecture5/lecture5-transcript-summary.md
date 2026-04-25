Lecture topic: AWS Storage and Database Services

Core concepts:
- Overview of AWS storage types: Object, Block, and File storage.
- Amazon S3 for highly scalable, durable object storage.
- Amazon EBS for block storage attached to EC2 instances.
- Amazon EFS for shared file storage across multiple EC2 instances.
- Managed relational databases with Amazon RDS.
- High availability configurations in databases (Multi-AZ vs. Read Replicas).

Key definitions:
- Amazon S3 (Simple Storage Service): Object storage service accessed via web/API, ideal for media, backups, and static websites. Features 99.999999999% (11 9s) durability.
- S3 Glacier: A low-cost S3 storage class designed specifically for long-term data archival where immediate retrieval is not required.
- Amazon EBS (Elastic Block Store): Block-level storage volumes acting as virtual hard drives attached directly to a single EC2 instance.
- Amazon EFS (Elastic File System): A managed network file system (NFS) that can be mounted to hundreds of Linux EC2 instances simultaneously and scales automatically.
- Amazon RDS (Relational Database Service): A managed relational database service that handles maintenance, backups, and patching (supports engines like MySQL, PostgreSQL).
- RDS Multi-AZ: Synchronous database replication across Availability Zones for disaster recovery and high availability.
- RDS Read Replicas: Asynchronous database replication used to scale out read-heavy database workloads.

Important examples:
- Storing a large 5GB video file or static website assets in S3.
- Attaching an EBS volume to an EC2 instance to serve as its root boot drive.
- Sharing a common configuration directory across a fleet of EC2 web servers using EFS.
- Archiving compliance logs for 5 years using S3 Glacier to minimize storage costs.

Likely exam points:
- The fundamental differences between S3 (Object), EBS (Block), and EFS (File).
- The constraint that an EBS volume must reside in the same Availability Zone (AZ) as its attached EC2 instance.
- Knowing S3's "11 9s" durability guarantee.
- Understanding the difference in use cases between RDS Multi-AZ (Disaster Recovery) and Read Replicas (Performance Scaling).

Questions to review:
1. What are the key differences between Amazon S3, EBS, and EFS regarding access patterns and attachments?
2. Which AWS storage service is most appropriate for long-term data archival, and why?
3. How does RDS Multi-AZ differ functionally from RDS Read Replicas?

5-sentence plain-English recap:
This lecture breaks down the core storage and database options available in AWS, categorizing them by use case. It introduces Amazon S3 as the go-to object storage for files accessed over the web, renowned for its extreme durability. For servers needing traditional hard drives, the lecture covers Amazon EBS (single-instance block storage) and Amazon EFS (multi-instance shared file storage). Furthermore, it explores Amazon RDS, a managed service that simplifies running relational databases by automating administrative tasks. Crucially, the lecture highlights how to architect these databases for both high availability (using Multi-AZ deployments) and performance scaling (using Read Replicas).