interface TitleProps {
  text: string
  subtitle?: string
}

export default function Title({ text, subtitle }: TitleProps) {
  return (
    <>
      <h1 className="text-3xl font-bold text-primary">
        {text}
      </h1>

      {subtitle && (
        <p className="text-lg text-secondary mb-4">
          Bienvenido al panel de control.
        </p>
      )}
    </>
  )
}
