//reserved file name
//It's a fallback until the data is there
//Mudei para um nome não reservado porque ele ensinou outra forma de fazer um loading fallback
import classes from './loading.module.css';

export default function MealsLoadingPage() {
    return (
        <p className={classes.loading}>Fetching meals...</p>
    );
}