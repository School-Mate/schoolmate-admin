export enum Process {
    pending = 'pending',
    success = 'success',
    denied = 'denied',
}

export interface BoardRequest {
    id: string;
    name: string;
    description: string;
    detail: string;
    userId: string;
    schoolId: string;
    schoolName: string;
}