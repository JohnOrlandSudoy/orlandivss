import React, { useState } from 'react';
import { CheckCircle } from 'lucide-react';
import { createClient } from '@supabase/supabase-js';

type PricingTierKey = 'basic' | 'premium' | 'enterprise';

interface PricingSectionProps {
  activeTab: PricingTierKey;
  setActiveTab: (tab: PricingTierKey) => void;
}

const pricingTiers: Record<PricingTierKey, {
  name: string;
  price: string;
  pages: string;
  features: string[];
}> = {
  basic: {
    name: "Standard Corporate",
    price: "$1000 - $1500",
    pages: "5-8 pages",
    features: [
      "Responsive Design (Mobile & Desktop)",
      "Content Management System",
      "Contact Forms & Integration",
      "SEO Foundation Setup",
      "SSL Certificate & Security",
      "3 Months Free Support",
      "Google Analytics Setup",
      "Social Media Integration"
    ]
  },
  premium: {
    name: "Premium Business",
    price: "$2500 - $3000",
    pages: "8-15 pages",
    features: [
      "Everything in Standard Corporate",
      "E-commerce Integration",
      "Advanced SEO Optimization",
      "Custom Animations & Interactions",
      "Multi-language Support",
      "6 Months Free Support",
      "Advanced Analytics Dashboard",
      "Payment Gateway Integration",
      "Custom Database Solutions"
    ]
  },
  enterprise: {
    name: "Enterprise Solution",
    price: "Custom Quote",
    pages: "15+ pages",
    features: [
      "Everything in Premium Business",
      "Custom Application Development",
      "Third-party API Integrations",
      "Advanced Security Features",
      "Performance Optimization",
      "12 Months Premium Support",
      "Dedicated Project Manager",
      "Staff Training & Documentation",
      "Scalable Infrastructure Setup"
    ]
  }
};

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL as string;
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY as string;
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

const initialForm = {
  name: '',
  email: '',
  project_type: '',
  details: '',
};

