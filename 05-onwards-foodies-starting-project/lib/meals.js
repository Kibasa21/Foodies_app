import sql from 'better-sqlite3';//sql serve para fazer a conexão com o banco de dados

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