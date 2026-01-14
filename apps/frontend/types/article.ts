export type Article = {
  id: string;
  title: string;
  content?: string;
};

export type ArticlesProps = {
  articles: Article[];
};
