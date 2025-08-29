
import useDashboardStats from "../../hooks/use-dashboard-stats"

export default function NextMeeting() {
  const { nextMeeting: meeting, loading, error } = useDashboardStats()

  if (loading || !meeting) return null

  if (error) return (
    <h2 className="text-red-500 text-2xl font-bold">
      Error: {error}
    </h2>
  )

  return (
    <section className="w-full max-w-xl bg-surface rounded-lg shadow px-4 py-6 animate-fade-in">
      <h2 className="text-xl font-bold text-primary mb-2">
        Próxima reunión
      </h2>

      <h3 className="text-2xl font-bold text-accent">
        {meeting.title}
      </h3>

      <p className="text-secondary mb-2 whitespace-pre-line">
        {meeting.description || <span className="italic text-gray-400">Sin descripción</span>}
      </p>

      <div className="flex flex-row items-center justify-start gap-4 mb-4 text-sm">
        <p>
          <span className="font-semibold text-primary">Fecha:</span>{' '}
          {new Date(meeting.startDate).toLocaleDateString()}
        </p>

        <p>
          <span className="font-semibold text-primary">Hora:</span>{' '}
          {new Date(meeting.startDate).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </p>
      </div>

      {meeting.meetingLink && (
        <a
          href={meeting.meetingLink}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-2 px-4 py-1.5 rounded-lg bg-primary text-white font-semibold shadow hover:bg-primary/90 transition-colors"
        >
          Unirse a la reunión
        </a>
      )}
    </section>
  )
}
