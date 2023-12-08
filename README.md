# Chat_OpenAI

Création d'un chatBox Pour une discussion (temps réel) avec pluisieurs clients connecté.

### Fontionnalité du chatbox
- Communication En Temps Réel
- Traduction Automatique
- Validation De L'Information
- Suggestions De Réponse
***
## Lancement du projet

Ce projet et réalisé avec du nextJs côté client et du nestJs coté server.

Après le clone du projet suivez les étapes suivantes

```bash
#### front

cd front
npm install
npm run build
npm start 

### server

Retourner à la racine du projet cd ..
cd server
npm install
npm run buil
npm run start
```


***

### Composant du front

J'ai voulu mettre en place des composants mais j'avais une erreur de tailwind

```bash 
Tailwind CSS: Unhandled exception: ENOENT: no such file or directory, open '/Users/nalvacatinhounon/Documents/Chat_Project/front/.next/static/css/db2bcc6e7e53ce2c.css' Error: ENOENT: no such file or directory, 
open '/Users/nalvacatinhounon/Documents/Chat_Project/front/.next/static/css/db2bcc6e7e53ce2c.css'
```


### Note

Pour la communication avec OpenAi vous aurez besoin de la clé d'API à renseigner dans un fichier .env à la racine 
du project server

### Amélioration

*Dans le projet front, comprendre pourquoi mes composants m'exposent des comportements inattendus*

*Mieux commenter le code*

*Faire attention à l'indentation*

