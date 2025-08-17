import type { User } from "../../domain/entities/user.entity"

export interface AuthResponse {
  ok: boolean
  user: User | null
  errorCode: string | null
  errorMessage: string | null
}

export interface ErrorResponse {
  code: string
  message: string
}
