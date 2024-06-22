import sql from 'better-sqlite3';//sql serve para fazer a conexão com o banco de dados

const db = sql('meals.db');//cria o banco de dados meals.db

export async function getMeals() {
    await new Promise((resolve) => setTimeout(resolve, 2000));//Só para testar o async de componente que apenas o next.js permite
    return db.prepare('SELECT * FROM meals').all();//seleciona todos os dados da tabela meals (Select all columns from meals), o all() passa por todos os rows e retorna um array com todos os rows
    //.run() serviria para mudar o banco de dados, o .all() serve para pegar os dados, já o .get() serve para pegar um dado específico, nesse caso uma linha especifica
}