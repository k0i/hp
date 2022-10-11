import { atom, selector } from "recoil";
import { Article } from "../types/article";

export const articlesAtom = atom<Array<Article>>({
  key: "articles",
  default: selector({
    key: "listArticles",
    get: async () => {
      try {
        const response = await fetch(
          process.env.NEXT_PUBLIC_BACKEND_URL + "articles"
        );
        return await response.json();
      } catch (error) {
        throw error;
      }
    },
  }),
});
