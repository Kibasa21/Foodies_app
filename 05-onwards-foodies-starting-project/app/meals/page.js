import Link from "next/link";
import classes from "./page.module.css";
import MealsGrid from "@/components/meals/meals-grid";
import { getMeals } from "@/app/api/route";
import { Suspense } from "react";

async function Meals() {//Esse componente que vai fetch nos dados
  const meals = await getMeals();
  return <MealsGrid meals={meals} />;
}

export default function MealsPage() {//next.js permite async para componentes, mas não é recomendado, pois o next.js não espera o retorno da função, ele apenas renderiza o componente, então o retorno da função não é renderizado, por isso é necessário usar o await



  return (
    <>
      <header className={classes.header}>
        <h1>
          Delicious meals, created <span className={classes.highlight}>by you!</span>
        </h1>
        <p>Choose your favorite meal recipe and cook it yourself. It is easy and fun!</p>
        <p className={classes.cta}>{/* call to action */}
          <Link href="/meals/share">
            Share your favorite recipe.
          </Link>
        </p>
      </header>
      <main className={classes.main}>
        <Suspense fallback={<p className={classes.loading}>Fetching meals...</p>}>{/*(Ele que vai dar o fallback) Suspense é um componente do React que permite que você suspenda a renderização enquanto algo está carregando, como um recurso assíncrono. Isso ajuda a lidar com atrasos de carregamento, como a busca de dados remotos ou a carregamento de imagens*/}
          <Meals />
        </Suspense>{/*Assim dizemos ao codigo que a parte que queremos que o fallback atue é apenas essa, o resto do código não precisa de fallback, o suspense só pode ter um filho, então é necessário colocar um div ou um fragment*/}
      </main>
    </>
  );
}