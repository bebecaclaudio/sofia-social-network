// Dentro das definições de tipo do vite/client (você não vê isso diretamente)
declare module '*.png' {
    const src: string
    export default src
  }
  declare module '*.jpg' {
   // ...definição similar
  }
  declare module '*.svg' {
   // ...definição similar
  }
  // etc.
// Isso informa ao TypeScript que quando você importar um arquivo com essas extensões, ele deve tratá-lo como uma string (o caminho do arquivo).
// Isso é útil para que você possa usar esses arquivos como URLs em seu código, como em um atributo `src` de uma imagem.
//
// Se você estiver usando outros tipos de arquivos (como .gif, .webp, etc.), você pode adicionar declarações semelhantes para eles.
// Isso é especialmente útil quando você está usando ferramentas como Vite, que podem processar esses arquivos e fornecer URLs para eles.  