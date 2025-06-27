import React, { useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import { Cpu, Zap, Code, Layout, HelpCircle, Bot } from 'lucide-react';

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL as string;
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY as string;
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

const initialForm = {
  name: '',
  email: '',
  number: '',
  message: '',
  file: null as File | null,
};

const IoTServicesSection: React.FC = () => {
  const [form, setForm] = useState(initialForm);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, files } = e.target as any;
    if (name === 'file') {
      setForm({ ...form, file: files[0] });
    } else {
      setForm({ ...form, [name]: value });
    }
    setError('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess(false);
    const { name, email, number, message, file } = form;
    if (!name || !email || !message) {
      setError('Name, email, and message are required.');
      setLoading(false);
      return;
    }
    let file_url = '';
    if (file) {
      const bucket = 'iot-uploads';
      const filePath = `${Date.now()}-${file.name}`;
      const { error: uploadError } = await supabase.storage.from(bucket).upload(filePath, file);
      if (uploadError) {
        setError('File upload failed: ' + uploadError.message);
        setLoading(false);
        return;
      }
      file_url = supabase.storage.from(bucket).getPublicUrl(filePath).data.publicUrl;
    }
    const { error: dbError } = await supabase.from('iot_requests').insert([
      { name, email, number, message, file_url }
    ]);
    setLoading(false);
    if (dbError) setError(dbError.message);
    else {
      setSuccess(true);
      setForm(initialForm);
    }
  };

  return (
    <section id="iot-services" className="py-16 sm:py-24 lg:py-32 bg-black relative overflow-hidden">
      <div className="relative z-10 max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="backdrop-blur-xl bg-white/10 border border-blue-400/20 rounded-3xl shadow-2xl glass-card p-8 sm:p-12 flex flex-col items-center animate-fade-in">
          <div className="flex items-center justify-center mb-6">
            <span className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-blue-600 to-purple-600 shadow-lg">
              <Cpu className="h-8 w-8 text-white" />
            </span>
          </div>
          <h2 className="text-4xl sm:text-5xl font-extrabold text-white mb-2 text-center tracking-tight drop-shadow-lg font-montserrat" style={{ fontFamily: 'Montserrat, Inter, Arial, sans-serif' }}>
            IoT Services Request
          </h2>
          <p className="text-xl text-gray-200 mb-8 text-center max-w-xl font-inter font-light" style={{ fontFamily: 'Inter, Arial, sans-serif' }}>
            Connect your business to the future. Request a custom IoT solution, upload your project brief, or ask for a study document. Our experts will get in touch to help you innovate.
          </p>
          <form className="w-full space-y-6" onSubmit={handleSubmit}>
            <div className="flex flex-col sm:flex-row gap-4">
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                value={form.name}
                onChange={handleChange}
                className="flex-1 px-4 py-3 rounded-xl border border-gray-300/30 focus:ring-2 focus:ring-blue-500 focus:border-transparent text-base bg-white/20 text-white placeholder-gray-300 font-inter shadow-sm transition"
                required
                style={{ fontFamily: 'Inter, Arial, sans-serif' }}
              />
              <input
                type="email"
                name="email"
                placeholder="Your Email"
                value={form.email}
                onChange={handleChange}
                className="flex-1 px-4 py-3 rounded-xl border border-gray-300/30 focus:ring-2 focus:ring-blue-500 focus:border-transparent text-base bg-white/20 text-white placeholder-gray-300 font-inter shadow-sm transition"
                required
                style={{ fontFamily: 'Inter, Arial, sans-serif' }}
              />
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <input
                type="text"
                name="number"
                placeholder="Your Phone Number (optional)"
                value={form.number}
                onChange={handleChange}
                className="flex-1 px-4 py-3 rounded-xl border border-gray-300/30 focus:ring-2 focus:ring-purple-500 focus:border-transparent text-base bg-white/20 text-white placeholder-gray-300 font-inter shadow-sm transition"
                style={{ fontFamily: 'Inter, Arial, sans-serif' }}
              />
              <div className="flex-1 flex items-center">
                <input
                  type="file"
                  name="file"
                  accept=".pdf,.doc,.docx,.txt"
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border border-gray-300/30 text-base bg-white/20 text-white font-inter shadow-sm transition"
                  style={{ fontFamily: 'Inter, Arial, sans-serif' }}
                />
              </div>
            </div>
            <textarea
              name="message"
              placeholder="Your Message"
              value={form.message}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-xl border border-gray-300/30 focus:ring-2 focus:ring-blue-500 focus:border-transparent text-base bg-white/20 text-white placeholder-gray-300 font-inter shadow-sm transition"
              rows={5}
              required
              style={{ fontFamily: 'Inter, Arial, sans-serif' }}
            />
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-600 via-purple-600 to-pink-500 text-white px-8 py-3 rounded-xl font-bold font-montserrat text-lg shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300 disabled:opacity-50"
              disabled={loading}
              style={{ fontFamily: 'Montserrat, Inter, Arial, sans-serif' }}
            >
              {loading ? 'Sending...' : 'Send Request'}
            </button>
            {error && <div className="text-red-400 text-sm mt-2 text-center animate-fade-in">{error}</div>}
            {success && <div className="text-green-400 text-sm mt-2 text-center animate-fade-in">Thank you! Your request has been sent.</div>}
          </form>
        </div>
        {/* Why Choose Me Section */}
        <div className="mt-16 backdrop-blur-xl bg-white/10 border border-purple-400/20 rounded-3xl shadow-xl glass-card p-8 flex flex-col items-center animate-fade-in">
          <h3 className="text-3xl sm:text-4xl font-extrabold text-purple-400 mb-4 text-center tracking-tight font-montserrat" style={{ fontFamily: 'Montserrat, Inter, Arial, sans-serif' }}>
            Why Choose Me?
          </h3>
          <p className="text-gray-200 text-center mb-8 max-w-xl font-inter" style={{ fontFamily: 'Inter, Arial, sans-serif' }}>
            I offer a unique blend of engineering expertise and hands-on support to bring your ideas to life. Here's what sets me apart:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full max-w-2xl">
            <div className="flex items-start gap-4 hover:scale-105 transition-transform duration-300">
              <Zap className="h-8 w-8 text-blue-400 flex-shrink-0" />
              <div>
                <div className="font-bold text-white font-montserrat">Circuit Design</div>
                <div className="text-gray-200 text-sm font-inter">Professional analog and digital circuit design for your custom needs.</div>
              </div>
            </div>
            <div className="flex items-start gap-4 hover:scale-105 transition-transform duration-300">
              <Code className="h-8 w-8 text-purple-400 flex-shrink-0" />
              <div>
                <div className="font-bold text-white font-montserrat">Code Based on Your Idea</div>
                <div className="text-gray-200 text-sm font-inter">Custom firmware and software development tailored to your project vision.</div>
              </div>
            </div>
            <div className="flex items-start gap-4 hover:scale-105 transition-transform duration-300">
              <Layout className="h-8 w-8 text-green-400 flex-shrink-0" />
              <div>
                <div className="font-bold text-white font-montserrat">PCB Design</div>
                <div className="text-gray-200 text-sm font-inter">High-quality PCB layout and design for reliable, manufacturable hardware.</div>
              </div>
            </div>
            <div className="flex items-start gap-4 hover:scale-105 transition-transform duration-300">
              <HelpCircle className="h-8 w-8 text-yellow-300 flex-shrink-0" />
              <div>
                <div className="font-bold text-white font-montserrat">Guidance & Support</div>
                <div className="text-gray-200 text-sm font-inter">Step-by-step guidance and best practices until your project is complete.</div>
              </div>
            </div>
            <div className="flex items-start gap-4 hover:scale-105 transition-transform duration-300">
              <Bot className="h-8 w-8 text-pink-400 flex-shrink-0" />
              <div>
                <div className="font-bold text-white font-montserrat">Robotics Projects</div>
                <div className="text-gray-200 text-sm font-inter">Expertise in robotics, automation, and smart systems for innovative solutions.</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default IoTServicesSection; 