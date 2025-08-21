/* eslint-disable @typescript-eslint/no-explicit-any */

import { useState } from "react";

const dummyTasks = [
  {
    id: 1,
    title: "Diseñar pantalla de login",
    description: "Crear el diseño visual para la pantalla de inicio de sesión.",
    dueDate: "2025-08-22",
    priority: "Alta",
    status: "Pendiente",
  },
  {
    id: 2,
    title: "Implementar modal de usuario",
    description: "Agregar modal animado para opciones de usuario.",
    dueDate: "2025-08-23",
    priority: "Media",
    status: "En progreso",
  },
  {
    id: 3,
    title: "Revisar integración de Firebase",
    description: "Verificar autenticación y base de datos.",
    dueDate: "2025-08-25",
    priority: "Baja",
    status: "Completada",
  },
];

const statusOptions = ["Pendiente", "En progreso", "Completada"];
const priorityOptions = ["Alta", "Media", "Baja"];

export default function TaskList() {
  const [view, setView] = useState<'list' | 'kanban'>("list");
  const [tasks, setTasks] = useState(dummyTasks);
  const [showModal, setShowModal] = useState(false);
  const [editingTask, setEditingTask] = useState<any>(null);

  // UI only: open modal for new or edit
  const openModal = (task: any = null) => {
    setEditingTask(task);
    setShowModal(true);
  };
  const closeModal = () => {
    setShowModal(false);
    setEditingTask(null);
  };

  return (
    <section className="w-full max-w-5xl mx-auto p-4 md:p-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <h2 className="text-3xl font-bold text-primary">Mis tareas</h2>
        <div className="flex gap-2 items-center">
          <button
            className={`px-4 py-2 rounded-full font-semibold border transition-colors ${view === 'list' ? 'bg-primary text-white border-primary' : 'bg-surface text-primary border-primary/30 hover:bg-primary/10'}`}
            onClick={() => setView('list')}
          >
            Lista
          </button>
          <button
            className={`px-4 py-2 rounded-full font-semibold border transition-colors ${view === 'kanban' ? 'bg-primary text-white border-primary' : 'bg-surface text-primary border-primary/30 hover:bg-primary/10'}`}
            onClick={() => setView('kanban')}
          >
            Tablero
          </button>
          <button
            className="ml-4 px-4 py-2 rounded-lg bg-accent text-white font-semibold shadow hover:bg-accent/90 transition-colors"
            onClick={() => openModal()}
          >
            + Nueva tarea
          </button>
        </div>
      </div>

      {/* Modal para crear/editar tarea (solo UI) */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={closeModal} />
          <div className="relative z-10 w-full max-w-md mx-auto bg-surface rounded-2xl shadow-2xl p-8 animate-modal-in">
            <h3 className="text-xl font-bold text-primary mb-4">{editingTask ? 'Editar tarea' : 'Nueva tarea'}</h3>
            <form className="flex flex-col gap-4">
              <input className="px-4 py-2 rounded-lg border border-primary/20 bg-background focus:outline-none focus:ring-2 focus:ring-primary" placeholder="Título" defaultValue={editingTask?.title || ''} />
              <textarea className="px-4 py-2 rounded-lg border border-primary/20 bg-background focus:outline-none focus:ring-2 focus:ring-primary" placeholder="Descripción" defaultValue={editingTask?.description || ''} />
              <div className="flex gap-2">
                <input type="date" className="flex-1 px-4 py-2 rounded-lg border border-primary/20 bg-background focus:outline-none focus:ring-2 focus:ring-primary" defaultValue={editingTask?.dueDate || ''} />
                <select className="flex-1 px-4 py-2 rounded-lg border border-primary/20 bg-background focus:outline-none focus:ring-2 focus:ring-primary" defaultValue={editingTask?.priority || 'Media'}>
                  {priorityOptions.map(p => <option key={p}>{p}</option>)}
                </select>
              </div>
              <select className="px-4 py-2 rounded-lg border border-primary/20 bg-background focus:outline-none focus:ring-2 focus:ring-primary" defaultValue={editingTask?.status || 'Pendiente'}>
                {statusOptions.map(s => <option key={s}>{s}</option>)}
              </select>
              <div className="flex gap-2 mt-2">
                <button type="button" className="flex-1 py-2 rounded-lg bg-primary text-white font-semibold hover:bg-primary/90 transition-colors">Guardar</button>
                <button type="button" className="flex-1 py-2 rounded-lg bg-secondary text-primary font-semibold hover:bg-secondary/80 transition-colors" onClick={closeModal}>Cancelar</button>
              </div>
            </form>
          </div>
          <style>{`
            @keyframes modal-in { from { transform: translateY(40px) scale(0.98); opacity: 0; } to { transform: none; opacity: 1; } }
            .animate-modal-in { animation: modal-in 0.25s cubic-bezier(.4,2,.6,1) }
          `}</style>
        </div>
      )}

      {/* Vista de lista */}
      {view === 'list' && (
        <div className="bg-surface rounded-xl shadow p-4 divide-y divide-primary/10">
          {tasks.map(task => (
            <div key={task.id} className="flex flex-col md:flex-row md:items-center gap-2 py-4 group">
              <div className="flex-1">
                <h4 className="text-lg font-bold text-primary group-hover:underline cursor-pointer">{task.title}</h4>
                <p className="text-secondary text-sm mb-1">{task.description}</p>
                <div className="flex gap-4 text-xs text-secondary">
                  <span className="font-semibold">Vence:</span> {task.dueDate}
                  <span className="font-semibold">Prioridad:</span> {task.priority}
                  <span className="font-semibold">Estado:</span> {task.status}
                </div>
              </div>
              <div className="flex gap-2 mt-2 md:mt-0">
                <button className="px-3 py-1 rounded-lg bg-primary/10 text-primary font-semibold hover:bg-primary/20 transition-colors" onClick={() => openModal(task)}>Editar</button>
                <button className="px-3 py-1 rounded-lg bg-red-100 text-red-600 font-semibold hover:bg-red-200 transition-colors">Eliminar</button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Vista Kanban */}
      {view === 'kanban' && (
        <div className="flex gap-4 overflow-x-auto pb-2">
          {statusOptions.map(status => (
            <div key={status} className="flex-1 min-w-[260px] bg-surface rounded-xl shadow p-4">
              <h3 className="text-lg font-bold text-primary mb-2 text-center">{status}</h3>
              <div className="flex flex-col gap-3 min-h-[120px]">
                {tasks.filter(t => t.status === status).map(task => (
                  <div key={task.id} className="bg-background rounded-lg p-3 shadow group cursor-grab hover:shadow-lg transition-all border border-primary/10">
                    <h4 className="font-bold text-primary text-base group-hover:underline">{task.title}</h4>
                    <p className="text-secondary text-xs mb-1">{task.description}</p>
                    <div className="flex gap-2 text-xs text-secondary">
                      <span className="font-semibold">Vence:</span> {task.dueDate}
                      <span className="font-semibold">Prioridad:</span> {task.priority}
                    </div>
                    <div className="flex gap-2 mt-2">
                      <button className="px-2 py-1 rounded bg-primary/10 text-primary font-semibold hover:bg-primary/20 transition-colors text-xs" onClick={() => openModal(task)}>Editar</button>
                      <button className="px-2 py-1 rounded bg-red-100 text-red-600 font-semibold hover:bg-red-200 transition-colors text-xs">Eliminar</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
