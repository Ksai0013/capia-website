'use client';
import { FormEvent } from 'react';
import { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import Image from 'next/image';
import { MdQueryStats, MdPayments, MdPeople, MdAnalytics, MdExpandMore } from 'react-icons/md';
import { motion, AnimatePresence } from 'framer-motion';

export default function Home() {
  // Existing Form state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    role: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Add Newsletter state
  const [newsletterEmail, setNewsletterEmail] = useState('');
  
  // Feature state
  const [activeFeature, setActiveFeature] = useState<number>(1);

  const features = [
    {
      id: 1,
      icon: <MdQueryStats />,
      title: "Real-Time Revenue Insights",
      description: "Instantly track revenue performance with AI-powered analytics. Compare realized vs. promised revenue, monitor payments, and uncover trends to drive smarter, data-driven growth.",
      image: "/revenue-insights.png"
    },
    {
      id: 2,
      icon: <MdPayments />,
      title: "Payment Behavior Analysis",
      description: "Analyze payment patterns, predict issues, and optimize cash flow with AI-driven recommendations. Automate reminders and follow-ups to boost collections.",
      image: "/payment-analysis.png"
    },
    {
      id: 3,
      icon: <MdPeople />,
      title: "Customer Retention Analysis ",
      description: "Anticipate churn before it happens. Track engagement, identify at-risk accounts, and take decisive actions to improve retention.",
      image: "/retention-pipeline.png"
    },
    {
      id: 4,
      icon: <MdAnalytics />,
      title: "Deals Pipeline Health",
      description: "Track deal progress and forecast pipeline conversion with machine learning accuracy.Prioritize high-probability deals, focus resources where they matter most, and accelerate revenue growth with precise pipeline predictions.",
      image: "/revenue-forecast.png"
    }
  ];
  // For the newsletter form
const handleNewsletterSubmit = async (e: FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  
  try {
    const response = await fetch('/api/subscribe', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: newsletterEmail,
        screenResolution: `${window.screen.width}x${window.screen.height}`,
        isNewsletter: true
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Something went wrong');
    }

    toast.success('Thank you for subscribing!');
    setNewsletterEmail('');
  } catch (error) {
    toast.error(error instanceof Error ? error.message : 'Something went wrong');
  }
};
// For the alpha signup form
const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  setIsSubmitting(true);

  try {
    const response = await fetch('/api/subscribe', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...formData,
        screenResolution: `${window.screen.width}x${window.screen.height}`,
        isNewsletter: false
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Something went wrong');
    }

    toast.success('Thank you for signing up!');
    setFormData({ name: '', email: '', company: '', role: '' });
  } catch (error) {
    toast.error(error instanceof Error ? error.message : 'Something went wrong');
  } finally {
    setIsSubmitting(false);
  }
};

  return (
    <div className="min-h-screen bg-black text-white">
      <Toaster position="top-center" />

      {/* Header */}
      <header className="px-[5%] py-1 flex justify-between items-center border-b border-[#00b3e6]/50">
  <div className="flex items-center gap-2">
    <Image 
      src="/logo.png"
      alt="CapIA.ai Logo"
      width={60}
      height={40}
      className="object-contain"
    />
    <a href="#" className="text-2xl font-bold">
      Cap<span className="text-[#00b3e6]">IA</span>.ai
    </a>
  </div>
        <nav className="hidden md:block">
          <ul className="flex gap-8">
            <li><a href="#" className="hover:text-[#00b3e6] transition-colors">Home</a></li>
          
            <li><a href="#revenue360" className="hover:text-[#00b3e6] transition-colors">Revenue360</a></li>
            <li><a href="#contact" className="hover:text-[#00b3e6] transition-colors">Contact</a></li>
          </ul>
        </nav>
        <a href="#contact" className="bg-[#00b3e6] px-6 py-1.5 rounded-full hover:opacity-90 transition-opacity">
  Join as an Alpha Customer
</a>
      </header>
      
{/* Hero Section with Revenue360 */}
<section className="min-h-screen px-[5%] py-12 bg-gradient-to-b from-black via-black to-gray-900">
 {/* CapIA Introduction */}
 <div className="flex mb-12">
   {/* Left Column */}
   <div className="w-1/2 pr-8">
     <div className="mb-12">
       <h1 className="text-6xl font-bold mb-2 ml-[30%]">
         Cap<span className="text-[#00b3e6]">IA</span>.ai
       </h1>
       <p className="text-2xl text-gray-300 ml-[10%]">  {/* Changed from cyan to gray */}
         Smarter Finances, Faster Decisions, Profitable Growth
       </p>
     </div>
     <div className="h-10"></div>
     <div>
       <div className="mb-6">
         <h2 className="text-5xl font-bold leading-tight text-white">
           AI-Powered Financial Intelligence
         </h2>
         <h2 className="text-5xl font-bold leading-tight ml-[30%] text-white">
           for Startups
         </h2>
       </div>
       <p className="text-xl mb-8 text-gray-300">
       Empower your startup with AI-driven financial clarity. Leverage real-time insights, predictive analytics, and automation to optimize cash, boost revenue, and drive growth.
       </p>
       <div className="flex gap-4 ml-[32%]">
         <a href="#contact" className="bg-[#00b3e6] px-6 py-3 rounded-full hover:opacity-90 transition-opacity">
           Sign Up for Alpha Access
         </a>
       </div>
     </div>
   </div>


   {/* Right Column - Image */}
   <div className="w-1/2">
   <div className="border-2 border-[#00b3e6]/50 rounded-lg p-4 bg-[#00b3e6]/10">  {/* Added border and background */}
     <Image
       src="/Home1.png"
       alt="CapIA.ai Dashboard Preview"
       width={1600}
       height={1200}
       className="object-contain rounded-lg"
       priority
     />
   </div>
   </div>
 </div>
 <div className="h-6"></div>
 {/* Revenue360 Section */}
 <div className="bg-gradient-to-gray-900 from-b to-black py-12 rounded-lg border border-[#00b3e6]/50">
   <div className="text-center mb-10">
     <h2 className="text-4xl font-bold mb-4 text-white">
       Introducing <span className="text-[#00b3e6]">Revenue360</span>
     </h2>
     <p className="text-xl text-gray-300">
       Your First Step to Financial Clarity
     </p>
   </div>


   {/* Then in your Revenue360 section, update the feature cards */}
   <div className="px-[5%] grid grid-cols-3 gap-8">
 {/* Feature 1 */}
 <div className="bg-gradient-to-gray-900/50 backdrop-blur-sm rounded-lg p-6 text-center border border-white/50 hover:border-[#00b3e6] transition-colors">
   <div className="flex flex-col items-center">
     <div className="flex items-center justify-center gap-2 mb-3">
       <MdQueryStats className="text-[#00b3e6] text-2xl" />
       <h3 className="text-xl font-bold text-white">
         Real-Time Revenue Insights
       </h3>
     </div>
     <p className="text-gray-300 text-base">
       Track realized vs. promised revenue and customer payment statuses.
     </p>
   </div>
 </div>


 {/* Feature 2 */}
 <div className="bg-gradient-to-gray-900/50 backdrop-blur-sm rounded-lg p-6 text-center border border-white/50 hover:border-[#00b3e6] transition-colors">
   <div className="flex flex-col items-center">
     <div className="flex items-center justify-center gap-2 mb-3">
       <MdPayments className="text-[#00b3e6] text-2xl" />
       <h3 className="text-xl font-bold text-white">
         Payment Behavior Analysis
       </h3>
     </div>
     <p className="text-gray-300 text-base">
       Spot delayed payments, automate reminders, and forecast cash flow.
     </p>
   </div>
 </div>


 {/* Feature 3 */}
 <div className="bg-gradient-to-gray-900/50 backdrop-blur-sm rounded-lg p-6 text-center border border-white/50 hover:border-[#00b3e6] transition-colors">
   <div className="flex flex-col items-center">
     <div className="flex items-center justify-center gap-2 mb-3">
       <MdPeople className="text-[#00b3e6] text-2xl" />
       <h3 className="text-xl font-bold text-white">
         Customer Retention & Pipeline Health
       </h3>
     </div>
     <p className="text-gray-300 text-base">
       Predict churn, assess account risks, and monitor deal progress.
     </p>
   </div>
 </div>
</div>
 </div>
</section>


 {/* Revenue360 Section */}
<section id="revenue360" className="min-h-screen px-[5%] py-12 bg-gradient-to-b from-gray-900 to-black">
  {/* Revenue360 Header - Full Width like Hero */}
  <div className="flex mb-12">
    {/* Left Column */}
    <div className="w-2/3 pr-8">
      <h2 className="text-5xl font-bold leading-tight mb-1 text-[#00b3e6] text-center">
        Revenue360 
      </h2>
      <h2 className="text-2xl font-bold leading-tight mb-16 text-center">
      Unlock Growth Potential with Predictive Analytics
      </h2>
      <p className="text-xl text-gray-300">
      Transform your revenue operations with AI-powered insights. By seamlessly connecting your CRM, accounting, and contract systems, Revenue360 unifies disparate datasets to uncover meaningful connections. 
      <div className="h-6"></div>
      It identifies business events, builds a cohesive financial story, and provides a comprehensive platform to drive smarter, data-driven decisions for sustainable growth.
      </p>
    </div>

    {/* Right Column - Image */}
    <div className="w-1/3">
  <div className=" h-[400px]"> {/* Added fixed height */}
    <Image 
      src="/Connectors.png"
      alt="Connections"
      width={2200}
      height={900}  // Adjusted height ratio
      className="object-contain rounded-lg h-full w-full"  // Added h-full w-full
      priority
        />
      </div>
    </div>
  </div>
   <div className='h-12'></div> 

  {/* Features Accordion - Double Padding */}
  <div className="px-[5%]">
    <div className="flex flex-col md:flex-row gap-8">
      {/* Left side - Features */}
      <div className="md:w-1/2">
        {features.map((feature) => (
          <motion.div
            key={feature.id}
            className={`mb-4 border border-[#00b3e6]/50 rounded-lg overflow-hidden
                       ${activeFeature === feature.id ? 'bg-[#00b3e6]/10' : 'bg-gray-900/50'}`}
          >
            <button
              className="w-full px-6 py-4 flex items-center justify-between text-left"
              onClick={() => setActiveFeature(feature.id)}
            >
              <div className="flex items-center gap-3">
                <span className="text-[#00b3e6] text-2xl">{feature.icon}</span>
                <h3 className="text-xl font-semibold">{feature.title}</h3>
              </div>
              <motion.div
                animate={{ rotate: activeFeature === feature.id ? 180 : 0 }}
                transition={{ duration: 0.3 }}
              >
                <MdExpandMore className="text-2xl text-[#00b3e6]" />
              </motion.div>
            </button>

            <AnimatePresence>
              {activeFeature === feature.id && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="px-6 pb-4"
                >
                  <p className="text-gray-300">{feature.description}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>

      {/* Right side - Feature Image */}
      <div className="md:w-6/10">
        <AnimatePresence mode='wait'>
          <motion.div
            key={activeFeature}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="border-2 border-[#00b3e6]/50 rounded-lg p-2 bg-[#00b3e6]/10  mt-24"
          >
            <Image 
              src={features.find(f => f.id === activeFeature)?.image || features[0].image}
              alt="Feature Preview"
              width={1000}
              height={500}
              className="object-contain rounded-lg"
            />
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  </div>
</section>
{/* Contact Section */}
<section id="contact" className="min-h-screen px-[5%] py-12 bg-gradient-to-b from-black to-gray-900">
  {/* Alpha Program Signup */}
  <div className="mb-20">
    <div className="max-w-3xl mx-auto text-center mb-12">
      <h2 className="text-5xl font-bold mb-6">
        Be Part of the Future of Startup Finance
      </h2>
      <p className="text-xl text-gray-300">
        Join our alpha program to shape the future of Capia.ai. Get early access to Revenue360 and provide feedback to help us grow.
      </p>
    </div>

    {/* Signup Form */}
    <div className="max-w-xl mx-auto">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
            Name
          </label>
          <input
            type="text"
            id="name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full px-4 py-3 bg-gray-900 border border-[#00b3e6]/50 rounded-lg focus:outline-none focus:border-[#00b3e6] text-white"
            required
          />
        </div>

        <div>
          <label htmlFor="company" className="block text-sm font-medium text-gray-300 mb-2">
            Company Name
          </label>
          <input
            type="text"
            id="company"
            value={formData.company}
            onChange={(e) => setFormData({ ...formData, company: e.target.value })}
            className="w-full px-4 py-3 bg-gray-900 border border-[#00b3e6]/50 rounded-lg focus:outline-none focus:border-[#00b3e6] text-white"
            required
          />
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
            Email
          </label>
          <input
            type="email"
            id="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="w-full px-4 py-3 bg-gray-900 border border-[#00b3e6]/50 rounded-lg focus:outline-none focus:border-[#00b3e6] text-white"
            required
          />
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-[#00b3e6] text-white py-3 px-6 rounded-lg hover:bg-[#00b3e6]/90 transition-colors disabled:opacity-50"
        >
          {isSubmitting ? 'Signing up...' : 'Sign Up for Alpha Program'}
        </button>
      </form>
    </div>
  </div>

  {/* Newsletter Section */}
  <div className="max-w-3xl mx-auto text-center py-12 border-t border-[#00b3e6]/50">
    <h3 className="text-3xl font-bold mb-6">
      Stay Updated with Capia.ai
    </h3>
    <p className="text-gray-300 mb-8">
      Subscribe to our newsletter for product updates, feature releases, and startup finance insights.
    </p>
    
    <form onSubmit={handleNewsletterSubmit} className="max-w-md mx-auto flex gap-4">
      <input
        type="email"
        placeholder="Enter your business email"
        value={newsletterEmail}
        onChange={(e) => setNewsletterEmail(e.target.value)}
        className="flex-1 px-4 py-3 bg-gray-900 border border-[#00b3e6]/50 rounded-lg focus:outline-none focus:border-[#00b3e6] text-white"
        required
      />
      <button
        type="submit"
        className="bg-[#00b3e6] text-white py-3 px-6 rounded-lg hover:bg-[#00b3e6]/90 transition-colors"
      >
        Subscribe
      </button>
    </form>
  </div>
</section>
    </div>
  );
}