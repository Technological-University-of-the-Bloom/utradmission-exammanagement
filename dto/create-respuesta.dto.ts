export class CreateRespuestaDto {
  id_respuesta?: number;
  id_pregunta: number;
  imagen: string;
  opcion_a?: string;
  opcion_b?: string;
  opcion_c?: string;
  opcion_d?: string;
  opcion_e?: string;
  opcion_correcta: string;
}
