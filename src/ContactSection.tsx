import React, { useState } from 'react';
import { Mail, Phone, MapPin, Users, Star, Zap } from 'lucide-react';
import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL as string;
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY as string;
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

const initialForm = {
  name: '',
  email: '',
  projectType: 'Corporate Website',
  details: '',
};

const validateEmail = (email: string) => /.+@.+\..+/.test(email);

const ContactSection: React.FC = () => {
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState<{ [k: string]: string }>({});
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [submitError, setSubmitError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({});
  };

  const validate = () => {
    const newErrors: { [k: string]: string } = {};
    if (!form.name.trim()) newErrors.name = 'Name is required.';
    if (!form.email.trim()) newErrors.email = 'Email is required.';
    else if (!validateEmail(form.email)) newErrors.email = 'Invalid email address.';
    if (!form.details.trim()) newErrors.details = 'Project details are required.';
    return newErrors;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError('');
    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setSubmitted(false);
    } else {
      setErrors({});
      setLoading(true);
      const { name, email, projectType, details } = form;
      const { error } = await supabase.from('messages').insert([
        { name, email, project_type: projectType, details }
      ]);
      setLoading(false);
      if (error) {
        setSubmitError(error.message);
        setSubmitted(false);
      } else {
        setSubmitted(true);
        setForm(initialForm);
      }
    }
  };

  return (
    <section id="contact" className="py-16 sm:py-24 lg:py-32 bg-gradient-to-br from-[#181c2b] via-[#23243a] to-[#1a1830] relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none z-0" aria-hidden="true">
        <div className="absolute -top-32 -left-32 w-96 h-96 bg-gradient-to-br from-blue-600/30 to-purple-600/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-gradient-to-tr from-purple-500/20 to-blue-400/10 rounded-full blur-2xl"></div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-14 sm:mb-20">
          <h2 className="text-4xl sm:text-5xl font-extrabold mb-4 text-white drop-shadow-lg font-montserrat" style={{ fontFamily: 'Montserrat, Inter, Arial, sans-serif' }}>
            Ready to Start Your Project?
          </h2>
          <p className="text-xl sm:text-2xl text-gray-200 max-w-3xl mx-auto font-inter font-light" style={{ fontFamily: 'Inter, Arial, sans-serif' }}>
            Get in touch with us today for a free consultation and detailed quote tailored to your specific needs.
          </p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 sm:gap-14">
          {/* Info Panel */}
          <div className="backdrop-blur-xl bg-white/10 border border-blue-400/20 rounded-3xl p-8 sm:p-12 shadow-2xl glass-card relative overflow-hidden">
            <div className="absolute -top-10 -right-10 w-32 h-32 bg-gradient-to-br from-blue-500/20 to-purple-500/10 rounded-full blur-2xl"></div>
            <h3 className="text-2xl sm:text-3xl font-bold mb-6 text-white font-montserrat" style={{ fontFamily: 'Montserrat, Inter, Arial, sans-serif' }}>
              Let's Discuss Your Project
            </h3>
            <div className="space-y-4 mb-8">
              <div className="flex items-center space-x-4">
                <Mail className="h-6 w-6 text-blue-400" />
                <span className="text-base sm:text-lg text-white font-inter" style={{ fontFamily: 'Inter, Arial, sans-serif' }}>hello@webcraftpro.com</span>
              </div>
              <div className="flex items-center space-x-4">
                <Phone className="h-6 w-6 text-purple-400" />
                <span className="text-base sm:text-lg text-white font-inter" style={{ fontFamily: 'Inter, Arial, sans-serif' }}>+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center space-x-4">
                <MapPin className="h-6 w-6 text-pink-400" />
                <span className="text-base sm:text-lg text-white font-inter" style={{ fontFamily: 'Inter, Arial, sans-serif' }}>New York, NY</span>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-4 text-center">
              <div className="backdrop-blur-lg bg-white/10 border border-blue-400/20 rounded-xl p-4 shadow-lg glass-card hover:scale-105 transition-transform duration-300">
                <Users className="h-8 w-8 text-blue-400 mx-auto mb-2" />
                <div className="text-2xl font-bold text-white font-montserrat">150+</div>
                <div className="text-gray-200 text-xs font-inter">Happy Clients</div>
              </div>
              <div className="backdrop-blur-lg bg-white/10 border border-yellow-400/20 rounded-xl p-4 shadow-lg glass-card hover:scale-105 transition-transform duration-300">
                <Star className="h-8 w-8 text-yellow-400 mx-auto mb-2" />
                <div className="text-2xl font-bold text-white font-montserrat">4.9/5</div>
                <div className="text-gray-200 text-xs font-inter">Client Rating</div>
              </div>
              <div className="backdrop-blur-lg bg-white/10 border border-purple-400/20 rounded-xl p-4 shadow-lg glass-card hover:scale-105 transition-transform duration-300">
                <Zap className="h-8 w-8 text-purple-400 mx-auto mb-2" />
                <div className="text-2xl font-bold text-white font-montserrat">200+</div>
                <div className="text-gray-200 text-xs font-inter">Projects Done</div>
              </div>
            </div>
          </div>
          {/* Form Panel */}
          <div className="backdrop-blur-xl bg-white/10 border border-purple-400/20 rounded-3xl p-8 sm:p-12 shadow-2xl glass-card relative overflow-hidden">
            <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-gradient-to-tr from-purple-500/20 to-blue-500/10 rounded-full blur-2xl"></div>
            <form className="space-y-6" onSubmit={handleSubmit} noValidate aria-label="Contact form">
              <div>
                <label htmlFor="name" className="block text-base font-semibold text-white mb-2 font-montserrat">Name</label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  className={`w-full px-4 py-3 rounded-xl border ${errors.name ? 'border-red-500' : 'border-gray-300/30'} focus:ring-2 focus:ring-blue-500 focus:border-transparent text-base bg-white/20 text-white placeholder-gray-300 font-inter`}
                  placeholder="Your full name"
                  value={form.name}
                  onChange={handleChange}
                  aria-invalid={!!errors.name}
                  aria-describedby={errors.name ? 'name-error' : undefined}
                  required
                  style={{ fontFamily: 'Inter, Arial, sans-serif' }}
                />
                {errors.name && <div id="name-error" className="text-red-400 text-xs mt-1">{errors.name}</div>}
              </div>
              <div>
                <label htmlFor="email" className="block text-base font-semibold text-white mb-2 font-montserrat">Email</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  className={`w-full px-4 py-3 rounded-xl border ${errors.email ? 'border-red-500' : 'border-gray-300/30'} focus:ring-2 focus:ring-blue-500 focus:border-transparent text-base bg-white/20 text-white placeholder-gray-300 font-inter`}
                  placeholder="your@email.com"
                  value={form.email}
                  onChange={handleChange}
                  aria-invalid={!!errors.email}
                  aria-describedby={errors.email ? 'email-error' : undefined}
                  required
                  style={{ fontFamily: 'Inter, Arial, sans-serif' }}
                />
                {errors.email && <div id="email-error" className="text-red-400 text-xs mt-1">{errors.email}</div>}
              </div>
              <div>
                <label htmlFor="projectType" className="block text-base font-semibold text-white mb-2 font-montserrat">Project Type</label>
                <select
                  id="projectType"
                  name="projectType"
                  className="w-full px-4 py-3 rounded-xl border border-gray-300/30 focus:ring-2 focus:ring-purple-500 focus:border-transparent text-base bg-white/20 text-blue font-inter"
                  value={form.projectType}
                  onChange={handleChange}
                  required
                  style={{ fontFamily: 'Inter, Arial, sans-serif' }}
                >
                  <option>Corporate Website</option>
                  <option>E-commerce Platform</option>
                  <option>Web Application</option>
                  <option>Other</option>
                </select>
              </div>
              <div>
                <label htmlFor="details" className="block text-base font-semibold text-white mb-2 font-montserrat">Project Details</label>
                <textarea
                  id="details"
                  name="details"
                  rows={4}
                  className={`w-full px-4 py-3 rounded-xl border ${errors.details ? 'border-red-500' : 'border-gray-300/30'} focus:ring-2 focus:ring-purple-500 focus:border-transparent text-base bg-white/20 text-white placeholder-gray-300 font-inter`}
                  placeholder="Tell us about your project requirements..."
                  value={form.details}
                  onChange={handleChange}
                  aria-invalid={!!errors.details}
                  aria-describedby={errors.details ? 'details-error' : undefined}
                  required
                  style={{ fontFamily: 'Inter, Arial, sans-serif' }}
                ></textarea>
                {errors.details && <div id="details-error" className="text-red-400 text-xs mt-1">{errors.details}</div>}
              </div>
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-600 via-purple-600 to-pink-500 text-white px-8 py-3 rounded-xl font-bold font-montserrat text-lg shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300 disabled:opacity-50"
                disabled={Object.keys(errors).length > 0 || !form.name || !form.email || !form.details || loading}
                aria-disabled={Object.keys(errors).length > 0 || !form.name || !form.email || !form.details || loading}
                style={{ fontFamily: 'Montserrat, Inter, Arial, sans-serif' }}
              >
                {loading ? 'Sending...' : 'Send Message'}
              </button>
              {submitError && <div className="text-red-400 text-sm mt-2 text-center">{submitError}</div>}
              {submitted && Object.keys(errors).length === 0 && (
                <div className="text-green-400 text-sm mt-2 text-center" role="status">Thank you! Your message has been sent.</div>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection; 