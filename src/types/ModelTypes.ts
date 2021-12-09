export interface ClassAttributes {
    id?: number,
    name: string,
    code: string,
    year: number,
}

export interface TeacherClassesAttributes{
    id?: number,
    teacher_id: number;
    class_id: number;
}

export interface UserAttributes {
    id?: number;
    class_id?: number;
    name: string;
    email: string;
    password: string;
    type: string;
    registration: number;
};

export interface ScheduleAttributes {
    id?: number;
    teacher_id?: number;
    class_id?: number;
    start_time: string;
    end_time: string;
    matter: string;
}

export interface ScoreAttributes {
    id?: number;
    teacher_id?: number;
    student_id?: number;
    rate: number;
    year: number;
    matter: string;
    bimester: string;
}