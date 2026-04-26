# Lecture 4: AWS Identity and Access Management (IAM) and AWS Organizations

## 1. Lecture topic in 1 sentence
This lecture explores the complexity of managing identities, access, and permissions securely in cloud environments, focusing on AWS IAM for accounts/roles and AWS Organizations for governing multi-account structures in large enterprises.

## 2. Executive summary
The professor introduces AWS Identity and Access Management (IAM) as the foundational service for controlling access to AWS resources. The lecture emphasizes the critical security practice of avoiding everyday use of the root account and strongly recommends enforcing Multi-Factor Authentication (MFA). It explains the relationships between IAM Users, Groups, Policies, and Roles, highlighting the best practice of assigning permissions to groups rather than individual users. Finally, the lecture scales up these concepts by discussing Conway’s Law and the necessity of AWS Organizations and Landing Zones to manage complex, multi-account corporate environments securely.

## 3. Key concepts and definitions
*   **Root Account:** The initial identity created when an AWS account is set up, possessing unrestricted access to all resources.
*   **IAM (Identity and Access Management):** The web service used to securely control access to AWS services and resources.
*   **IAM User:** An entity representing a person or service (machine account) that needs to interact with AWS. By default, new users have no permissions.
*   **IAM Group:** A collection of IAM Users. Groups simplify administration by allowing policies to be applied centrally to all members.
*   **IAM Role:** An assumable identity with specific permissions, often granted to services (like EC2 instances) or users temporarily, rather than having long-term credentials.
*   **IAM Policy:** A structured set of rules (written in JSON) defining explicitly what actions are allowed or denied on specific resources under certain conditions.
*   **MFA (Multi-Factor Authentication):** A security mechanism requiring an additional verification step (like a TOTP app or physical key) beyond a password.
*   **Access Keys:** Long-term credentials used for programmatic (API/CLI) access instead of a username and password.
*   **AWS Organizations:** An account management service that enables the central consolidation, governance, and billing of multiple AWS accounts.
*   **Conway's Law:** An adage stating that organizations design systems that mirror their own communication structures.
*   **Landing Zone:** A well-architected, multi-account AWS environment configured automatically with security, logging, and networking best practices.

## 4. Main arguments or theories explained simply
*   **Never Use the Root Account for Daily Tasks:** The root account is too powerful. A compromised root account (especially without MFA) can lead to complete data destruction or massive financial loss. Instead, create an administrative IAM user for daily tasks.
*   **Apply Policies to Groups, Not Users:** Managing permissions at the individual user level quickly becomes unmanageable and error-prone as employees join, leave, or change roles. Assigning permissions to functional groups (e.g., "Support", "Developers") automates access management safely.
*   **Default Deny:** In IAM, everything is denied by default. Permissions must be explicitly granted. An explicit deny in a policy will always override any allow.
*   **Complexity Requires Multi-Account Strategies:** As an organization grows, a single AWS account becomes a liability for billing, security, and access isolation. Managing this requires moving to a multi-account structure managed via AWS Organizations and Landing Zones.

## 5. Important examples from the lecture
*   **Ubiquiti Breach:** The lecturer cited a real-world example (Ubiquiti) where attackers compromised a root account because credentials were leaked, resulting in data theft and highlighting the danger of poorly secured high-privilege accounts.
*   **Role Transitions:** If an employee moves from "Support" to "Development," having permissions attached to groups means the administrator simply moves the user to the new group, instantly revoking old access and granting new access without manual policy auditing.
*   **Billing Isolation:** A company might use AWS Organizations to give each department its own sub-account. This prevents departments from interfering with each other's infrastructure while allowing the company to easily track exactly how much each department spends.
*   **Centralized Logging in Landing Zones:** In a Landing Zone setup, all activity logs from all sub-accounts are automatically sent to a separate, highly restricted "Log Archive" account. This prevents a malicious actor from compromising an application account and deleting the logs to cover their tracks.

## 6. What the professor emphasized
*   **MFA is Mandatory:** Securing accounts (especially root accounts and high-privilege IAM users) with Multi-Factor Authentication is non-negotiable in cloud environments.
*   **Granularity of Policies:** The lecturer emphasized that IAM policies can be incredibly detailed, restricting access based on specific resources (like a single S3 bucket) or conditions.
*   **The Danger of Passwords:** The lecturer expressed that passwords are an outdated security measure ("last century") and highlighted the industry shift towards Universal 2nd Factor (U2F) and passwordless authentication.

## 7. Likely exam-relevant takeaways
*   The difference between a Root account, an IAM User, and an IAM Role.
*   The best practice of attaching IAM Policies to Groups rather than directly to Users.
*   The concept that IAM policies are default-deny, meaning rights must be explicitly allowed.
*   The fundamental differences between managing a single AWS account vs. using AWS Organizations for multiple accounts.

## 8. Review questions based only on the transcript
1.  Why is it considered a bad practice to use the AWS Root Account for daily operations?
2.  What happens to the permissions of a newly created IAM user by default?
3.  Why should IAM Policies be attached to Groups instead of individual IAM Users?
4.  What is the purpose of Multi-Factor Authentication (MFA) in the context of cloud security?
5.  How do Access Keys differ from a standard username and password?
6.  According to Conway's Law, what do IT systems typically mirror?
7.  What are two primary reasons a large company might use AWS Organizations instead of a single AWS account?
8.  In a Landing Zone architecture, why are logs often sent to a completely separate, restricted account?

## 9. Flashcards

*   **Q: What is the AWS Root Account?**
    *   **A:** The master account created upon signup, possessing unrestricted, absolute access to all AWS resources.
*   **Q: What is an IAM User?**
    *   **A:** An identity representing a person or service interacting with AWS, which by default has zero permissions.
*   **Q: What is an IAM Group?**
    *   **A:** A collection of IAM Users used to apply policies centrally based on job functions or roles.
*   **Q: What is an IAM Role?**
    *   **A:** An identity that can be temporarily assumed by users or services (like EC2) to gain specific permissions, without using long-term credentials.
*   **Q: What is an IAM Policy?**
    *   **A:** A JSON document that explicitly defines what actions are allowed or denied on specific AWS resources.
*   **Q: What is the recommended best practice for assigning IAM Policies?**
    *   **A:** Attach policies to IAM Groups or Roles, rather than directly to individual IAM Users.
*   **Q: What is MFA and why is it crucial?**
    *   **A:** Multi-Factor Authentication; it adds a second verification step (like a code from a phone) to protect accounts even if passwords are compromised.
*   **Q: What are Access Keys used for?**
    *   **A:** Authenticating programmatic access via the AWS CLI or APIs, rather than using a web console password.
*   **Q: What is AWS Organizations used for?**
    *   **A:** Centrally governing, managing policies, and consolidating billing across multiple AWS accounts in an enterprise.
*   **Q: What does Conway's Law state?**
    *   **A:** Organizations design systems that copy their internal communication structures.
*   **Q: What is a Landing Zone?**
    *   **A:** A pre-configured, well-architected multi-account AWS environment that automatically implements security, logging, and networking best practices.
*   **Q: In IAM, what happens if there is an explicit Deny in a policy?**
    *   **A:** An explicit Deny always overrides any explicit Allow permissions.