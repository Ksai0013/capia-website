'use client';
import { FormEvent } from 'react';
import { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { MdQueryStats, MdPayments, MdPeople, MdAnalytics, MdExpandMore } from 'react-icons/md';
import { motion, AnimatePresence } from 'framer-motion';

// Images
const logoImg = '/logo.png';
const homeImg = '/Home.webp';
const revenueInsightsImg = '/revenue-insights.webp';
const paymentAnalysisImg = '/payment-analysis.webp';
const retentionPipelineImg = '/retention-pipeline.webp';
const revenueForecastImg = '/revenue-forecast.webp';

// Define window level type
declare global {
  interface Window {
    ENV?: Record<string, string>;
  }
}

export default function Home() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    role: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [activeFeature, setActiveFeature] = useState<number>(1);

  const features = [
    {
      id: 1,
      icon: <MdQueryStats />,
      title: "Real-Time Revenue Insights",
      subtitle:"Real-Time Revenue Insights",
      keypoint: "Automated Revenue Recognition with real-time recognition of deferred revenue & late invoice tracking",
      description: "Instantly track revenue performance with AI-powered analytics. Compare realized vs. promised revenue, monitor payments, and uncover trends to drive smarter, data-driven growth.",
      image: revenueInsightsImg
    },
    {
      id: 2,
      icon: <MdPayments />,
      title: "Payment Behavior Analysis",
      subtitle:"Predictive Analytics",
      keypoint: "Revenue forecasting & Churn Prediction with CRM pipeline integration", 
      description: "Analyze payment patterns, predict issues, and optimize cash flow with AI-driven recommendations. Automate reminders and follow-ups to boost collections.",
      image: paymentAnalysisImg
    },
    {
      id: 3,
      icon: <MdPeople />,
      title: "Customer Retention Analysis ",
      subtitle:"Active Cash Flow Supervision",
      keypoint: "Anomaly detection & Recommendation with Customer Segmentation & Smart-payment scheduling",
      description: "Anticipate churn before it happens. Track engagement, identify at-risk accounts, and take decisive actions to improve retention.",
      image: retentionPipelineImg
    },
    {
      id: 4,
      icon: <MdAnalytics />,
      title: "Deals Pipeline Health",
      description: "Track deal progress and forecast pipeline conversion with machine learning accuracy. Prioritize high-probability deals, focus resources where they matter most, and accelerate revenue growth.",
      image: revenueForecastImg
    }
  ];

  const handleNewsletterSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: newsletterEmail,
          screenResolution: `${window.screen.width}x${window.screen.height}`,
          isNewsletter: true
        }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || 'Something went wrong');

      toast.success('Thank you for subscribing!');
      setNewsletterEmail('');
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Something went wrong');
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          screenResolution: `${window.screen.width}x${window.screen.height}`,
          isNewsletter: false
        }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || 'Something went wrong');

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
      <header className="px-4 md:px-[5%] py-2 flex justify-between items-center border-b border-[#00b3e6]/50">
        <div className="flex items-center gap-2">
          <img 
            src={logoImg}
            alt="CapIA.ai Logo"
            className="w-10 h-10 object-contain"
            onError={(e) => {
              console.error('Error loading logo:', e);
              e.currentTarget.style.display = 'none';
            }}
          />
          <a href="#" className="text-xl md:text-2xl font-bold">
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

        <a href="#contact" className="text-sm md:text-base bg-[#00b3e6] px-4 md:px-6 py-1.5 rounded-full hover:opacity-90 transition-opacity whitespace-nowrap">
          Alpha Customers
        </a>
      </header>

      {/* Hero Section */}
