interface ConfirmationModalProps {
  message: string
  onConfirm: () => void
  onClose: () => void
}

export default function ConfirmationModal({ message, onClose, onConfirm }: ConfirmationModalProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
      />

      <div className="relative z-10 w-full max-w-md mx-auto bg-surface rounded-2xl shadow-2xl p-8 animate-modal-in">
        <h3 className="text-xl font-bold text-center mb-4">
          {message}
        </h3>

        <div className="flex gap-2 mt-2">
          <button
            type="button"
            className="flex-1 py-2 rounded-lg bg-primary text-white font-semibold hover:bg-primary/90 transition-colors cursor-pointer"
            onClick={() => {
              onConfirm()
              onClose()
            }}
          >
            Aceptar
          </button>

          <button
            type="button"
            className="flex-1 py-2 rounded-lg bg-secondary text-white font-semibold hover:bg-secondary/80 transition-colors cursor-pointer"
            onClick={onClose}
          >
            Cancelar
          </button>
        </div>
      </div>

      <style>{`
        @keyframes modal-in { from { transform: translateY(40px) scale(0.98) opacity: 0 } to { transform: none opacity: 1 } }
        .animate-modal-in { animation: modal-in 0.25s cubic-bezier(.4,2,.6,1) }
      `}</style>
    </div>
  )
}
