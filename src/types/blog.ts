export interface Blog {
  _id: string;
  title: string;
  summary: string;
  content: string;
  author: string;
  date: string;
  tag: string[];
  videoEmbedUrl: string | null;
  imageUrl: string;
  avatarUrl: string;
}
