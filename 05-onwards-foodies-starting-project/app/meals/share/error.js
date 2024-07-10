'use client'; //Esse é necessário porque o error serve para server side e client side error, então use client deve ser adicionado pra falar que tb pega erro do client side

export default function Error() {
    return (
        <main className="error">{/*o className error é do css global*/}
            <h1>An error occurred!</h1>
            <p>Failed to create Meal.</p>
        </main>
    );
}