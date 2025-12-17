import type { Pillar, ContactData, SystemStatus, Insight } from '../types';

export type { ContactData, SystemStatus, Insight };

// --- CACHE LAYER ---
let cache: {
  pillars: Pillar[] | null;
  status: SystemStatus | null;
  insights: Insight[] | null;
  employees: any[] | null;
  partners: any[] | null;
  photos: any[] | null;
} = {
  pillars: null,
  status: null,
  insights: null,
  employees: null,
  partners: null,
  photos: null
};

// Fallback data ensures the frontend works even if the backend isn't running
export const FALLBACK_PILLARS: Pillar[] = [
  {
    title: "Cybersecurity Services",
    subtitle: "Proactive Vulnerability Discovery & Defense",
    description: "Comprehensive security solutions ranging from managed operations (SOC/MDR) to strategic governance and specialized assessments.",
    color: "from-red-600/20 to-orange-500/5",
    iconName: "ShieldAlert",
    services: [
      "SOC-as-a-service", "EDR-as-a-service", "MDR-as-a-service", "XDR-as-a-service",
      "MFA-as-a-service", "MDM-as-a-service", "Vulnerability Assessment", "Dark web monitoring",
      "Patch Management", "Expertise-as-a-service", "Email Security-as-a-service", "SASE-as-a-service",
      "Managed Next Gen Firewalls", "Penetration Testing-as-a-service", "Phishing Campaign & Training",
      "Digital Forensics", "DLP-as-a-service", "Managed Security Service Provider", "Security Incident Support", "Strategy & GRC"
    ],
    details: [
      {
        name: "SOC-as-a-service",
        description: "A subscription-based model where a third-party provider manages and monitors your organization's cybersecurity 24/7.",
        fullDescription: [
          "SOC-as-a-Service (SOCaaS) is a subscription-based model where a third-party provider manages and monitors your organization's cybersecurity 24/7. It grants you immediate access to a team of security experts and advanced tools to detect, analyze, and respond to threats, eliminating the high cost and complexity of building an in-house operations center."
        ],
        features: ["24/7 Monitoring", "Threat Detection & Analysis", "Incident Response", "Access to Security Experts", "Advanced Toolset Access"],
        benefits: ["Eliminate high capital costs", "Immediate access to expertise", "Continuous protection"],
        diagramUrl: "https://images.unsplash.com/photo-1558494949-ef526b0042a0?auto=format&fit=crop&q=80&w=1200"
      },
      {
        name: "EDR-as-a-service",
        description: "An outsourced solution where a provider deploys and manages technology to continuously monitor your endpoints for cyber threats.",
        fullDescription: [
          "EDR-as-a-Service (often called Managed EDR) is an outsourced solution where a provider deploys and manages technology to continuously monitor your endpoints (laptops, servers, mobile devices) for cyber threats.",
          "Unlike traditional antivirus, this service focuses on detecting and stopping advanced attacks (like ransomware) in real-time by analyzing device behavior, while the provider's team handles the complex work of alert analysis, threat hunting, and incident response."
        ],
        features: ["Continuous Endpoint Monitoring", "Real-time Behavior Analysis", "Ransomware Detection", "Threat Hunting", "Alert Analysis"],
        benefits: ["Stops advanced attacks", "Covers laptops, servers, and mobile", "Reduces internal workload"]
      },
      {
        name: "MDR-as-a-service",
        description: "Turnkey security solution where experts actively hunt for, investigate, and respond to threats 24/7.",
        fullDescription: [
          "MDR-as-a-Service (Managed Detection and Response) is a turnkey security solution where an external team of experts uses advanced analytics to actively hunt for, investigate, and—crucially—respond to threats across your environment 24/7.",
          "Unlike simple monitoring services that just send alerts, MDR providers take ownership of the incident, remotely taking actions to contain and neutralize attacks (like isolating an infected computer) so your internal team doesn't have to."
        ],
        features: ["Active Threat Hunting", "24/7 Investigation", "Active Response & Containment", "Remote Neutralization", "Incident Ownership"],
        benefits: ["Action-oriented defense", "Reduces mean time to respond", "Relieves internal team burden"]
      },
      {
        name: "XDR-as-a-service",
        description: "Comprehensive solution integrating data from endpoints, networks, email, and cloud into a single, unified view.",
        fullDescription: [
          "XDR-as-a-Service (Extended Detection and Response) is a comprehensive, outsourced security solution that integrates data from all security layers—endpoints, networks, email, and cloud workloads—into a single, unified view.",
          "By correlating data across these traditionally silenced areas, the provider can detect sophisticated, multi-vector attacks that isolated tools might miss, enabling faster, automated responses across your entire digital environment."
        ],
        features: ["Multi-layer Data Integration", "Unified Security View", "Cross-vector Correlation", "Automated Response", "Sophisticated Attack Detection"],
        benefits: ["Holistic visibility", "Detects complex threats", "Faster automated response"]
      },
      {
        name: "MFA-as-a-service",
        description: "Cloud-based solution facilitating secure, multi-step login processes without complex infrastructure.",
        fullDescription: [
          "MFA-as-a-Service is a cloud-based solution that allows organizations to easily implement secure, multi-step login processes (such as push notifications, biometrics, or hardware tokens) without building or maintaining the complex backend infrastructure.",
          "It instantly enhances security by requiring users to provide multiple forms of verification, while the provider handles the heavy lifting of integration, token management, and compliance across all your applications."
        ],
        features: ["Push Notifications", "Biometrics Support", "Hardware Token Support", "Backend Infrastructure Management", "Compliance Management"],
        benefits: ["Instantly enhances security", "Simplifies integration", "Reduces infrastructure overhead"]
      },
      {
        name: "MDM-as-a-service",
        description: "Cloud-based solution for centrally securing, monitoring, and managing mobile devices across an enterprise.",
        fullDescription: [
          "MDM-as-a-Service (Mobile Device Management) is a cloud-based solution that allows IT teams to centrally secure, monitor, and manage mobile devices (smartphones, tablets, and laptops) across an enterprise.",
          "It enables administrators to remotely enforce security policies (like passcode requirements), push applications, and wipe corporate data from lost or stolen devices, ensuring security for both company-owned and personal (BYOD) devices without on-premise hardware."
        ],
        features: ["Centralized Device Management", "Remote Policy Enforcement", "Remote Wipe", "Application Deployment", "BYOD Support"],
        benefits: ["Secures mobile workforce", "Protects corporate data on lost devices", "No on-premise hardware needed"]
      },
      {
        name: "Vulnerability Assessment",
        description: "Systematic review of IT infrastructure to identify, classify, and prioritize known security weaknesses.",
        fullDescription: [
          "Vulnerability Assessment is a systematic review of your IT infrastructure (networks, systems, and applications) to identify, classify, and prioritize known security weaknesses.",
          "Using automated scanning tools, it provides a 'health check' report that highlights specific flaws—such as unpatched software or misconfigurations—allowing your team to fix these gaps before attackers can exploit them."
        ],
        features: ["Automated Scanning", "Infrastructure Review", "Flaw Classification", "Prioritized Reporting", "Misconfiguration Detection"],
        benefits: ["Proactive flaw identification", "Prevents exploitation", "Prioritizes remediation efforts"]
      },
      {
        name: "Dark Web Monitoring",
        description: "Proactive surveillance service continuously scanning hidden internet forums for stolen credentials and data.",
        fullDescription: [
          "Dark Web Monitoring is a proactive surveillance service that continuously scans hidden internet forums, marketplaces, and data dump sites for your organization’s stolen credentials, sensitive data, or intellectual property.",
          "It acts as an early warning system, alerting you the moment your compromised information appears for sale or trade so you can reset passwords and close gaps before attackers use them."
        ],
        features: ["Continuous Scanning", "Forum & Marketplace Surveillance", "Stolen Credential Detection", "Early Warning System", "Intellectual Property Monitoring"],
        benefits: ["Early breach detection", "Prevents account takeover", "Protects sensitive data"]
      },
      {
        name: "Patch Management",
        description: "Strategic process of identifying, acquiring, testing, and installing software updates across your network.",
        fullDescription: [
          "Patch Management is the strategic process of identifying, acquiring, testing, and installing software updates (patches) across your network's computers and servers.",
          "It ensures your systems remain secure and compliant by systematically fixing security vulnerabilities and software bugs as soon as updates are released, preventing attackers from exploiting known weaknesses."
        ],
        features: ["Update Identification", "Patch Testing", "Systematic Installation", "Compliance Maintenance", "Vulnerability Fixing"],
        benefits: ["Prevents exploitation of known bugs", "Maintains system security", "Ensures compliance"]
      },
      {
        name: "Expertise-as-a-service",
        description: "On-demand access to high-level subject matter experts and specialized human knowledge.",
        fullDescription: [
          "Expertise-as-a-Service (EaaS) is a delivery model that provides on-demand access to high-level subject matter experts and specialized human knowledge via a subscription or digital platform.",
          "It enables organizations to plug critical skill gaps—such as fractional executive leadership or niche technical consulting—rapidly and cost-effectively, without the overhead and long-term commitment of hiring full-time employees."
        ],
        features: ["On-demand Expert Access", "Fractional Leadership", "Niche Technical Consulting", "Subscription Model", "Skill Gap Filling"],
        benefits: ["Cost-effective expertise", "Rapid deployment of skills", "No long-term hiring commitment"]
      },
      {
        name: "Email Security-as-a-service",
        description: "Cloud-based filtering solution intercepting email traffic to block threats before they reach your server.",
        fullDescription: [
          "Email Security-as-a-Service is a cloud-based filtering solution that intercepts and inspects all incoming and outgoing email traffic before it ever reaches your internal mail server.",
          "It acts as a digital checkpoint, using advanced threat intelligence to block phishing attempts, malware, spam, and malicious attachments in real-time, ensuring that only safe, clean communications enter your employee's inboxes."
        ],
        features: ["Inbound/Outbound Inspection", "Phishing Blocking", "Malware & Spam Filtering", "Real-time Threat Intelligence", "Digital Checkpoint"],
        benefits: ["Clean communications", "Prevents email-borne attacks", "Protects internal servers"]
      },
      {
        name: "SASE-as-a-service",
        description: "Cloud-native model bundling network connectivity and comprehensive security into a unified global service.",
        fullDescription: [
          "SASE-as-a-Service (Secure Access Service Edge) is a cloud-native model that bundles network connectivity (like SD-WAN) and comprehensive security (like firewalls and zero-trust access) into a single, unified global cloud service.",
          "Instead of backhauling traffic to a central office, it inspects traffic at the 'edge' (closest to the user), providing remote workers and branch offices with secure, high-performance access to applications regardless of their physical location."
        ],
        features: ["SD-WAN Integration", "Zero-trust Access", "Edge Inspection", "Unified Cloud Service", "Global Connectivity"],
        benefits: ["Secure remote access", "High performance", "Unified network and security"]
      },
      {
        name: "Managed Next Gen Firewalls",
        description: "Service deploying and monitoring advanced firewalls that inspect content and applications.",
        fullDescription: [
          "Managed Next-Gen Firewalls (NGFW) is a service where a third-party provider deploys, configures, and continuously monitors advanced firewalls that inspect actual content and applications, rather than just simple network ports.",
          "This service offloads the complexity of managing features like Intrusion Prevention (IPS), deep packet inspection, and malware filtering, ensuring your network perimeter is actively defended against sophisticated application-layer attacks."
        ],
        features: ["Deep Packet Inspection", "Intrusion Prevention (IPS)", "Malware Filtering", "Application-layer Inspection", "Continuous Monitoring"],
        benefits: ["Defends against sophisticated attacks", "Offloads management complexity", "Active perimeter defense"]
      },
      {
        name: "Penetration Testing-as-a-service",
        description: "Combines ethical hacking expertise with a continuous cloud-based platform for managing testing.",
        fullDescription: [
          "Penetration Testing-as-a-Service (PTaaS) combines the strategic, human-led security expertise of professional ethical hackers with a continuous, cloud-based platform for managing the testing lifecycle.",
          "It allows organizations to schedule testing, collaborate with hackers, track vulnerability fixes, and instantly retest assets in real-time, transforming security validation from a single, time-boxed event into a continuous, developer-friendly process."
        ],
        features: ["Continuous Testing Platform", "Human-led Ethical Hacking", "Real-time Retesting", "Vulnerability Tracking", "Collaborative Workflow"],
        benefits: ["Continuous validation", "Developer-friendly", "Real-time fix verification"]
      },
      {
        name: "Phishing Campaign & Training",
        description: "Simulated email attacks combined with interactive education to build a 'human firewall'.",
        fullDescription: [
          "Phishing Campaign & Security Awareness Training is a service that combines simulated email attacks with interactive education to test and strengthen your employees' ability to recognize cyber threats.",
          "It builds a 'human firewall' by periodically sending fake phishing emails to staff; those who fall for the simulation are automatically assigned targeted training, helping to measure and reduce your organization's susceptibility to real attacks over time."
        ],
        features: ["Simulated Email Attacks", "Interactive Education", "Targeted Training Assignments", "Susceptibility Measurement", "Periodic Testing"],
        benefits: ["Strengthens human defense", "Reduces susceptibility", "Measurable improvement"]
      },
      {
        name: "Digital Forensics",
        description: "Specialized service combining crisis management with deep investigative analysis of security incidents.",
        fullDescription: [
          "Digital Forensics and Incident Response (DFIR) is a specialized service that combines immediate crisis management to stop active cyberattacks with deep investigative analysis to uncover the root cause.",
          "It ensures your organization rapidly contains and recovers from security incidents (like ransomware) while simultaneously preserving critical evidence to answer 'who, what, and how' for legal and regulatory purposes."
        ],
        features: ["Crisis Management", "Deep Investigative Analysis", "Root Cause Discovery", "Evidence Preservation", "Incident Recovery"],
        benefits: ["Rapid containment", "Legal/Regulatory compliance", "Understanding of attack vectors"]
      },
      {
        name: "DLP-as-a-service",
        description: "Cloud-based solution protecting sensitive data in emails, apps, and devices.",
        fullDescription: [
          "DLP-as-a-Service (Data Loss Prevention) is a cloud-based solution that monitors, classifies, and protects sensitive data (like credit card numbers or intellectual property) wherever it lives—whether in emails, cloud apps, or on devices.",
          "It automatically enforces policies to block unauthorized sharing or copying of critical information, ensuring compliance and preventing accidental or malicious data leaks without requiring heavy on-premise infrastructure."
        ],
        features: ["Data Classification", "Policy Enforcement", "Cross-platform Monitoring", "Leak Prevention", "Cloud-based Architecture"],
        benefits: ["Protects sensitive IP/Data", "Ensures compliance", "Prevents accidental leaks"]
      },
      {
        name: "Managed Security Service Provider",
        description: "Outsourced model for managing and monitoring security devices like firewalls and VPNs.",
        fullDescription: [
          "Managed Security Service Provider (MSSP) is an outsourced service model where a third-party company manages and monitors your organization's security devices and systems (like firewalls, VPNs, and antivirus) to ensure they are updated, configured correctly, and compliant.",
          "It provides foundational security monitoring and day-to-day administration, acting as an extension of your IT team to handle the operational 'heavy lifting' of maintaining your security infrastructure."
        ],
        features: ["Device Management", "System Monitoring", "Configuration Management", "Update Management", "Operational Administration"],
        benefits: ["Foundational security", "Extension of IT team", "Handles operational heavy lifting"]
      },
      {
        name: "Security Incident Support",
        description: "On-demand emergency service providing strategic guidance and technical intervention during crises.",
        fullDescription: [
          "Security Incident and Crisis Support is an on-demand emergency service that provides high-level strategic guidance and technical intervention during critical cyber events (like a major breach or ransomware attack) to minimize business damage.",
          "It extends beyond just fixing the technical issue; it helps you navigate the entire crisis—handling legal obligations, public relations messaging, and executive decision-making—while the technical teams work to stabilize and recover your systems."
        ],
        features: ["Emergency Technical Intervention", "Strategic Guidance", "Crisis Navigation", "PR & Legal Support", "Executive Decision Support"],
        benefits: ["Minimizes business damage", "Holistic crisis management", "Rapid stabilization"]
      },
      {
        name: "Strategy & GRC",
        description: "Consulting discipline ensuring technology investments align with business objectives and compliance.",
        fullDescription: [
          "Strategy and IT Governance (GRC) is a consulting discipline focused on ensuring an organization’s technology investments and long-term plans are fully aligned with its core business objectives.",
          "It involves creating a technology roadmap (Strategy) and establishing the policies, decision-making frameworks, and accountability structures necessary to ensure IT is managed compliantly and delivers demonstrable business value (Governance)."
        ],
        features: ["Technology Roadmap Creation", "Policy Establishment", "Decision-making Frameworks", "Accountability Structures", "Alignment with Business Goals"],
        benefits: ["Demonstrable business value", "Compliant IT management", "Long-term strategic alignment"]
      }
    ]
  },
  {
    title: "Cloud Services",
    subtitle: "Innovation & Scalability",
    description: "End-to-end cloud solutions including consulting, development, migration, optimization, and infrastructure management.",
    color: "from-amber/20 to-yellow-500/5",
    iconName: "FileCheck",
    services: ["Cloud Consulting", "Application Development", "Cloud Migration", "Cloud Optimization", "Infrastructure Service"],
    details: [
      {
        name: "Cloud Consulting",
        description: "Advisory support at any stage of your cloud adoption journey to help you capitalize on cloud potential.",
        fullDescription: [
          "We provide advisory support at any stage of your cloud adoption journey to help you capitalize on cloud potential."
        ],
        features: [
          "Cloud readiness assessment",
          "Cloud strategy development",
          "Advisory on optimal cloud vendor",
          "Developing practices for securing and governing cloud environment",
          "Risk mitigation strategy definition",
          "Disaster recovery and business continuity planning"
        ],
        benefits: ["Strategic alignment", "Risk reduction", "Optimal vendor selection"]
      },
      {
        name: "Application Development",
        description: "Building high-performance cloud applications to leverage scalability, flexibility, and resiliency.",
        fullDescription: [
          "We build high-performance cloud applications to help you take advantage of the cloud's inherent capabilities, such as scalability, flexibility, and resiliency."
        ],
        features: [
          "Business needs analysis and cloud solution conceptualization",
          "Cloud application solution design and tech stack selection",
          "Front-end and back-end development or platform configuration",
          "Application integration with existing IT ecosystem",
          "Quality assurance and testing",
          "Application deployment and post-launch support"
        ],
        benefits: ["High performance", "Scalable solutions", "Seamless integration"]
      },
      {
        name: "Cloud Migration",
        description: "Securely migrating applications, data, and workflows to the cloud to leverage agility and cost-efficiency.",
        fullDescription: [
          "We securely migrate your applications, data, and workflows to the cloud to help you leverage the agility and cost-efficiency the cloud offers. We execute migrations from both on-premises and other cloud environments, taking measures to minimize business process disruption and data loss."
        ],
        features: [
          "Pre-migration assessment (app readiness, dependencies)",
          "Optimal migration approach determination (re-hosting, re-platforming, refactoring)",
          "Outlining and setting up cloud computing services",
          "Running validation and testing activities",
          "Post-migration support and optimization"
        ],
        benefits: ["Minimized disruption", "Data integrity", "Cost-efficiency"]
      },
      {
        name: "Cloud Optimization",
        description: "Eliminating inefficiencies to enhance performance, security, and cost-effectiveness.",
        fullDescription: [
          "We help you eliminate inefficiencies and idle resources and enhance the performance, security, and cost-effectiveness of your cloud environment, maximizing the value of your cloud investments."
        ],
        features: [
          "Cloud app reengineering, re-architecting, and containerization",
          "Cloud environment performance optimization",
          "Cloud cost optimization (resource rightsizing, FinOps)",
          "Security optimization (proactive patching, protocols)"
        ],
        benefits: ["Maximized ROI", "Enhanced performance", "Reduced waste"]
      },
      {
        name: "Infrastructure Service",
        description: "24/7 monitoring, support, and management to ensure your cloud environment is secure and aligned.",
        fullDescription: [
          "We provide 24/7 monitoring, support, and management services to ensure your cloud environment is up-to-date, secure, and well-aligned with your current and future business needs."
        ],
        features: [
          "Configuration of cloud IT infrastructure components",
          "Cloud infrastructure performance monitoring and alerting",
          "Troubleshooting and issue resolution",
          "Regular software updates and upgrades",
          "Cloud-app-monitoring-as-a-service"
        ],
        benefits: ["24/7 Uptime", "Secure configuration", "Proactive issue resolution"]
      }
    ]
  },
  {
    title: "AI + Data Services",
    subtitle: "Unlock Value, Securely",
    description: "Build and deploy quality AI agent systems. Securely connect your data with any AI model to create accurate, domain-specific applications.",
    color: "from-crimson/20 to-rose-500/5",
    iconName: "Server",
    services: ["AI Consulting", "AI Development", "Agent Systems"],
    details: [
      {
        name: "AI Consulting",
        description: "Strategic advisory for AI adoption, from use case identification to risk management.",
        fullDescription: [
          "Build and deploy quality AI agent systems (Securely connect your data with any AI model to create accurate, domain-specific applications) Unlocking value from data and AI faster to help you scale and transform your digital business."
        ],
        features: [
          "Use case identification",
          "Data mapping and quality assessment",
          "Existing solution audit",
          "Advisory with initial project setup",
          "Development process review",
          "ROI analysis",
          "Solution architecture design",
          "Tech stack selection",
          "Project budgeting",
          "MVP conceptualization",
          "Risk management strategy creation",
          "User training and support"
        ],
        benefits: ["Clear AI Roadmap", "Risk mitigation", "Aligned architecture"]
      },
      {
        name: "AI Development",
        description: "End-to-end development of AI solutions, from data pipelines to model training and deployment.",
        fullDescription: [
          "Comprehensive development services to build, train, and deploy AI models tailored to your business needs."
        ],
        features: [
          "ETL/ELT pipeline setup",
          "Data pre-processing (cleansing, annotation, transformation)",
          "Data protection and cybersecurity elaboration",
          "AI algorithm selection",
          "AI model training",
          "Development process review",
          "Software integrations and APIs creation",
          "UX/UI and data visualization setup",
          "Deployment to the production environment",
          "End-to-end testing",
          "Post-launch support, updates and modernization"
        ],
        benefits: ["Custom AI solutions", "Secure data handling", "Seamless integration"]
      },
      {
        name: "Agent Systems",
        description: "Building and deploying autonomous agents on your data with custom evaluation and governance.",
        fullDescription: [
          "We build and deploy autonomous agent systems that leverage your proprietary data to perform complex tasks."
        ],
        features: [
          "Agent builds on your data",
          "Custom Evaluation",
          "Governance",
          "Deploy Agents"
        ],
        benefits: ["Autonomous operations", "Data-driven decision making", "Governed AI execution"]
      }
    ]
  }
];

