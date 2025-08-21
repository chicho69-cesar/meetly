import Calendar from "../../components/calendar/calendar/calendar"
import TaskList from "../../components/tasks/task-list"
import Title from "../../components/ui/title/title"

export default function DashboardPage() {
  return (
    <main className="w-full mx-auto max-w-6xl my-12">
      <Title
        text="Panel de control"
        subtitle="Panel de control de Meetly para gestionar eventos y tareas"
      />

      <Calendar />

      <div className="mt-12">
        <Title
          text="Lista de Tareas"
          subtitle="Lista de tareas pendientes y próximas"
        />

        <TaskList />
      </div>
    </main>
  )
}
