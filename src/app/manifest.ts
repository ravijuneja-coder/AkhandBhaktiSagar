import { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'अखंड भक्ति सागर',
    short_name: 'भक्ति सागर',
    description: 'हिंदी भजन, आरती, चालीसा, मंत्र और स्तोत्र का विशाल संग्रह।',
    start_url: '/',
    display: 'standalone',
    background_color: '#173B63',
    theme_color: '#173B63',
    icons: [
      { src: '/icon.png', sizes: '512x512', type: 'image/png' },
      { src: '/apple-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  };
}
