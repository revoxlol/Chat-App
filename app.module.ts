import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';
import {ChatModule} from './chat/chat.module'

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/Werewolf'),
    AuthModule,
    ChatModule,],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
