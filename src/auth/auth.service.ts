import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { from, Observable, forkJoin, of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { User as UserEntity } from 'src/entity/user.entity';
import { User } from 'src/user/user.class';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { TokensDto } from './dto/auth.dto';
import { tap } from 'rxjs';
import { RedisService } from 'src/redis/redis.service';


 
@Injectable()
export class AuthService {

    constructor (@InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
    private jwtService: JwtService,
    private redisService: RedisService,
  ) {}


    hashPassword(password: string): Observable<string> {
    return from(bcrypt.hash(password, 12));
    }  

    
    doesUserExist(name: string): Observable<Boolean> {
      return from(this.userRepository.findOne({ name })).pipe(
        switchMap((user: User) => {
          return of(!!user);
        }),
      );
    }


    validateUser(name: string, password: string): Observable<User> {
      return from(
        this.userRepository.findOne(
          { name },
          {
            select: ['id', 'name', 'balance', 'password', 'role'],
          },
        ),
      ).pipe(
        switchMap((user: User) => {
          if (!user) {
            throw new HttpException(
              { status: HttpStatus.NOT_FOUND, error: 'Invalid Credentials' },
              HttpStatus.NOT_FOUND,
            );
          }
          return from(bcrypt.compare(password, user.password)).pipe(
            map((isValidPassword: boolean) => {
              if (isValidPassword) {
                delete user.password;
                return user;
              }
              else {
                throw new HttpException(
                  { status: HttpStatus.BAD_REQUEST, error: 'Wrong password' },
                  HttpStatus.BAD_REQUEST,
                );
              }
            }),
          );
        }),
      );
    }


    register(user: User): Observable<User> {
        const { name, password, balance, role, registered_at } = user;
        return this.doesUserExist(name).pipe(
            tap((doesUserExist: boolean) => {
              if (doesUserExist){
                throw new HttpException( 
                  'A user has already been created with this name',
                  HttpStatus.BAD_REQUEST,
                );
              }
            }),
            switchMap(() => {
              return this.hashPassword(password).pipe(
                switchMap((hashedPassword: string) => {
                  return from(
                    this.userRepository.save({
                      name,
                      balance,
                      registered_at,
                      role,
                      password: hashedPassword
                    }),

                  ).pipe(
                    map((user: User) => {
                      delete user.password;
                      return user;
                    })
                  )
                })
              )
            })
          )}

    login(user: User): Observable<TokensDto> {
      const { name, password } = user;
      return this.validateUser(name, password).pipe(
        switchMap((user: User) => {
          if (user) {
            
            const accessToken = from(this.jwtService.signAsync({ user }, {expiresIn: "60s"}))
            .pipe( 
              map((value: string) => {
                this.redisService.set("access_token", value, 60);
                return value;
              })
            );

            const refreshToken = from(this.jwtService.signAsync({ user }, {expiresIn: "5 minute"}))
            .pipe(
              map((value: string) => {
                this.redisService.set("refresh_token", value, 60 * 5);
                return value;
              })
            );
            
            return forkJoin({accessToken, refreshToken});
          } 

        }),
    
      );
    }

    refreshToken(refreshToken: string) {
      const refreshTokenPayload = this.jwtService.verifyAsync(refreshToken);
      if(!!refreshTokenPayload) {
        const accessToken = from(this.jwtService.signAsync({ refreshTokenPayload }, {expiresIn: "5 minute"}))
            .pipe( 
              map((value: string) => {
                this.redisService.set("access_token", value, 60 * 5);
                return value;
              })
            );

            const refreshToken = from(this.jwtService.signAsync({ refreshTokenPayload }, {expiresIn: "30 minute"}))
            .pipe(
              map((value: string) => {
                this.redisService.set("refresh_token", value, 60 * 30);
                return value;
              })
            );
            return forkJoin({accessToken, refreshToken});
      }
    }

}
