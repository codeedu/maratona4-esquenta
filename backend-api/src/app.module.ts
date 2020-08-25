import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './models/user.model';
import { ConfigModule } from '@nestjs/config';
import { UserController } from './controllers/user/user.controller';
import { RoomController } from './controllers/room/room.controller';
import { Room } from './models/room.model';
import { WebsocketService } from './websocket/websocket.service';
import KeycloakModule, { AuthGuard } from 'nestjs-keycloak-admin';
import { APP_GUARD } from '@nestjs/core';
@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      // @ts-ignore
      type: process.env.TYPEORM_CONNECTION,
      host: process.env.TYPEORM_HOST,
      port: parseInt(process.env.TYPEORM_PORT),
      username: process.env.TYPEORM_USERNAME,
      password: process.env.TYPEORM_PASSWORD,
      database: process.env.TYPEORM_DATABASE,
      entities: [User, Room],
    }),
    TypeOrmModule.forFeature([User, Room]),
    KeycloakModule.registerAsync({
      useFactory: () => {
        const keycloakConfig = JSON.parse(process.env.KEYCLOAK_JSON);
        return {
          baseUrl: keycloakConfig['auth-server-url'],
          realmName: keycloakConfig['realm'],
          clientId: keycloakConfig['resource'],
          clientSecret: keycloakConfig['credentials']['secret'],
        };
      },
    }),
  ],
  controllers: [AppController, UserController, RoomController],
  providers: [AppService, WebsocketService, {provide: APP_GUARD, useClass: AuthGuard}],
})
export class AppModule {}
