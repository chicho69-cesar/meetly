import { THEMES_COLORS, THEMES_OPTIONS } from "../../../config/constants/themes.constant"
import type { Theme } from "../../../infrastructure/interfaces/theme.interface"
import useUI from "../../hooks/use-ui"
import Title from "../ui/title/title"

export default function Settings() {
  const { setTheme } = useUI()

  return (
    <div>
      <Title text="Configuración" />

      <p className="text-secondary font-semibold mt-4">
        Selecciona el tema de la aplicación
      </p>

      <section className="mt-2 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2">
        {THEMES_OPTIONS.map((theme: string) => (
          <button
            key={theme}
            className="px-4 py-2 rounded-lg border border-primary/20 bg-surface hover:bg-primary/10 transition-colors duration-200 w-full text-left flex items-center justify-start cursor-pointer capitalize"
            onClick={() => setTheme(theme as Theme)}
          >
            <span
              className={`size-4 rounded-sm inline-block mr-2`}
              style={{ backgroundColor: THEMES_COLORS[theme] }}
            ></span>

            {theme}
          </button>
        ))}
      </section>
    </div>
  )
}
