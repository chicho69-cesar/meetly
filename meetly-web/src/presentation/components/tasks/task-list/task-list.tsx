import { LayoutDashboard, ListTodo, Pencil, Trash2 } from "lucide-react"
import { useState } from "react"

import { PRIORITY_DISPLAY_MAP, STATUS_DISPLAY_MAP, STATUS_OPTIONS } from "../../../../config/constants/tasks.constant"
import { DatesHelper } from "../../../../config/helpers/dates.helper"
import useTasks from "../../../hooks/use-tasks"
import useUI from "../../../hooks/use-ui"
import ConfirmationModal from "../../ui/confirmation-modal/confirmation-modal"
import TaskModal from "../task-modal/task-modal"

export default function TaskList() {
  const { tasks, handleSetEditingTask, handleDeleteTask } = useTasks()
  const { taskView, setTaskView } = useUI()

  const [showModal, setShowModal] = useState(false)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [taskToDelete, setTaskToDelete] = useState<string | null>(null)

  const handleToggleModal = () => {
    setShowModal((prev) => !prev)
  }

  return (
    <section className="w-full">
      <div className="flex gap-4 items-stretch justify-end my-4">
        <section className="flex items-stretch justify-center gap-0 bg-surface border-primary border rounded-lg overflow-hidden">
          <button
            className={`px-4 py-2 cursor-pointer font-semibold transition-colors ${taskView === "list" ? "bg-primary text-white" : "bg-surface text-primary hover:bg-primary/10"}`}
            onClick={() => setTaskView("list")}
          >
            <ListTodo className="size-5 font-bold" />
          </button>

          <button
            className={`px-4 py-2 cursor-pointer font-semibold transition-colors ${taskView === "kanban" ? "bg-primary text-white" : "bg-surface text-primary hover:bg-primary/10"}`}
            onClick={() => setTaskView("kanban")}
          >
            <LayoutDashboard className="size-5 font-bold" />
          </button>
        </section>

        <button
          className="px-4 py-2 rounded-lg bg-accent text-white font-semibold shadow hover:bg-accent/90 transition cursor-pointer hover:scale-95"
          onClick={handleToggleModal}
        >
          + Nueva tarea
        </button>
      </div>

      {taskView === "list" && (
        <section className="bg-surface rounded-lg shadow p-4 divide-y divide-primary/10">
          {tasks.map((task) => (
            <article
              key={task.id}
              className="flex flex-col md:flex-row md:items-center gap-2 py-4 group"
            >
              <div className="flex-1">
                <h4 className="text-lg font-bold text-primary group-hover:underline">
                  {task.title}
                </h4>

                <p className="text-secondary text-sm mb-1">
                  {task.description}
                </p>

                <div className="flex gap-4 text-xs text-secondary">
                  <p>
                    <span className="font-semibold">Vence: </span>{DatesHelper.formatDate(task.dueDate)}
                  </p>

                  <p>
                    <span className="font-semibold">Prioridad: </span>{PRIORITY_DISPLAY_MAP[task.priority]}
                  </p>

                  <p>
                    <span className="font-semibold">Estado: </span>{STATUS_DISPLAY_MAP[task.status]}
                  </p>
                </div>
              </div>

              <div className="flex gap-2 mt-2 md:mt-0">
                <button
                  className="p-2 cursor-pointer rounded-lg bg-primary/10 text-primary font-semibold hover:bg-primary/20 transition-colors"
                  onClick={() => {
                    handleSetEditingTask(task)
                    handleToggleModal()
                  }}
                >
                  <Pencil className="size-4" />
                </button>

                <button
                  className="p-2 cursor-pointer rounded-lg bg-red-100 text-red-600 font-semibold hover:bg-red-200 transition-colors"
                  onClick={() => {
                    setTaskToDelete(task.id)
                    setShowDeleteModal(true)
                  }}
                >
                  <Trash2 className="size-4" />
                </button>
              </div>
            </article>
          ))}
        </section>
      )}

      {taskView === "kanban" && (
        <section className="flex gap-4 overflow-x-auto pb-2">
          {STATUS_OPTIONS.map((status) => {
            const statusTasks = tasks.filter((t) => STATUS_DISPLAY_MAP[t.status] === status)

            return (
              <div
                key={status}
                className="flex-1 min-w-[260px] bg-surface rounded-xl shadow p-4"
              >
                <h3 className="text-lg font-bold text-primary mb-2 text-center">
                  {status}
                </h3>

                {statusTasks.length === 0 ? (
                  <p className="text-secondary text-sm text-center">
                    No hay tareas en estado {status.toLowerCase()}
                  </p>
                ) : (
                  <div className="flex flex-col gap-3 min-h-[120px]">
                    {statusTasks.map((task) => (
                      <article
                        key={task.id}
                        className="bg-surface rounded-lg p-3 group cursor-grab hover:shadow transition-all border border-primary/20 border-dashed"
                      >
                        <h4 className="font-bold text-primary text-base group-hover:underline">
                          {task.title}
                        </h4>

                        <p className="text-secondary text-xs mb-1">
                          {task.description}
                        </p>

                        <div className="flex gap-2 text-xs text-secondary">
                          <p>
                            <span className="font-semibold">Vence: </span>{DatesHelper.formatDate(task.dueDate)}
                          </p>

                          <p>
                            <span className="font-semibold">Prioridad: </span>{PRIORITY_DISPLAY_MAP[task.priority]}
                          </p>
                        </div>

                        <div className="flex gap-2 mt-2">
                          <button
                            className="p-2 cursor-pointer rounded-lg bg-primary/10 text-primary font-semibold hover:bg-primary/20 transition-colors"
                            onClick={() => {
                              handleSetEditingTask(task)
                              handleToggleModal()
                            }}
                          >
                            <Pencil className="size-4" />
                          </button>

                          <button
                            className="p-2 cursor-pointer rounded-lg bg-red-100 text-red-600 font-semibold hover:bg-red-200 transition-colors"
                            onClick={() => {
                              setTaskToDelete(task.id)
                              setShowDeleteModal(true)
                            }}
                          >
                            <Trash2 className="size-4" />
                          </button>
                        </div>
                      </article>
                    ))}
                  </div>
                )}
              </div>
            )
          })}
        </section>
      )}

      {showModal && (
        <TaskModal onCloseModal={handleToggleModal} />
      )}

      {showDeleteModal && (
        <ConfirmationModal
          message="¿Estás seguro de que deseas eliminar esta tarea?"
          onClose={() => setShowDeleteModal(false)}
          onConfirm={() => handleDeleteTask(taskToDelete || "")}
        />
      )}
    </section>
  )
}
