export type ContentTypeEnum =
  | 'BHAJAN'
  | 'AARTI'
  | 'CHALISA'
  | 'MANTRA'
  | 'STOTRA'
  | 'BHAKTI_GEET'
  | 'ARTICLE'
  | 'FESTIVAL'
  | 'KATHA';

/** Maps URL slug (lowercase) to Prisma ContentType enum */
export const urlToContentType: Record<string, ContentTypeEnum> = {
  bhajan: 'BHAJAN',
  aarti: 'AARTI',
  chalisa: 'CHALISA',
  mantra: 'MANTRA',
  stotra: 'STOTRA',
  'bhakti-geet': 'BHAKTI_GEET',
  article: 'ARTICLE',
  festival: 'FESTIVAL',
  katha: 'KATHA',
};

/** Maps Prisma ContentType enum to URL slug */
export const contentTypeToUrl: Record<ContentTypeEnum, string> = {
  BHAJAN: 'bhajan',
  AARTI: 'aarti',
  CHALISA: 'chalisa',
  MANTRA: 'mantra',
  STOTRA: 'stotra',
  BHAKTI_GEET: 'bhakti-geet',
  ARTICLE: 'article',
  FESTIVAL: 'festival',
  KATHA: 'katha',
};

/** Human-readable Hindi labels for URL slugs (default / backward-compatible) */
export const contentTypeLabels: Record<string, string> = {
  bhajan: 'भजन',
  aarti: 'आरती',
  chalisa: 'चालीसा',
  mantra: 'मंत्र',
  stotra: 'स्तोत्र',
  'bhakti-geet': 'भक्ति गीत',
  article: 'भक्ति लेख',
  festival: 'त्योहार',
  katha: 'व्रत कथा',
};

/** Human-readable labels for URL slugs, per language */
export const contentTypeLabelsByLang: { hi: Record<string, string>; en: Record<string, string> } = {
  hi: contentTypeLabels,
  en: {
    bhajan: 'Bhajan',
    aarti: 'Aarti',
    chalisa: 'Chalisa',
    mantra: 'Mantra',
    stotra: 'Stotra',
    'bhakti-geet': 'Bhakti Geet',
    article: 'Articles',
    festival: 'Festivals',
    katha: 'Vrat Katha',
  },
};

export const contentTypeDescriptions: Record<string, string> = {
  bhajan: 'भगवान की स्तुति में गाए जाने वाले पवित्र गीत',
  aarti: 'पूजा के समय गाई जाने वाली आरतियाँ',
  chalisa: 'चालीस चौपाइयों में रचित स्तुतियाँ',
  mantra: 'वेदों और शास्त्रों के पवित्र मंत्र',
  stotra: 'देवी-देवताओं की स्तुति में रचित स्तोत्र',
  'bhakti-geet': 'भक्ति और भजन के गीत',
  article: 'भक्ति और आध्यात्म पर लेख',
  festival: 'हिंदू त्योहारों की जानकारी',
  katha: 'व्रत और पूजा में पढ़ी जाने वाली पौराणिक कथाएँ',
};

export const contentTypeDescriptionsByLang: { hi: Record<string, string>; en: Record<string, string> } = {
  hi: contentTypeDescriptions,
  en: {
    bhajan: 'Sacred songs sung in praise of God',
    aarti: 'Aartis sung during worship',
    chalisa: 'Hymns composed in forty verses',
    mantra: 'Sacred mantras from the Vedas and scriptures',
    stotra: 'Stotras composed in praise of deities',
    'bhakti-geet': 'Songs of devotion and bhajan',
    article: 'Articles on devotion and spirituality',
    festival: 'Information about Hindu festivals',
    katha: 'Traditional stories recited during vrat and puja',
  },
};

/** The valid URL slugs for content types shown in nav */
export const validContentTypeSlugs = [
  'bhajan',
  'aarti',
  'chalisa',
  'mantra',
  'stotra',
  'katha',
  'article',
  'festival',
];
