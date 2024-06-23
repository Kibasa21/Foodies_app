import Image from 'next/image';
import classes from './page.module.css';
import { getMeal } from '@/lib/meals';
import { notFound } from 'next/navigation';

export default function DetailsPage({params}) {

    const meal = getMeal(params.details);//params.details é o slug que foi passado na URL que veio do objeto params que é um objeto que o next.js passa para a página, ele é um objeto que tem o slug que foi passado na URL

    if(!meal) {
        notFound();//O notFound serve para encontrar o componente not-found mais próximo e renderizar ele, nesse caso está servindo para dar uma mensagem diferente quando não há a comida que ele procura.
    }
    
    meal.instructions = meal.instructions.replace(/\n/g,'<br />');//O replace() é um método de string que substitui uma string por outra, o /\n/g é uma expressão regular que pega todas as quebras de linha, o \n é uma quebra de linha, o g é para pegar todas as quebras de linha, o <br /> é uma tag HTML que serve para quebrar linha, então ele substitui todas as quebras de linha por <br />
    
    return (
        <>
        <header className={classes.header}>
            <div className={classes.image}>
                <Image src={meal.image} alt={meal.title} fill />
            </div>
            <div className={classes.headerText}>
                <h1>{meal.title}</h1>
                <p className={classes.creator}>
                    by <a href={`mailto:${meal.creator_email}`}>{meal.creator}</a> {/*mailto: é um link que abre o email do usuário, o usuário que clicou no link, já escrevendo para o EMAIL ali*/}
                </p>
                <p className={classes.summary}>{meal.summary}</p>
            </div>
        </header>
        <main>
            <p className={classes.instructions} dangerouslySetInnerHTML={{//Esse dangerouslySetInnerHTML é um atributo do React que permite que você injete HTML diretamente no DOM, ele é perigoso porque pode ser usado para injetar scripts maliciosos, então é necessário ter cuidado ao usar ele
                __html: meal.instructions,//Ele foi necessário porque o instructions do meal tem tags HTML, então é necessário injetar o HTML diretamente no DOM
                //o __html é um atributo que o dangerouslySetInnerHTML espera, ele é um objeto que tem uma propriedade chamada __html que é o HTML que você quer injetar
            }}></p>
        </main>
        </>
    );
}