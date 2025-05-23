import { defineAction } from 'astro:actions';
import { z } from 'astro:schema';
import { emailChange, registryForm } from './registroFormTurso.action';
//import { emailChange, registryForm } from './registryForm.action';

export const server = {
   //emailChange,
   //registryForm,
   emailChange,
   registryForm,
}