const PricingSection: React.FC<PricingSectionProps> = ({ activeTab, setActiveTab }) => {
  const [form, setForm] = useState(initialForm);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess(false);
    const { name, email, details } = form;
    const project_type = pricingTiers[activeTab].name;
    if (!name || !email || !details) {
      setError('All fields are required.');
      setLoading(false);
      return;
    }
    const { error } = await supabase.from('quotes').insert([
      { name, email, project_type, details }
    ]);
    setLoading(false);
    if (error) setError(error.message);
    else {
      setSuccess(true);
      setForm(initialForm);
    }
  };

  return (
    <section id="pricing" className="py-16 sm:py-24 lg:py-32 bg-gradient-to-br from-[#181c2b] via-[#23243a] to-[#1a1830] relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none z-0" aria-hidden="true">
        <div className="absolute -top-32 -left-32 w-96 h-96 bg-gradient-to-br from-blue-600/30 to-purple-600/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-gradient-to-tr from-purple-500/20 to-blue-400/10 rounded-full blur-2xl"></div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-14 sm:mb-20">
          <h2 className="text-4xl sm:text-5xl font-extrabold mb-4 text-white drop-shadow-lg font-montserrat" style={{ fontFamily: 'Montserrat, Inter, Arial, sans-serif' }}>
            Transparent Pricing
          </h2>
          <p className="text-xl sm:text-2xl text-gray-200 max-w-3xl mx-auto font-inter font-light" style={{ fontFamily: 'Inter, Arial, sans-serif' }}>
            Choose the perfect package for your business needs. All packages include mobile responsiveness, CMS integration, and professional design.
          </p>
        </div>
        <div className="flex justify-center mb-10">
          <div className="bg-white/10 backdrop-blur-lg rounded-full p-2 shadow-xl border border-blue-400/20 overflow-x-auto">
            <div className="flex space-x-2 min-w-max">
              {(Object.keys(pricingTiers) as PricingTierKey[]).map((tier) => (
                <button
                  key={tier}
                  onClick={() => setActiveTab(tier)}
                  className={`px-6 sm:px-8 py-3 sm:py-4 rounded-full font-bold font-montserrat text-base sm:text-lg transition-all duration-300 whitespace-nowrap shadow-md border-2 focus:outline-none focus:ring-2 focus:ring-blue-400/60 ${
                    activeTab === tier
                      ? 'bg-gradient-to-r from-blue-600 via-purple-600 to-pink-500 text-white border-blue-400/80 shadow-2xl scale-105 ring-2 ring-blue-400/40'
                      : 'text-blue-200 border-transparent hover:bg-white/20 hover:text-white'
                  }`}
                  aria-pressed={activeTab === tier}
                  aria-label={`Select ${pricingTiers[tier].name} pricing tier`}
                  style={{ fontFamily: 'Montserrat, Inter, Arial, sans-serif' }}
                >
                  {pricingTiers[tier].name}
                </button>
              ))}
            </div>
          </div>
        </div>
        <div className="max-w-2xl mx-auto">
          <div className="backdrop-blur-xl bg-white/10 border border-blue-400/20 rounded-3xl shadow-2xl p-8 sm:p-12 mb-10 glass-card relative overflow-hidden">
            <div className="absolute -top-10 -right-10 w-32 h-32 bg-gradient-to-br from-blue-500/20 to-purple-500/10 rounded-full blur-2xl"></div>
            <div className="text-center mb-8">
              <h3 className="text-3xl sm:text-4xl font-extrabold text-white mb-2 font-montserrat" style={{ fontFamily: 'Montserrat, Inter, Arial, sans-serif' }}>
                {pricingTiers[activeTab].name}
              </h3>
              <div className="text-4xl sm:text-5xl font-extrabold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-500 bg-clip-text text-transparent mb-2 font-montserrat" style={{ fontFamily: 'Montserrat, Inter, Arial, sans-serif' }}>
                {pricingTiers[activeTab].price}
              </div>
              <p className="text-lg text-blue-200 font-inter" style={{ fontFamily: 'Inter, Arial, sans-serif' }}>{pricingTiers[activeTab].pages}</p>
            </div>
            <div className="space-y-4">
              {pricingTiers[activeTab].features.map((feature, index) => (
                <div key={index} className="flex items-center space-x-4">
                  <CheckCircle className="h-6 w-6 text-green-400 flex-shrink-0" />
                  <span className="text-white text-base font-inter" style={{ fontFamily: 'Inter, Arial, sans-serif' }}>{feature}</span>
                </div>
              ))}
            </div>
          </div>
          {/* Quote Request Form */}
          <div className="backdrop-blur-xl bg-white/10 border border-purple-400/20 rounded-3xl shadow-2xl p-8 sm:p-12 glass-card relative overflow-hidden">
            <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-gradient-to-tr from-purple-500/20 to-blue-500/10 rounded-full blur-2xl"></div>
            <h4 className="text-2xl font-bold text-white mb-6 text-center font-montserrat" style={{ fontFamily: 'Montserrat, Inter, Arial, sans-serif' }}>
              Request a Quote
            </h4>
            <form className="space-y-6" onSubmit={handleSubmit}>
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                value={form.name}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl border border-gray-300/30 focus:ring-2 focus:ring-blue-500 focus:border-transparent text-base bg-white/20 text-white placeholder-gray-300 font-inter"
                required
                style={{ fontFamily: 'Inter, Arial, sans-serif' }}
              />
              <input
                type="email"
                name="email"
                placeholder="Your Email"
                value={form.email}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl border border-gray-300/30 focus:ring-2 focus:ring-blue-500 focus:border-transparent text-base bg-white/20 text-white placeholder-gray-300 font-inter"
                required
                style={{ fontFamily: 'Inter, Arial, sans-serif' }}
              />
              <input
                type="text"
                name="project_type"
                value={pricingTiers[activeTab].name}
                readOnly
                className="w-full px-4 py-3 rounded-xl border border-gray-200/30 bg-white/10 text-blue-200 text-base cursor-not-allowed font-inter"
                style={{ fontFamily: 'Inter, Arial, sans-serif' }}
              />
              <textarea
                name="details"
                placeholder="Tell us about your project..."
                value={form.details}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl border border-gray-300/30 focus:ring-2 focus:ring-purple-500 focus:border-transparent text-base bg-white/20 text-white placeholder-gray-300 font-inter"
                rows={4}
                required
                style={{ fontFamily: 'Inter, Arial, sans-serif' }}
              />
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-600 via-purple-600 to-pink-500 text-white px-8 py-3 rounded-xl font-bold font-montserrat text-lg shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300 disabled:opacity-50"
                disabled={loading}
                style={{ fontFamily: 'Montserrat, Inter, Arial, sans-serif' }}
              >
                {loading ? 'Sending...' : 'Send Quote Request'}
              </button>
              {error && <div className="text-red-400 text-sm mt-2 text-center">{error}</div>}
              {success && <div className="text-green-400 text-sm mt-2 text-center">Thank you! Your quote request has been sent.</div>}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PricingSection; 