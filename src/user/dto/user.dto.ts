import { UserRole } from "src/entity/user.entity";

export class userDto {
    id: number;
    name: string;
    role: UserRole;
}