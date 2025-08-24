export const PRIORITY_OPTIONS = ["Alta", "Media", "Baja"]
export const STATUS_OPTIONS = ["Pendiente", "En progreso", "Completada"]

export const PRIORITY_SAVE_MAP: Record<string, "low" | "medium" | "high"> = {
  alta: "high",
  media: "medium",
  baja: "low",
}

export const PRIORITY_DISPLAY_MAP: Record<"low" | "medium" | "high", string> = {
  low: "Baja",
  medium: "Media",
  high: "Alta",
}

export const STATUS_SAVE_MAP: Record<string, "pending" | "in-progress" | "completed"> = {
  pendiente: "pending",
  "en progreso": "in-progress",
  completada: "completed",
}

export const STATUS_DISPLAY_MAP: Record<"pending" | "in-progress" | "completed", string> = {
  pending: "Pendiente",
  "in-progress": "En progreso",
  completed: "Completada",
}
