'use server';

import { redirect } from "next/navigation";
import { saveMeal } from "./meals_2";

//É bom separar as actions dos arquivos jsx porque pode haver problemas caso o componente precise usar use client ou caso o cliente tente mexer no server
export async function shareMeal(formData) {//This function will be used to send the form data to the server, async and use server were used to indicate that this function will be executed on the server side

    const meal = {
        id: 1,
        title: formData.get('title'),//The get method is used to get the value of a specific key with a certain name from the FormData object
        summary: formData.get('summary'),
        instructions: formData.get('instructions'),
        image: formData.get('image'),
        creator: formData.get('name'),
        creator_email: formData.get('email')
    }
    await saveMeal(meal);//This function will save the meal to the database
    redirect('/meals');//This function will redirect the user to the meals page after the meal is saved
}