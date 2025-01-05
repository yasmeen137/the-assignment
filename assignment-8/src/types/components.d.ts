declare module '../components/galay' {
  export interface AnimeCardProps {
    name?: string;
    preview?: string;
    imageUrl?: string;
    href: string;
    rating?: number;
  }

  const AnimeCard: React.FC<AnimeCardProps>;
  export default AnimeCard;
}
