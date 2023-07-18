export type VerifyRequestProcess = 'success' | 'pending' | 'denied';

export enum Process {
    pending = 'pending',
    success = 'success',
    denied = 'denied',
}

export interface VerifyRequest {
    id: string;
    userId: string;
    userName: string;
    imageId: string;
    schoolId: string;
    schoolName: string;
    grade: string;
    class: string;
    createdAt: Date;
    process: Process;
    image: Image
    dept: string;
}

export interface Image {
    createdAt: Date;
    id: string;
    key: string;
    userId: string;
}