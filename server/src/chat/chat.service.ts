import { Injectable } from '@nestjs/common';
import OpenAI from "openai";

@Injectable()
export class ChatService {

    constructor(private readonly openai: OpenAI) {
    }

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

    async validateInformation(information: string): Promise<boolean> {
        try {
            const data = await this.openai.chat.completions.create({
                messages: [
                    { role: 'user', content: `Est-ce que l'information suivante est correcte : ${information}?` },
                ],
                model: 'gpt-3.5-turbo',
            });

            const response = data.choices[0].message.content.toLowerCase();
            return response.includes('oui') || response.includes('correct');
        } catch (error) {
            console.error(error);
        }
    }

    async generateSuggestions(context: string, numSuggestions: number = 3): Promise<string[]> {
        try {
            const data = await this.openai.chat.completions.create({
                messages: [{ role: 'system', content: 'You are a helpful assistant.' }, { role: 'user', content: context }],
                max_tokens: 50, // Ajustez en fonction de la longueur de la suggestion que vous souhaitez
                n: numSuggestions, // Nombre de suggestions à générer
                stop: ['\n'], // Arrêter la génération de texte à la première nouvelle ligne
                temperature: 0.5, // Contrôle de la créativité du modèle (ajustez au besoin)
                model: 'gpt-3.5-turbo',
            });

            // Extraire les suggestions générées par OpenAI
            const suggestions: string[] = data.choices.map((choice) => choice.message.content);
            return suggestions;
        } catch (error) {
            console.error(error);
            return []; // En cas d'erreur, retourner une liste vide
        }
    }
}
