import { Roles } from "@prisma/client";

export default function checkAuthorization(session: any, authorizedRoles: Roles[]): boolean {
    if (!session || !authorizedRoles.includes(session.user.role)) {
      return false;
    }
    return true;
  }