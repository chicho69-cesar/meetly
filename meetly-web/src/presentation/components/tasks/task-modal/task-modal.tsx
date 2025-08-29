import { PRIORITY_DISPLAY_MAP, PRIORITY_OPTIONS, PRIORITY_SAVE_MAP, STATUS_DISPLAY_MAP, STATUS_OPTIONS, STATUS_SAVE_MAP } from "../../../../config/constants/tasks.constant"
import useTasks from "../../../hooks/use-tasks"

interface TaskModalProps {
  onCloseModal: () => void
}

export default function TaskModal({ onCloseModal }: TaskModalProps) {
  const { editingTask, handleAddTask, handleUpdateTask, handleSetEditingTask } = useTasks()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const formData = new FormData(e.currentTarget)
    const title = formData.get("title") as string
    const description = formData.get("description") as string
    const dueDate = formData.get("dueDate") as string
    const priority = formData.get("priority") as string
    const status = formData.get("status") as string

    const data = {
      title,
      description,
      dueDate: new Date(dueDate),
      priority: PRIORITY_SAVE_MAP[priority.toLowerCase()],
      status: STATUS_SAVE_MAP[status.toLowerCase()],
    }

    if (!editingTask) {
      await handleAddTask(data)
    } else {
      await handleUpdateTask({
        ...editingTask,
        ...data,
      })
    }

    onCloseModal()
  }

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
            defaultValue={editingTask?.title || ""}
          />

          <textarea
            id="description"
            name="description"
            className="px-4 py-2 rounded-lg border border-primary/20 bg-surface focus:outline-none focus:ring-2 focus:ring-primary text-base"
            placeholder="Descripción"
            defaultValue={editingTask?.description || ""}
          />

          <input
            type="datetime-local"
            id="dueDate"
            name="dueDate"
            className="px-4 py-2 rounded-lg border border-primary/20 bg-surface focus:outline-none focus:ring-2 focus:ring-primary text-base"
            defaultValue={editingTask ? editingTask.dueDate.toISOString().slice(0, 16) : ""}
          />

          <div className="flex gap-2">
            <select
              id="priority"
              name="priority"
              className="flex-1 px-4 py-2 rounded-lg border border-primary/20 bg-surface focus:outline-none focus:ring-2 focus:ring-primary text-base"
              defaultValue={PRIORITY_DISPLAY_MAP[editingTask?.priority || "medium"]}
            >
              {PRIORITY_OPTIONS.map((p) => <option key={p}>{p}</option>)}
            </select>

            <select
              id="status"
              name="status"
              className="flex-1 px-4 py-2 rounded-lg border border-primary/20 bg-surface focus:outline-none focus:ring-2 focus:ring-primary text-base"
              defaultValue={STATUS_DISPLAY_MAP[editingTask?.status || "pending"]}
            >
              {STATUS_OPTIONS.map((s) => <option key={s}>{s}</option>)}
            </select>
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
              onClick={() => {
                handleSetEditingTask(null)
                onCloseModal()
              }}
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
