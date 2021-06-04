export interface Teacher {
    name: string;
    title: string;
    number: string;
    id?:string;
}

export interface Course{
    name: string;       //课程名称
    teacherNum: string; //教师编号
    id?: string;
}

export interface Schedule{
    course: Course; //课程
    week : string;  //第几周
    day : string;   //星期几
    order : string; //哪节课（每天5节课）
}

export interface lab{
    number : string; //实验室编号
    schedule : Schedule;//实验室课程表
}