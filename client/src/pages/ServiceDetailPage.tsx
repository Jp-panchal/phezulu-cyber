import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  ArrowLeft,
  ArrowRight,
  ArrowUp,
  CheckCircle2,
  ShieldAlert,
  Layers,
  MapPin,
  Phone,
  Database,
  Search,
  Siren,
  ShieldCheck,
  Globe,
  Wifi,
  Smartphone,
  Code2,
  FileSearch,
  UserCheck,
  Zap,
  Lock,
  Server,
  Eye,
  RefreshCcw,
  AlertTriangle,
  Clock,
  GraduationCap,
  Network,
  ShoppingBag,
  ListChecks,
  UserMinus,
  TrendingUp,
  ClipboardList,
  Cloud,
  LayoutDashboard,
  Users,
  FileCheck,
  BookOpen,
  Award,
  UserX,
  Mail,
  Crosshair,
  ServerCrash,
  Bot,
  Headphones,
  UserCog,
  Briefcase,
  ChevronUp,
  Maximize,
  DollarSign,
  FileText,
  MailWarning,
  BarChart,
  Unlock,
  Link,
  Bug,
  Fingerprint,
  HardDrive,
  FileCode
} from 'lucide-react';
import { motion } from 'framer-motion';
import { fetchPillars } from '../lib/api';
import type { Pillar, ServiceDetail } from '../types';
import Button from '../components/ui/Button';
import { slugify } from '../lib/slug';
import { useContact } from '../lib/ContactContext';

// Map string icon names to actual components
const ICON_MAP: Record<string, React.ElementType> = {
  'Database': Database,
  'Search': Search,
  'Siren': Siren,
  'Shield': ShieldCheck,
  'ShieldCheck': ShieldCheck,
  'Globe': Globe,
  'Wifi': Wifi,
  'Mobile': Smartphone,
  'Code': Code2,
  'FileSearch': FileSearch,
  'User': UserCheck,
  'Zap': Zap,
  'Lock': Lock,
  'Server': Server,
  'Eye': Eye,
  'RefreshCcw': RefreshCcw,
  'AlertTriangle': AlertTriangle,
  'Clock': Clock,
  'GraduationCap': GraduationCap,
  'Network': Network,
  'ShoppingBag': ShoppingBag,
  'ListChecks': ListChecks,
  'UserMinus': UserMinus,
  'TrendingUp': TrendingUp,
  'ClipboardList': ClipboardList,
  'Cloud': Cloud,
  'LayoutDashboard': LayoutDashboard,
  'Users': Users,
  'FileCheck': FileCheck,
  'BookOpen': BookOpen,
  'Award': Award,
  'UserX': UserX,
  'Mail': Mail,
  'Crosshair': Crosshair,
  'ServerCrash': ServerCrash,
  'Bot': Bot,
  'Headphones': Headphones,
  'UserCog': UserCog,
  'Briefcase': Briefcase,
  'ChevronUp': ChevronUp,
  'Maximize': Maximize,
  'DollarSign': DollarSign,
  'FileText': FileText,
  'ShieldAlert': ShieldAlert,
  'MailWarning': MailWarning,
  'BarChart': BarChart,
  'Unlock': Unlock,
  'Link': Link,
  'Bug': Bug,
  'Fingerprint': Fingerprint,
  'HardDrive': HardDrive,
  'FileCode': FileCode,
  'Layers': Layers, // Default fallback
  'MapPin': MapPin
};

// Reusable Icon + Text grid (Wizard-style)
type GridItem = { title: string; description?: string; iconName?: string };

