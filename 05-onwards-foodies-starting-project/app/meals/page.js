import Link from "next/link";

export default function MealsPage() {
  return (
    <div>
      <h1>Meals Page</h1>
      <p><Link href="/meals/share">Share</Link></p>
      <p><Link href="/meals/food-1">Food-1</Link></p>
      <p><Link href="/meals/food-2">Food-2</Link></p>
    </div>
  );
}