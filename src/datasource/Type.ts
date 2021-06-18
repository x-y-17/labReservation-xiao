export interface Teacher {
    name: string;
    title: string;
    number: string;
}

export interface Lab{
    number : string; //实验室编号
    computerNumber: string;// 实验室机器数量
    schedule : Schedule[];//实验室课程表
}
export interface Schedule{
    course?: Course; //课程
    week ?: string;  //第几周
    day ?: string;   //星期几
    section ?: string; //哪节课（每天5节课）
    state : boolean;//是否被占用
    labId ?: number;
    teacherId ?: string;
}

export interface Course{
    courseId?: string;   //课程编号
    name: string;       //课程名称
    teacherNum?: string; //教师编号
    studentNum: string; //学生数量
    hours: string;      //学时数
}


