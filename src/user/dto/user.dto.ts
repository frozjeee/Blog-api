import { UserRole } from "src/entity/users.entity";

export class shortUserDto {
    id: number;
    name: string;
    role: UserRole;
}