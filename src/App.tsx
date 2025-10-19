import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LogoMarquee from './components/LogoMarquee';
import MidnightNexus from './components/MidnightNexus';
import { DottedSurface } from './components/ui/dotted-surface';
import { GlowingEffect } from './components/ui/glowing-effect';
import { NavigationSlideTabs } from './components/ui/slide-tabs';
import { Meteors } from './components/ui/meteors';
import ROICalculator from './components/ROICalculator';
import AILoaderDemo from './components/AILoaderDemo';
import { 
  PhoneCall,
  PhoneOff,
  Calendar,
  Clock,
  TrendingUp,
  Users,
  XCircle,
  CheckCircle,
  Zap,
  ChevronRight,
  Globe,
  Bot,
  Settings,
  Database,
  X,
  Mail
} from 'lucide-react';

const AdminPageLazy = React.lazy(() => import("@/pages/Admin"));

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/admin" element={
          <React.Suspense fallback={<div className="min-h-screen bg-gray-900 text-white flex items-center justify-center"><div className="text-xl">Loading...</div></div>}>
            <AdminPageLazy />
          </React.Suspense>
        } />
        <Route path="/" element={<MainApp />} />
      </Routes>
    </Router>
  );
}

function MainApp() {
  const [openFaq, setOpenFaq] = useState(null);
  const [activeService, setActiveService] = useState<number | null>(null);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (activeService !== null) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    // Cleanup function to reset overflow when component unmounts
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [activeService]);

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const testimonials = [
    {
      text: "Within a week, our bookings jumped 30%. The voice agent handles calls better than our old receptionist.",
      name: "Sarah Johnson",
      company: "Johnson Plumbing",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=64&h=64&fit=crop&crop=face"
    },
    {
      text: "We went from missing 60% of calls to answering every single one. Game changer for our business.",
      name: "Mike Rodriguez",
      company: "Rodriguez HVAC",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=64&h=64&fit=crop&crop=face"
    },
    {
      text: "The AI books appointments while I'm on job sites. It's like having a full-time receptionist for free.",
      name: "Lisa Chen",
      company: "Chen Electrical",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=64&h=64&fit=crop&crop=face"
    }
  ];

  const faqs = [
    {
      question: "Will this replace my receptionist?",
      answer: "It can do both, either replace your receptionist or enhance your team. The AI handles routine calls and booking while your staff focuses on complex customer needs and in-person service."
    },
    {
      question: "Does it work with my CRM?",
      answer: "Yes! We integrate with all major CRMs including GoHighLevel, HubSpot, Salesforce, and custom systems. All leads are automatically logged and tracked."
    },
    {
      question: "What about accents and compliance?",
      answer: "Our AI is trained on diverse speech patterns and accents. For regulated industries, we ensure full compliance with HIPAA, TCPA, and other requirements."
    },
    {
      question: "Can it handle after-hours calls?",
      answer: "Absolutely! The AI works 24/7, capturing leads and booking appointments even when your business is closed. No more missed opportunities just because you couldn't answer in time."
    },
    {
      question: "How quickly can we get started?",
      answer: "Usually, setup takes 24–48 hours. We'll have your voice agent answering calls and booking appointments ASAP."
    }
  ];

  const services = [
    {
      icon: PhoneCall,
      title: "AI Voice Agents",
      tagline: "Never miss a call, never lose a lead.",
      overview: "Never miss another lead with AI-powered voice agents that handle calls professionally while you focus on running your business.",
      benefits: [
        "24/7 call coverage with no breaks",
        "Instant lead qualification and scoring",
        "Automatic appointment booking",
        "Natural conversation flow"
      ],
      results: "80% fewer missed calls, 35% increase in bookings",
      accent: "from-blue-500 to-cyan-400"
    },
    {
      icon: Globe,
      title: "Website Creation",
      tagline: "Websites that convert visitors into customers.",
      overview: "Professional websites designed to convert visitors into customers with modern design and lightning-fast performance.",
      benefits: [
        "Mobile-first responsive design",
        "SEO optimized for local search",
        "Fast loading times under 3 seconds",
        "Conversion-focused layouts"
      ],
      results: "3x higher conversion rates, 50% more organic traffic",
      accent: "from-purple-500 to-pink-400"
    },
    {
      icon: Bot,
      title: "AI Automations",
      tagline: "Grow your business effortlessly with systems that work while you sleep",
      overview: "Automate repetitive tasks and complex workflows so your team can focus on high-value activities that grow your business.",
      benefits: [
        "Custom workflow automation",
        "CRM and tool integrations",
        "Smart lead nurturing sequences",
        "Automated follow-up systems"
      ],
      results: "15+ hours saved weekly, 40% faster response times",
      accent: "from-green-500 to-emerald-400"
    },
    {
      icon: Calendar,
      title: "Appointment Booking Systems",
      tagline: "Seamless scheduling that syncs with calendars automatically.",
      overview: "Eliminate scheduling back-and-forth with intelligent booking systems that work around your availability and preferences.",
      benefits: [
        "Two-way calendar synchronization",
        "Automated confirmation and reminders",
        "Buffer times and availability rules",
        "Payment collection at booking"
      ],
      results: "60% reduction in no-shows, 25% more appointments booked",
      accent: "from-orange-500 to-yellow-400"
    },
    {
      icon: Database,
      title: "CRM Setup & Optimization",
      tagline: "Organize leads and optimize pipelines for maximum conversions.",
      overview: "Transform your lead management with properly configured CRM systems that track every interaction and maximize conversion rates.",
      benefits: [
        "Complete pipeline optimization",
        "Lead scoring and segmentation",
        "Automated task assignments",
        "Detailed reporting and analytics"
      ],
      results: "45% higher close rates, 30% improvement in lead tracking",
      accent: "from-indigo-500 to-purple-400"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Navigation */}
      <nav className="fixed w-full bg-gray-900/95 backdrop-blur-lg z-50 border-b border-gray-800">
        <div className="container mx-auto pl-1 pr-6 py-4">
          <div className="flex items-center justify-between">
            <div className="text-xl font-bold text-white mr-8" style={{ fontFamily: 'Sen, sans-serif' }}>
              KurboLogic
            </div>
            <div className="hidden md:flex space-x-10 ml-auto mr-6">
              <NavigationSlideTabs />
            </div>
            <button className="hidden md:block bg-blue-600 hover:bg-blue-700 px-2 md:px-6 py-2 rounded-lg transition-colors font-semibold text-xs md:text-base whitespace-nowrap">
              <a href="https://calendly.com/arliqosja014/new-meeting" target="_blank" rel="noopener noreferrer" className="block">
                Book Free Consultation
              </a>
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="hero bg-[linear-gradient(to_bottom,#0A1220,#0B1526)] pt-24 sm:pt-28 lg:pt-32 pb-14 sm:pb-16">
        <div className="hero-inner">
          <div className="hero-content">
            <div className="hero-text">
              <h1 className="hero-title">Never Miss Another Customer Again.</h1>
              <p className="hero-subtitle">
                Our AI Voice Agents answer every call instantly, qualify leads, and book appointments automatically - even while you sleep.
              </p>
            </div>
            <div className="hero-buttons-wrapper">
              <div className="hero-buttons">
                <a href="https://calendly.com/arliqosja014/new-meeting" target="_blank" rel="noopener noreferrer" className="hero-btn hero-btn-primary">Book a Free Consultation</a>
                <button 
                  className="hero-btn hero-btn-outline"
                  onClick={() => {
                    const voiceAgentSection = document.getElementById('voice-agent-demo');
                    if (voiceAgentSection) {
                      voiceAgentSection.scrollIntoView({ behavior: 'smooth' });
                    }
                  }}
                >
                  See the Voice Agent in Action
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* AI Voice Agent Demo Section */}
      <section id="voice-agent-demo" className="py-16 bg-gray-800/30">
        <div className="container mx-auto max-w-4xl px-4 text-center">
          <h2 className="text-2xl font-bold text-white mb-4">Try Our AI Voice Agent</h2>
          <p className="text-gray-300 mb-8">Hear how it sounds on real calls</p>
          <div className="relative inline-block">
            <AILoaderDemo />
          </div>
        </div>
      </section>

      {/* Site-wide animated background wrapper - starts after hero */}
      <div className="relative">
        {/* Animated Background */}
        <DottedSurface className="fixed inset-0 z-0" />
        
        {/* Background Overlay for readability */}
        <div className="absolute inset-0 bg-gray-900/75 z-10"></div>
        
        {/* All content sections with relative positioning */}
        <div className="relative z-20">

          {/* Problem vs Solution */}
          <section className="py-20">
            <div className="container mx-auto max-w-6xl px-4">
              <div className="grid md:grid-cols-2 gap-12">
                {/* Without Us */}
                <div className="text-center space-y-6">
                  <div className="w-24 h-24 mx-auto bg-red-500/20 rounded-full flex items-center justify-center">
                    <PhoneOff className="w-12 h-12 text-red-500" />
                  </div>
                  <h2 className="text-xl sm:text-2xl font-semibold text-red-400">Without AI</h2>
                  <div className="space-y-2 text-white/80">
                    <div className="flex items-center space-x-3">
                      <div className="w-6 h-6 rounded-full bg-red-500 flex-shrink-0" />
                      <span>Customers hang up and call competitors</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-6 h-6 rounded-full bg-red-500 flex-shrink-0" />
                      <span>80% of missed calls become lost revenue</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-6 h-6 rounded-full bg-red-500 flex-shrink-0" />
                      <span>Money walking out the door daily</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-6 h-6 rounded-full bg-red-500 flex-shrink-0" />
                      <span>Your competitors capture your leads</span>
                    </div>
                  </div>
                </div>

                {/* With AI */}
                <div className="text-center space-y-6">
                  <div className="w-24 h-24 mx-auto bg-green-500/20 rounded-full flex items-center justify-center">
                    <Calendar className="w-12 h-12" style={{ color: '#15C98F' }} />
                  </div>
                  <h2 className="text-xl sm:text-2xl font-semibold" style={{ color: '#15C98F' }}>With AI</h2>
                  <div className="space-y-2 text-white/80">
                    <div className="flex items-center space-x-3">
                      <CheckCircle className="w-6 h-6 flex-shrink-0" style={{ stroke: '#15C98F' }} />
                      <span>Every call answered instantly</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <CheckCircle className="w-6 h-6 flex-shrink-0" style={{ stroke: '#15C98F' }} />
                      <span>Jobs booked automatically 24/7</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <CheckCircle className="w-6 h-6 flex-shrink-0" style={{ stroke: '#15C98F' }} />
                      <span>Revenue recovered and maximized</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <CheckCircle className="w-6 h-6 flex-shrink-0" style={{ stroke: '#15C98F' }} />
                      <span>You win every time</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Stats Section */}
          <section className="py-20">
            <div className="container mx-auto max-w-6xl px-4">
              <div className="grid md:grid-cols-4 gap-8">
                <div className="text-center space-y-4 p-6 bg-gray-800/50 rounded-xl">
                  <div className="flex justify-center">
                    <Zap className="w-8 h-8 text-yellow-500" />
                  </div>
                  <div className="text-xl font-bold text-white">Speed wins customers</div>
                  <div className="text-gray-400">Competitors take the job if you don't answer.</div>
                </div>
                <div className="text-center space-y-4 p-6 bg-gray-800/50 rounded-xl">
                  <div className="flex justify-center">
                    <Clock className="w-8 h-8 text-orange-500" />
                  </div>
                  <div className="text-xl font-bold text-white">24/7 lead capture</div>
                  <div className="text-gray-400">Opportunities slip away when no one picks up.</div>
                </div>
                <div className="text-center space-y-4 p-6 bg-gray-800/50 rounded-xl">
                  <div className="flex justify-center">
                    <PhoneCall className="w-8 h-8 text-green-500" />
                  </div>
                  <div className="text-xl font-bold text-white">Never miss a call again</div>
                  <div className="text-gray-400">Respond to every incoming call.</div>
                </div>
                <div className="text-center space-y-4 p-6 bg-gray-800/50 rounded-xl">
                  <div className="flex justify-center">
                    <Calendar className="w-8 h-8 text-blue-500" />
                  </div>
                  <div className="text-xl font-bold text-white">25–40% more jobs booked</div>
                  <div className="text-gray-400">Turn every call into real revenue.</div>
                </div>
              </div>
            </div>
          </section>

          {/* Services Section */}
          <section id="services" className="py-20 relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute inset-0" style={{
                backgroundImage: `radial-gradient(circle at 25px 25px, #ffffff 2px, transparent 0),
                                 radial-gradient(circle at 75px 75px, #ffffff 1px, transparent 0)`,
                backgroundSize: '100px 100px'
              }} />
            </div>
            
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-16">
                <h2 className="text-3xl font-bold mb-4 text-white">Our Services</h2>
                <p className="text-subhead text-gray-400">Complete business automation solutions designed for growth</p>
              </div>
              
              {/* Services Grid */}
              <div className="grid gap-6 md:gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mb-16">
                {services.map((service, index) => {
                  const IconComponent = service.icon;
                  return (
                    <div
                      key={index}
                      className="h-full"
                      onClick={() => setActiveService(index)}
                    >
                      <div 
                        className="h-full flex flex-col justify-between rounded-2xl border border-white/10 bg-white/5 shadow-[0_0_0_1px_rgba(255,255,255,0.04)_inset] backdrop-blur-sm p-6 md:p-7 transition ring-0 hover:shadow-lg hover:-translate-y-0.5 duration-200 group relative cursor-pointer"
                        id={`service-card-${index}`}
                        aria-labelledby={`service-title-${index}`}
                      >
                        {/* GlowingEffect Animation */}
                        <GlowingEffect
                          spread={60}
                          glow={true}
                          disabled={false}
                          proximity={80}
                          inactiveZone={0.1}
                          borderWidth={2}
                          movementDuration={1.5}
                        />
                        
                        {/* Content */}
                        <div className="relative z-10">
                          {/* Icon */}
                          <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center text-white/90 mb-4 md:mb-5">
                            <IconComponent className="w-6 h-6" />
                          </div>
                          
                          {/* Title */}
                          <h3 
                            id={`service-title-${index}`}
                            className="text-lg md:text-xl font-semibold leading-snug mb-2 text-white"
                          >
                            {service.title}
                          </h3>
                          
                          {/* Description */}
                          <p className="text-sm md:text-[15px] text-white/70 leading-relaxed min-h-[72px] md:min-h-[84px] overflow-hidden">
                            {service.tagline}
                          </p>
                        </div>
                        
                        {/* Spacer */}
                        <div className="mt-auto pt-4">
                          {/* CTA Button */}
                          <button 
                            className={`relative overflow-hidden w-full justify-center text-[14px] py-3 rounded-xl font-medium bg-gradient-to-r ${service.accent} text-white transition-all duration-300 group-hover:shadow-lg hover:scale-[1.02] flex items-center`}
                            aria-label={`Learn more about ${service.title}`}
                          >
                            {/* Rolling line animation */}
                            <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-1000 ease-out group-hover:translate-x-full" />
                            <span className="relative z-10">
                              Stop Losing Money
                            </span>
                            <ChevronRight className="w-4 h-4 ml-2 transition-transform duration-300 group-hover:translate-x-1" />
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
              
              {/* CTA Banner */}
              <div className="relative">
                <div className="rounded-2xl backdrop-blur-md bg-gradient-to-r from-blue-900/40 to-purple-900/40 border border-blue-500/30 p-12 text-center">
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-500/10 to-purple-500/10 opacity-50" />
                  <div className="relative z-10">
                    <h3 className="text-3xl font-bold text-white mb-4">
                      Tired of Missing Calls and Losing Customers?
                    </h3>
                    <p className="text-gray-300 mb-8 text-lg">
                      Book a free consultation to discover how we can transform your business
                    </p>
                    <a href="https://calendly.com/arliqosja014/new-meeting" target="_blank" rel="noopener noreferrer" className="inline-block px-10 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-lg font-semibold rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/25 transform hover:scale-105">
                      Book a Free Consultation
                    </a>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Service Detail Overlay */}
            {activeService !== null && (
              <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 md:p-8">
                <div className="max-w-xl w-full max-h-[52vh] md:max-h-[56vh] overflow-y-auto">
                  <div className="rounded-xl backdrop-blur-md bg-gradient-to-br from-gray-900/95 to-gray-800/95 border border-gray-600/50 p-6 relative overflow-hidden">
                    {/* Meteors Background Effect */}
                    <Meteors number={20} />
                    
                    {(() => {
                      const service = services[activeService];
                      const IconComponent = service.icon;
                      return (
                        <div className="relative z-10">
                          {/* Header */}
                          <div className="flex items-start justify-between mb-6">
                            <div className="flex items-center space-x-4">
                              <div className={`w-8 h-8 md:w-10 md:h-10 rounded-lg bg-gradient-to-r ${service.accent} p-[1px]`}>
                                <div className="w-full h-full rounded-xl bg-gray-900/90 flex items-center justify-center">
                                  <IconComponent className="w-4 h-4 md:w-5 md:h-5 text-white" />
                                </div>
                              </div>
                              <div>
                                <h3 className="text-lg md:text-xl font-bold text-white">
                                  {service.title}
                                </h3>
                              </div>
                            </div>
                            <button
                              onClick={() => setActiveService(null)}
                              className="p-1 rounded-lg hover:bg-gray-700/50 transition-colors"
                            >
                              <X className="w-4 h-4 text-gray-400" />
                            </button>
                          </div>
                          
                          {/* Overview */}
                          <div className="mb-6">
                            <h4 className="text-sm md:text-base font-semibold text-white mb-2">Overview</h4>
                            <p className="text-gray-300 leading-relaxed text-xs md:text-sm">
                              {service.overview}
                            </p>
                          </div>
                          
                          {/* Key Benefits */}
                          <div className="mb-6">
                            <h4 className="text-sm md:text-base font-semibold text-white mb-2">Key Benefits</h4>
                            <div className="space-y-2">
                              {service.benefits.map((benefit, idx) => (
                                <div key={idx} className="flex items-center space-x-2">
                                  <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0" />
                                  <span className="text-gray-300 text-xs md:text-sm">{benefit}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                          
                          {/* Client Results */}
                          <div className="mb-6">
                            <h4 className="text-sm md:text-base font-semibold text-white mb-2">Client Results</h4>
                            <div className={`rounded-lg bg-gradient-to-r ${service.accent} p-[1px]`}>
                              <div className="rounded-lg bg-gray-900/90 p-2">
                                <p className="text-white font-semibold text-xs md:text-sm">
                                  {service.results}
                                </p>
                              </div>
                            </div>
                          </div>
                          
                          {/* CTA */}
                          <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2">
                            <a href="https://calendly.com/arliqosja014/new-meeting" target="_blank" rel="noopener noreferrer" className={`flex-1 px-3 py-2 bg-gradient-to-r ${service.accent} text-white font-semibold rounded-lg hover:shadow-lg transition-all duration-300 transform hover:scale-105 text-center text-xs md:text-sm`}>
                              Get Started
                            </a>
                            <button 
                              onClick={() => setActiveService(null)}
                              className="flex-1 px-3 py-2 border border-gray-600 text-gray-300 font-semibold rounded-lg hover:bg-gray-800/50 transition-all duration-300 text-center text-xs md:text-sm"
                            >
                              Ignore
                            </button>
                          </div>
                        </div>
                      );
                    })()}
                  </div>
                </div>
              </div>
            )}
          </section>

          {/* ROI Calculator Section */}
          <ROICalculator />

          {/* Testimonials Section */}
          <section id="testimonials" className="py-20">
            <div className="container mx-auto max-w-7xl px-4">
              {/* Header */}
              <div className="text-center mb-16">
                <h2 className="text-4xl font-bold text-white mb-4">
                  See How These Businesses Stopped Losing Money on Missed Calls
                </h2>
                <p className="text-xl text-gray-300">
                  Real results from businesses using AI booking systems.
                </p>
              </div>

              {/* Testimonials Grid */}
              <div className="grid md:grid-cols-3 gap-8">
                {/* Testimonial 1 */}
                <div className="bg-gray-800 rounded-2xl p-8 border border-gray-700">
                  <div className="flex items-center mb-6">
                    <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&h=150&q=80" 
                         alt="David Martinez" 
                         className="w-12 h-12 rounded-full object-cover" />
                    <div className="ml-4">
                      <h3 className="text-white font-semibold">David Martinez</h3>
                      <p className="text-gray-400 text-sm">Martinez Plumbing & Drain Services</p>
                    </div>
                  </div>
                  <blockquote className="text-gray-300 text-lg leading-relaxed">
                    "After 15 years in business, this AI system doubled our emergency call bookings. Now we never miss a late-night job again."
                  </blockquote>
                </div>

                {/* Testimonial 2 */}
                <div className="bg-gray-800 rounded-2xl p-8 border border-gray-700">
                  <div className="flex items-center mb-6">
                    <img src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&h=1170&q=80" 
                         alt="Mike Rodriguez" 
                         className="w-12 h-12 rounded-full object-cover" />
                    <div className="ml-4">
                      <h3 className="text-white font-semibold">Mike Rodriguez</h3>
                      <p className="text-gray-400 text-sm">Rodriguez HVAC</p>
                    </div>
                  </div>
                  <blockquote className="text-gray-300 text-lg leading-relaxed">
                    "We went from missing 60% of calls to answering every single one. Game changer for our business."
                  </blockquote>
                </div>

                {/* Testimonial 3 */}
                <div className="bg-gray-800 rounded-2xl p-8 border border-gray-700">
                  <div className="flex items-center mb-6">
                    <img src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&h=1170&q=80" 
                         alt="Lisa Chen" 
                         className="w-12 h-12 rounded-full object-cover" />
                    <div className="ml-4">
                      <h3 className="text-white font-semibold">Lisa Chen</h3>
                      <p className="text-gray-400 text-sm">Chen Electrical</p>
                    </div>
                  </div>
                  <blockquote className="text-gray-300 text-lg leading-relaxed">
                    "The AI books appointments while I'm on job sites. It's like having a full-time receptionist for free."
                  </blockquote>
                </div>
              </div>
            </div>
          </section>

          {/* FAQ Section */}
          <section id="faq" className="py-20">
            <div className="container mx-auto max-w-4xl px-4">
              <div className="text-center mb-16">
                <h2 className="font-bold mb-4 text-white">Frequently Asked Questions</h2>
                <p className="text-subhead text-gray-400">Everything you need to know</p>
              </div>
              <div className="space-y-4">
                {faqs.map((faq, index) => (
                  <div key={index} className="bg-gray-800 rounded-xl overflow-hidden">
                    <button
                      className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-700 transition-colors"
                      onClick={() => toggleFaq(index)}
                    >
                      <span className="font-semibold text-white">{faq.question}</span>
                      {openFaq === index ? (
                        <ChevronRight className="w-5 h-5 text-gray-400 transform rotate-90" />
                      ) : (
                        <ChevronRight className="w-5 h-5 text-gray-400" />
                      )}
                    </button>
                    {openFaq === index && (
                      <div className="px-6 pb-4">
                        <p className="text-gray-300">{faq.answer}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Footer */}
          <footer className="py-16 border-t border-gray-800">
            <div className="container mx-auto max-w-6xl px-4">
              <div className="grid md:grid-cols-4 gap-8">
                <div>
                  <h4 className="font-bold mb-4 text-white">Services</h4>
                  <ul className="space-y-2 text-gray-400">
                    <li>AI Voice Agents</li>
                    <li>Website Creation</li>
                    <li>AI Automations</li>
                    <li>Appointment Booking</li>
                    <li>CRM Setup</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-bold mb-4 text-white">Company</h4>
                  <ul className="space-y-2 text-gray-400">
                    <li>About Us</li>
                    <li>Case Studies</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-bold mb-4 text-white">Contact</h4>
                  <ul className="space-y-2 text-gray-400">
                    <li>
                      <span>arli@kurbologic.com</span>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
                <p>© 2025 KurboLogic. All rights reserved.</p>
              </div>
            </div>
          </footer>
        
        </div>
      </div>
    </div>
  );
}

export default App;