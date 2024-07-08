import MealItem from './meal-item';
import classes from './meals-grid.module.css';

export default function MealsGrid({meals}) {
    return (
        <ul className={classes.meals}>
            {meals.data.map( (meal,index) => <li key={meal.id}>
                <MealItem {...meal} image={meals.images_url[index]} />
            </li>)}
        </ul>
    );
}