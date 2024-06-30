import { createClient } from '@supabase/supabase-js';


// Create a single supabase client for interacting with your database
const supabaseUrl = 'https://kaotxhjorcwnojdtcsrl.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imthb3R4aGpvcmN3bm9qZHRjc3JsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTk1MjA1MzcsImV4cCI6MjAzNTA5NjUzN30.8wCPIIFiYMTu8Qn6KI7o1mrqU9DiHsVbB5dQ-mYS7T0'//process.env.SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

const dummyMeals = [
   {
      id: 1,
      title: 'Juicy Cheese Burger',
      slug: 'juicy-cheese-burger',
      image: '/images/burger.jpg',
      summary:
         'A mouth-watering burger with a juicy beef patty and melted cheese, served in a soft bun.',
      instructions: `
      1. Prepare the patty:
         Mix 200g of ground beef with salt and pepper. Form into a patty.

      2. Cook the patty:
         Heat a pan with a bit of oil. Cook the patty for 2-3 minutes each side, until browned.

      3. Assemble the burger:
         Toast the burger bun halves. Place lettuce and tomato on the bottom half. Add the cooked patty and top with a slice of cheese.

      4. Serve:
         Complete the assembly with the top bun and serve hot.
    `,
      creator: 'John Doe',
      creator_email: 'johndoe@example.com',
   },
   {
      id: 2,
      title: 'Spicy Curry',
      slug: 'spicy-curry',
      image: '/images/curry.jpg',
      summary:
         'A rich and spicy curry, infused with exotic spices and creamy coconut milk.',
      instructions: `
      1. Chop vegetables:
         Cut your choice of vegetables into bite-sized pieces.

      2. Sauté vegetables:
         In a pan with oil, sauté the vegetables until they start to soften.

      3. Add curry paste:
         Stir in 2 tablespoons of curry paste and cook for another minute.

      4. Simmer with coconut milk:
         Pour in 500ml of coconut milk and bring to a simmer. Let it cook for about 15 minutes.

      5. Serve:
         Enjoy this creamy curry with rice or bread.
    `,
      creator: 'Max Schwarz',
      creator_email: 'max@example.com',
   },
   {
      id: 3,
      title: 'Homemade Dumplings',
      slug: 'homemade-dumplings',
      image: '/images/dumplings.jpg',
      summary:
         'Tender dumplings filled with savory meat and vegetables, steamed to perfection.',
      instructions: `
      1. Prepare the filling:
         Mix minced meat, shredded vegetables, and spices.

      2. Fill the dumplings:
         Place a spoonful of filling in the center of each dumpling wrapper. Wet the edges and fold to seal.

      3. Steam the dumplings:
         Arrange dumplings in a steamer. Steam for about 10 minutes.

      4. Serve:
         Enjoy these dumplings hot, with a dipping sauce of your choice.
    `,
      creator: 'Emily Chen',
      creator_email: 'emilychen@example.com',
   },
   {
      id: 4,
      title: 'Classic Mac n Cheese',
      slug: 'classic-mac-n-cheese',
      image: '/images/macncheese.jpg',
      summary:
         "Creamy and cheesy macaroni, a comforting classic that's always a crowd-pleaser.",
      instructions: `
      1. Cook the macaroni:
         Boil macaroni according to package instructions until al dente.

      2. Prepare cheese sauce:
         In a saucepan, melt butter, add flour, and gradually whisk in milk until thickened. Stir in grated cheese until melted.

      3. Combine:
         Mix the cheese sauce with the drained macaroni.

      4. Bake:
         Transfer to a baking dish, top with breadcrumbs, and bake until golden.

      5. Serve:
         Serve hot, garnished with parsley if desired.
    `,
      creator: 'Laura Smith',
      creator_email: 'laurasmith@example.com',
   },
   {
      id: 5,
      title: 'Authentic Pizza',
      slug: 'authentic-pizza',
      image: '/images/pizza.jpg',
      summary:
         'Hand-tossed pizza with a tangy tomato sauce, fresh toppings, and melted cheese.',
      instructions: `
      1. Prepare the dough:
         Knead pizza dough and let it rise until doubled in size.

      2. Shape and add toppings:
         Roll out the dough, spread tomato sauce, and add your favorite toppings and cheese.

      3. Bake the pizza:
         Bake in a preheated oven at 220°C for about 15-20 minutes.

      4. Serve:
         Slice hot and enjoy with a sprinkle of basil leaves.
    `,
      creator: 'Mario Rossi',
      creator_email: 'mariorossi@example.com',
   },
   {
      id: 6,
      title: 'Wiener Schnitzel',
      slug: 'wiener-schnitzel',
      image: '/images/schnitzel.jpg',
      summary:
         'Crispy, golden-brown breaded veal cutlet, a classic Austrian dish.',
      instructions: `
      1. Prepare the veal:
         Pound veal cutlets to an even thickness.

      2. Bread the veal:
         Coat each cutlet in flour, dip in beaten eggs, and then in breadcrumbs.

      3. Fry the schnitzel:
      Heat oil in a pan and fry each schnitzel until golden brown on both sides.

      4. Serve:
      Serve hot with a slice of lemon and a side of potato salad or greens.
 `,
      creator: 'Franz Huber',
      creator_email: 'franzhuber@example.com',
   },
   {
      id: 7,
      title: 'Fresh Tomato Salad',
      slug: 'fresh-tomato-salad',
      image: '/images/tomato-salad.jpg',
      summary:
         'A light and refreshing salad with ripe tomatoes, fresh basil, and a tangy vinaigrette.',
      instructions: `
      1. Prepare the tomatoes:
        Slice fresh tomatoes and arrange them on a plate.
    
      2. Add herbs and seasoning:
         Sprinkle chopped basil, salt, and pepper over the tomatoes.
    
      3. Dress the salad:
         Drizzle with olive oil and balsamic vinegar.
    
      4. Serve:
         Enjoy this simple, flavorful salad as a side dish or light meal.
    `,
      creator: 'Sophia Green',
      creator_email: 'sophiagreen@example.com',
   },
];

export default async function initTable() {
   const previous_data = await supabase.from('Meals').select();
   if(previous_data.length > 0){
      return;
   }
   await supabase.from('Meals').insert(dummyMeals);
}