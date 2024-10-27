import { pgTable, smallserial, varchar } from 'drizzle-orm/pg-core';

export const preguntas_vocacional = pgTable('preguntas_vocacional', {
  id_pregunta: smallserial('id_pregunta').primaryKey().notNull(),
  descripcion: varchar('descripcion', { length: 500 }).notNull(),
  imagen: varchar('imagen'),
});
