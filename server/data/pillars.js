
const pillars = [
  {
    title: "Cybersecurity Services",
    subtitle: "Proactive Vulnerability Discovery & Defense",
    description: "Advanced Cybersecurity Solutions to Safeguard Your Digital Infrastructure From managed detection and response (SOC/MDR) to threat assessment, we ensure proactive protection, compliance, and resilience against evolving threats.",
    color: "from-red-600/20 to-orange-500/5",
    iconName: "Shield",
    services: [
      "SOC-as-a-service", "EDR-as-a-service", "MDR-as-a-service", "XDR-as-a-service", 
      "MFA-as-a-service", "MDM-as-a-service", "Vulnerability Assessment", "Dark Web Monitoring",
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
        benefits: ["Eliminate high capital costs", "Immediate access to expertise", "Continuous protection"]
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
          "XDR-as-a-Service (Extended Detection and Response) is a comprehensive, outsourced security solution that integrates data from all security layers—endpoints, networks, email, and cloud workloads—into a single, unified global cloud service.",
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
    description: "Scalable Cloud Solutions for Seamless Digital Transformation. Full-stack services from cloud architecture design, migration, and optimization to ongoing cloud operations management, ensuring flexibility, security, and cost-efficiency.",
    color: "from-amber/20 to-yellow-500/5",
    iconName: "Server",
    services: ["Cloud Consulting", "Application Development", "Cloud Migration", "Cloud Optimization", "Infrastructure Service"],
    details: [
      {
        name: "Cloud Consulting",
        description: "Advisory support at any stage of your cloud adoption journey to help you capitalize on cloud potential.",
        fullDescription: [
          "We provide advisory support at any stage of your cloud adoption journey to help you capitalize on cloud potential."
        ],
        features: [
          "Cloud readiness assessment (IT environment, business processes, data assets)",
          "Cloud strategy development (roadmap & business case)",
          "Advisory on optimal cloud vendor & deployment model (IaaS, PaaS, SaaS)",
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
    description: "Unlock the Power of AI and Data for Smarter Business Decisions. Develop and integrate AI agents, leveraging data-driven insights to build precise, domain-specific applications for automation, security, and efficiency",
    color: "from-crimson/20 to-rose-500/5",
    iconName: "Server",
    services: ["AI Consulting", "AI Development", "Agent System"],
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
          "AI algorithm selection and model training",
          "Software integrations and APIs creation",
          "UX/UI and data visualization setup",
          "End-to-end testing and deployment"
        ],
        benefits: ["Custom AI solutions", "Secure data handling", "Seamless integration"]
      },
      {
        name: "Agent System",
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
        benefits: ["Autonomous operations", "Data-driven decision making", "Governed AI execution"],
        diagramUrl: "https://placehold.co/800x500/0f172a/d90429.png?text=Agent+Systems+Architecture&font=montserrat"
      }
    ]
  }
];

module.exports = pillars;
