import React from 'react';
import { ListChecks, ShieldCheck, FileText, Globe, HandCoins, UserCheck, ReceiptText, MessageCircle, BellRing, Archive } from 'lucide-react';

const practices = [
  {
    icon: <ListChecks className="h-7 w-7 text-blue-400 mr-3" />,
    title: 'Milestone-Based Payments (Recommended)',
    description: (
      <>
        <div>Divide the project into clear milestones (e.g., Design, Development, Testing, Launch). Request payment after each milestone is completed and approved.</div>
        <div className="mt-2 text-sm text-blue-200">Example: 30% upfront (before work starts), 30% after design approval, 30% after development/testing, 10% upon final delivery/launch.</div>
        <ul className="mt-2 text-sm text-gray-300 list-disc list-inside">
          <li>Reduces risk for both parties.</li>
          <li>Ensures you get paid for work as you deliver value.</li>
          <li>Motivates both sides to keep the project moving.</li>
        </ul>
      </>
    )
  },
  {
    icon: <HandCoins className="h-7 w-7 text-yellow-400 mr-3" />,
    title: 'Upfront Deposit',
    description: (
      <>
        <div>Always require a non-refundable deposit before starting (usually 20–50%). This covers your initial time and commitment.</div>
      </>
    )
  },
  {
    icon: <ShieldCheck className="h-7 w-7 text-green-400 mr-3" />,
    title: 'Final Payment Before Handover',
    description: (
      <>
        <div>The final payment (often 10–20%) should be made before you deliver the final files, launch the site, or transfer ownership.</div>
      </>
    )
  },
  {
    icon: <FileText className="h-7 w-7 text-purple-400 mr-3" />,
    title: 'Clear Contract/Agreement',
    description: (
      <>
        <div>Use a written contract that specifies:</div>
        <ul className="mt-2 text-sm text-gray-300 list-disc list-inside">
          <li>Payment schedule and amounts</li>
          <li>Accepted payment methods/currencies</li>
          <li>What happens if payment is late or missed</li>
          <li>Refund/cancellation policy</li>
          <li>Delivery timelines and what constitutes "completion" of a milestone</li>
        </ul>
      </>
    )
  },
  {
    icon: <Globe className="h-7 w-7 text-pink-400 mr-3" />,
    title: 'International Payment Methods',
    description: (
      <>
        <div>Use secure, trackable payment platforms (e.g., Wise, PayPal, Stripe, Payoneer, bank transfer). Always agree on currency and who pays transfer fees in advance.</div>
      </>
    )
  },
  // Additional tips for smooth transactions
  {
    icon: <UserCheck className="h-7 w-7 text-cyan-400 mr-3" />,
    title: 'Confirm Client Details',
    description: (
      <>
        <div>Always confirm the client's full name, company, and payment details before sending an invoice or payment request.</div>
      </>
    )
  },
  {
    icon: <ReceiptText className="h-7 w-7 text-orange-400 mr-3" />,
    title: 'Use Clear, Itemized Invoices',
    description: (
      <>
        <div>Send professional, itemized invoices that clearly list services, amounts, and due dates. This avoids confusion and speeds up payment.</div>
      </>
    )
  },
  {
    icon: <MessageCircle className="h-7 w-7 text-blue-300 mr-3" />,
    title: 'Communicate Payment Expectations Early',
    description: (
      <>
        <div>Discuss payment terms and expectations with your client before starting. Clear communication prevents misunderstandings.</div>
      </>
    )
  },
  {
    icon: <BellRing className="h-7 w-7 text-yellow-300 mr-3" />,
    title: 'Track Payments & Send Reminders',
    description: (
      <>
        <div>Keep track of all payments and send polite reminders if a payment is late. Use invoicing tools or spreadsheets to stay organized.</div>
      </>
    )
  },
  {
    icon: <Archive className="h-7 w-7 text-gray-300 mr-3" />,
    title: 'Keep Records for All Transactions',
    description: (
      <>
        <div>Maintain records of all invoices, receipts, and communications for your projects. This helps resolve any disputes and is useful for accounting.</div>
      </>
    )
  }
];

const PaymentBestPracticesSection: React.FC = () => (
  <section id="payment-best-practices" className="py-16 sm:py-24 lg:py-32 bg-black relative overflow-hidden">
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-14 sm:mb-20">
        <h2 className="text-4xl sm:text-5xl font-extrabold text-white mb-4 drop-shadow-lg font-montserrat" style={{ fontFamily: 'Montserrat, Inter, Arial, sans-serif' }}>
          Best Payment Practices
        </h2>
        <p className="text-xl sm:text-2xl text-gray-200 max-w-2xl mx-auto font-inter font-light" style={{ fontFamily: 'Inter, Arial, sans-serif' }}>
          For international projects, we follow industry-standard payment practices to ensure security, clarity, and fairness for both parties:
        </p>
      </div>
      <div className="space-y-8">
        {practices.map((item, idx) => (
          <div key={idx} className="backdrop-blur-xl bg-white/10 border border-blue-400/20 rounded-3xl shadow-2xl glass-card p-8 flex items-start animate-fade-in">
            <div>{item.icon}</div>
            <div>
              <h3 className="text-xl font-bold text-white mb-2 font-montserrat" style={{ fontFamily: 'Montserrat, Inter, Arial, sans-serif' }}>{item.title}</h3>
              <div className="text-gray-200 font-inter text-base" style={{ fontFamily: 'Inter, Arial, sans-serif' }}>{item.description}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default PaymentBestPracticesSection; 