'use server';

import { redirect } from "next/navigation";
import { saveMeal } from "@/app/api/route";
import { revalidatePath } from "next/cache";

function isInvalidText(text) {
    return !text || text.trim() === '';
}

//É bom separar as actions dos arquivos jsx porque pode haver problemas caso o componente precise usar use client ou caso o cliente tente mexer no server
export async function shareMeal(prevState, formData) {//This function will be used to send the form data to the server, async and use server were used to indicate that this function will be executed on the server side

    const meal = {
        id: 1,
        title: formData.get('title'),//The get method is used to get the value of a specific key with a certain name from the FormData object
        summary: formData.get('summary'),
        instructions: formData.get('instructions'),
        image: formData.get('image'),
        creator: formData.get('name'),
        creator_email: formData.get('email')
    };

    if (isInvalidText(meal.title) ||
        isInvalidText(meal.summary) ||
        isInvalidText(meal.instructions) ||
        isInvalidText(meal.creator) ||
        isInvalidText(meal.creator_email) ||
        !meal.creator_email.includes('@') ||
        !meal.image || meal.image.size === 0) {
            
        return {
            message: 'Invalid input.'
        };
    }

    await saveMeal(meal);//This function will save the meal to the database
    revalidatePath('/meals');//Serve para revalidar a página /meals, ou seja, ele vai buscar os dados novamente e atualizar a página
    redirect('/meals');//This function will redirect the user to the meals page after the meal is saved
}