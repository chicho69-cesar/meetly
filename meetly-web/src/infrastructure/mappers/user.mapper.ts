import type { User } from "firebase/auth"
import type { User as UserEntity } from "../../domain/entities/user.entity"

export class UserMapper {
  static fromUserToEntity(user: User): UserEntity {
    return {
      id: user.uid,
      name: user.displayName || "N/A",
      fullName: user.displayName || "N/A",
      email: user.email || "",
      avatarUrl: user.photoURL || undefined
    }
  }
}
