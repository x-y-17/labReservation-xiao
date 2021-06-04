import { Teacher } from "@/datasource/Type"

export function listTeacher(teacher: Teacher) {
    const teachers: Teacher[] = [];
    const tea: Teacher[] = teachers;
    teachers.push(teacher);
    return teachers;
}