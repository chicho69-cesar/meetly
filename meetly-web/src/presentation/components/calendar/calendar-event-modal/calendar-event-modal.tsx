import type { Event } from "../../../../domain/entities/event.entity"

interface CalendarEventModalProps {
  onClose: () => void
  editingEvent?: Event
  dates?: {
    startDate: string
    endDate: string
  }
}

export default function CalendarEventModal({ onClose, editingEvent, dates }: CalendarEventModalProps) {
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const formData = new FormData(e.currentTarget)
    const title = formData.get("title") as string
    const description = formData.get("description") as string
    const startDate = formData.get("startDate") as string
    const endDate = formData.get("endDate") as string
    const meetingLink = formData.get("meetingLink") as string
    const tags = (formData.get("tags") as string).split(",").map((tag) => tag.trim()).filter((tag) => tag.length > 0)
    const color = formData.get("color") as string

    console.log({
      title,
      description,
      startDate,
      endDate,
      meetingLink,
      tags,
      color,
    })
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
      />

      <div className="relative z-10 w-full max-w-md mx-auto bg-surface rounded-2xl shadow-2xl p-8 animate-modal-in">
        <h3 className="text-xl font-bold text-primary mb-4">
          {editingEvent ? "Editar evento" : "Nuevo evento"}
        </h3>

        <form
          className="flex flex-col gap-4"
          onSubmit={handleSubmit}
        >
          <input
            type="text"
            id="title"
            name="title"
            className="px-4 py-2 rounded-lg border border-primary/20 bg-surface focus:outline-none focus:ring-2 focus:ring-primary text-base"
            placeholder="Título"
            defaultValue={editingEvent?.title || ""}
            required
          />

          <textarea
            id="description"
            name="description"
            className="px-4 py-2 rounded-lg border border-primary/20 bg-surface focus:outline-none focus:ring-2 focus:ring-primary text-base"
            placeholder="Descripción"
            defaultValue={editingEvent?.description || ""}
          />

          <input
            type="datetime-local"
            id="startDate"
            name="startDate"
            className="px-4 py-2 rounded-lg border border-primary/20 bg-surface focus:outline-none focus:ring-2 focus:ring-primary text-base"
            defaultValue={dates?.startDate || ''}
            required
          />

          <input
            type="datetime-local"
            id="endDate"
            name="endDate"
            className="px-4 py-2 rounded-lg border border-primary/20 bg-surface focus:outline-none focus:ring-2 focus:ring-primary text-base"
            defaultValue={dates?.endDate || ''}
            required
          />

          <input
            type="url"
            id="meetingLink"
            name="meetingLink"
            className="px-4 py-2 rounded-lg border border-primary/20 bg-surface focus:outline-none focus:ring-2 focus:ring-primary text-base"
            placeholder="URL de la reunión (opcional)"
            defaultValue={editingEvent?.meetingLink || ""}
          />

          <div className="w-full flex flex-row justify-between gap-4 items-center">
            <input
              type="text"
              id="tags"
              name="tags"
              className="flex-1 px-4 py-2 rounded-lg border border-primary/20 bg-surface focus:outline-none focus:ring-2 focus:ring-primary text-base"
              placeholder="Etiquetas (separadas por comas)"
              defaultValue={editingEvent?.tags.join(", ") || ""}
            />

            <div className="flex flex-col justify-items-start items-center">
              <span className="text-xs text-secondary font-semibold">
                Color:
              </span>

              <input
                type="color"
                id="color"
                name="color"
                className="size-9 p-0 border-none outline-none bg-transparent cursor-pointer"
                defaultValue={editingEvent?.color || "#3b82f6"}
                title="Color del evento"
                aria-label="Color del evento"
              />
            </div>
          </div>

          <div className="flex gap-2 mt-2">
            <button
              type="submit"
              className="flex-1 py-2 rounded-lg bg-primary text-white font-semibold hover:bg-primary/90 transition-colors cursor-pointer"
            >
              Guardar
            </button>

            <button
              type="button"
              className="flex-1 py-2 rounded-lg bg-secondary text-white font-semibold hover:bg-secondary/80 transition-colors cursor-pointer"
              onClick={onClose}
            >
              Cancelar
            </button>
          </div>
        </form>
      </div>

      <style>{`
        @keyframes modal-in { from { transform: translateY(40px) scale(0.98) opacity: 0 } to { transform: none opacity: 1 } }
        .animate-modal-in { animation: modal-in 0.25s cubic-bezier(.4,2,.6,1) }
      `}</style>
    </div>
  )
}
