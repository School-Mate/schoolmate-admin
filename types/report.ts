import {
  Article,
  Asked,
  Comment,
  Process,
  ReComment,
  Report,
  ReportProcess,
  ReportTargetType,
  User,
} from "schoolmate-types";

export const reportTypeMap: {
  [key in ReportTargetType]: string;
} = {
  user: "유저",
  article: "게시글",
  comment: "댓글",
  recomment: "대댓글",
  asked: "에스크",
};

export const reportStatusMap: {
  [key in ReportProcess]: string;
} = {
  pending: "대기중",
  success: "처리완료",
};

export type ReportTargetTypes = {
  user: User;
  article: Article;
  comment: Comment;
  recomment: ReComment;
  asked: Asked;
};

export interface ReportWithTarget extends Report {
  target: any;
  reportUser: User;
  targetUser: User;
}
