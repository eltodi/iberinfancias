

export function getConfig(context?: any) {
   const runtime = context?.locals?.runtime;
   
   if (runtime?.env) {      
      return {
         API_HOST: runtime.env.API_HOST,
         API_TOKEN: runtime.env.API_TOKEN,
         TURSO_DATABASE_URL: runtime.env.TURSO_DATABASE_URL,
         TURSO_AUTH_TOKEN: runtime.env.TURSO_AUTH_TOKEN,       
     };
   }
   
   return {
      API_HOST: import.meta.env.API_HOST,
      API_TOKEN: import.meta.env.API_TOKEN,
      TURSO_DATABASE_URL: import.meta.env.TURSO_DATABASE_URL,
      TURSO_AUTH_TOKEN: import.meta.env.TURSO_AUTH_TOKEN,
   };
 }