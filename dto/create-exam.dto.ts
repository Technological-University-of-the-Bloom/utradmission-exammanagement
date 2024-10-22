export class createExamDto {
  id_examen?: number;
  fecha_aplicar: string; //Insert a date in the format YYYY-MM-DD
  version_examen?: number;
  fecha_actualizada?: Date;
  fecha_creacion?: Date;
  tiempo_limite?: number;
  is_active?: boolean;
  id_carrera?: number;
  exam_type?: string;
}
