import { type ReactNode, useEffect } from "react"
import { createPortal } from "react-dom"

interface ModalProps {
  open: boolean
  onClose: () => void
  children: ReactNode | ReactNode[]
}

export default function Modal({ open, onClose, children }: ModalProps) {
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }
    return () => {
      document.body.style.overflow = ""
    }
  }, [open])

  if (!open) return null

  return createPortal(
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      aria-modal="true"
      role="dialog"
    >
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity animate-fade-in"
        onClick={onClose}
      />

      <div className="relative z-10 w-full max-w-4xl mx-auto bg-surface rounded-2xl shadow-2xl p-8 animate-modal-in">
        {children}
      </div>

      <style>
        {`
          @keyframes fade-in { from { opacity: 0 } to { opacity: 1 } }
          .animate-fade-in { animation: fade-in 0.2s }
          @keyframes modal-in { from { transform: translateY(40px) scale(0.98) opacity: 0 } to { transform: none opacity: 1 } }
          .animate-modal-in { animation: modal-in 0.25s cubic-bezier(.4,2,.6,1) }
        `}
      </style>
    </div>,
    document.body
  )
}
