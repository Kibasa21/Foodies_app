export default function DetailsPage({params}) {
    return (
        <div>
        <h1>Details Page</h1>
        <p>{params.details}</p>
        </div>
    );
}