import React, { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import { ExternalLink } from 'lucide-react';

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL as string;
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY as string;
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

const PortfolioSection: React.FC = () => {
  const [portfolioItems, setPortfolioItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPortfolio = async () => {
      setLoading(true);
      const { data, error } = await supabase.from('sample_works').select('*').order('created_at', { ascending: false });
      if (!error) setPortfolioItems(data || []);
      setLoading(false);
    };
    fetchPortfolio();
  }, []);

  return (
    <section id="portfolio" className="py-16 sm:py-24 lg:py-32 bg-black relative overflow-hidden">
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14 sm:mb-20">
          <h2 className="text-4xl sm:text-5xl font-extrabold text-white mb-4 tracking-tight font-montserrat" style={{ fontFamily: 'Montserrat, Inter, Arial, sans-serif' }}>
            Sample Works
          </h2>
          <p className="text-xl sm:text-2xl text-gray-200 max-w-3xl mx-auto font-inter font-light" style={{ fontFamily: 'Inter, Arial, sans-serif' }}>
            Explore our recent projects showcasing modern design, clean user experience, and cutting-edge functionality across various industries.
          </p>
        </div>
        {loading ? (
          <div className="text-center text-gray-400 py-12 font-inter text-lg">Loading...</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10">
            {portfolioItems.map((item, index) => (
              <div
                key={item.id || index}
                className="group relative overflow-hidden rounded-2xl bg-white border border-black/10 shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 flex flex-col"
                style={{
                  animationDelay: `${index * 80}ms`,
                  animationName: 'fadeIn',
                  animationDuration: '0.7s',
                  animationFillMode: 'both',
                }}
              >
                <div className="aspect-video overflow-hidden rounded-t-2xl bg-black">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="relative flex-1 flex flex-col justify-end p-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-medium bg-black text-white px-3 py-1 rounded-full font-inter">
                      {item.category}
                    </span>
                    {item.link && item.link !== '#' && (
                      <a
                        href={item.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 px-3 py-1 rounded-full border border-black text-black font-semibold text-xs hover:bg-black hover:text-white transition font-montserrat"
                        title="View Live Project"
                        style={{ fontFamily: 'Montserrat, Inter, Arial, sans-serif' }}
                      >
                        <ExternalLink className="h-4 w-4" /> Live
                      </a>
                    )}
                  </div>
                  <h3 className="text-2xl font-bold text-black mb-3 font-montserrat" style={{ fontFamily: 'Montserrat, Inter, Arial, sans-serif' }}>{item.title}</h3>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {(item.features || []).map((feature: string, i: number) => (
                      <span key={i} className="bg-black text-white px-3 py-1 rounded-full text-xs font-medium font-inter">
                        {feature}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default PortfolioSection; 