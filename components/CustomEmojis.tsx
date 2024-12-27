// components/CustomEmojis.tsx

export const GrowthEmoji = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" className="inline-block align-text-bottom">
      {/* Bars */}
      <rect x="4" y="12" width="4" height="8" fill="#048fd5" />
      <rect x="10" y="8" width="4" height="12" fill="#048fd5" />
      <rect x="16" y="4" width="4" height="16" fill="#048fd5" />
      {/* Arrow Line */}
      <path 
        d="M4 8L16 2" 
        stroke="#323c57" 
        strokeWidth="2"
        strokeLinecap="round" 
      />
      {/* Arrow Head */}
      <path 
        d="M16 2L14 6M16 2L12 3" 
        stroke="#323c57" 
        strokeWidth="2"
        strokeLinecap="round" 
      />
    </svg>
  );
  
  export const CoinStackEmoji = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" className="inline-block align-text-bottom">
      <ellipse cx="12" cy="18" rx="8" ry="2" fill="#048fd5" />
      <ellipse cx="12" cy="14" rx="8" ry="2" fill="#048fd5" opacity="0.7" />
      <ellipse cx="12" cy="10" rx="8" ry="2" fill="#048fd5" opacity="0.5" />
      <ellipse cx="12" cy="6" rx="8" ry="2" fill="#048fd5" opacity="0.3" />
    </svg>
  );

  
  
      // Wallet
      export const WalletEmoji = () => (
        <svg width="24" height="24" viewBox="0 0 24 24" className="inline-block align-text-bottom">
          <path d="M2 6C2 4.89543 2.89543 4 4 4H20C21.1046 4 22 4.89543 22 6V18C22 19.1046 21.1046 20 20 20H4C2.89543 20 2 19.1046 2 18V6Z" fill="#048fd5" />
          <circle cx="16" cy="12" r="2" fill="#323c57" />
        </svg>
      );
  
      // Investment Target
      export const TargetEmoji = () => (
        <svg width="24" height="24" viewBox="0 0 24 24" className="inline-block align-text-bottom">
          <circle cx="12" cy="12" r="10" stroke="#048fd5" strokeWidth="2" fill="none" />
          <circle cx="12" cy="12" r="6" stroke="#048fd5" strokeWidth="2" fill="none" />
          <circle cx="12" cy="12" r="2" fill="#048fd5" />
        </svg>
      );
  
      // Smart Contract
      export const ContractEmoji = () => (
        <svg width="24" height="24" viewBox="0 0 24 24" className="inline-block align-text-bottom">
          <rect x="4" y="4" width="16" height="16" rx="2" fill="#048fd5" />
          <path d="M8 8H16M8 12H16M8 16H12" stroke="white" strokeWidth="2" strokeLinecap="round" />
        </svg>
      );
  
      // AI Finance
      export const AiFinanceEmoji = () => (
        <svg width="24" height="24" viewBox="0 0 24 24" className="inline-block align-text-bottom">
          <rect x="4" y="4" width="16" height="16" rx="4" fill="#048fd5" />
          <path d="M8 12C8 8 16 8 16 12C16 16 8 16 8 12Z" stroke="white" strokeWidth="2" fill="none" />
          <circle cx="12" cy="12" r="2" fill="white" />
        </svg>
      );
  
    