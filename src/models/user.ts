export interface User {
    id: string;
    email?: string;
    phone?: string;
    name: string;
    provider: string;
    verified: boolean;
    profile?: string;
    createdAt: Date;
    userSchoolId?: string;
}