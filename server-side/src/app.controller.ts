import { Controller, Get, Param, Redirect, Render } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @Render('index')
  root() {
    return { message: 'Hello world!!!!!!!!!!!' };
  }

  @Get('generateroom')
  @Redirect()
  generateRoom() {
    const roomId = Math.random().toString(36).slice(-10);
    console.log(roomId);
    return { url: roomId };
  }

  @Get(':roomId')
  @Render('room')
  room(@Param('roomId') roomId: string) {
    return { roomId };
  }
}
