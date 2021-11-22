import { UserRole } from "src/entity/users.entity";

export interface userInterface {
    id: number;
    name: string;
    role: UserRole;
}