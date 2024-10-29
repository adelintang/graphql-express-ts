import { UserRole } from "../../prisma/client";
import { Users } from "../../prisma/client";

interface RegisterDTO {
  id: string
  name: string
  email: string
  role: UserRole
}

export const registerMapper = (user: Users): RegisterDTO => {
  return {
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
  }
}