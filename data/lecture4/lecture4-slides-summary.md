# Lecture 4: AWS Identity and Access Management (IAM) and Governance

## Lecture Topic
This lecture introduces AWS Identity and Access Management (IAM) concepts, focusing on how to securely manage user access, authentication, authorization, and overall governance using AWS Organizations and Landing Zones.

## Executive Summary
AWS Identity and Access Management (IAM) is a universal service used to centrally manage users and their permissions across AWS. The service utilizes four core concepts: Users, Groups, Roles, and Policies to provide granular access control. For enhanced security, authentication requires credentials such as Multi-Factor Authentication (MFA), and authorization determines what authenticated identities can perform based on JSON-formatted policies. To manage environments at scale, AWS Organizations and Landing Zones allow for consolidated billing, multi-account management, and the implementation of guardrails via Service Control Policies. Together, these tools enable the secure and structured deployment of cloud infrastructure while minimizing security risks and administrative overhead.

## Key Concepts and Definitions
* **IAM (Identity and Access Management):** A universal AWS web service that enables centralized management of users and their permissions.
* **Authentication:** The process of verifying a principal's identity (e.g., via passwords, access keys, or MFA).
* **Authorization:** The process of determining if an authenticated entity is allowed to complete a requested action based on policies.
* **IAM User:** An entity representing a person or service with a unique set of credentials interacting with AWS.
* **Root Account:** The original account created when setting up AWS, possessing complete and unrestricted access to all resources.
* **IAM Group:** A collection of IAM users that allows for centralized and inheritable permission management.
* **IAM Policy:** JSON documents that explicitly describe the permissions granted or denied to users, groups, or roles.
* **IAM Role:** An identity with specific permission policies that can be assumed dynamically using temporary security tokens instead of long-term credentials.
* **AWS Organizations:** An account management service that enables consolidating multiple AWS accounts for centralized policy management and consolidated billing.
* **Organizational Unit (OU):** A grouping of AWS accounts used to apply service control policies and user permission grouping.
* **Landing Zone:** A scalable, secure, and well-architected multi-account AWS environment used as a starting point for deployments.
* **Control Tower:** A service that automates the setup of a new landing zone using best practices and blueprints.
* **Service Control Policies (SCPs):** Organizational policies that control which AWS service APIs are accessible by whitelisting or blacklisting them.
* **Guardrails:** High-level governance rules that can be preventive (implemented via SCPs) or detective (implemented via AWS Config Rules).

## Main Arguments or Theories Explained Simply
* **Principle of Least Privilege and Best Practices:** New IAM users start with zero permissions. Permissions should only be granted as needed. Crucially, the root account should never be used for everyday tasks, and individual accounts/credentials should never be shared.
* **Policy Management via Groups and Roles:** Instead of attaching policies directly to individual users (which is hard to maintain), users should be placed in groups. Roles and groups should have policies attached to simplify administration and reduce the blast radius if an account is compromised.
* **Temporary Access via Roles:** Instead of sharing access keys or storing long-term credentials, entities (users, external identities, or AWS services like EC2) should assume IAM Roles, which issue temporary, short-lived tokens.
* **Conway's Law in AWS:** The design of AWS systems, particularly multi-account structures and AWS Organizations, naturally mirrors the communication structures and administrative boundaries of the corporate organizations that build them.

## Important Examples from the Lecture
* **Two-Factor Authentication (2FA) Methods:** Using SMS, Time-based One-time Passwords (TOTP) like Google Authenticator or Authy, push notifications, and Universal 2nd Factor (U2F) hardware keys like YubiKey. Native AWS 2FA uses TOTP.
* **Policy Structure:** An example JSON policy was shown granting an "Allow" effect for the "s3:GetObject" action on a specific resource ("arn:aws:s3:::eeitkbucket").
* **Role Assumption:** A user with no permissions can authenticate and then assume an administrative role to perform actions like stopping an EC2 instance.
* **Guardrails Examples:** Disallowing the creation of access keys for the root user, disallowing internet connection through RDP, and preventing public write access to S3 buckets.