export const FALLBACK_INSIGHTS: Insight[] = [
  {
    id: "ai-driven-ransomware",
    title: "The Rise of AI-Driven Ransomware",
    category: "Threat Report",
    date: "Oct 12, 2024",
    excerpt: "Analysis of the new wave of polymorphic malware leveraging LLMs to bypass static signatures.",
    link: "/insights/ai-driven-ransomware",
    image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=1600",
    content: [
      "In the last quarter of 2024, our Threat Intelligence Unit observed a 300% increase in polymorphic ransomware strains that appear to be generated by Large Language Models (LLMs). These attacks differ significantly from traditional ransomware in that they rewrite their own code structure with every iteration, effectively rendering signature-based detection useless.",
      "The sophistication of these AI-driven agents allows them to conduct autonomous reconnaissance within a network for days before deploying payloads. They identify backup servers, exfiltrate sensitive data, and disable security controls using valid administrative credentials harvested through sophisticated phishing campaigns.",
      "Our analysis indicates that these tools are becoming widely available on dark web forums as RaaS (Ransomware-as-a-Service) kits, lowering the barrier to entry for less skilled cybercriminals. The democratization of AI-offensive tools represents a paradigm shift in the threat landscape.",
      "To combat this, Phezulu Cyber recommends a shift to behavioral-based Endpoint Detection and Response (EDR) and the implementation of Zero Trust Architecture. Static defenses are no longer sufficient; organizations must assume breach and focus on rapid containment and resilience."
    ]
  },
  {
    id: "zero-trust-beyond-buzzword",
    title: "Zero Trust: Beyond the Buzzword",
    category: "Webinar",
    date: "Oct 28, 2024",
    excerpt: "Practical implementation strategies for mid-sized enterprises moving away from perimeter-based security.",
    link: "/insights/zero-trust-beyond-buzzword",
    image: "https://images.unsplash.com/photo-1558494949-ef526b0042a0?auto=format&fit=crop&q=80&w=1600",
    content: [
      "Zero Trust is often sold as a product, but it is fundamentally a strategy. In this webinar summary, we break down the core tenets: verify explicitly, use least privilege access, and assume breach.",
      "Many mid-sized enterprises struggle with the implementation phase. They purchase 'Zero Trust' labeled firewalls but fail to segment their networks or implement robust identity governance. The result is a false sense of security without the actual benefits of the architecture.",
      "We discuss the 'Identity as the New Perimeter' concept. In a distributed workforce environment, the corporate network boundary has dissolved. Security must follow the user and the device, regardless of location.",
      "Key takeaways include a 5-step roadmap for migration: 1) Identify protect surface, 2) Map transaction flows, 3) Architect the network, 4) Create Zero Trust policy, and 5) Monitor and maintain. This iterative approach prevents operational disruption while steadily increasing security posture."
    ]
  },
  {
    id: "compliance-cloud-era",
    title: "Compliance in the Cloud Era",
    category: "Blog",
    date: "Nov 02, 2024",
    excerpt: "Navigating GDPR and POPIA while maintaining agility in multi-cloud environments.",
    link: "/insights/compliance-cloud-era",
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=1600",
    content: [
      "As organizations aggressively adopt multi-cloud strategies, the complexity of regulatory compliance explodes. Data sovereignty—knowing exactly where your customer data physically resides—becomes a moving target when leveraging serverless architectures and global CDNs.",
      "The intersection of GDPR (Europe), POPIA (South Africa), and CCPA (California) creates a regulatory minefield. A single misconfigured S3 bucket can lead to fines that jeopardize the financial stability of a company, not to mention the reputational damage.",
      "We explore the concept of 'Compliance-as-Code'. By embedding regulatory controls directly into your CI/CD pipelines and infrastructure provisioning scripts (Terraform/Ansible), you can ensure that no non-compliant resource is ever deployed to production.",
      "Automated governance is the only scalable solution. Manual audits are snapshots in time; continuous compliance monitoring provides a video feed of your regulatory posture, allowing for real-time remediation of drift."
    ]
  },
  {
    id: "quantum-decryption-horizon",
    title: "Quantum Decryption: The Horizon Threat",
    category: "Threat Report",
    date: "Dec 05, 2024",
    excerpt: "Preparing your cryptographic infrastructure for the post-quantum era.",
    link: "/insights/quantum-decryption-horizon",
    image: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&q=80&w=1600",
    content: [
      "Harvest Now, Decrypt Later (HNDL) attacks are intensifying. State-sponsored actors are intercepting encrypted traffic today with the intent of decrypting it once quantum computers reach sufficient qubit stability. This poses a severe long-term risk for organizations handling trade secrets, health records, and national security data.",
      "The migration to Post-Quantum Cryptography (PQC) is not a simple patch; it is a multi-year infrastructure overhaul. NIST's recent standardization of CRYSTALS-Kyber represents a starting gun for this transition.",
      "Phezulu Cyber advises clients to begin with a cryptographic inventory: audit where encryption is used, what algorithms are in place, and determine the data's longevity value. If your data must remain secret for 10+ years, it is already at risk."
    ]
  },
  {
    id: "incident-response-war-games",
    title: "Live Fire: Incident Response War Games",
    category: "Webinar",
    date: "Nov 15, 2024",
    excerpt: "Watch our Red Team simulate a supply chain attack and how the Blue Team defends.",
    link: "/insights/incident-response-war-games",
    image: "https://images.unsplash.com/photo-1614064641938-3bcee529cfae?auto=format&fit=crop&q=80&w=1600",
    content: [
      "Theory fails when the alert siren rings. In this recorded session, we conducted a live simulation of a software supply chain compromise—similar to SolarWinds—targeting a dummy financial services firm.",
      "Witness the speed at which lateral movement occurs. Within 14 minutes of the initial foothold, the Red Team had escalated privileges. This highlights the critical importance of mean-time-to-detect (MTTD).",
      "We analyze the Blue Team's response: where they succeeded in isolation, and where log fatigue caused missed signals. This webinar is essential viewing for SOC managers looking to refine their playbooks."
    ]
  },
  {
    id: "ciso-burnout-crisis",
    title: "The CISO Burnout Crisis",
    category: "Blog",
    date: "Nov 20, 2024",
    excerpt: "Why security leadership tenure is dropping and how to build sustainable operations.",
    link: "/insights/ciso-burnout-crisis",
    image: "https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&q=80&w=1600",
    content: [
      "The average tenure of a CISO is now just 26 months. The relentless pressure of 24/7 liability, combined with under-resourced teams, is creating a leadership vacuum in the industry.",
      "This post discusses the psychological toll of 'always-on' alert fatigue. We argue that cognitive offloading—outsourcing Tier 1 and Tier 2 monitoring to MDR providers—is not just an operational decision, but a human preservation strategy.",
      "Effective security requires clarity of thought. When leadership is in a chronic state of fight-or-flight, strategic planning suffers. We provide a framework for CISOs to negotiate better mental health boundaries with their boards, framing it as a risk management necessity."
    ]
  }
];

