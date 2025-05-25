export type Article = {
  id: string;
  title: string;
  author: string;
  category: string;
  slug: string;
  excerpt: string;
  cover_url: string;
  content: string;
  created_at: Date;
  user_id: string;
  updated_at: Date;
};

export type TiptapNode = {
  type: string;
  attrs?: Record<string, string | number | null>;
  content?: TiptapNode[];
  text?: string;
};
