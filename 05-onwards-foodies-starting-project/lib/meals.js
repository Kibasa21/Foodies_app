import fs from 'node:fs';//fs serve para manipular arquivos, como ler, escrever, deletar, etc, fs stands for file system

import sql from 'better-sqlite3';//sql serve para fazer a conexão com o banco de dados
import slugify from 'slugify';//slugify serve para transformar uma string em um slug, que é uma string com caracteres alfanuméricos e sem espaços
import xss from 'xss';//xss serve para evitar ataques de cross-site scripting, que são ataques que injetam scripts maliciosos em páginas web

const db = sql('meals.db');//cria o banco de dados meals.db

export async function getMeals() {//Já essa serve para pegar todos os meals
    await new Promise((resolve) => setTimeout(resolve, 2000));//Só para testar o async de componente que apenas o next.js permite

    //throw new Error('Loading meals failed.');//Só para testar o fallback de erro
    return db.prepare('SELECT * FROM meals').all();//seleciona todos os dados da tabela meals (Select all columns from meals), o all() passa por todos os rows e retorna um array com todos os rows
    //.run() serviria para mudar o banco de dados, o .all() serve para pegar os dados, já o .get() serve para pegar um dado específico, nesse caso uma linha especifica
}

export function getMeal(slug) {//Essa função serve para pegar um meal específico
    return db.prepare('SELECT * FROM meals WHERE slug = ?').get(slug);//seleciona todos os dados da tabela meals onde o slug é igual ao slug passado, o get() pega apenas um row. A ? serve para passar um valor para a query, no caso o slug que vem do get()
}

export async function saveMeal(meal) {//Essa função serve para salvar um meal
    meal.slug = slugify(meal.title, { lower: true });//transforma o título do meal em um slug, o lower: true serve para deixar tudo em minúsculo
    meal.instructions = xss(meal.instructions);//No instructions é usado o xss para limpar as instruções de possíveis scripts maliciosos

    const extension = meal.image.name.split('.').pop();//split('.') divide a string a partir do ponto, pop() pega o último elemento do array. A extension serve para pegar a extensão da imagem
    const fileName = `${meal.slug}${Math.floor(Math.random() * 1e5)}.${extension}`;//cria o nome do arquivo da imagem, que é o slug do meal + a extensão da imagem
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

    db.prepare(`
        INSERT INTO meals (title, slug, summary, instructions, image, creator, creator_email)
        VALUES (@title, @slug, @summary, @instructions, @image, @creator, @creator_email)
    `).run(meal);//insere os dados do meal na tabela meals
    //O @ serve para passar um valor para a query, no caso o valor do meal com o nome correspondente da propriedade do meal
    //O .run() serve para executar a query com o input meal para substituir os @
    //os VALUES são os valores que serão inseridos na tabela meals
}