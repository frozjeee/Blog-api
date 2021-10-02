import { UserRole } from "src/entity/user.entity";

export interface UserInterface {
    id: number;
    name: string;
    password: string;
    balance: number;
    role: UserRole;
    registered_at: Date;
}