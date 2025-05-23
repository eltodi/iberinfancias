import { getConfig } from "@/helpers/getconfig";
import { defineAction } from "astro:actions";
import { z } from "astro:content";


export const emailChange = defineAction({
   accept: 'json',   
   input: z.object({
      email: z.string().email()
   }),
   handler: async( form, context ) => {
      try{         
         const config = getConfig(context);
         const url = config.API_HOST + '?filters[email]=' + form.email;
         const token = config.API_TOKEN;
         
         const response = await fetch(url, {
            method: 'GET',
            headers: {
               'Content-Type': 'application/json',
               'Authorization': token
            },            
         })
         
         if( response.status === 200) {
            const {data} = await response.json();
            if (data.length > 0) {
               throw new Error("Correo electrónico ya registrado")
            }
            return true;
         }else{
            console.log("No 200")
            throw new Error("Error al llamar api")
         }
      }catch(err){
         console.log(err)
         if( err instanceof Error) {
            throw new Error(err.message)
         }      
      }
   }
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
      motivacion: z.string().min(2),
      tipo_registro: z.enum(['persona_fisica', 'institucion']),
      acepta_estatutos: z.literal('on'),
   }),
   handler: async( form, context ) => {
      const config = getConfig(context);
      const url = config.API_HOST
      const token = config.API_TOKEN;
      
      const raw = JSON.stringify({
         "data": form
      });      
      try{
         const response = await fetch(url, {
            method: 'POST',
            headers: {
               'Content-Type': 'application/json',
               'Authorization': token
            },
            body: raw
         })         
         if( response.status === 201 ){
            const {data} = await response.json();
            return data
         }else if( response.status === 400) {
            throw new Error("Revisa la información introducida")            
         }else{
            throw new Error("Datos no validos.")
         }
      }catch(err){
         if( err instanceof Error ){
            throw new Error(err.message)
         }         
      }               
   }
})