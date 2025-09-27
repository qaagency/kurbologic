import * as React from "react"
import { Dialog, DialogContent, DialogClose } from "@/components/ui/dialog"
import { X, CheckCircle } from "lucide-react"

interface ServiceDetailDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  service: {
    icon: React.ComponentType<any>
    title: string
    overview: string
    benefits: string[]
    results: string
    accent: string
  }
}

export const ServiceDetailDialog: React.FC<ServiceDetailDialogProps> = ({
  open,
  onOpenChange,
  service
}) => {
  if (!service) return null
  
  const IconComponent = service.icon

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent 
        className="w-[90vw] h-[60vh] md:max-w-sm md:w-auto md:h-auto md:max-h-[42vh] md:rounded-xl border-0 md:border border-white/10 bg-[#0B1220]/95 backdrop-blur-xl shadow-2xl p-0"
      >
        <div className="relative flex flex-col h-full overflow-hidden">
          {/* Header */}
          <div className="flex items-start gap-2 p-2 border-b border-white/10 bg-gradient-to-b from-white/5 to-transparent flex-shrink-0">
            <div className="w-6 h-6 rounded-lg bg-white/10 flex items-center justify-center text-white flex-shrink-0">
              <IconComponent className="w-3 h-3" />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="text-xs md:text-sm font-semibold leading-tight text-white pr-6">
                {service.title}
              </h3>
              <p className="text-[10px] md:text-xs text-white/60">Overview</p>
            </div>
            <DialogClose className="absolute top-2 right-2 p-1 rounded-lg text-white/70 hover:text-white hover:bg-white/10 transition-colors focus-visible:ring-2 focus-visible:ring-indigo-400 focus-visible:outline-none" aria-label="Close dialog">
              <X className="w-3 h-3" />
            </DialogClose>
          </div>

          {/* Body */}
          <div className="flex-1 px-2 py-2 space-y-2 overflow-y-auto overscroll-contain">
            <div className="space-y-2">
              <p className="text-[10px] md:text-xs leading-[1.3] text-white/80">
                {service.overview}
              </p>

              <div>
                <h4 className="text-xs font-semibold mb-1 text-white/95">
                  Key Benefits
                </h4>
                <ul className="space-y-1">
                  {service.benefits.map((benefit, idx) => (
                    <li key={idx} className="flex items-start gap-1.5">
                      <CheckCircle className="w-3 h-3 text-green-400 flex-shrink-0 mt-0.5" />
                      <span className="text-white/80 leading-[1.3] text-[10px] md:text-xs">
                        {benefit}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              {service.results && (
                <div className="rounded-lg border border-white/10 bg-white/5 p-1.5">
                  <p className="text-[10px] md:text-xs text-white/85 font-medium leading-[1.3]">
                    {service.results}
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Sticky Action Bar */}
          <div className="flex-shrink-0 border-t border-white/10 bg-[#0B1220]/95 backdrop-blur-xl p-2 pb-[max(8px,env(safe-area-inset-bottom))]">
            <div className="grid grid-cols-2 gap-1.5">
              <button 
                className={`inline-flex items-center justify-center rounded-lg bg-gradient-to-r ${service.accent} text-white font-medium py-1.5 px-2 text-xs hover:shadow-lg transition-all duration-300 transform hover:scale-105 focus-visible:ring-2 focus-visible:ring-indigo-400 focus-visible:outline-none`}
              >
                Get Started
              </button>
              <button 
                className="inline-flex items-center justify-center rounded-lg border border-white/15 text-white/90 hover:text-white hover:bg-white/5 py-1.5 px-2 font-medium text-xs transition-all duration-300 focus-visible:ring-2 focus-visible:ring-indigo-400 focus-visible:outline-none"
              >
                Book Consultation
              </button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}