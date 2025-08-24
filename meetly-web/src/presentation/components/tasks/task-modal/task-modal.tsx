import { PRIORITY_OPTIONS, STATUS_OPTIONS } from "../../../../config/constants/tasks.constant"
import useTasks from "../../../hooks/use-tasks"

interface TaskModalProps {
  onCloseModal: () => void
}

export default function TaskModal({ onCloseModal }: TaskModalProps) {
  const { editingTask } = useTasks()

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={onCloseModal}
      />

      <div className="relative z-10 w-full max-w-md mx-auto bg-surface rounded-2xl shadow-2xl p-8 animate-modal-in">
        <h3 className="text-xl font-bold text-primary mb-4">
          {editingTask ? "Editar tarea" : "Nueva tarea"}
        </h3>

        <form className="flex flex-col gap-4">
          <input
            className="px-4 py-2 rounded-lg border border-primary/20 bg-surface focus:outline-none focus:ring-2 focus:ring-primary text-base"
            placeholder="Título"
            defaultValue={editingTask?.title || ""}
          />

          <textarea
            className="px-4 py-2 rounded-lg border border-primary/20 bg-surface focus:outline-none focus:ring-2 focus:ring-primary text-base"
            placeholder="Descripción"
            defaultValue={editingTask?.description || ""}
          />

          <div className="flex gap-2">
            <input
              type="date"
              className="flex-1 px-4 py-2 rounded-lg border border-primary/20 bg-surface focus:outline-none focus:ring-2 focus:ring-primary text-base"
              defaultValue={editingTask ? new Date(editingTask.dueDate).toISOString().split("T")[0] : ""}
            />

            <select
              className="flex-1 px-4 py-2 rounded-lg border border-primary/20 bg-surface focus:outline-none focus:ring-2 focus:ring-primary text-base"
              defaultValue={editingTask?.priority || "Media"}
            >
              {PRIORITY_OPTIONS.map((p) => <option key={p}>{p}</option>)}
            </select>
          </div>

          <select
            className="px-4 py-2 rounded-lg border border-primary/20 bg-surface focus:outline-none focus:ring-2 focus:ring-primary text-base"
            defaultValue={editingTask?.status || "Pendiente"}
          >
            {STATUS_OPTIONS.map((s) => <option key={s}>{s}</option>)}
          </select>

          <div className="flex gap-2 mt-2">
            <button
              type="button"
              className="flex-1 py-2 rounded-lg bg-primary text-white font-semibold hover:bg-primary/90 transition-colors cursor-pointer"
            >
              Guardar
            </button>

            <button
              type="button"
              className="flex-1 py-2 rounded-lg bg-secondary text-white font-semibold hover:bg-secondary/80 transition-colors cursor-pointer"
              onClick={onCloseModal}
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
