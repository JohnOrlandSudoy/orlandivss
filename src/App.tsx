import React, { useState, lazy, Suspense, useEffect } from 'react';
import { 
  Monitor, 
  Smartphone, 
  Globe, 
  Code, 
  Palette, 
  Settings, 
  Search, 
  BarChart3, 
  FileText, 
  Clock, 
  CheckCircle, 
  ArrowRight,
  ExternalLink,
  Mail,
  Phone,
  MapPin,
  Star,
  Users,
  Zap,
  Shield,
  Headphones,
  Menu,
  X,
  ArrowUpCircle
} from 'lucide-react';
import NavigationBar from './NavigationBar';
import Footer from './Footer';

type PricingTierKey = 'basic' | 'premium' | 'enterprise';

const PortfolioSection = lazy(() => import('./PortfolioSection'));
const PricingSection = lazy(() => import('./PricingSection'));
const ContactSection = lazy(() => import('./ContactSection'));
const IoTServicesSection = lazy(() => import('./IoTServicesSection'));
const PaymentMethodsSection = lazy(() => import('./PaymentMethodsSection'));
const PaymentBestPracticesSection = lazy(() => import('./PaymentBestPracticesSection'));

const SECTION_IDS = {
  portfolio: 'portfolio',
  pricing: 'pricing',
  process: 'process',
  contact: 'contact',
  iot: 'iot-services',
};

