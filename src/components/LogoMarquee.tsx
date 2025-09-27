import React from 'react';

const LogoMarquee: React.FC = () => {
  const logos = [
    { name: 'Twilio', color: 'text-red-400' },
    { name: 'Calendly', color: 'text-blue-400' },
    { name: 'GoHighLevel', color: 'text-green-400' },
    { name: 'n8n', color: 'text-purple-400' },
    { name: 'Make', color: 'text-orange-400' },
  ];

  return (
    <div className="py-12 overflow-hidden">
      <div className="text-center mb-8">
        <p className="text-gray-400 text-sm">Powered by industry-leading technology</p>
      </div>
      
      <div className="relative">
        {/* Gradient overlays for seamless fade effect */}
        <div className="absolute left-0 top-0 w-20 h-full bg-gradient-to-r from-gray-900 to-transparent z-10 pointer-events-none"></div>
        <div className="absolute right-0 top-0 w-20 h-full bg-gradient-to-l from-gray-900 to-transparent z-10 pointer-events-none"></div>
        
        {/* Scrolling container */}
        <div className="marquee-container">
          <div className="marquee-content">
            {/* First set of logos */}
            {logos.map((logo, index) => (
              <div
                key={`first-${index}`}
                className="marquee-item group cursor-pointer"
              >
                <div className={`text-2xl font-bold ${logo.color} transition-all duration-300 group-hover:scale-110`}>
                  {logo.name}
                </div>
              </div>
            ))}
            
            {/* Duplicate set for seamless loop */}
            {logos.map((logo, index) => (
              <div
                key={`second-${index}`}
                className="marquee-item group cursor-pointer"
              >
                <div className={`text-2xl font-bold ${logo.color} transition-all duration-300 group-hover:scale-110`}>
                  {logo.name}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LogoMarquee;