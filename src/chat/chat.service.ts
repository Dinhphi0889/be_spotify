import { Injectable } from "@nestjs/common";

@Injectable()
export class ChatService {
    private message: string[] = []

    getAllMessage(): string[] {
        return this.message
    }
    addMessage(message: string): void {
        this.message.push(message)
    }
}