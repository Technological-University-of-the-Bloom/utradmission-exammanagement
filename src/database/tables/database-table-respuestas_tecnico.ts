import { pgTable, smallserial, varchar } from 'drizzle-orm/pg-core';

export const respuestas_tecnico = pgTable('respuestas_tecnico', {
  id_respuesta: smallserial('id_respuesta').primaryKey().notNull(),
  imagen: varchar('imagen').notNull(),
  opcion_a: varchar('opcion_a', { length: 500 }),
  opcion_b: varchar('opcion_b', { length: 500 }),
  opcion_c: varchar('opcion_c', { length: 500 }),
  opcion_d: varchar('opcion_d', { length: 500 }),
  opcion_e: varchar('opcion_e', { length: 500 }),
  opcion_correcta: varchar('opcion_correcta').notNull(),
});
