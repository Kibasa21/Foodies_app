import Link from "next/link";
import classes from "./page.module.css";
import MealsGrid from "@/components/meals/meals-grid";

export default function MealsPage() {
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
        <MealsGrid meals={[]} />
      </main>
    </>
  );
}