import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Shield,
  Sparkles,
  ShieldAlert,
  Layers,
  MapPin,
  Phone
} from 'lucide-react';
import { fetchPillars } from '../lib/api';
import type { Pillar, ServiceDetail } from '../types';
import Button from '../components/ui/Button';
import { slugify } from '../lib/slug';
import { useContact } from '../lib/ContactContext';

const ServiceDetailPage: React.FC = () => {
  const { pillarSlug, serviceSlug } = useParams();
  const navigate = useNavigate();
  const { openContact } = useContact();

  const [pillar, setPillar] = useState<Pillar | null>(null);
  const [service, setService] = useState<ServiceDetail | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const data = await fetchPillars();
        const matchedPillar = data.find(p => slugify(p.title) === pillarSlug) || null;
        const matchedService = matchedPillar?.details.find(s => slugify(s.name) === serviceSlug) || null;
        setPillar(matchedPillar);
        setService(matchedService);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [pillarSlug, serviceSlug]);

  const summaryParagraphs = useMemo(() => {
    if (!service) return [];
    return service.fullDescription && service.fullDescription.length > 0
      ? service.fullDescription
      : [
          service.description,
          'Our approach blends human-led expertise with automation to surface, validate, and remediate risk without disrupting operations.',
          'Engagements are tailored to your stack and regulatory landscape, pairing rapid discovery with clear remediation guidance.'
        ];
  }, [service]);

  const features = service?.features && service.features.length > 0 ? service.features : [
    'Threat-led scoping aligned to business risk',
    'Continuous visibility with concise executive readouts',
    'Detections tuned to your environment',
    'Hands-on remediation guidance and validation'
  ];

  const outcomes = service?.benefits && service.benefits.length > 0 ? service.benefits : [
    'Reduce time-to-detect and time-to-respond',
    'Lower operational noise for internal teams',
    'Evidence-backed compliance posture',
    'Board-ready reporting and prioritization'
  ];

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
    <div className="min-h-screen">
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-slate-950 to-midnight pb-16 pt-28">
        <div className="absolute inset-0 opacity-30">
          <div className="absolute -left-10 -top-20 h-72 w-72 rounded-full bg-crimson/20 blur-3xl" />
          <div className="absolute right-0 bottom-0 h-96 w-96 rounded-full bg-sapphire/20 blur-3xl" />
        </div>
        <div className="container mx-auto px-6 relative">
          <button
            onClick={() => navigate(-1)}
            className="mb-6 inline-flex items-center gap-2 text-sm text-slate-400 hover:text-white transition-colors"
          >
            <ArrowLeft size={18} /> Back
          </button>
          <div className="flex flex-col lg:flex-row gap-10 items-start">
            <div className="flex-1 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-crimson/15 border border-crimson/30 text-xs font-mono text-crimsonLight uppercase tracking-widest">
                {pillar.title}
              </div>
              <h1 className="text-4xl md:text-5xl font-heading font-bold text-white leading-tight">
                {service.name}
              </h1>
              <p className="text-slate-300 text-lg max-w-3xl">
                {service.description}
              </p>
              <div className="flex flex-wrap gap-3 pt-2">
                <Button onClick={openContact} icon={<Phone size={16} />} className="gap-2">
                  Book a Meeting
                </Button>
                <Button
                  onClick={() => navigate('/#contact')}
                  variant="outline"
                  icon={<ArrowRight size={16} />}
                  className="gap-2"
                >
                  Request a Quote
                </Button>
              </div>
            </div>
            <div className="w-full lg:w-96 space-y-4 bg-slate-900/50 border border-slate-800 rounded-2xl p-6 backdrop-blur">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-xl bg-slate-800 border border-slate-700">
                  <ShieldAlert className="text-crimson" size={24} />
                </div>
                <div>
                  <div className="text-xs uppercase text-slate-500 font-bold tracking-widest">Engagement Scope</div>
                  <div className="text-white font-semibold">{pillar.subtitle}</div>
                </div>
              </div>
              <div className="text-sm text-slate-400 leading-relaxed">
                Coverage across the full attack surface with clear remediation guidance and rapid escalation paths.
              </div>
              <div className="flex items-center gap-2 text-sm text-slate-300">
                <MapPin size={16} className="text-crimson" /> Available globally with regional delivery pods.
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="relative bg-midnight py-16">
        <div className="container mx-auto px-6 grid lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2 space-y-8">
            <div className="space-y-4">
              <div className="text-xs font-mono uppercase tracking-widest text-slate-500">Executive Overview</div>
              <h2 className="text-2xl font-heading font-bold text-white">What we deliver</h2>
              <div className="space-y-4 text-slate-300 leading-relaxed">
                {summaryParagraphs.map((para, idx) => (
                  <p key={idx}>{para}</p>
                ))}
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-6 space-y-4">
                <div className="flex items-center gap-2 text-white font-semibold">
                  <CheckCircle2 className="text-green-500" size={18} /> Key Capabilities
                </div>
                <ul className="space-y-3 text-slate-300 text-sm">
                  {features.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <span className="mt-1 h-1.5 w-1.5 rounded-full bg-slate-600" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-gradient-to-br from-crimson/10 to-transparent border border-crimson/30 rounded-xl p-6 space-y-4">
                <div className="flex items-center gap-2 text-white font-semibold">
                  <Shield className="text-crimson" size={18} /> Business Outcomes
                </div>
                <ul className="space-y-3 text-slate-200 text-sm">
                  {outcomes.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <ArrowRight className="text-crimson mt-0.5" size={14} />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6">
              <div className="flex items-center gap-2 text-white font-semibold mb-4">
                <Layers className="text-amber" size={18} /> Delivery Tracks
              </div>
              <ul className="space-y-3 text-slate-300 text-sm">
                <li className="flex items-start gap-3">
                  <Sparkles className="text-crimson mt-0.5" size={14} />
                  Discovery & threat-led scoping tailored to your environment.
                </li>
                <li className="flex items-start gap-3">
                  <Sparkles className="text-crimson mt-0.5" size={14} />
                  Execution with weekly checkpoints and transparent findings.
                </li>
                <li className="flex items-start gap-3">
                  <Sparkles className="text-crimson mt-0.5" size={14} />
                  Remediation sprints with validation and executive reporting.
                </li>
              </ul>
            </div>

            <div className="bg-gradient-to-br from-slate-900 to-slate-950 border border-slate-800 rounded-2xl p-6 space-y-4">
              <div className="text-xs font-mono uppercase tracking-widest text-slate-500">Next Steps</div>
              <h3 className="text-xl font-heading font-bold text-white">Ready to move?</h3>
              <p className="text-slate-300 text-sm">Share your requirements and we’ll tailor scope, pricing, and a start date within one business day.</p>
              <div className="flex flex-col gap-3">
                <Button onClick={openContact} className="gap-2" icon={<Phone size={16} />}>Talk to an expert</Button>
                <Button variant="outline" className="gap-2" onClick={() => navigate('/#contact')} icon={<ArrowRight size={16} />}>
                  Request proposal
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ServiceDetailPage;