const IconTextGrid: React.FC<{
  items: GridItem[];
  eyebrow?: string;
  title: string;
  subtitle?: string;
  defaultIcon?: keyof typeof ICON_MAP;
}> = ({ items, eyebrow, title, subtitle, defaultIcon = 'ShieldAlert' }) => {
  const FallbackIcon = ICON_MAP[defaultIcon] || ShieldAlert;
  const getIcon = (name?: string) =>
    name && name in ICON_MAP ? (ICON_MAP as any)[name] : FallbackIcon;

  return (
    <section className="bg-slate-950 py-14 relative overflow-hidden">
      {/* Subtle background animation */}
      <motion.div 
        className="absolute inset-0 opacity-5"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 0.05 }}
        viewport={{ once: true }}
      >
        <div className="absolute top-20 left-10 h-64 w-64 rounded-full bg-crimson blur-3xl" 
          style={{ animation: 'float 6s ease-in-out infinite' }} 
        />
      </motion.div>
      
      <div className="container mx-auto px-6 relative z-10">
        <motion.div 
          className="max-w-4xl mx-auto text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
        >
          {eyebrow && (
            <motion.div 
              className="text-sm font-mono uppercase tracking-[0.25em] text-crimsonLight"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              {eyebrow}
            </motion.div>
          )}
          <motion.h3 
            className="text-3xl md:text-4xl font-heading font-bold text-white mt-2 mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            {title}
          </motion.h3>
          {subtitle && (
            <motion.p 
              className="text-slate-300"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              {subtitle}
            </motion.p>
          )}
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {items.map((item, idx) => {
            const Icon = getIcon(item.iconName);
            return (
              <motion.div
                key={`${item.title}-${idx}`}
                className="rounded-2xl bg-midnight border border-slate-800 p-7 shadow-lg shadow-black/20 hover:border-crimson/50 transition-all duration-300 group cursor-pointer"
                initial={{ opacity: 0, y: 30, scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ 
                  duration: 0.5, 
                  delay: idx * 0.08,
                  ease: [0.21, 0.47, 0.32, 0.98]
                }}
                whileHover={{ 
                  y: -8, 
                  scale: 1.02,
                  transition: { duration: 0.3 }
                }}
              >
                <motion.div 
                  className="mb-4 inline-flex items-center justify-center w-12 h-12 rounded-full bg-crimson/15 text-crimson group-hover:bg-crimson/25 transition-colors"
                  whileHover={{ 
                    rotate: [0, -10, 10, -10, 0],
                    scale: 1.1
                  }}
                  transition={{ duration: 0.5 }}
                >
                  <Icon size={26} />
                </motion.div>
                <h4 className="text-xl font-bold text-white mb-2 group-hover:text-crimson transition-colors">
                  {item.title}
                </h4>
                {item.description && (
                  <p className="text-slate-400 text-sm leading-relaxed">
                    {item.description}
                  </p>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

const ServiceDetailPage: React.FC = () => {
  const { pillarSlug, serviceSlug } = useParams();
  const navigate = useNavigate();
  const { openContact } = useContact();

  const [pillar, setPillar] = useState<Pillar | null>(null);
  const [service, setService] = useState<ServiceDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [scrollProgress, setScrollProgress] = useState(0);

  // Track scroll progress for visual indicator
  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (window.scrollY / totalHeight) * 100;
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const load = async () => {
      try {
        const data = await fetchPillars();
        
        // Debug logging
        console.log('Loading service:', { pillarSlug, serviceSlug });
        console.log('Available pillars:', data.map(p => ({ title: p.title, slug: slugify(p.title) })));
        
        const matchedPillar = data.find(p => slugify(p.title) === pillarSlug) || null;
        
        if (matchedPillar) {
          console.log('Matched pillar:', matchedPillar.title);
          console.log('Available services in pillar:', matchedPillar.details.map(s => ({ name: s.name, slug: slugify(s.name) })));
        } else {
          console.warn('No pillar matched for slug:', pillarSlug);
          console.log('Trying to find by partial match...');
          // Try case-insensitive or partial match as fallback
          const partialMatch = data.find(p => 
            slugify(p.title).toLowerCase() === pillarSlug?.toLowerCase() ||
            p.title.toLowerCase().includes(pillarSlug?.toLowerCase() || '')
          );
          if (partialMatch) {
            console.log('Found partial match:', partialMatch.title);
            setPillar(partialMatch);
            const matchedService = partialMatch.details.find(s => 
              slugify(s.name) === serviceSlug ||
              slugify(s.name).toLowerCase() === serviceSlug?.toLowerCase()
            ) || null;
            setService(matchedService);
            setLoading(false);
            return;
          }
        }
        
        const matchedService = matchedPillar?.details.find(s => 
          slugify(s.name) === serviceSlug ||
          slugify(s.name).toLowerCase() === serviceSlug?.toLowerCase()
        ) || null;
        
        if (!matchedService && matchedPillar) {
          console.warn('No service matched for slug:', serviceSlug);
          console.log('Trying to find by partial match...');
          const partialServiceMatch = matchedPillar.details.find(s => 
            slugify(s.name).toLowerCase().includes(serviceSlug?.toLowerCase() || '') ||
            s.name.toLowerCase().includes(serviceSlug?.toLowerCase() || '')
          );
          if (partialServiceMatch) {
            console.log('Found partial service match:', partialServiceMatch.name);
            setService(partialServiceMatch);
            setPillar(matchedPillar);
            setLoading(false);
            return;
          }
        }
        
        // If still no match, try searching across all pillars (in case pillar slug is wrong)
        if (!matchedService || !matchedPillar) {
          console.log('Searching across all pillars for service...');
          for (const p of data) {
            const serviceMatch = p.details.find(s => 
              slugify(s.name) === serviceSlug ||
              slugify(s.name).toLowerCase() === serviceSlug?.toLowerCase() ||
              slugify(s.name).toLowerCase().includes(serviceSlug?.toLowerCase() || '')
            );
            if (serviceMatch) {
              console.log('Found service in pillar:', p.title);
              setPillar(p);
              setService(serviceMatch);
              setLoading(false);
              return;
            }
          }
        }
        
        setPillar(matchedPillar);
        setService(matchedService);
      } catch (error) {
        console.error('Error loading service:', error);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [pillarSlug, serviceSlug]);

  const summaryParagraphs = useMemo(() => {
    if (!service) return [];
    const paragraphs = service.fullDescription && service.fullDescription.length > 0
      ? service.fullDescription
      : [
        service.description,
        'Our approach blends human-led expertise with automation to surface, validate, and remediate risk without disrupting operations.',
        'Engagements are tailored to your stack and regulatory landscape, pairing rapid discovery with clear remediation guidance.'
      ];
    return paragraphs.filter(Boolean).slice(0, 6); // keep it concise on the page
  }, [service]);

  const features = service?.features && service.features.length > 0 ? service.features : [
    'Threat-led scoping aligned to business risk',
    'Continuous visibility with concise executive readouts',
    'Detections tuned to your environment',
    'Hands-on remediation guidance and validation'
  ];

  const benefitsNormalized = useMemo(() => {
    if (!service?.benefits || service.benefits.length === 0) {
      return features.map(f => ({ title: typeof f === 'string' ? f : (f as any).title, description: typeof f === 'string' ? '' : (f as any).description, iconName: 'ShieldCheck' }));
    }
    return service.benefits.map((benefit: any) => {
      if (typeof benefit === 'string') {
        const [title, ...rest] = benefit.split(':');
        return { title: title || service.name, description: rest.join(':').trim(), iconName: 'ShieldCheck' };
      }
      return benefit;
    });
  }, [service, features]);

  const faqs = useMemo(() => {
    if (!service) return [];
    const baseAnswers = summaryParagraphs;
    return [
      {
        q: `What is ${service.name}?`,
        a: baseAnswers[0] || service.description
      },
      {
        q: `How does ${service.name} work?`,
        a: service.processSteps && service.processSteps.length > 0
          ? service.processSteps.map(s => `${s.title}: ${s.description}`).join(' ')
          : baseAnswers[1] || service.description
      },
      {
        q: `What does ${service.name} protect against?`,
        a: 'It addresses modern threats across your estate, combining 24x7 monitoring, investigation, and rapid response with expert guidance.'
      },
      {
        q: `Why choose Phezulu Global for ${service.name}?`,
        a: benefitsNormalized.slice(0, 3).map(b => b.title).join(', ')
      }
    ];
  }, [service, summaryParagraphs, benefitsNormalized]);



  if (loading) {
    return (
      <div className="container mx-auto px-6 py-24 text-slate-400">
        Loading service...
      </div>
    );
  }

  if (!pillar || !service) {
    return (
      <div className="container mx-auto px-6 py-24 text-slate-200">
        <div className="max-w-3xl space-y-6">
          <div className="text-sm font-mono text-slate-500 uppercase tracking-widest">Service Not Found</div>
          <h1 className="text-3xl md:text-4xl font-heading font-bold text-white">We couldn’t find that service.</h1>
          <p className="text-slate-400 text-lg">Check the link or return to the catalog.</p>
          <div className="flex flex-wrap gap-3">
            <Button onClick={() => navigate('/#services')} variant="outline" icon={<ArrowLeft size={16} />}>
              Back to Services
            </Button>
            <Button onClick={() => navigate('/')}>Go Home</Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-midnight">
      {/* Scroll Progress Indicator */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-crimson z-50 origin-left"
        style={{ scaleX: scrollProgress / 100 }}
        initial={{ scaleX: 0 }}
        animate={{ scaleX: scrollProgress / 100 }}
        transition={{ duration: 0.1 }}
      />

      {/* Hero Section - WizardCyber style */}
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 pb-16 pt-24">
        <motion.div 
          className="absolute inset-0 opacity-20"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.2 }}
          transition={{ duration: 1 }}
        >
          <motion.div 
            className="absolute -left-20 -top-32 h-96 w-96 rounded-full bg-crimson/25 blur-3xl"
            animate={{ 
              scale: [1, 1.2, 1],
              x: [0, 20, 0],
              y: [0, -20, 0]
            }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div 
            className="absolute right-10 bottom-0 h-96 w-96 rounded-full bg-sapphire/20 blur-3xl"
            animate={{ 
              scale: [1, 1.3, 1],
              x: [0, -20, 0],
              y: [0, 20, 0]
            }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          />
        </motion.div>

        <div className="container mx-auto px-6 relative z-10">
          <motion.button
            onClick={() => navigate(-1)}
            className="mb-6 inline-flex items-center gap-2 text-sm text-slate-400 hover:text-white transition-colors"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            whileHover={{ x: -5 }}
          >
            <ArrowLeft size={18} /> Back
          </motion.button>
          <div className="max-w-5xl space-y-4">
            <motion.div 
              className="text-sm font-mono uppercase tracking-[0.3em] text-crimsonLight"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              {pillar.title}
            </motion.div>
            <motion.h1 
              className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-white leading-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              {service.name}
            </motion.h1>
            <motion.p 
              className="text-slate-300 text-lg md:text-xl leading-relaxed max-w-3xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              {service.description}
            </motion.p>
            <motion.div 
              className="flex flex-wrap gap-3 pt-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <Button onClick={openContact} icon={<Phone size={18} />} className="gap-2 px-6 py-3 text-base">
                Book a Meeting
              </Button>
              <Button
                onClick={() => navigate('/#contact')}
                variant="outline"
                icon={<ArrowRight size={18} />}
                className="gap-2 px-6 py-3 text-base"
              >
                Request a Quote
              </Button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Overview */}
      <section className="bg-midnight py-12 md:py-16">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10 items-start">
            <motion.div 
              className="space-y-4"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6 }}
            >
              <div className="text-sm font-mono uppercase tracking-[0.25em] text-crimsonLight">Overview</div>
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-white">
                Why choose {service.name}
              </h2>
              <p className="text-slate-300">
                {service.description}
              </p>
            </motion.div>
            <motion.div 
              className="space-y-3 text-slate-300 leading-relaxed"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              {summaryParagraphs.map((para, idx) => (
                <motion.p 
                  key={idx}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.3 + idx * 0.1 }}
                >
                  {para}
                </motion.p>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Icon + Text combo grid (applies to all services) */}
      <IconTextGrid
        items={benefitsNormalized}
        eyebrow="Identify Vulnerability"
        title={`Comprehensive ${service.name}`}
        subtitle="We’ve curated core areas to cover your organisation’s environment while keeping disruption to a minimum."
        defaultIcon="ShieldCheck"
      />

      {/* How it works */}
      {service.processSteps && service.processSteps.length > 0 && (
        <section className="bg-midnight py-14 relative">
          <div className="container mx-auto px-6">
            <motion.div 
              className="max-w-4xl mx-auto text-center mb-12"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6 }}
            >
              <motion.div 
                className="text-sm font-mono uppercase tracking-[0.25em] text-crimsonLight"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                How it works
              </motion.div>
              <motion.h3 
                className="text-3xl md:text-4xl font-heading font-bold text-white mt-2"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                How our {service.name} works
              </motion.h3>
            </motion.div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10 relative">
              {/* Connecting line for desktop */}
              <motion.div 
                className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-slate-800 to-transparent"
                initial={{ scaleY: 0 }}
                whileInView={{ scaleY: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 0.5 }}
              />
              
              {service.processSteps.map((step, idx) => (
                <motion.div
                  key={idx}
                  className="flex gap-4 p-6 rounded-xl bg-slate-950 border border-slate-800 hover:border-crimson/50 transition-all duration-300 group relative"
                  initial={{ opacity: 0, x: idx % 2 === 0 ? -30 : 30, y: 20 }}
                  whileInView={{ opacity: 1, x: 0, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.5, delay: idx * 0.15 }}
                  whileHover={{ scale: 1.02, y: -5 }}
                >
                  <motion.div 
                    className="w-10 h-10 rounded-full bg-crimson/20 text-crimson flex items-center justify-center font-bold shrink-0 group-hover:bg-crimson group-hover:text-white transition-all"
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.6 }}
                  >
                    {step.stepNumber || idx + 1}
                  </motion.div>
                  <div>
                    <h4 className="text-lg font-bold text-white mb-1 group-hover:text-crimson transition-colors">
                      {step.title}
                    </h4>
                    <p className="text-slate-400 text-sm leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Aspects / Components */}
      {(!service.processSteps && service.aspects && service.aspects.length > 0) && (
        <IconTextGrid
          items={service.aspects}
          eyebrow="Components"
          title="Service Components"
          defaultIcon="Layers"
        />
      )}

      {/* FAQs */}
      {faqs.length > 0 && (
        <section className="bg-midnight py-14">
          <div className="container mx-auto px-6">
            <motion.div 
              className="max-w-4xl mx-auto text-center mb-10"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6 }}
            >
              <motion.div 
                className="text-sm font-mono uppercase tracking-[0.25em] text-crimsonLight"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                FAQ
              </motion.div>
              <motion.h3 
                className="text-3xl md:text-4xl font-heading font-bold text-white mt-2"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                Managed {service.name} FAQs
              </motion.h3>
              <motion.p 
                className="text-slate-300 mt-3"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                Answers to common questions about how we deliver and support this service.
              </motion.p>
            </motion.div>
            <div className="max-w-4xl mx-auto space-y-4">
              {faqs.map((item, idx) => (
                <motion.details 
                  key={idx} 
                  className="group bg-slate-950 border border-slate-800 rounded-xl p-5 open:border-crimson/50 hover:border-slate-700 transition-all"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.4, delay: idx * 0.1 }}
                  whileHover={{ x: 5 }}
                >
                  <summary className="flex items-center justify-between cursor-pointer text-white text-lg font-semibold">
                    <span>{item.q}</span>
                    <ChevronUp className="transition-transform group-open:rotate-180 text-slate-400" size={18} />
                  </summary>
                  <motion.p 
                    className="text-slate-300 mt-3 leading-relaxed text-sm"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3, delay: 0.1 }}
                  >
                    {item.a}
                  </motion.p>
                </motion.details>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="bg-slate-950 py-14">
        <div className="container mx-auto px-6">
          <motion.div
            className="bg-gradient-to-r from-slate-900 to-slate-800 rounded-3xl p-8 md:p-12 relative overflow-hidden border border-slate-700 hover:border-crimson/50 transition-colors"
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, ease: [0.21, 0.47, 0.32, 0.98] }}
            whileHover={{ scale: 1.02 }}
          >
            <motion.div 
              className="absolute right-0 top-0 h-full w-1/2 bg-crimson/5 skew-x-12 transform origin-bottom-right pointer-events-none"
              initial={{ x: 100, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3 }}
            />
            <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-8 text-center lg:text-left">
              <motion.div 
                className="space-y-4 max-w-2xl"
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <h3 className="text-2xl md:text-3xl font-heading font-bold text-white">
                  Ready to secure your infrastructure?
                </h3>
                <p className="text-slate-300 text-base">
                  Get a custom proposal tailored to your specific environment and regulatory requirements.
                </p>
              </motion.div>
              <motion.div 
                className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto"
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.5 }}
              >
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button onClick={openContact} className="gap-2 px-6 py-3 text-base w-full sm:w-auto justify-center" icon={<Phone size={18} />}>
                    Talk to an expert
                  </Button>
                </motion.div>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button variant="outline" className="gap-2 px-6 py-3 text-base w-full sm:w-auto justify-center" onClick={() => navigate('/#contact')} icon={<ArrowRight size={18} />}>
                    Request Quote
                  </Button>
                </motion.div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Floating Scroll to Top Button */}
      {scrollProgress > 20 && (
        <motion.button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="fixed bottom-8 right-8 p-4 rounded-full bg-crimson text-white shadow-2xl hover:bg-crimson/90 transition-colors z-40 group"
          initial={{ opacity: 0, scale: 0, y: 100 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0, y: 100 }}
          whileHover={{ scale: 1.1, y: -5 }}
          whileTap={{ scale: 0.9 }}
          transition={{ duration: 0.3 }}
        >
          <ArrowUp size={24} className="group-hover:animate-bounce" />
        </motion.button>
      )}
    </div>
  );
};

// Helper to check if string is a valid icon key
function isActiveIcon(key: string): key is keyof typeof ICON_MAP {
  return key in ICON_MAP;
}

export default ServiceDetailPage;
