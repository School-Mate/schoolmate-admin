export type ReportProcess = 'success' | 'pending';

export enum Process {
    pending = 'pending',
    success = 'success',
}

export enum ReportTargetType {
    user = 'user',
    article = 'article',
    asked = 'asked',
    comment = 'comment',
    recomment = 'recomment',
}

export interface Report {
    id: string;
    reportUserId: string;
    reportUserName: string;
    targetId: string;
    targetType: ReportTargetType;
    process: Process;
    message: string;
}