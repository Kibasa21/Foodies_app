'use server';//indica que esse arquivo será executado no servidor

import { createClient } from '@supabase/supabase-js';
import { revalidatePath } from 'next/cache';
import fs from 'node:fs';//fs serve para manipular arquivos, como ler, escrever, deletar, etc, fs stands for file system

import slugify from 'slugify';//slugify serve para transformar uma string em um slug, que é uma string com caracteres alfanuméricos e sem espaços
import xss from 'xss';//xss serve para evitar ataques de cross-site scripting, que são ataques que injetam scripts maliciosos em páginas web

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);

export async function getMeals() {//Já essa serve para pegar todos os meals

    const { data, error } = await supabase.from('Meals').select();//seleciona todos os dados da tabela meals .gt('id', 0)
    
    //throw new Error('Loading meals failed.');//Só para testar o fallback de erro
    let images_url= [];
    data.map( meal => {
        const { data: data_photo, error: error_photo } = supabase
            .storage
            .from('meals_photos')
            .getPublicUrl(meal.image.split('s/')[1]);//seleciona a imagem do meal na forma de URL pública
        images_url.push(data_photo.publicUrl);
    });
    return {
        data,
        images_url
    };
    //.run() serviria para mudar o banco de dados, o .all() serve para pegar os dados, já o .get() serve para pegar um dado específico, nesse caso uma linha especifica
}

export async function getMeal(slug) {//Essa função serve para pegar um meal específico

    const { data: data_written, error: error_written } = await supabase.from('Meals').select().eq('slug', slug);
    const { data, error } = supabase
        .storage
        .from('meals_photos')
        .getPublicUrl(data_written[0].image.split('s/')[1]);//seleciona a imagem do meal na forma de URL pública

    return {
        data: data_written[0],
        image: data.publicUrl
    };//seleciona todos os dados da tabela meals onde o slug é igual ao slug passado, o get() pega apenas um row. A ? serve para passar um valor para a query, no caso o slug que vem do get()
}

export async function saveMeal(meal) {//Essa função serve para salvar um meal
    meal.slug = slugify(meal.title, { lower: true });//transforma o título do meal em um slug, o lower: true serve para deixar tudo em minúsculo
    meal.instructions = xss(meal.instructions);//No instructions é usado o xss para limpar as instruções de possíveis scripts maliciosos
    meal.id = Math.floor(Math.random() * 1e5);

    const file = meal.image;

    const extension = meal.image.name.split('.').pop();//split('.') divide a string a partir do ponto, pop() pega o último elemento do array. A extension serve para pegar a extensão da imagem
    const fileName = `${meal.slug}${meal.id}.${extension}`;//cria o nome do arquivo da imagem, que é o slug do meal + a extensão da imagem
    //Math.random()*1e5 gera um número aleatório entre 0 e 100000, servindo para evitar que duas imagens tenham o mesmo nome

    const stream = fs.createWriteStream(`public/images/${fileName}`);//cria um arquivo com o nome fileName na pasta public/images
    //createWriteStream() cria um stream de escrita, write() escreve no stream. Stream significa que os dados são enviados em pedaços, o que é mais eficiente do que enviar tudo de uma vez

    const bufferedImage = await meal.image.arrayBuffer();//transforma a imagem em um array buffer, que é um tipo de dado que representa um buffer de bytes genérico. Um buffer é uma região de memória que armazena dados temporariamente

    stream.write(Buffer.from(bufferedImage), (error) => {//O segundo argumento é uma função de callback que é chamada quando a escrita é concluída ou quando ocorre um erro
        if (error) {
            throw new Error('Saving image failed.');//se der erro ao salvar a imagem, lança um erro
        }
    });//escreve a imagem no stream, o Buffer.from() transforma o array buffer em um buffer, que é um tipo de dado que representa um buffer de bytes genérico
    //É necessário transformar em buffer porque o stream.write() só aceita buffers

    meal.image = `/images/${fileName}`;//muda o caminho da imagem para o caminho da imagem salva

    const { data } = await supabase
        .storage
        .from('meals_photos')
        .upload(fileName, file, {
            cacheControl: '3600',
            upsert: true,
        });
    const { error } = await supabase
        .from('Meals')
        .insert(meal)
    //console.log(error);
}