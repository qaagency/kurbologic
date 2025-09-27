import React from 'react';

interface TechLogo {
  name: string;
  description?: string;
}

const TechLogos: React.FC = () => {
  const technologies: TechLogo[] = [
    { name: 'Twilio', description: 'Voice & SMS API' },
    { name: 'Calendly', description: 'Appointment Scheduling' },
    { name: 'GoHighLevel', description: 'CRM & Marketing' },
    { name: 'n8n', description: 'Workflow Automation' },
    { name: 'Make', description: 'Integration Platform' },
    { name: 'Zapier', description: 'App Connections' },
    { name: 'HubSpot', description: 'CRM Platform' },
    { name: 'Salesforce', description: 'Customer Success' }
  ];

  return (
    <>
      {technologies.map((tech, index) => (
        <div
          key={index}
          className="flex-shrink-0 text-center group cursor-pointer"
        >
          <div className="bg-gray-800/30 hover:bg-gray-700/50 rounded-lg p-6 transition-all duration-300 transform hover:scale-105 min-w-[160px]">
            <div className="text-2xl font-bold text-gray-300 group-hover:text-white transition-colors duration-300 mb-2">
              {tech.name}
            </div>
            {tech.description && (
              <div className="text-sm text-gray-500 group-hover:text-gray-400 transition-colors duration-300">
                {tech.description}
              </div>
            )}
          </div>
        </div>
      ))}
    </>
  );
};

export default TechLogos