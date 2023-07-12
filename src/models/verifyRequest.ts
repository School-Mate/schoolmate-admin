export type VerifyRequestStatus = 'accepted' | 'pending' | 'denied';

export enum Process {
    pending = 'pending',
    accepted = 'accepted',
    denied = 'denied',
}

export interface VerifyRequest {
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
}

export interface Image {
    createdAt: Date;
    id: string;
    key: string;
    userId: string;
}