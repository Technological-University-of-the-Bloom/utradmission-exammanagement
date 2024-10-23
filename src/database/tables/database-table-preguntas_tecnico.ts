import { varchar, pgTable, smallserial } from 'drizzle-orm/pg-core';

export const preguntas_tecnico = pgTable('preguntas_tecnico', {
  id_pregunta: smallserial('id_pregunta').primaryKey(),
  imagen: varchar('imagen').notNull(),
  descripcion: varchar('descripcion', { length: 500 }).notNull(),
});
