'use client';
import { FormEvent, useState} from 'react';
import { GrowthEmoji, CoinStackEmoji } from '@/components/CustomEmojis';
import toast, { Toaster } from 'react-hot-toast';

export default function Home() {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const screenResolution = `${window.screen.width}x${window.screen.height}`;
      
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, screenResolution }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Something went wrong');
      }

      toast.success('Thank you for subscribing!');
      setEmail('');
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Something went wrong');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
      <Toaster position="top-center" />
      <div className="text-center max-w-4xl mx-auto px-4">
        {/* Logo container */}
        <div className="mb-24">
          <img 
            src="/capia-logo.png" 
            alt="Capia.ai Logo" 
            className="mx-auto h-60 object-contain"
            fetchPriority='high'  
          />
        </div>

        {/* Coming Soon Text */}
        <h1 className="text-5xl font-bold text-[#323c57] mb-2">
          Coming Soon
        </h1>

        {/* Tagline */}
        <p className="text-l text-[#4591ce] mb-16">
          Something exciting is brewing at CapIA.ai
        </p>

        {/* Newsletter Section */}
        <div className="max-w-lg mx-auto bg-gradient-to-r from-[#048fd5]/5 to-[#F3F4F6]/5 p-8 rounded-lg shadow-sm mb">
          <h2 className="text-lg font-semibold text-[#323c57] mb-2">
            <GrowthEmoji /> Be the First to Know!
          </h2>
          <p className="text-[#323c57] mb-4 text-sm">
            Teaching AI to be your financial BFF <CoinStackEmoji />
          </p>
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2">
            <input
              type="email"
              placeholder="your@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-grow px-4 py-2 border border-[#e0e0e0] rounded-md focus:outline-none focus:ring-2 focus:ring-[#048fd5]"
            />
            <button
              type="submit"
              disabled={isSubmitting}
              className={`bg-[#4591ce] text-white px-6 py-2 rounded-md hover:bg-[#0378b5] transition-colors duration-200 ${
                isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              {isSubmitting ? 'Submitting...' : 'Notify Me'}
            </button>
          </form>
          <p className="text-center text-gray-500 text-xs mt-2">
            No spam, just game-changing updates! 
          </p>
        </div>
      </div>

      {/* Footer */}
      <footer className="fixed bottom-0 w-full bg-gray-100 text-center py-4 text-gray-400">
        © 2024 Capia.ai. All rights reserved.
      </footer>
    </div>
  );
}