import Link from "next/link";

export default function Course({ name, description, id }) {
  return (
    <article>
      <div>
        <h1>{name}</h1>
      </div>
      <p> Description: {description}</p>
      <button>
        <Link href={`/courses/${id}`} passHref>
          Cards
        </Link>
        {/* <Link href={`/courses/${id}/edit`} passHref>
          <button>Edit</button>
        </Link> */}
      </button>
    </article>
  );
}
