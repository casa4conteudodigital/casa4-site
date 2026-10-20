import type { Locale } from './i18n';
export type ProjectCategory = 'content' | 'education' | 'digital';
export type Project = {
  id: string;
  number: string;
  name: string;
  image: string;
  category: ProjectCategory;
  theme: string;
  imageFit: 'contain' | 'cover';
  translations: Record<Locale, { type: string; summary: string; description: string; deliverables: string[]; alt: string }>;
};

// Conteúdo baseado no portfólio atual e nas imagens originais fornecidas.
export const projects: Project[] = [
  {
    id: 'basirly', number: '01', name: 'Basirly', image: '/images/basirly.jpeg', category: 'content', theme: 'basirly', imageFit: 'contain',
    translations: {
      pt: { type: 'LOCALIZAÇÃO · APLICATIVO', summary: 'Uma experiência global, com voz brasileira.', description: 'Produção da versão brasileira completa do Basirly, aplicativo de consultoria esotérica com conteúdos de tarô, astrologia e práticas relacionadas. Um trabalho de tradução e localização para aproximar o conteúdo do público brasileiro.', deliverables: ['Versão brasileira completa', 'Tradução de conteúdo', 'Localização para o português brasileiro'], alt: 'Telas do aplicativo Basirly com a seção de consulta amorosa em português' },
      en: { type: 'LOCALIZATION · APP', summary: 'A global experience with a Brazilian voice.', description: 'Creation of the complete Brazilian version of Basirly, an esoteric consulting app featuring tarot, astrology and related practices. Translation and localization to bring its content closer to Brazilian users.', deliverables: ['Complete Brazilian version', 'Content translation', 'Brazilian Portuguese localization'], alt: 'Basirly app screens showing its love consultation section in Portuguese' },
      es: { type: 'LOCALIZACIÓN · APLICACIÓN', summary: 'Una experiencia global, con voz brasileña.', description: 'Producción de la versión brasileña completa de Basirly, una aplicación de consultas esotéricas con contenido de tarot, astrología y prácticas relacionadas. Traducción y localización para acercar su contenido al público brasileño.', deliverables: ['Versión brasileña completa', 'Traducción de contenido', 'Localización al portugués brasileño'], alt: 'Pantallas de Basirly con la sección de consulta amorosa en portugués' },
    },
  },
  {
    id: 'batidas-rimas', number: '02', name: 'Batidas, rimas e vida escolar', image: '/images/batidas-rimas.jpg', category: 'content', theme: 'book', imageFit: 'contain',
    translations: {
      pt: { type: 'TRADUÇÃO · LIVRO', summary: 'Cultura, educação e palavras que atravessam fronteiras.', description: 'Tradução para o português do livro “Beats, Rhymes and Classroom Life”, de Marc Lamont Hill, publicado no Brasil como “Batidas, rimas e vida escolar”. A obra aborda pedagogia Hip-Hop e políticas de identidade.', deliverables: ['Tradução editorial para o português', 'Adaptação de linguagem e contexto'], alt: 'Capa do livro Batidas, rimas e vida escolar, de Marc Lamont Hill' },
      en: { type: 'TRANSLATION · BOOK', summary: 'Culture, education and words that cross borders.', description: 'Portuguese translation of Marc Lamont Hill’s “Beats, Rhymes and Classroom Life”, published in Brazil as “Batidas, rimas e vida escolar”. The book explores Hip-Hop pedagogy and identity politics.', deliverables: ['Editorial translation into Portuguese', 'Language and context adaptation'], alt: 'Brazilian cover of Beats, Rhymes and Classroom Life by Marc Lamont Hill' },
      es: { type: 'TRADUCCIÓN · LIBRO', summary: 'Cultura, educación y palabras que cruzan fronteras.', description: 'Traducción al portugués del libro “Beats, Rhymes and Classroom Life”, de Marc Lamont Hill, publicado en Brasil como “Batidas, rimas e vida escolar”. La obra aborda la pedagogía Hip-Hop y las políticas de identidad.', deliverables: ['Traducción editorial al portugués', 'Adaptación del lenguaje y el contexto'], alt: 'Portada de Batidas, rimas e vida escolar, de Marc Lamont Hill' },
    },
  },
  {
    id: 'show-english', number: '03', name: 'Show English', image: '/images/show-english.png', category: 'education', theme: 'english', imageFit: 'contain',
    translations: {
      pt: { type: 'EDUCAÇÃO · CURSO ONLINE', summary: 'Aprender inglês também pode ser um show.', description: 'Criação do curso online Show English. Um projeto de educação digital que une conteúdo e uma identidade visual expressiva para apresentar o aprendizado de inglês de maneira fácil e divertida.', deliverables: ['Concepção do curso online', 'Criação de conteúdo educativo'], alt: 'Identidade do curso Show English com palco colorido e o texto Inglês Fácil e Divertido' },
      en: { type: 'EDUCATION · ONLINE COURSE', summary: 'Learning English can be a show, too.', description: 'Creation of the Show English online course. A digital education project combining content and an expressive identity to present English learning in an easy, enjoyable way.', deliverables: ['Online course concept', 'Educational content creation'], alt: 'Show English identity with a colorful stage and the tagline Inglês Fácil e Divertido' },
      es: { type: 'EDUCACIÓN · CURSO EN LÍNEA', summary: 'Aprender inglés también puede ser un show.', description: 'Creación del curso en línea Show English. Un proyecto de educación digital que reúne contenido y una identidad visual expresiva para presentar el aprendizaje del inglés de forma fácil y divertida.', deliverables: ['Concepción del curso en línea', 'Creación de contenido educativo'], alt: 'Identidad de Show English con un escenario colorido y el lema Inglês Fácil e Divertido' },
    },
  },
  {
    id: 'arca-lux', number: '04', name: 'Arca Lux', image: '/images/arca-lux.jpg', category: 'digital', theme: 'arca', imageFit: 'contain',
    translations: {
      pt: { type: 'PROJETO DIGITAL · LOJA ONLINE', summary: 'Uma marca que encontra seu espaço no digital.', description: 'Criação da loja esotérica online Arca Lux, incluindo seus aplicativos. Um projeto para levar a marca ao ambiente digital e conectar sua proposta ao público em diferentes telas.', deliverables: ['Desenvolvimento da loja online', 'Desenvolvimento de aplicativos'], alt: 'Logotipo dourado da Arca Lux com um sol sobre uma caixa aberta' },
      en: { type: 'DIGITAL PROJECT · ONLINE SHOP', summary: 'A brand finding its space online.', description: 'Creation of the Arca Lux online esoteric shop, including its apps. A project bringing the brand to the digital world and connecting its offering with audiences across different screens.', deliverables: ['Online shop development', 'App development'], alt: 'Arca Lux golden logo showing a sun above an open box' },
      es: { type: 'PROYECTO DIGITAL · TIENDA EN LÍNEA', summary: 'Una marca que encuentra su espacio digital.', description: 'Creación de la tienda esotérica en línea Arca Lux, incluidos sus aplicativos. Un proyecto que lleva la marca al entorno digital y conecta su propuesta con el público en diferentes pantallas.', deliverables: ['Desarrollo de la tienda en línea', 'Desarrollo de aplicaciones'], alt: 'Logotipo dorado de Arca Lux con un sol sobre una caja abierta' },
    },
  },
];

export type LocalizedProject = Omit<Project, 'translations'> & { content: Project['translations'][Locale] };
export function localizedProjects(locale: Locale): LocalizedProject[] {
  return projects.map(({ translations, ...project }) => ({ ...project, content: translations[locale] }));
}
