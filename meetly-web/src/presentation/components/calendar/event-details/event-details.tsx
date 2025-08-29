import { THEMES_COLORS } from "../../../../config/constants/themes.constant"
import type { CalendarEvent } from "../../../../infrastructure/interfaces/calendar.interface"
import useUI from "../../../hooks/use-ui"

interface EventDetailsProps {
  event: CalendarEvent
  onClose: () => void
  onEdit: () => void
  onDelete: () => void
}

export default function EventDetails({ event, onClose, onEdit, onDelete }: EventDetailsProps) {
  const { theme } = useUI()

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />

      <div className="relative z-10 w-full max-w-2xl mx-auto bg-surface rounded-2xl shadow-2xl p-8 animate-modal-in">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-4 h-4 rounded-full" style={{ backgroundColor: event.color || THEMES_COLORS[theme] }} />

          <h3 className="text-2xl font-bold text-primary flex-1 truncate">
            {event.title}
          </h3>
        </div>

        <div className="mb-4">
          <p className="text-secondary text-lg mb-4 whitespace-pre-line">
            {event.description || <span className="italic text-gray-400">Sin descripción</span>}
          </p>

          <div className="flex flex-col gap-1 text-sm text-gray-600">
            <span><span className="font-semibold text-primary">Inicio:</span> {event.start.toLocaleString()}</span>
            <span><span className="font-semibold text-primary">Fin:</span> {event.end.toLocaleString()}</span>

            {event.meetingLink && (
              <span>
                <span className="font-semibold text-primary">Enlace:</span> <a href={event.meetingLink} target="_blank" rel="noopener noreferrer" className="text-accent underline break-all">{event.meetingLink}</a>
              </span>
            )}

            {event.tags && event.tags.length > 0 && (
              <span>
                <span className="font-semibold text-primary">Etiquetas:</span> {event.tags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-block bg-primary/20 text-primary rounded px-3 py-1 text-xs font-semibold ml-1"
                  >
                    #{tag}
                  </span>
                ))}
              </span>
            )}
          </div>
        </div>

        <div className="flex gap-2 mt-2">
          <button
            className="flex-1 py-2 rounded-lg bg-primary text-white font-semibold hover:bg-primary/90 transition-colors cursor-pointer"
            onClick={onEdit}
          >
            Editar
          </button>

          <button
            className="flex-1 py-2 rounded-lg bg-red-500 text-white font-semibold hover:bg-red-600 transition-colors cursor-pointer"
            onClick={onDelete}
          >
            Eliminar
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
