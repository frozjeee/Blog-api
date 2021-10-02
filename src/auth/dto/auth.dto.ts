import { UserRole } from "src/entity/user.entity";

export class TokensDto {
    accessToken: string;
    refreshToken: string;
}

export class UserJwtPayloadDto {
    id: number;
    name: string;
    about: string;
    role: UserRole;
}