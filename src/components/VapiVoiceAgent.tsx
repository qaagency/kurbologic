import React, { useState, useEffect } from 'react';
import Vapi from '@vapi-ai/web';
import { Mic, Phone, PhoneOff } from 'lucide-react';

const VapiVoiceAgent = () => {
  const [vapi, setVapi] = useState<Vapi | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [transcript, setTranscript] = useState<any[]>([]);

  const API_KEY = 'a580dff4-120f-4a86-ac0c-3e4a358295a9';
  const ASSISTANT_ID = '02dae8b8-4776-41d1-9647-b23007f39b53';

  useEffect(() => {
    try {
      const vapiInstance = new Vapi(API_KEY);
      setVapi(vapiInstance);

      // Event listeners
      vapiInstance.on('call-start', () => {
        console.log('Call started');
        setIsConnected(true);
        setIsLoading(false);
        setError(null);
      });

      vapiInstance.on('call-end', () => {
        console.log('Call ended');
        setIsConnected(false);
        setIsLoading(false);
      });

      vapiInstance.on('message', (message: any) => {
        console.log('Message received:', message);
      });

      vapiInstance.on('error', (error: any) => {
        console.error('Vapi error:', error);
        setError('Failed to connect to voice agent');
        setIsLoading(false);
        setIsConnected(false);
      });

      return () => {
        vapiInstance?.stop();
      };
    } catch (err) {
      console.error('Failed to initialize Vapi:', err);
      setError('Failed to initialize voice agent');
    }
  }, []);

  const handleToggleCall = async () => {
    if (!vapi) {
      setError('Voice agent not initialized');
      return;
    }

    try {
      if (isConnected) {
        vapi.stop();
        setTranscript([]);
      } else {
        setIsLoading(true);
        await vapi.start(ASSISTANT_ID);
      }
    } catch (err) {
      console.error('Call error:', err);
      setError('Failed to start call');
      setIsLoading(false);
    }
  };

  return (
    <div className="relative flex flex-col items-center justify-center">
      <div
        className="relative flex items-center justify-center font-inter select-none cursor-pointer"
        style={{ width: 200, height: 200 }}
        onClick={handleToggleCall}
      >
        {/* Text in center */}
        <div className="absolute inset-0 flex items-center justify-center z-10">
          <span className="text-gray-600 font-medium text-lg">
            AI Voice Agent
          </span>
        </div>

        {/* Animated circle */}
        <div
          className={`absolute inset-0 rounded-full transition-all duration-300 ${
            isLoading ? 'animate-pulse' : 'animate-loaderCircle'
          }`}
          style={{
            boxShadow: isConnected
              ? '0 6px 12px 0 #ef4444 inset, 0 12px 18px 0 #dc2626 inset, 0 36px 36px 0 #b91c1c inset, 0 0 3px 1.2px rgba(239, 68, 68, 0.3), 0 0 6px 1.8px rgba(220, 38, 38, 0.2)'
              : isLoading
              ? '0 6px 12px 0 #eab308 inset, 0 12px 18px 0 #ca8a04 inset, 0 36px 36px 0 #a16207 inset, 0 0 3px 1.2px rgba(234, 179, 8, 0.3), 0 0 6px 1.8px rgba(202, 138, 4, 0.2)'
              : '0 6px 12px 0 #38bdf8 inset, 0 12px 18px 0 #005dff inset, 0 36px 36px 0 #1e40af inset, 0 0 3px 1.2px rgba(56, 189, 248, 0.3), 0 0 6px 1.8px rgba(0, 93, 255, 0.2)'
          }}
        ></div>
      </div>

      {/* Error message */}
      {error && (
        <div className="mt-4 p-4 bg-red-900/30 border border-red-500/50 rounded-lg">
          <p className="text-red-400 text-sm">{error}</p>
        </div>
      )}

      <style jsx>{`
        @keyframes loaderCircle {
          0% {
            transform: rotate(90deg);
          }
          50% {
            transform: rotate(270deg);
          }
          100% {
            transform: rotate(450deg);
          }
        }

        .animate-loaderCircle {
          animation: loaderCircle 5s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default VapiVoiceAgent;