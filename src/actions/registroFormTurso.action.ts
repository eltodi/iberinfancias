import { getConfig } from "@/helpers/getconfig";
import { defineAction } from "astro:actions";
import { z } from "astro:content";
import { turso } from 'src/turso';

export const emailChange = defineAction({
  accept: 'json',
  input: z.object({
    email: z.string().email(),
  }),
  handler: async (form, context) => {
    try {
      const result = await turso.execute({
        sql: `SELECT 1 FROM usuarios WHERE email = ? LIMIT 1`,
        args: [form.email],
      });

      if (result.rows.length > 0) {
        throw new Error('Correo electrónico ya registrado');
      }

      return true;
    } catch (err) {      
      if (err instanceof Error) {
        throw new Error(err.message);
      }
      throw new Error('Error inesperado al verificar el correo');
    }
  },
});


export const registryForm = defineAction({
   accept: 'form',
   input: z.object({
      name: z.string().min(2),
      email: z.string().email(),
      telefono: z.string().min(6),
      pais: z.string().min(2),
      cargo: z.string().min(2),
      institucion: z.string().min(2),      
      tipo_registro: z.enum(['persona_fisica', 'institucion']),
      acepta_estatutos: z.literal('on'),
   }),
   handler: async (form, context) => {
      try {
         const sql = `
            INSERT INTO usuarios 
            (name, email, telefono, pais, cargo, institucion, tipo_registro, acepta_estatutos) 
            VALUES (?, ?, ?, ?, ?, ?, ?, ?)
         `;

         const args = [
            form.name,
            form.email,
            form.telefono,
            form.pais,
            form.cargo,
            form.institucion,            
            form.tipo_registro,
            form.acepta_estatutos,
         ];

         await turso.execute({
            sql,
            args,
         });
         return { success: true, message: 'Registro guardado correctamente' };
      } catch (error) {   
         console.error(error)   
         if (error instanceof Error) {
            throw new Error(error.message);
         }
         throw new Error('Error inesperado al guardar el registro');
      }
   },
});
