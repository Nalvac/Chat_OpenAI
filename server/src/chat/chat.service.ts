import { Injectable } from '@nestjs/common';
import OpenAI from "openai";
import { MessageInterface } from "interface/messageInterface";
import {ChatCompletionMessageParam} from "openai/resources";
@Injectable()
export class ChatService {

    constructor(private readonly openai: OpenAI) {
    }

    // Service pour la traduction des messages de la discussion
    async makeTranslate(text: string, language: string): Promise<string> {
        let data;
        try {
            data = await this.openai.chat.completions.create({
                messages: [{role: 'user', content: `Traduit ce text: '${text}' en '${language}' sans commentaire`}],
                model: 'gpt-3.5-turbo',
            });

            return data.choices[0].message.content;
        } catch (error) {
            console.error(error);
        }
    }

    // Service de validation d'une information (Si l'affirmation passé en paramètre est vrai ou fausse)
    async validateInformation(information: string): Promise<boolean> {
        try {
            const data = await this.openai.chat.completions.create({
                messages: [
                    { role: 'user', content: `Est-ce que l'information suivante est correcte : '${information}' ? repond par vrai ou faux` },
                ],
                model: 'gpt-3.5-turbo',
            });

            const response = data.choices[0].message.content.toLowerCase();
            console.log(response);
            return response.includes('vrai') || response.includes('correct');
        } catch (error) {
            console.error(error);
        }
    }

    // Service de generations des suggestions (avec 3 suggestions)
    async generateSuggestions(messages: MessageInterface[], numSuggestions: number = 3): Promise<MessageInterface[]> {
        try {
            const context = [
                { role: 'system', content: 'You are a helpful assistant.' },
                    ...messages.map(({role, content}) => ({role: 'user', content}))
            ] as ChatCompletionMessageParam[];

            const data = await this.openai.chat.completions.create({
                messages: context,
                max_tokens: 50,
                n: numSuggestions,
                stop: ['\n'],
                temperature: 0.5,
                model: 'gpt-3.5-turbo',
            });

            const suggestions: MessageInterface[] = data.choices.map((choice) =>
                ({role: 'bot', content: choice.message.content, userName: 'Gpt', sendAt: (new Date()).toLocaleDateString(), messageChecked: ''} as MessageInterface));
            return suggestions;
        } catch (error) {
            console.error(error);
            return [];
        }
    }
}
