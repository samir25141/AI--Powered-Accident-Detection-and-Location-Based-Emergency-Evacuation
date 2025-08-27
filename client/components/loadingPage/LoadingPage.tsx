import { AlertTriangle } from "lucide-react";


import React, { useEffect, useState } from 'react'

export default function LoadingPage() {
  const [showLogo, setShowLogo] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowLogo(false)
    }, 1000) // logo shows for 1 second

    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="flex h-screen w-screen items-center justify-center bg-gray-50">
      <div className="flex flex-col items-center space-y-6">
        {/* Step 1: Logo */}
        {showLogo ? (
          <h1
            className="text-5xl font-extrabold text-transparent bg-clip-text bg-black
                       animate-logo fade-in-out drop-shadow-md flex"
          >
            <AlertTriangle className="w-12 h-12" style={{ color: "#FACC15" }} />
            
            EAIGLE
          </h1>
        ) : (
          // Step 2: Enhanced message with larger font
          <p className="text-3xl font-semibold text-gray-700 text-center animate-fade-in-fast">
            Enhanced AI for Guardian Location and Evacuation
          </p>
        )}

        {/* Bouncing Dots */}
        <div className="flex space-x-2 pt-2">
          <span className="h-3 w-3 rounded-full bg-blue-500 animate-bounce [animation-delay:0s]"></span>
          <span className="h-3 w-3 rounded-full bg-blue-500 animate-bounce [animation-delay:0.15s]"></span>
          <span className="h-3 w-3 rounded-full bg-blue-500 animate-bounce [animation-delay:0.3s]"></span>
        </div>

        <p className="text-sm text-gray-500">Preparing your dashboard...</p>
      </div>

      {/* Animations */}
      <style jsx>{`
        @keyframes logo {
          0%, 100% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.05);
          }
        }

        .animate-logo {
          animation: logo 1s ease-in-out;
        }

        .fade-in-out {
          animation: fade-out 0.3s ease-out 0.9s forwards;
        }

        .animate-fade-in-fast {
          animation: fade-in 0.4s ease forwards;
        }

        @keyframes fade-out {
          to {
            opacity: 0;
            transform: scale(0.95);
          }
        }

        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  )
}
