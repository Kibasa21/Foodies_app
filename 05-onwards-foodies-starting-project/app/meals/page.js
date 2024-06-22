import Link from "next/link";
import classes from "./page.module.css";
import MealsGrid from "@/components/meals/meals-grid";
import { getMeals } from "@/lib/meals";

export default async function MealsPage() {//next.js permite async para componentes, mas não é recomendado, pois o next.js não espera o retorno da função, ele apenas renderiza o componente, então o retorno da função não é renderizado, por isso é necessário usar o await

  const meals = await getMeals();

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
        <MealsGrid meals={meals} />
      </main>
    </>
  );
}