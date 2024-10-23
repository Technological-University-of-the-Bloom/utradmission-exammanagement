import { boolean, pgTable, smallserial, varchar } from 'drizzle-orm/pg-core';

export const respuestas_tecnico = pgTable('resopuestas_tecnico', {
  id_respuesta: smallserial('id_carrera').primaryKey().notNull(),
  imagen: varchar('imagen').notNull(),
  opcion_a: varchar('opcion_a', { length: 500 }).notNull(),
  opcion_b: varchar('opcion_b', { length: 500 }).notNull(),
  opcion_c: varchar('opcion_c', { length: 500 }).notNull(),
  opcion_d: varchar('opcion_d', { length: 500 }).notNull(),
  opcion_e: varchar('opcion_e', { length: 500 }).notNull(),
  opcion_correcta: boolean('correcta').notNull(),
});
