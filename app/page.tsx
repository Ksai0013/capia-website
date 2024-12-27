import { GrowthEmoji, CoinStackEmoji } from '@/components/CustomEmojis';
export default function Home() {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
      <div className="text-center max-w-4xl mx-auto px-4">
        {/* Logo container */}
        <div className="mb-16">
          <img 
          src="/capia-logo.png" 
            alt="Capia.ai Logo" 
            className="mx-auto h-60 object-contain"
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
        <div className="max-w-lg mx-auto bg-gradient-to-r from-[#048fd5]/5 to-[#F3F4F6]/5  p-8 rounded-lg shadow-sm">
          <h2 className="text-lg font-semibold text-[#323c57] mb-2">
          <GrowthEmoji /> Be the First to Know!
          </h2>
          <p className="text-[#323c57] mb-4 text-sm">
            Teaching AI to be your financial BFF <CoinStackEmoji />
          </p>
          <form className="flex flex-col sm:flex-row gap-2">
            <input
              type="email"
              placeholder="your@email.com"
              className="flex-grow px-4 py-2 border border-[#e0e0e0] rounded-md focus:outline-none focus:ring-2 focus:ring-[#048fd5]"
            />
            <button
              type="submit"
              className="bg-[#4591ce] text-white px-6 py-2 rounded-md hover:bg-[#0378b5] transition-colors duration-200"
            >
              Notify Me
            </button>
          </form>
          <p className="text-center text-gray-500 text-xs mt-2">
            No spam, just game-changing updates! 
          </p>
        </div>
      </div>

      {/* Footer */}
      <footer className="absolute bottom-4 text-gray-400">
        © 2024 Capia.ai. All rights reserved.
      </footer>
    </div>
  );
}
