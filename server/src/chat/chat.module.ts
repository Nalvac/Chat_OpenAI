import { Module } from '@nestjs/common';
import { ChatController } from './chat.controller';
import { ChatService } from './chat.service';
import { ChatGateway } from './chat.gateway';
import OpenAI from "openai";
import * as process from "process";
import * as dotenv from 'dotenv';

dotenv.config();
@Module({
  controllers: [ChatController],
  providers: [ChatService, ChatGateway, { provide: OpenAI, useValue: new OpenAI({apiKey: process.env["OPENAI_API_KEY"]}) }]
})
export class ChatModule {}
