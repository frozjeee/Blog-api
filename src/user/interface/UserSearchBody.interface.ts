import { UserRole } from "src/entity/users.entity";

export interface UserSearchBody {
    id: number;
    name: string;
    email: string;
    role: UserRole;
    registered_at: Date;
}