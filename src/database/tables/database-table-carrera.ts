import { pgTable, serial, varchar } from 'drizzle-orm/pg-core';

export const carrera = pgTable('carrera', {
  id_carrera: serial('id_carrera').primaryKey().notNull(),
  nombre: varchar('nombre', { length: 100 }).notNull(),
  jefe_departamento: varchar('jefe_departamento', { length: 100 }).notNull(),
});
