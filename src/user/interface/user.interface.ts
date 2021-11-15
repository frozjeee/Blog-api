import { UserRole } from "src/entity/user.entity";

export interface userInterface {
    id: number;
    name: string;
    role: UserRole;
}