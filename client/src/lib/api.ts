import type { Pillar, ContactData, SystemStatus, Insight } from '../types';
import { slugify } from './slug';

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
      "SOC-as-a-service", "Compliance management services", "Security Assessment services", "MFA-as-a-service",
      "Vulnerability Assessment", "Dark web monitoring", "Patch Management", "Expertise-as-a-service",
      "Email Security-as-a-service", "SASE-as-a-service", "Managed Next Gen Firewalls", "Penetration Testing-as-a-service",
      "Phishing Campaign & Security Awareness Training", "Digital Forensics and Incident Response", "DLP-as-a-service",
      "Managed Security Service", "Managed Detection and Response"
    ],
    details: [
      {
        name: "Managed Security Service",
        description: "Managed security service foundation referenced in source material; provides the umbrella for all managed protections below.",
        fullDescription: [
          "Managed Security Service (MSS) is the overarching managed protection layer referenced in the source data as the entry point for the catalogue. It anchors the broader portfolio that includes MDR, SOC operations, firewall management, and other safeguards."
        ],
        features: [
          "Baseline managed monitoring and administration of security controls",
          "Foundation service that ties together MDR, SOC, and platform operations",
          "Acts as the gateway for tailored protections across the stack"
        ],
        benefits: [
          { title: "Centralized Oversight", description: "Single managed layer that unifies the wider service catalogue.", iconName: "Shield" },
          { title: "Operational Consistency", description: "Creates the baseline for consistent monitoring and response.", iconName: "RefreshCcw" },
          { title: "Extensible Coverage", description: "Easily extended with the specialized services outlined below.", iconName: "Layers" }
        ]
      },
      {
        name: "Managed Detection and Response",
        description: "24x7x365 detection, investigation, and response to cyber threats across on-prem, cloud, and hybrid environments.",
        fullDescription: [
          "DETECTION AND RESPONSE: Managed Detection and Response Service (MDR) rapidly detects, identifies, and responds to cyber threats so your business stays protected.",
          "Phezulu Global’s MDR provides the people, technology, and processes to find threats across your entire network infrastructure. Supported by SOC teams in South Africa and India, we deliver 24x7x365 coverage with industry-leading detection and rapid, appropriate response.",
          "Combined with dedicated cyber security analysts and threat researchers, MDR ensures your organisation achieves the highest possible level of threat protection.",
          "WHY USE Phezulu Global MDR: an MDR service provides far more than monitoring—it delivers peace of mind, proactive protection of critical assets, and elevated cyber security maturity beyond typical in-house solutions."
        ],
        features: [
          "24x7x365 SOC Monitoring",
          "Advanced Threat Intelligence",
          "AI & Machine Learning Detection",
          "Threat Investigation & Triage",
          "Microsoft Sentinel Automation",
          "Global SOC Coverage"
        ],
        benefits: [
          { title: "Complete Threat Visibility", description: "Full visibility across on-premises, cloud, and hybrid environments.", iconName: "Eye" },
          { title: "Constant Attack Detection", description: "24x7x365 monitoring with advanced threat intelligence.", iconName: "RefreshCcw" },
          { title: "Reduce Pressure on Internal Teams", description: "SOC handles management, monitoring, investigation, and triage.", iconName: "UserMinus" },
          { title: "Rapid Incident Response", description: "Appropriate, actionable guidance to contain threats quickly.", iconName: "Siren" },
          { title: "Assists with Compliance", description: "Supports GDPR, ISO 27001, CMMC 2.0, and similar requirements.", iconName: "FileCheck" },
          { title: "Elevate Security Capabilities", description: "Enterprise-grade detection and response without heavy investment.", iconName: "TrendingUp" }
        ],
        processSteps: [
          { stepNumber: 1, title: "Data Ingestion", description: "Telemetry collected from endpoints, servers, databases, cloud, and more; analysed with AI/ML and threat intelligence." },
          { stepNumber: 2, title: "Data Analysis", description: "Threats identified and grouped into tiers based on severity using playbooks and intelligence." },
          { stepNumber: 3, title: "Investigation", description: "SOC team investigates cases requiring attention; automation handles common threats while analysts address severe ones." },
          { stepNumber: 4, title: "Response", description: "Threat researchers and analysts set appropriate responses to disrupt and quarantine threats before impact." }
        ]
      },
      {
        name: "SOC-as-a-service",
        description: "Always vigilant, always secure SOC with 24x7x365 coverage, AI-driven detection, and rapid response on industry-leading SIEM.",
        fullDescription: [
          "Always Vigilant, Always Secure: SOC as a Service delivers 24x7x365 global coverage, advanced AI-driven detection, and rapid response with the industry's leading SIEM platform.",
          "Global SOC operations in South Africa and India combine human expertise with AI-driven analytics. Certified analysts, engineers, and threat researchers work around the clock to safeguard against emerging threats.",
          "Seamless Deployment & Co-Managed Flexibility: deployment, integration, and tuning handled end-to-end with options for fully managed or co-managed models and collaborative visibility.",
          "Your Trusted SOC Partner: tailored solutions, real-time threat intelligence, rapid incident response, AI-enhanced detection, predictable and scalable cost.",
          "Enhancing Your Security Services: phishing SOC, typo-squatting/domain monitoring, dark web monitoring, continuous vulnerability scanning, security awareness training, and network detection and response.",
          "Enhance Security Further: optional bolt-on features extend detection, response, and visibility across cloud and hybrid environments."
        ],
        features: [
          "24x7x365 Global Monitoring",
          "AI-Driven Threat Detection",
          "Expert Microsoft-Certified SOC Team",
          "Rapid Incident Response",
          "Seamless deployment, integration, and tuning",
          "Fully managed or co-managed options with shared visibility",
          "CYBERSHIELD platform and real-time dashboards/analytics",
          "2000+ security and compliance use cases (MITRE ATT&CK)",
          "Tailored billing aligned to business needs",
          "Seamless system integration with existing infrastructure"
        ],
        benefits: [
          { title: "24x7x365 Global Protection", description: "Around-the-clock monitoring and response from globally distributed SOC operations.", iconName: "Globe" },
          { title: "Microsoft-Certified SOC Experts", description: "Analysts, engineers, and researchers with advanced Microsoft certifications.", iconName: "Award" },
          { title: "Industry-Leading Threat Intelligence", description: "Integrated intelligence improves detection and mitigation.", iconName: "Zap" },
          { title: "CYBERSHIELD Advantage", description: "Proprietary platform accelerates detection and response with actionable insight.", iconName: "Cpu" },
          { title: "Real-Time Dashboards", description: "Customizable dashboards and reports for full operational visibility.", iconName: "BarChart" },
          { title: "Rapid Incident Response", description: "Strict SLAs tied to threat severity ensure timely containment.", iconName: "Clock" },
          { title: "Tailored Billing", description: "Flexible, predictable billing that scales with changing needs.", iconName: "DollarSign" },
          { title: "Comprehensive Use Cases", description: "Over 2000 built-in security/compliance use cases.", iconName: "ListChecks" },
          { title: "Seamless Integration", description: "Integrates smoothly with your existing infrastructure.", iconName: "Plug" }
        ],
        aspects: [
          { title: "Phishing SOC", description: "Dedicated team analyzing and mitigating phishing threats." },
          { title: "Domain Monitoring", description: "Alerts on unauthorized typo-squatting or fraudulent domains." },
          { title: "Dark Web Monitoring", description: "Proactive monitoring for leaked credentials and sensitive data." },
          { title: "Vulnerability Scanning", description: "Continuous scanning with actionable reports and recommendations." },
          { title: "Security Awareness Training", description: "Simulations and training to reduce social engineering risk." },
          { title: "Network Detection & Response", description: "Visibility into network traffic to detect lateral movement and advanced threats." }
        ]
      },
      {
        name: "Compliance management services",
        description: "Comprehensive service ensuring your organization achieves and maintains the highest standards of information security.",
        fullDescription: [
          "Secure Your Information with Expertise You Can Trust. Our Compliance Certification Service fortifies your digital landscape and safeguards data with reliability and excellence.",
          "Turnkey package: ISMS platform, seasoned consultants guiding every step, and complete certification process management from initial assessment to final audit (including arranging and booking the certification).",
          "Why Phezulu Global: proven experience, customized approach for each organization, and commitment to excellence that puts your security first."
        ],
        features: [
          "ISMS platform foundation",
          "Expert consultation and personalized guidance",
          "Complete certification process management end-to-end",
          "Gap analysis and planning",
          "Scope definition and risk assessment",
          "Design and implementation of ISMS",
          "Training and awareness programs",
          "Internal audit and management review",
          "Certification audit coordination"
        ],
        benefits: [
          { title: "Experience and Expertise", description: "Numerous successful certifications with unmatched compliance expertise.", iconName: "Award" },
          { title: "Customized Approach", description: "Tailored to your specific needs for the best outcome.", iconName: "UserCog" },
          { title: "Commitment to Excellence", description: "Security-first delivery that exceeds expectations.", iconName: "TrendingUp" }
        ],
        processSteps: [
          { title: "Gap Analysis and Planning", description: "Analyze current state vs requirements and develop a project plan.", stepNumber: 1 },
          { title: "Scope Definition & Risk Assessment", description: "Define ISMS scope and conduct comprehensive risk assessment.", stepNumber: 2 },
          { title: "Design and Implementation", description: "Establish policies, objectives, and procedures; implement across the organization.", stepNumber: 3 },
          { title: "Training and Awareness", description: "Training sessions and ongoing awareness programs.", stepNumber: 4 },
          { title: "Internal Audit & Management Review", description: "Assess ISMS effectiveness and ensure leadership commitment.", stepNumber: 5 },
          { title: "Certification Audit", description: "Two-stage external audit leading to certification.", stepNumber: 6 }
        ]
      },
      {
        name: "Security Assessment services",
        description: "Thorough examination focused on optimizing your security posture against cyber threats targeting your environment.",
        fullDescription: [
          "Assessment Components: questionnaire aligned to CIS Critical Security Controls v8; Vulnerability Assessment using Microsoft Defender Vulnerability Management and Secure Score; Data Security Assessment with Microsoft Purview Information Protection and Insider Risk Management analytics; optional Cloud Discovery using Microsoft Defender for Cloud.",
          "Engagement phases over five weeks: pre-engagement, setup, data collection, vulnerability and data security exploration, and results presentation with next steps.",
          "Objectives: understand cybersecurity maturity, identify vulnerabilities across clients and servers, analyze cloud application usage and risks, understand data security and insider threat risks, and define actionable next steps.",
          "Scope: questionnaire analysis; deployment/configuration of required Microsoft products; vulnerability scanning on Windows servers and clients; exploration of sensitive data in Microsoft 365; optional cloud app usage analysis.",
          "Coverage: Endpoint, Office, Cloud App, Identity, Cloud, Microsoft Intune, and Microsoft Entra ID assessments."
        ],
        features: [
          "Questionnaire-based maturity analysis (CIS Controls v8)",
          "Microsoft Defender Vulnerability Management and Secure Score",
          "Microsoft Purview Information Protection and Insider Risk Management analytics",
          "Optional Cloud Discovery with Microsoft Defender for Cloud",
          "Endpoint, Office, Cloud App, Identity, Cloud, Intune, and Entra ID assessments"
        ],
        benefits: [
          { title: "Understand Maturity", description: "Clear view of current cybersecurity maturity level.", iconName: "BarChart" },
          { title: "Identify Vulnerabilities", description: "Address weaknesses across clients and servers.", iconName: "Search" },
          { title: "Cloud Risk Insights", description: "Analyze cloud application usage and associated risks.", iconName: "Cloud" },
          { title: "Data Security Insight", description: "Understand risks related to data security and insider threats.", iconName: "FileSearch" },
          { title: "Actionable Next Steps", description: "Define concrete steps to enhance posture.", iconName: "ListChecks" }
        ]
      },
      {
        name: "MFA-as-a-service",
        description: "Cloud-based service providing Multi-Factor Authentication functionality to users and organizations.",
        fullDescription: [
          "MFA-as-a-Service (MFAaaS) is a cloud-based service providing Multi-Factor Authentication that requires two or more forms of authentication to access applications or systems.",
          "Phezulu Global MFAaaS offers secure implementation without managing infrastructure, with APIs/SDKs integrating into your apps and supporting SMS OTPs, hardware/software tokens, biometrics, and other verification methods."
        ],
        features: [
          "Enhanced security via second-factor enforcement",
          "Easy implementation with rapid integration",
          "Scalability with changing security requirements",
          "User convenience across mobile apps, SMS, and security keys",
          "Cost reduction by outsourcing infrastructure",
          "Improved compliance through stronger authentication"
        ],
        benefits: [
          { title: "Expertise", description: "Specialized MFA knowledge delivers higher security.", iconName: "GraduationCap" },
          { title: "Cost-effectiveness", description: "No in-house infrastructure or personnel required.", iconName: "DollarSign" },
          { title: "Scalability", description: "Scale with changing business needs.", iconName: "Maximize" },
          { title: "Reliability", description: "Established processes and systems ensure uptime.", iconName: "CheckCircle2" },
          { title: "Time-Saving", description: "Frees IT teams from MFA administration.", iconName: "Clock" },
          { title: "Improved Security", description: "Latest MFA technology strengthens defenses and compliance.", iconName: "ShieldCheck" }
        ]
      },
      {
        name: "Vulnerability Assessment",
        description: "Continuous identification of security weaknesses before attackers exploit them.",
        fullDescription: [
          "Phezulu Global Vulnerability Assessment minimizes risk exposure by proactively identifying and addressing weaknesses in your network. Vulnerabilities can emerge daily; the service swiftly identifies and remediates them to safeguard critical data and assets.",
          "Combines state-of-the-art scanning tools with seasoned security professionals, comparing findings against known flaw databases to stay ahead of attackers."
        ],
        features: [
          "Weak network configuration detection",
          "Insecure password identification",
          "Outdated software and application discovery",
          "Denial of Service risk detection"
        ],
        benefits: [
          { title: "Stay on Top of Cyber Hygiene", description: "Regular scans prevent hackers from finding easy targets.", iconName: "RefreshCcw" },
          { title: "Actionable Remediation Guidance", description: "Reports detail vulnerabilities, impact, and prioritized steps.", iconName: "FileText" },
          { title: "Reduce Team Strain", description: "We handle scanning and analysis so your team can focus on fixes.", iconName: "UserMinus" },
          { title: "Guide Investments", description: "Insights inform long-term security strategy and compliance.", iconName: "TrendingUp" }
        ]
      },
      {
        name: "Dark web monitoring",
        description: "Continuously monitoring corporate domains and employee data against breached data lakes on the dark web.",
        fullDescription: [
          "Phezulu Global’s SOC continuously monitors corporate domains and employee data against breached data lakes on the dark web. If a breach is detected, a human-led triaged escalation alerts you and coordinates corrective actions.",
          "Dark Web Monitoring-as-a-Service keeps you ahead of cybercriminals with visibility into potential threats targeting your company and employees.",
          "Millions of compromised corporate records are added daily. Early awareness of compromised accounts, assets, and employee PII enables timely containment and reputation protection.",
          "Scale of coverage: 320+ billion recaptured assets, 28+ billion total passwords, 35+ billion email addresses, and 225+ billion unique data types monitored for exposure."
        ],
        features: [
          "Breached personal identifiable information monitoring",
          "Exposed active and SSO session detection",
          "Corporate domain email monitoring",
          "Threat hunting",
          "Breached IT infrastructure discovery",
          "Identify botnet users and machines"
        ],
        benefits: [
          { title: "Stay Ahead", description: "Proactive monitoring highlights threats before they strike.", iconName: "Eye" },
          { title: "Protect Reputation", description: "Timely action on compromised accounts and infrastructure protects brand and operations.", iconName: "Shield" },
          { title: "Data Insight", description: "Clear understanding of threats enables rapid mitigation.", iconName: "FileSearch" }
        ]
      },
      {
        name: "Patch Management",
        description: "Automated patching to keep systems secure, compliant, and up-to-date.",
        fullDescription: [
          "Patch Management as a Service (PMaaS) keeps systems secure, compliant, and up-to-date, preventing performance issues, random reboots, and cyber-attacks.",
          "Automates identifying, installing, and verifying updates across on-premises and cloud assets so IT staff can focus on strategic tasks."
        ],
        features: [
          "Cloud-based automated patching for on-prem and cloud systems",
          "Vendor patch installation management",
          "Outdated software detection and replacement support",
          "Regulatory compliance through continuous updates"
        ],
        benefits: [
          { title: "Increased Productivity", description: "Automation frees staff for more urgent tasks.", iconName: "Zap" },
          { title: "Enhanced Functionality", description: "Patches improve software features and stability.", iconName: "TrendingUp" },
          { title: "Detect Outdated Software", description: "Identify and replace outdated software quickly.", iconName: "Search" },
          { title: "Ensured Compliance", description: "Stay compliant with the latest regulations via automated patching.", iconName: "FileCheck" }
        ]
      },
      {
        name: "Expertise-as-a-service",
        description: "24x7 IT support service remotely troubleshooting IT problems for end-clients on behalf of MSPs and MSSPs.",
        fullDescription: [
          "Expertise-as-a-Service is a 24x7 IT support service that remotely troubleshoots IT problems for end-clients on behalf of MSPs, MSSPs, and end-clients. It handles day-to-day steady-state tasks across systems, hardware, networks, and software to ensure quick, efficient resolution with minimal disruption.",
          "Outsource Service Options: Helpdesk Resources, Security Engineers, Project Manager Resources, L2/L3 Engineers; cost-effective, dedicated full-time resources with flexible workhours and no administrative overhead.",
          "Key challenges solved and ROI: fills expertise gaps, accelerates new technology adoption, resolves staffing/scalability issues, extends coverage hours, improves retention, and removes administrative overhead.",
          "Value added: full-time dedicated resources, excellent communication, flexible hours, zero management overhead, comprehensive training, 24x7 access to a relationship manager, fixed monthly fee, and no nickel-and-dime approach."
        ],
        features: [
          "Helpdesk Resources",
          "Security Engineers",
          "Project Manager Resources",
          "L2/L3 Engineers",
          "Flexible workhours to support customer timezone",
          "24x7 access to assigned customer relationship manager"
        ],
        benefits: [
          { title: "Reduce Cost up to 70%", description: "Significant savings versus building in-house teams.", iconName: "DollarSign" },
          { title: "Dedicated Full-Time Resources", description: "Experienced resources committed to your accounts.", iconName: "Users" },
          { title: "Flexible Workhours", description: "Coverage aligned to customer timezones.", iconName: "Clock" },
          { title: "Zero Overhead", description: "No administrative or management overhead for you.", iconName: "Briefcase" },
          { title: "Proven Delivery", description: "Satisfied 2500+ customers in 10+ time zones; SOC 2 Type 2 & ISO 27001 certified service.", iconName: "Award" }
        ]
      },
      {
        name: "Email Security-as-a-service",
        description: "Advanced email threat protection and data security services to spot and stop email attacks.",
        fullDescription: [
          "Email Security Services stop attacks before they happen. Email is the most common entry point and a single successful attack can devastate reputation.",
          "With over 4.26 billion users and 300+ billion emails daily, every email opened is a potential cyber threat. 91% of cyberattacks start with an email; 85% of organizations have encountered phishing; 81% of malicious files are distributed by email; 1 in 239 attachments and 1 in 415 links are malicious.",
          "Phezulu Global provides 24x7 advanced email threat protection and data security. Cloud-based filtering intercepts and inspects inbound and outbound traffic before reaching internal mail servers."
        ],
        features: [
          "Complete email security incident triage by SOC",
          "Ongoing steady-state management of the email security solution",
          "24x7 Email Security Monitoring",
          "Anti-Phishing for incoming and internal email",
          "Malicious URL prevention and URL click-time protection",
          "Account takeover anomaly detection",
          "Unauthorized application (Shadow IT) detection",
          "24x7 ransomware, account takeover, BEC, supply chain attack, and malware protection",
          "Blocks suspicious emails before inbox delivery"
        ],
        benefits: [
          { title: "Advanced Threat Protection", description: "Stops phishing, malicious URLs, ransomware, BEC, and supply chain attacks.", iconName: "ShieldCheck" },
          { title: "Continuous Monitoring", description: "24x7 SOC-led monitoring and triage.", iconName: "Clock" },
          { title: "Operational Ease", description: "Managed steady state removes administrative burden.", iconName: "RefreshCcw" },
          { title: "Inbox Safety", description: "Blocks suspicious emails before they reach users.", iconName: "ShieldAlert" }
        ]
      },
      {
        name: "SASE-as-a-service",
        description: "Comprehensive and unified approach to network security combining SD-WAN, FWaaS, CASB, ZTNA, and more.",
        fullDescription: [
          "Gartner’s SASE model unifies SD-WAN, FWaaS, CASB, ZTNA, and more into a single cloud-delivered service. It simplifies network management, improves security, and enhances user experience with consistent policy across all devices and locations.",
          "SASE secures network infrastructure, reduces complexity, streamlines operations, and supports remote and cloud-first work."
        ],
        features: [
          "Firewall as a Service",
          "Intrusion detection and prevention",
          "Web filtering",
          "Email security",
          "Data loss prevention (DLP)",
          "Zero Trust Network Access",
          "Bandwidth optimization and efficient routing",
          "Threat vector coverage: malware and phishing prevention",
          "Data exfiltration protection via DLP and encryption",
          "Insider threat monitoring through user behavior analytics",
          "Secure remote access to eliminate remote access vulnerabilities",
          "Traffic optimization to reduce network congestion and performance issues"
        ],
        benefits: [
          { title: "Connect Anywhere", description: "Securely connect to corporate data and applications from anywhere.", iconName: "MapPin" },
          { title: "Policy Enforcement", description: "Industry-standard and corporate policies enforced on users.", iconName: "FileCheck" },
          { title: "Secure Connectivity", description: "Combines network and security functions for reliable access.", iconName: "Lock" },
          { title: "Deep Visibility", description: "Visibility into user activity across cloud, apps, and corporate network.", iconName: "Eye" },
          { title: "Zero Trust Access", description: "Implements ZTNA to secure internet access.", iconName: "Shield" },
          { title: "Better ROI", description: "Eliminates multiple point solutions with a single pane of glass.", iconName: "TrendingUp" }
        ]
      },
      {
        name: "Managed Next Gen Firewalls",
        description: "Comprehensive managed firewall services protecting network and cloud infrastructure.",
        fullDescription: [
          "Cyber threats evolve rapidly, threatening to overwhelm firewalls and disrupt operations. Our managed firewall services protect network and cloud infrastructure while saving time, money, and resources from consultation and supply through implementation and ongoing management.",
          "Powered by Palo Alto Networks, the service delivers 24x7x365 protection, monitoring, full VPN support, and comprehensive reporting at a fraction of the cost of building in-house capability."
        ],
        features: [
          "24x7x365 Global SOC coverage",
          "Strict SLAs",
          "Certified expert team",
          "Full VPN support",
          "Vendor-agnostic service",
          "Powered by Palo Alto Networks"
        ],
        benefits: [
          { title: "24x7x365 Global SOC", description: "Around-the-clock firewall protection and support.", iconName: "Globe" },
          { title: "Strict SLAs", description: "Threats handled quickly and appropriately by agreed SLAs.", iconName: "Clock" },
          { title: "Certified Expert Team", description: "Analysts certified by Palo Alto Networks and Microsoft.", iconName: "Award" },
          { title: "Full VPN Support", description: "Adapts to remote work with broad VPN support.", iconName: "Network" },
          { title: "Vendor Agnostic", description: "Supports a full range of next-gen firewall vendors.", iconName: "Layers" },
          { title: "Complete Service", description: "Supply, installation, configuration, management, monitoring, and support.", iconName: "CheckCircle2" }
        ]
      },
      {
        name: "Penetration Testing-as-a-service",
        description: "Comprehensive testing to identify exploitable vulnerabilities across your infrastructure.",
        fullDescription: [
          "Identify every vulnerability within your infrastructure. Phezulu Global’s penetration testing highlights and reduces cyber risk through bespoke testing that can be focused or broad and scheduled annually, bi-annually, or more frequently.",
          "Services cover internal and external network assets, wireless, web and mobile applications, code review, build review, IoT/OT, and VPN security. Experienced consultants use the latest tools and bespoke testing apps while minimizing disruption."
        ],
        features: [
          "External Testing",
          "Internal Testing",
          "Wireless Testing",
          "Web Applications Testing",
          "Mobile Applications Testing",
          "Code Review",
          "Build Review",
          "IoT/OT Testing",
          "VPN Testing"
        ],
        benefits: [
          { title: "Continuous Improvement", description: "Supports ongoing development and improvement of infrastructure.", iconName: "TrendingUp" },
          { title: "Safe Launches", description: "Facilitates safe launch of new products and services.", iconName: "Zap" },
          { title: "Compliance Support", description: "Aids compliance and regulatory requirements.", iconName: "FileCheck" },
          { title: "Attack Readiness", description: "Protects against the latest cyber-attacks.", iconName: "ShieldAlert" },
          { title: "Application Assurance", description: "Ensures new mobile or web apps do not reduce security readiness.", iconName: "Shield" },
          { title: "Event Preparedness", description: "Stronger security for major events such as M&A or large contract bids.", iconName: "Briefcase" }
        ]
      },
      {
        name: "Phishing Campaign & Security Awareness Training",
        description: "Equipping employees with the knowledge and skills to recognize cybersecurity risks like phishing scams.",
        fullDescription: [
          "85% of successful data breaches in 2020 involved the human element. Employees are the first line of defense yet often the weakest link. Cybersecurity awareness training turns this weakness into strength by equipping staff to recognize and respond to phishing, password hacks, and social engineering.",
          "Behavior-driven training tailored to individual behaviors with over 15,000 realistic phishing messages delivered during working hours; each employee receives unique emails at different times.",
          "Spear phishing simulations with industry-specific templates, customizable landing pages, simulated attachments, domain spoofing, and reply tracking to mimic CEO fraud attacks.",
          "Security awareness training with extensive courses, videos, and quizzes. An advanced security layer reduces susceptibility by up to 92% and benchmarks against industry standards.",
          "Reporting provides enterprise-level, 360-degree visibility for management and stakeholders. Cyber knowledge assessments evaluate adherence to key security and compliance practices.",
          "Why Cybersecurity Awareness: continuous behavior modeling covering basic hygiene, social engineering, threat recognition/response, attack simulations, security guidelines/policies, and personal responsibilities. Content tailored by country, region, role, and responsibilities; supports compliance with HIPAA, GDPR, PCI DSS, FISMA, and more.",
          "Premium service at industry-beating price: no onboarding/transition fee, monthly subscription, monthly contracts. Highly experienced phishing team with expert guidance, dedicated skilled staff, continuous updates to detect emerging techniques and build a cyber champion workforce.",
          "Phezulu Global’s 5T Approach (referenced in source data) underpins the training methodology."
        ],
        features: ["Behavior-Driven Security Awareness", "Spear Phishing Simulation", "Security Awareness Training", "Enterprise-level Reporting", "Cyber Knowledge Assessments"],
        benefits: [
          { title: "Reduce Risk", description: "Reduces staff susceptibility to phishing attempts by up to 92%.", iconName: "ShieldCheck" },
          { title: "Culture of Awareness", description: "Develop a culture of awareness encouraging good online choices.", iconName: "Users" },
          { title: "Maintain Compliance", description: "Maintain compliance with regulations like HIPAA, GDPR, PCI DSS, and FISMA.", iconName: "FileCheck" },
          { title: "Premium Service", description: "Industry beating price with no onboarding fee and monthly contracts.", iconName: "DollarSign" },
          { title: "Expert Team", description: "Guidance from industry experts and a dedicated, skilled team.", iconName: "Award" }
        ]
      },
      {
        name: "Digital Forensics and Incident Response",
        description: "Investigating and responding to cyber incidents such as data breaches, network intrusions, and malware attacks.",
        fullDescription: [
          "Digital Forensics and Incident Response (DFIR) investigates and responds to cyber incidents such as data breaches, network intrusions, and malware attacks by collecting and analyzing digital evidence to identify scope, contain, and recover.",
          "Organizations need DFIR capabilities for early detection, effective response, damage mitigation, and prevention of future incidents. Rapid detection and containment save significant cost and reduce business interruption.",
          "Phezulu Global’s DFIR-as-a-Service offers specialized expertise, cost-effectiveness, faster response, reduced liability, and scalability. Experienced professionals handle complex cases with the necessary skills, knowledge, and tools.",
          "Types of DFIR services: network forensics, memory forensics, malware analysis, cybercrime investigations, incident response, forensic data recovery, forensic accounting, social media investigations, digital evidence analysis, and cyber threat intelligence."
        ],
        features: [
          "Network Forensics",
          "Memory Forensics",
          "Malware Analysis",
          "Cybercrime Investigations",
          "Incident Response",
          "Forensic Data Recovery",
          "Forensic Accounting",
          "Social Media Investigations",
          "Digital Evidence Analysis",
          "Cyber Threat Intelligence"
        ],
        benefits: [
          { title: "Early Detection", description: "Detect incidents quickly to prevent further damage and reduce breach costs.", iconName: "Search" },
          { title: "Effective Response", description: "Comprehensive investigation, containment, and recovery.", iconName: "Siren" },
          { title: "Damage Mitigation", description: "Limits data loss and business interruption.", iconName: "Shield" },
          { title: "Future Prevention", description: "Identifies vulnerabilities to prevent recurrence.", iconName: "TrendingUp" },
          { title: "Specialized Expertise", description: "Experienced professionals equipped for complex cases.", iconName: "Award" }
        ]
      },
      {
        name: "DLP-as-a-service",
        description: "Cloud-based solution protecting sensitive data in emails, apps, and devices.",
        fullDescription: [
          "DLP-as-a-Service (Data Loss Prevention) is a cloud-based solution that monitors, classifies, and protects sensitive data (like credit card numbers or intellectual property) wherever it lives—whether in emails, cloud apps, or on devices.",
          "It automatically enforces policies to block unauthorized sharing or copying of critical information, ensuring compliance and preventing accidental or malicious data leaks without requiring heavy on-premise infrastructure."
        ],
        features: ["Data Classification", "Policy Enforcement", "Cross-platform Monitoring", "Leak Prevention", "Cloud-based Architecture"],
        benefits: [
          { title: "Protect IP", description: "Protects sensitive IP/Data from unauthorized access.", iconName: "Lock" },
          { title: "Ensure Compliance", description: "Ensures compliance with data protection regulations.", iconName: "FileCheck" },
          { title: "Prevent Leaks", description: "Prevents accidental or malicious data leaks.", iconName: "ShieldAlert" }
        ]
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

// Merge services by slug so that missing backend items are filled with fallback services.
const mergeServices = (fallbackDetails: Pillar['details'], incomingDetails: Pillar['details']) => {
  const safeIncoming = Array.isArray(incomingDetails) ? incomingDetails : [];
  const merged = fallbackDetails.map((fallbackService) => {
    const match = safeIncoming.find(
      (svc) => slugify(svc.name) === slugify(fallbackService.name)
    );
    return match ? { ...fallbackService, ...match } : fallbackService;
  });

  // Include extra services that exist only in backend
  const extra = safeIncoming.filter(
    (svc) =>
      !fallbackDetails.some(
        (fb) => slugify(fb.name) === slugify(svc.name)
      )
  );

  return [...merged, ...extra];
};

// Ensure we always have populated pillars with details by merging backend data with fallbacks
const mergeWithFallbackPillars = (data: Pillar[] | null | undefined): Pillar[] => {
  const safeData: Pillar[] = Array.isArray(data)
    ? data.map((pillar) => ({
        ...pillar,
        services: Array.isArray(pillar.services) ? pillar.services : [],
        details: Array.isArray(pillar.details) ? pillar.details : []
      }))
    : [];

  const merged = FALLBACK_PILLARS.map((fallbackPillar) => {
    const match = safeData.find(
      (p) => slugify(p.title) === slugify(fallbackPillar.title)
    );

    if (!match) return fallbackPillar;

    const details =
      match.details && match.details.length > 0
        ? mergeServices(fallbackPillar.details, match.details)
        : fallbackPillar.details;
    const services =
      match.services && match.services.length > 0
        ? match.services
        : fallbackPillar.services;

    return { ...fallbackPillar, ...match, services, details };
  });

  const extras = safeData.filter(
    (p) =>
      !FALLBACK_PILLARS.some(
        (fallback) => slugify(fallback.title) === slugify(p.title)
      )
  );

  return [...merged, ...extras];
};

export const fetchPillars = async (): Promise<Pillar[]> => {
  if (cache.pillars) {
    cache.pillars = mergeWithFallbackPillars(cache.pillars);
    return cache.pillars;
  }
  try {
    const response = await fetch('http://localhost:5000/api/pillars');
    if (!response.ok) throw new Error('Network response was not ok');
    const data = await response.json();
    const merged = mergeWithFallbackPillars(data);
    cache.pillars = merged;
    return merged;
  } catch (error) {
    console.warn("Backend unreachable (running in preview mode). Using fallback data.", error);
    cache.pillars = mergeWithFallbackPillars(FALLBACK_PILLARS);
    return cache.pillars;
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

    export interface Partner {
    _id?: string;
    name: string;
    logoUrl?: string;
    category?: string;
  }

export interface Photo {
  _id?: string;
  url: string;
  title?: string;
  category?: string;
  date?: string;
}

export interface Employee {
  _id?: string;
  name: string;
  role: string;
  bio?: string;
  image?: string;
  achievement?: string;
  speciality?: string;
  email?: string;
  linkedin?: string;
}
