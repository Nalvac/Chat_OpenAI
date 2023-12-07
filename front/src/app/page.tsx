
export default function Home() {

  return (
      <div className="flex items-center justify-center h-screen bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700">
        <div className="max-w-4xl px-6 py-16 mx-auto text-center">
          <h1 className="text-lg font-extrabold leading-none text-white md:text-5xl lg:text-6xl">Bienvenue sur votre App de discussion avec OpenAi</h1>
          <p className="mt-6 text-xl font-normal text-gray-300">Vous avez la possibilité de choisir entre :</p>
          <a href="/chat"
             className="inline-block mt-8 px-6 py-3 text-lg font-medium text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-900"> Traduction de text</a>
          <a href="/chat"
             className="inline-block ml-5 mt-8 px-6 py-3 text-lg font-medium text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-900"> Validation De L&apos;Information</a>
          <a href="/chat"
             className="inline-block ml-5 mt-8 px-6 py-3 text-lg font-medium text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-900">Suggestions De Réponse</a>
        </div>
      </div>
  );
}