function App() {
  const [activeTab, setActiveTab] = useState<PricingTierKey>('basic');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [activeSection, setActiveSection] = useState<string>('');

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 300);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const sectionIds = Object.values(SECTION_IDS);
    const handleSectionScroll = () => {
      let current = '';
      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (el && window.scrollY + 100 >= el.offsetTop) {
          current = id;
        }
      }
      setActiveSection(current);
    };
    window.addEventListener('scroll', handleSectionScroll);
    return () => window.removeEventListener('scroll', handleSectionScroll);
  }, []);

  const processSteps = [
    {
      step: 1,
      title: "Discovery & Planning",
      description: "We analyze your requirements, target audience, and business goals to create a comprehensive project roadmap.",
      duration: "1-2 weeks",
      icon: Search
    },
    {
      step: 2,
      title: "Design & Prototyping",
      description: "Our design team creates wireframes, mockups, and interactive prototypes for your approval.",
      duration: "2-3 weeks",
      icon: Palette
    },
    {
      step: 3,
      title: "Development & Integration",
      description: "We build your website using cutting-edge technologies with regular progress updates.",
      duration: "4-8 weeks",
      icon: Code
    },
    {
      step: 4,
      title: "Testing & Launch",
      description: "Comprehensive testing across devices and browsers before going live with full deployment support.",
      duration: "1-2 weeks",
      icon: CheckCircle
    }
  ];

  const navigationItems = [
    { href: `#${SECTION_IDS.portfolio}`, label: 'Portfolio' },
    { href: `#${SECTION_IDS.pricing}`, label: 'Pricing' },
    { href: `#${SECTION_IDS.process}`, label: 'Process' },
    { href: `#${SECTION_IDS.contact}`, label: 'Contact' },
    { href: `#${SECTION_IDS.iot}`, label: 'IoT Services' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-950">
      <NavigationBar navigationItems={navigationItems} logoSrc="logo/1-Photoroom.png" />
      {/* Hero Section */}
      <section id="main-content" className="relative overflow-hidden py-16 sm:py-24 lg:py-32 bg-black flex flex-col items-center justify-center min-h-[80vh] animate-fadeIn">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center">
          <img
            src="logo/1-Photoroom.png"
            alt="OrlandIV Logo"
            width={400}
            height={180}
            className="w-40 h-24 sm:w-56 sm:h-32 md:w-72 md:h-40 lg:w-[400px] lg:h-[180px] object-contain mb-8 sm:mb-10 md:mb-12 drop-shadow-2xl rounded-2xl bg-black"
            loading="eager"
          />
          <h1 className="max-w-5xl mx-auto text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold tracking-tight leading-tight mb-6 sm:mb-8 md:mb-10 text-white font-sans" style={{ fontFamily: 'Montserrat, Inter, Arial, sans-serif' }}>
            Premium Web<br />
            Development Services
          </h1>
          <p className="max-w-2xl mx-auto text-lg sm:text-2xl md:text-3xl text-white mb-8 sm:mb-10 md:mb-14 leading-relaxed font-light tracking-wide" style={{ fontFamily: 'Inter, Arial, sans-serif' }}>
            We create stunning, high-performance websites that drive results.<br />
            From concept to launch, we deliver exceptional digital experiences that elevate your brand.
          </p>
          {/* More Button linking to external portfolio */}
          <a
            href="https://orlandiv.vercel.app/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-lg font-semibold rounded-full shadow-lg hover:scale-105 hover:from-purple-600 hover:to-blue-600 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-blue-400 mb-4"
          >
            More
            <ExternalLink className="ml-3 w-5 h-5" />
          </a>
        </div>
      </section>
      {/* Sample Works Section */}
      <section id={SECTION_IDS.portfolio} className="animate-fadeIn">
        <Suspense fallback={<div className="flex justify-center items-center py-12"><span className="animate-spin w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full"></span></div>}>
          <PortfolioSection />
        </Suspense>
      </section>
      {/* Quotation Section */}
      <section id={SECTION_IDS.pricing} className="animate-fadeIn">
        <Suspense fallback={<div className="flex justify-center items-center py-12"><span className="animate-spin w-10 h-10 border-4 border-purple-500 border-t-transparent rounded-full"></span></div>}>
          <PricingSection activeTab={activeTab} setActiveTab={setActiveTab} />
        </Suspense>
      </section>
      {/* Timeline Section */}
      <section className="py-12 sm:py-16 lg:py-20 bg-white animate-fadeIn">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Project Timeline</h2>
            <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">
              Our typical project timeline for a standard corporate website ranges from 8-15 weeks, 
              depending on complexity and requirements.
            </p>
          </div>

          <div className="relative">
            {/* Desktop Timeline */}
            <div className="hidden lg:block">
              <div className="absolute left-1/2 transform -translate-x-px h-full w-0.5 bg-gradient-to-b from-blue-600 to-purple-600"></div>
              
              <div className="space-y-12">
                {processSteps.map((step, index) => (
                  <div key={index} className={`relative flex items-center ${index % 2 === 0 ? 'justify-start' : 'justify-end'}`}>
                    <div className={`w-1/2 ${index % 2 === 0 ? 'pr-12' : 'pl-12'}`}>
                      <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-shadow duration-300">
                        <div className="flex items-center mb-4">
                          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg p-3 mr-4">
                            <step.icon className="h-6 w-6 text-white" />
                          </div>
                          <div>
                            <h3 className="text-xl font-bold text-gray-900">{step.title}</h3>
                            <p className="text-blue-600 font-medium">{step.duration}</p>
                          </div>
                        </div>
                        <p className="text-gray-600">{step.description}</p>
                      </div>
                    </div>
                    
                    <div className="absolute left-1/2 transform -translate-x-1/2 w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center">
                      <span className="text-white font-bold text-sm">{step.step}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Mobile/Tablet Timeline */}
            <div className="lg:hidden">
              <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-600 to-purple-600"></div>
              
              <div className="space-y-8">
                {processSteps.map((step, index) => (
                  <div key={index} className="relative flex items-start">
                    <div className="absolute left-8 transform -translate-x-1/2 w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center">
                      <span className="text-white font-bold text-sm">{step.step}</span>
                    </div>
                    
                    <div className="ml-20 bg-white rounded-2xl shadow-lg p-4 sm:p-6 border border-gray-100 hover:shadow-xl transition-shadow duration-300">
                      <div className="flex items-center mb-4">
                        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg p-2 sm:p-3 mr-3 sm:mr-4">
                          <step.icon className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
                        </div>
                        <div>
                          <h3 className="text-lg sm:text-xl font-bold text-gray-900">{step.title}</h3>
                          <p className="text-blue-600 font-medium text-sm sm:text-base">{step.duration}</p>
                        </div>
                      </div>
                      <p className="text-gray-600 text-sm sm:text-base">{step.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Process Section */}
      <section id={SECTION_IDS.process} className="py-12 sm:py-16 lg:py-20 bg-black/60 backdrop-blur-md rounded-3xl shadow-lg border border-gray-800 mx-2 my-8 animate-fadeIn">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4 drop-shadow-lg">Our Development Process</h2>
            <p className="text-lg sm:text-xl text-gray-200 max-w-3xl mx-auto drop-shadow-md">
              From initial concept to successful launch, we follow a proven methodology 
              that ensures quality, transparency, and client satisfaction.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {processSteps.map((step, index) => (
              <div key={index} className="relative group">
                <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8 group-hover:shadow-xl transition-all duration-300 transform group-hover:-translate-y-2 h-full flex flex-col">
                  {/* Icon Container - Fixed size and centered */}
                  <div className="flex justify-center mb-6">
                    <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-full w-16 h-16 flex items-center justify-center flex-shrink-0">
                      <step.icon className="h-8 w-8 text-white" />
                    </div>
                  </div>
                  
                  {/* Content Container - Flexible height */}
                  <div className="text-center flex-grow flex flex-col">
                    <h3 className="text-xl font-bold text-gray-900 mb-4">{step.title}</h3>
                    <p className="text-gray-600 mb-6 flex-grow text-sm leading-relaxed">{step.description}</p>
                    
                    {/* Duration Badge - Fixed at bottom */}
                    <div className="mt-auto">
                      <div className="bg-blue-100 text-blue-600 px-4 py-2 rounded-full text-sm font-medium inline-block">
                        {step.duration}
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Arrow for desktop - positioned absolutely */}
                {index < processSteps.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-4 transform -translate-y-1/2 z-10">
                    <div className="bg-white rounded-full p-2 shadow-md">
                      <ArrowRight className="h-4 w-4 text-gray-400" />
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* Support & Maintenance Section */}
      <section className="py-12 sm:py-16 lg:py-20 bg-white animate-fadeIn">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Support & Maintenance</h2>
            <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">
              We provide comprehensive post-launch support to ensure your website stays secure, 
              updated, and performing at its best.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-6 sm:p-8 text-center">
              <Shield className="h-10 w-10 sm:h-12 sm:w-12 text-blue-600 mx-auto mb-4 sm:mb-6" />
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">Security Updates</h3>
              <ul className="text-gray-600 space-y-2 text-sm sm:text-base">
                <li>• Regular security patches</li>
                <li>• SSL certificate management</li>
                <li>• Malware protection</li>
                <li>• Backup management</li>
              </ul>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-2xl p-6 sm:p-8 text-center">
              <Settings className="h-10 w-10 sm:h-12 sm:w-12 text-purple-600 mx-auto mb-4 sm:mb-6" />
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">Technical Support</h3>
              <ul className="text-gray-600 space-y-2 text-sm sm:text-base">
                <li>• 24/7 monitoring</li>
                <li>• Performance optimization</li>
                <li>• Bug fixes & updates</li>
                <li>• Content management help</li>
              </ul>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-2xl p-6 sm:p-8 text-center">
              <Headphones className="h-10 w-10 sm:h-12 sm:w-12 text-green-600 mx-auto mb-4 sm:mb-6" />
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">Ongoing Support</h3>
              <ul className="text-gray-600 space-y-2 text-sm sm:text-base">
                <li>• Priority email support</li>
                <li>• Monthly reports</li>
                <li>• Training sessions</li>
                <li>• Strategic consultations</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
      {/* Optional Add-ons Section */}
      <section className="py-12 sm:py-16 lg:py-20 bg-black/60 backdrop-blur-md rounded-3xl shadow-lg border border-gray-800 mx-2 my-8 animate-fadeIn">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4 drop-shadow-lg">Optional Add-on Services</h2>
            <p className="text-lg sm:text-xl text-gray-200 max-w-3xl mx-auto drop-shadow-md">
              Enhance your website with our premium add-on services designed to maximize 
              your online presence and business growth.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8 hover:shadow-xl transition-shadow duration-300">
              <Search className="h-10 w-10 sm:h-12 sm:w-12 text-blue-600 mb-4 sm:mb-6" />
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">SEO Optimization</h3>
              <p className="text-gray-600 mb-4 sm:mb-6 text-sm sm:text-base">
                Comprehensive SEO strategy including keyword research, on-page optimization, 
                and technical SEO improvements.
              </p>
              <div className="text-xl sm:text-2xl font-bold text-blue-600 mb-4">$500 - $2,000/month</div>
              <ul className="text-gray-600 space-y-2 text-sm sm:text-base">
                <li>• Keyword research & strategy</li>
                <li>• On-page optimization</li>
                <li>• Content optimization</li>
                <li>• Monthly SEO reports</li>
              </ul>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8 hover:shadow-xl transition-shadow duration-300">
              <BarChart3 className="h-10 w-10 sm:h-12 sm:w-12 text-purple-600 mb-4 sm:mb-6" />
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">Analytics Integration</h3>
              <p className="text-gray-600 mb-4 sm:mb-6 text-sm sm:text-base">
                Advanced analytics setup with custom dashboards, conversion tracking, 
                and detailed performance insights.
              </p>
              <div className="text-xl sm:text-2xl font-bold text-purple-600 mb-4">$300 - $800</div>
              <ul className="text-gray-600 space-y-2 text-sm sm:text-base">
                <li>• Google Analytics 4 setup</li>
                <li>• Custom event tracking</li>
                <li>• Conversion funnel analysis</li>
                <li>• Monthly analytics reports</li>
              </ul>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8 hover:shadow-xl transition-shadow duration-300">
              <FileText className="h-10 w-10 sm:h-12 sm:w-12 text-green-600 mb-4 sm:mb-6" />
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">Content Writing</h3>
              <p className="text-gray-600 mb-4 sm:mb-6 text-sm sm:text-base">
                Professional copywriting services including web copy, blog content, 
                and SEO-optimized articles.
              </p>
              <div className="text-xl sm:text-2xl font-bold text-green-600 mb-4">$150 - $300/page</div>
              <ul className="text-gray-600 space-y-2 text-sm sm:text-base">
                <li>• Professional copywriting</li>
                <li>• SEO-optimized content</li>
                <li>• Blog article creation</li>
                <li>• Content strategy planning</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
      {/* Contact Section */}
      <section id={SECTION_IDS.contact} className="animate-fadeIn">
        <Suspense fallback={<div className="flex justify-center items-center py-12"><span className="animate-spin w-10 h-10 border-4 border-green-500 border-t-transparent rounded-full"></span></div>}>
          <ContactSection />
        </Suspense>
      </section>
      {/* Payment Methods Section */}
      <section id="payment-methods" className="animate-fadeIn">
        <Suspense fallback={<div className="flex justify-center items-center py-12"><span className="animate-spin w-10 h-10 border-4 border-yellow-400 border-t-transparent rounded-full"></span></div>}>
          <PaymentMethodsSection />
        </Suspense>
      </section>
      {/* Payment Best Practices Section */}
      <section id="payment-best-practices" className="animate-fadeIn">
        <Suspense fallback={<div className="flex justify-center items-center py-12"><span className="animate-spin w-10 h-10 border-4 border-blue-400 border-t-transparent rounded-full"></span></div>}>
          <PaymentBestPracticesSection />
        </Suspense>
      </section>
      {/* IoT Services Section */}
      <section id={SECTION_IDS.iot} className="animate-fadeIn">
        <Suspense fallback={<div className="flex justify-center items-center py-12"><span className="animate-spin w-10 h-10 border-4 border-yellow-500 border-t-transparent rounded-full"></span></div>}>
          <IoTServicesSection />
        </Suspense>
      </section>
      <Footer logoSrc="logo/1-Photoroom.png" />
      {/* Back to Top Button */}
      {showBackToTop && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="fixed bottom-8 right-8 z-50 bg-gradient-to-r from-blue-600 to-purple-600 text-white p-3 rounded-full shadow-lg hover:scale-110 transition-transform animate-fadeIn"
          aria-label="Back to top"
        >
          <ArrowUpCircle className="w-8 h-8" />
        </button>
      )}
    </div>
  );
}

export default App;