## What the Professor Emphasized
* **Do not use the Root Account:** The root user has unrestricted access and should only be used for the initial setup. Create an IAM user for daily tasks.
* **Do not share accounts:** Everyone should have an individual IAM user account.
* **Attach Policies to Groups/Roles, not Users:** While attaching policies directly to users is possible, best practice dictates managing permissions at the group or role level.
* **IAM is Universal:** IAM does not require region selection; users and groups are created globally.

## Likely Exam-Relevant Takeaways
* Know the distinct functions of the four core IAM concepts: Users, Groups, Roles, and Policies.
* Understand the difference between Authentication (who you are) and Authorization (what you are allowed to do).
* Be able to explain why the root account should be avoided for daily tasks and the importance of MFA/2FA.
* Understand the purpose of IAM Roles (temporary, dynamically provided credentials) versus IAM Users (permanent credentials).
* Know what AWS Organizations, OUs, and Service Control Policies (SCPs) do in the context of multi-account management.
* Differentiate between preventive guardrails (SCPs) and detective guardrails (AWS Config Rules).

## Review Questions
1. What are the four core control concepts used in AWS IAM?
2. What is the difference between Authentication and Authorization in AWS?
3. Why should the AWS root account not be used for everyday access?
4. What is an IAM Role, and how does it differ from an IAM User?
5. Why is it recommended to assign policies to groups rather than individual users?
6. What is the format used to write IAM Policies?
7. What are the benefits of using AWS Organizations?
8. What is an AWS Landing Zone?
9. What are Service Control Policies (SCPs) used for?
10. What is the difference between preventive and detective guardrails?

## Flashcards
**Q: What does IAM stand for?**
A: Identity and Access Management.

**Q: Is IAM a regional or universal service?**
A: IAM is universal and does not require region selection.

**Q: What are the four main components of IAM?**
A: Users, Groups, Policies, and Roles.

**Q: What is the AWS root account?**
A: The identity created when an AWS account is first set up, granting complete and unrestricted access to all resources.

**Q: What is best practice regarding the root account?**
A: Do not use it for everyday access and never share its credentials.

**Q: What is a key benefit of an IAM Group?**
A: It reduces the complexity of access management by allowing permissions to be updated for multiple users centrally.

**Q: What format are IAM Policies written in?**
A: JSON (JavaScript Object Notation).

**Q: What happens if there is an explicit "Deny" in an IAM Policy?**
A: An explicit deny overrides any allows.

**Q: What is an IAM Role?**
A: An identity with permission policies that provides temporary access keys dynamically, without long-term credentials.

**Q: How do AWS services like EC2 typically securely access other AWS services like databases?**
A: By assuming an IAM Role.

**Q: What is 2FA/MFA?**
A: Multi-Factor Authentication, which requires two or more authentication factors (knowledge, possession, inherence).

**Q: What 2FA protocol does AWS natively use?**
A: Time-based One-time Passwords (TOTP).

**Q: What is AWS Organizations?**
A: An account management service that consolidates multiple AWS accounts for centralized management and billing.

**Q: What is an Organizational Unit (OU) in AWS?**
A: A grouping of AWS accounts used to apply service control policies.

**Q: What is an AWS Landing Zone?**
A: A secure, multi-account AWS environment used as a starting point to deploy workloads.

**Q: What does AWS Control Tower do?**
A: It automates the setup of a new Landing Zone using best practices and blueprints.

**Q: What are Service Control Policies (SCPs)?**
A: Policies used in AWS Organizations to whitelist or blacklist AWS service APIs for child accounts.

**Q: What is a preventive guardrail in AWS Control Tower?**
A: High-level governance rules that prevent actions, implemented using Service Control Policies (SCPs).

**Q: Should you attach IAM policies directly to users?**
A: No, best practice is to put users in groups and assign policies to the groups or roles.

**Q: How does AWS handle cross-account access?**
A: Through the mechanism of role assumption using temporary tokens.