export const fetchPillars = async (): Promise<Pillar[]> => {
  if (cache.pillars) return cache.pillars;
  try {
    const response = await fetch('http://localhost:5000/api/pillars');
    if (!response.ok) throw new Error('Network response was not ok');
    const data = await response.json();
    cache.pillars = data;
    return data;
  } catch (error) {
    console.warn("Backend unreachable (running in preview mode). Using fallback data.", error);
    cache.pillars = FALLBACK_PILLARS;
    return FALLBACK_PILLARS;
  }
};

export const fetchSystemStatus = async (): Promise<SystemStatus> => {
  if (cache.status) return cache.status;
  try {
    const response = await fetch('http://localhost:5000/api/status');
    if (!response.ok) throw new Error('Status check failed');
    const data = await response.json();
    cache.status = data;
    return data;
  } catch (error) {
    const fallback: SystemStatus = { label: "System Secure", color: "green", code: "SECURE" };
    cache.status = fallback;
    return fallback;
  }
};

export const submitContact = async (data: ContactData): Promise<boolean> => {
  try {
    const response = await fetch('http://localhost:5000/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error('Submission failed');
    return true;
  } catch (error) {
    console.warn("Backend unreachable. Simulating successful submission.", error);
    return new Promise((resolve) => setTimeout(() => resolve(true), 1500));
  }
};

export const fetchInsights = async (): Promise<Insight[]> => {
  if (cache.insights) return cache.insights;

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 1500);

    const response = await fetch('http://localhost:5000/api/insights', {
      signal: controller.signal
    });

    clearTimeout(timeoutId);

    if (!response.ok) throw new Error('Failed to fetch insights');
    const rawData = await response.json();

    // Ensure data has ID - Client-side sanitization
    // If backend returns data without IDs (legacy data), generate one from the title
    const data = rawData.map((item: any) => {
      // Find fallback counterpart to fill in missing details if needed
      const fallback = FALLBACK_INSIGHTS.find(f => f.id === item.id || f.title === item.title);

      return {
        ...item,
        id: item.id || item.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, ''),
        // If backend is missing content/image, try to use fallback
        content: item.content || fallback?.content,
        image: item.image || fallback?.image,
        link: item.link || fallback?.link || `/insights/${item.id}`
      };
    });

    cache.insights = data;
    return data;
  } catch (error) {
    cache.insights = FALLBACK_INSIGHTS;
    return FALLBACK_INSIGHTS;
  }
};

