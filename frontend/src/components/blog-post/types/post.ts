import type { components } from "@/types/api";

export interface Post {
  title: string;
  date: Date;
  author: string;
  imageUrl: string | null;
  content: string;
  slug: string;
  status: components["schemas"]["PostStatus"];
}
