import { Article, User, Board } from "schoolmate-types";

export type ArticleWithUser = Article & {
    user: User;
    board: Board;
};
