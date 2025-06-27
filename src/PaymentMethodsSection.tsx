import React from 'react';
import { CreditCard, Send, Smartphone } from 'lucide-react';

const paymentMethods = [
  {
    icon: <CreditCard className="h-8 w-8 text-blue-400 mb-3" />,
    title: 'Visa (Bank Card)',
    description: 'Pay directly using your Visa credit or debit card. Card details and instructions will be provided upon invoice.'
  },
  {
    icon: <Smartphone className="h-8 w-8 text-green-400 mb-3" />,
    title: 'GCash Visa Card',
    description: 'For clients in the Philippines or with GCash, you can pay using our GCash Visa card. Details will be provided upon request.'
  },
  {
    icon: <Send className="h-8 w-8 text-yellow-400 mb-3" />,
    title: 'Western Union',
    description: 'Send payments via Western Union for fast, global money transfers. Recipient details and instructions will be provided.'
  }
];

const PaymentMethodsSection: React.FC = () => (
  <section id="payment-methods" className="py-16 sm:py-24 lg:py-32 bg-black relative overflow-hidden">
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-14 sm:mb-20">
        <h2 className="text-4xl sm:text-5xl font-extrabold text-white mb-4 drop-shadow-lg font-montserrat" style={{ fontFamily: 'Montserrat, Inter, Arial, sans-serif' }}>
          Payment Methods
        </h2>
        <p className="text-xl sm:text-2xl text-gray-200 max-w-2xl mx-auto font-inter font-light" style={{ fontFamily: 'Inter, Arial, sans-serif' }}>
          We offer secure and convenient payment options for clients worldwide. Choose the method that works best for you:
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {paymentMethods.map((method, idx) => (
          <div key={idx} className="backdrop-blur-xl bg-white/10 border border-blue-400/20 rounded-3xl shadow-2xl glass-card p-8 flex flex-col items-center text-center animate-fade-in hover:scale-105 transition-transform duration-300">
            {method.icon}
            <h3 className="text-xl font-bold text-white mb-2 font-montserrat" style={{ fontFamily: 'Montserrat, Inter, Arial, sans-serif' }}>{method.title}</h3>
            <p className="text-gray-200 font-inter text-base" style={{ fontFamily: 'Inter, Arial, sans-serif' }}>{method.description}</p>
          </div>
        ))}
      </div>
      <div className="mt-10 text-center text-gray-400 font-inter text-sm max-w-2xl mx-auto" style={{ fontFamily: 'Inter, Arial, sans-serif' }}>
        All payment details and instructions will be sent securely after project agreement. Please contact us if you have questions about payment or need assistance.
      </div>
    </div>
  </section>
);

export default PaymentMethodsSection; 