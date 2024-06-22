import Link from 'next/link';
import Image from 'next/image';//The Image from Next.js is a component that is optimized for images, providing lazy loading and other optimizations

import classes from './meal-item.module.css';

export default function MealItem({ title, slug, image, summary, creator }) {
  return (
    <article className={classes.meal}>
      <header>
        <div className={classes.image}>
          <Image src={image} alt={title} fill />{/*The fill prop will make sure that the image fills the entire container and doesn't get cropped when an outsider image is used, cause an outsider image might not have the same aspect ratio as the container*/}
        </div>
        <div className={classes.headerText}>
          <h2>{title}</h2>
          <p>by {creator}</p>
        </div>
      </header>
      <div className={classes.content}>
        <p className={classes.summary}>{summary}</p>
        <div className={classes.actions}>
          <Link href={`/meals/${slug}`}>View Details</Link>
        </div>
      </div>
    </article>
  );
}