<section className="min-h-screen px-4 md:px-[5%] py-4 md:py-4 2xl:py-8 bg-gradient-to-b from-black via-black to-gray-900">
  {/* Change xl: breakpoint to 2xl: to maintain stacked layout until 1440px */}
  <div className="flex flex-col 2xl:flex-row gap-8 mb-12">
    {/* Left Column - Update width classes */}
    <div className="w-full 2xl:w-1/2 2xl:pr-8">
      <div className="mb-8 md:mb-12 2xl:mb-16">
        <h1 className="text-3xl md:text-4xl lg:text-5xl xl:text-5xl 2xl:text-6xl font-bold mb-2 text-center">
          Cap<span className="text-[#00b3e6]">IA</span>.ai
        </h1>
        <div className="text-base md:text-lg lg:text-xl xl:text-xl 2xl:text-2xl text-gray-300 text-center">
          Smarter Finances, Faster Decisions, Profitable Growth
        </div>
      </div>

      <div className="mb-6 2xl:mb-8">
        <h2 className="text-2xl md:text-3xl lg:text-4xl xl:text-4xl 2xl:text-5xl font-bold leading-tight text-white text-center mb-6">
          AI-Powered Financial Intelligence for Startups
        </h2>
        <div className="text-base lg:text-lg xl:text-lg 2xl:text-xl mb-8 text-gray-300 text-center 2xl:text-left">
          Empower your startup with AI-driven financial clarity. Leverage real-time insights, predictive analytics, and automation to optimize cash, boost revenue, and drive growth.
        </div>
        <div className="flex justify-center">
          <a href="#contact" className="text-sm md:text-base lg:text-lg xl:text-lg bg-[#00b3e6] px-4 md:px-6 py-2 md:py-3 rounded-full hover:opacity-90 transition-opacity">
            Sign Up for Alpha Access
          </a>
        </div>
      </div>
    </div>

    {/* Right Column - Image - Update width classes */}
    <div className="w-full 2xl:w-1/2">
      <div className="border border-[#00b3e6]/50 rounded-lg bg-[#00b3e6]/10 !p-0 !m-0 overflow-hidden">
        <img
          src={homeImg}
          alt="CapIA.ai Dashboard Preview"
          className="w-full h-auto rounded-lg !p-0 !m-0"
          style={{ 
            maxHeight: 'calc(100vh - 200px) xl:calc(100vh - 100px)',
            display: 'block'
          }}
        />
      </div>
    </div>
  </div>

        {/* Revenue360 Preview */}
        <div className="bg-gradient-to-gray-900 from-b to-black py-8 md:py-12 rounded-lg border border-[#00b3e6]/50">
          <div className="text-center mb-8 md:mb-10">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4 text-white">
              Introducing <span className="text-[#00b3e6]">Revenue360</span>
            </h2>
            <p className="text-base md:text-lg lg:text-xl text-gray-300">
              Your First Step to Financial Clarity
            </p>
          </div>

          {/* Feature Cards */}
          <div className="px-2 md:px-[1%] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {features.slice(0, 3).map((feature) => (
              <div key={feature.id} className="bg-gradient-to-gray-900/50 backdrop-blur-sm rounded-lg p-6 text-center border border-white/50 hover:border-[#00b3e6] transition-colors">
                <div className="flex flex-col items-center">
                  <div className="flex items-center justify-center gap-2 mb-3">
                    <span className="text-[#00b3e6] text-xl md:text-2xl">
                      {feature.icon}
                    </span>
                    <h3 className="text-base md:text-lg lg:text-xl font-bold text-white">
                      {feature.subtitle}
                    </h3>
                  </div>
                  <p className="text-sm md:text-base text-gray-300">
                    {feature.keypoint}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Revenue360 Section */}
      <section id="revenue360" className="min-h-screen px-4 md:px-[5%] py-8 md:py-12 bg-gradient-to-b from-gray-900 to-black">
        <div className="flex flex-col lg:flex-row mb-12 gap-8">
          {/* Left Column */}
          <div className="w-full lg:w-2/3 lg:pr-8">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight mb-1 text-[#00b3e6] text-center">
              Revenue360 
            </h2>
            <h2 className="text-xl md:text-2xl font-bold leading-tight mb-8 md:mb-16 text-center">
              Unlock Growth Potential with Predictive Analytics
            </h2>
            <div className="text-base md:text-lg lg:text-xl text-gray-300 space-y-6">
              <p>
                Transform your revenue operations with AI-powered insights. By seamlessly connecting your CRM, accounting, and contract systems, Revenue360 unifies disparate datasets to uncover meaningful connections.
              </p>
              <p>
                It identifies business events, builds a cohesive financial story, and provides a comprehensive platform to drive smarter, data-driven decisions for sustainable growth.
              </p>
            </div>
          </div>

          {/* Right Column - Image */}
          <div className="w-full lg:w-1/3">
            <div className="h-[300px] md:h-[400px]">
              <img 
                src="./Connectors.png"
                alt="Connections"
                className="w-full h-full object-contain rounded-lg"
              />
            </div>
          </div>
        </div>

        {/* Features Accordion/Carousel Section */}
<div className="px-4">
  {/* Single column layout instead of flex-row */}
  <div className="max-w-4xl mx-auto">
    {features.map((feature) => (
      <motion.div
        key={feature.id}
        className={`mb-6 border border-[#00b3e6]/50 rounded-lg overflow-hidden
        ${activeFeature === feature.id ? 'bg-[#00b3e6]/10' : 'bg-gray-900/50'}`}
      >
        {/* Header/Title section */}
        <button
          className="w-full px-4 md:px-6 py-4 flex items-center justify-between text-left"
          onClick={() => setActiveFeature(feature.id)}
        >
          <div className="flex items-center gap-3">
            <span className="text-[#00b3e6] text-xl md:text-2xl">{feature.icon}</span>
            <h3 className="text-base md:text-xl font-semibold">{feature.title}</h3>
          </div>
          <motion.div
            animate={{ rotate: activeFeature === feature.id ? 180 : 0 }}
            transition={{ duration: 0.3 }}
          >
            <MdExpandMore className="text-2xl text-[#00b3e6]" />
          </motion.div>
        </button>

        {/* Content section - Now includes both text and image */}
        <AnimatePresence>
          {activeFeature === feature.id && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="px-4 md:px-6 pb-6"
            >
              {/* Description Text */}
              <p className="text-sm md:text-base text-gray-300 mb-6">
                {feature.description}
              </p>
              
              {/* Feature Image */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="border border-[#00b3e6]/50 rounded-lg bg-[#00b3e6]/10 overflow-hidden"
              >
                <img 
                  src={feature.image}
                  alt={feature.title}
                  className="w-full h-auto rounded-lg"
                  style={{ 
                    maxHeight: '400px',
                    objectFit: 'cover'
                  }}
                />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    ))}
  </div>
</div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="min-h-screen px-4 md:px-[5%] py-8 md:py-12 bg-gradient-to-b from-black to-gray-900">
        {/* Alpha Program Signup */}
        <div className="mb-12 md:mb-20">
          <div className="max-w-3xl mx-auto text-center mb-8 md:mb-12">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
              Be Part of the Future of Startup Finance
            </h2>
            <p className="text-base md:text-lg lg:text-xl text-gray-300">
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
        <div className="max-w-3xl mx-auto text-center py-8 md:py-12 border-t border-[#00b3e6]/50">
          <h3 className="text-2xl md:text-3xl font-bold mb-6">
            Stay Updated with Capia.ai
          </h3>
          <p className="text-base md:text-lg text-gray-300 mb-8">
            Subscribe to our newsletter for product updates, feature releases, and startup finance insights.
          </p>

          <form onSubmit={handleNewsletterSubmit} className="max-w-md mx-auto flex flex-col md:flex-row gap-4">
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
              className="bg-[#00b3e6] text-white py-3 px-6 rounded-lg hover:bg-[#00b3e6]/90 transition-colors whitespace-nowrap"
            >
              Subscribe
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}