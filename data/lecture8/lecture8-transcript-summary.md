# Lecture 8 Summary: Automation, Cost Optimization, and Final Exam

**1. Lecture topic in 1 sentence**
The final lecture provides a course overview, delves into cloud automation principles (including Infrastructure as Code and the "pets vs. cattle" analogy), discusses cost optimization tools, and details the procedures for the upcoming final exam.

**2. Executive summary**
The professor wraps up the course with an overview of cloud technologies and introduces the core concepts of cloud automation. A significant part of the lecture focuses on Infrastructure as Code (IaC) and the necessity of shifting from manual infrastructure management to automated, version-controlled provisioning using tools like Terraform. The concept of "Pets vs. Cattle" is explored to illustrate modern infrastructure management, where servers are treated as disposable and easily replaceable ("cattle") rather than unique entities requiring manual upkeep ("pets"). The lecture also covers cost optimization in the cloud, mentioning tools like AWS Cost Explorer, Trusted Advisor, and Budgets. Finally, extensive details are provided about the final exam, including the format (60 randomized multiple-choice questions), times, and options to take it either in a classroom or at home using invasive proctoring software.

**3. Key concepts and definitions**
*   **Infrastructure as Code (IaC) / Infrastruktuur kui kood:** The practice of managing and provisioning computing infrastructure through machine-readable definition files (code), rather than manual configuration. This allows for version control and repeatability.
*   **Terraform:** An open-source, industry-standard IaC tool mentioned as a universal alternative to vendor-specific tools (like AWS CloudFormation), allowing infrastructure to be described as code.
*   **Pets vs. Cattle (Koduloomad vs. Kariloomad):** A fundamental analogy in cloud automation. "Pets" are manually configured, uniquely named servers that are nursed back to health if they fail. "Cattle" are automated, identical servers that are simply replaced when they fail.
*   **Cost Explorer / Budgets / Trusted Advisor:** Mentioned as a triad of tools for managing cloud expenses, allowing users to track costs, set alerts, and receive optimization recommendations.
*   **Proctored Exam (Prokteeritud eksam):** An exam taken remotely using a Google Chrome plugin that locks down the browser, records audio/video, and uses AI to monitor eye movements and behavior for cheating.

**4. Main arguments or theories explained simply**
*   **Why automate?** Automation in the cloud is essential not just for convenience, but for cost efficiency, reducing human error, and ensuring that environments can be consistently reproduced.
*   **The shift to "Cattle" infrastructure:** The traditional way of treating servers as "pets" (naming them, manually patching them, treating them as irreplaceable) is inefficient and risky in the cloud. Modern cloud infrastructure should treat servers as "cattle" (numbered, identical, easily replaceable via automated scripts).
*   **Vendor Lock-in vs. Universal Tools:** While vendor-specific tools provide tight integration within a single ecosystem (e.g., AWS), learning universal tools like Terraform provides flexibility across different cloud providers, reducing vendor lock-in.

**5. Important examples from the lecture**
*   **Pets vs. Cattle example:** A manual server where you log in to install updates and "stroke" it is a pet. If it gets sick, you take it to the "vet." Cattle are like a herd of cows; they are anonymous and if one gets sick, it is replaced immediately using automated provisioning.
*   **Proctoring software behavior:** The professor shared an example of a student who was caught cheating by the proctoring AI because their eye movements followed a specific, repetitive pattern indicating they were looking at a hidden phone.

**6. What the professor emphasized**
*   **Exam Logistics:** The professor strongly emphasized that all labs must be completed to access the final exam. He also emphasized that the exam is designed to be straightforward and check basic knowledge, not to trick students with double negatives or overly complex wording.
*   **Choice of Exam Format:** He stressed that students have the choice between taking the exam in a classroom or remotely with proctoring software, acknowledging that many find the proctoring software invasive. Interestingly, he noted historically proctored exams have yielded slightly lower results.
*   **Terraform as an Industry Standard:** The professor emphasized Terraform as a highly relevant and practical tool to learn because it is an open-source industry standard that works across multiple cloud providers.

**7. Likely exam-relevant takeaways**
*   Understand the "Pets vs. Cattle" analogy and be able to distinguish between the two approaches to infrastructure management.
*   Know the core concept of Infrastructure as Code (IaC) and its benefits (repeatability, version control).
*   Be aware of Terraform as a cross-platform IaC tool.
*   Understand basic cost optimization tools and concepts in the cloud (Cost Explorer, Budgets).
*   Recall the services mentioned from previous lectures as part of the course review (e.g., CloudTrail for auditing, CloudWatch for monitoring).

**8. 5-10 review questions based only on the transcript**
1. What is the difference between treating servers as "pets" versus "cattle"?
2. What is Infrastructure as Code (IaC)?
3. Why did the professor suggest learning Terraform over vendor-specific tools?
4. What happens to a "cattle" server if it experiences a failure?
5. What are the prerequisites for being allowed to take the final exam?
6. How many questions will be on the final exam and how are they selected?
7. What are the two main ways a student can choose to take the final exam?
8. What does the proctoring software monitor during the remote exam?

**9. 5-20 flashcards in Q/A format**
*   **Q:** What does the "Pets" analogy refer to in cloud computing?
    **A:** Servers that are manually managed, given unique names, and individually repaired when they fail.
*   **Q:** What does the "Cattle" analogy refer to in cloud computing?
    **A:** Servers that are automated, identical, and replaced entirely rather than repaired when they fail.
*   **Q:** What is Infrastructure as Code (IaC)?
    **A:** Managing and provisioning infrastructure through machine-readable definition files rather than manual configuration.
*   **Q:** What is Terraform?
    **A:** An open-source, industry-standard tool used for Infrastructure as Code across multiple cloud providers.
*   **Q:** What is the prerequisite for taking the final exam?
    **A:** All practical labs must be completed.
*   **Q:** How many questions are on the final exam?
    **A:** Approximately 60 questions.
*   **Q:** How are exam questions chosen for each student?
    **A:** They are randomly generated from a larger question bank.
*   **Q:** What are the formats of the final exam questions?
    **A:** All questions are multiple-choice.
*   **Q:** What does the proctoring plugin do during the remote exam?
    **A:** It locks the browser, records audio and video, and uses AI to track eye movement and behavior.
*   **Q:** What cloud auditing service was briefly reviewed in the lecture?
    **A:** CloudTrail.
*   **Q:** What cloud monitoring service was briefly reviewed in the lecture?
    **A:** CloudWatch.
