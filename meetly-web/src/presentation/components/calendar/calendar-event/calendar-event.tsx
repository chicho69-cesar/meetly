interface CalendarEventProps {
  title: string
}

export default function CalendarEvent({ title }: CalendarEventProps) {
  return (
    <div>
      <strong>{title}</strong>
    </div>
  )
}