export const fetchInsightById = async (id: string): Promise<Insight | undefined> => {
  // First check if we have them cached
  const insights = await fetchInsights();
  return insights.find(insight => insight.id === id);
};

export const fetchEmployees = async (): Promise<any[]> => {
  if (cache.employees) return cache.employees;
  try {
    const response = await fetch('http://localhost:5000/api/admin/employees', {
      headers: { 'x-auth-token': localStorage.getItem('token') || '' }
    });
    // Fallback if endpoint might be public or different, but assuming admin protection
    if (!response.ok) throw new Error('Failed to fetch employees');
    const data = await response.json();
    cache.employees = data;
    return data;
  } catch (error) {
    return [];
  }
};

export const fetchPartners = async (): Promise<any[]> => {
  if (cache.partners) return cache.partners;
  try {
    const response = await fetch('http://localhost:5000/api/partners');
    if (!response.ok) throw new Error('Failed to fetch partners');
    const data = await response.json();
    cache.partners = data;
    return data;
  } catch (error) {
    return [];
  }
};

export const fetchPhotos = async (): Promise<any[]> => {
  if (cache.photos) return cache.photos;
  try {
    const response = await fetch('http://localhost:5000/api/photos');
    if (!response.ok) throw new Error('Failed to fetch photos');
    const data = await response.json();
    cache.photos = data;
    return data;
  } catch (error) {
    return [];
  }
};