import Link from "next/link";

export default function Course({ name, description, id }) {
  return (
    <article>
      <button>
        <Link href={`/courses/${id}/edit-and-delete`}>...</Link>
      </button>
      <div>
        <h1>course: {name}</h1>
      </div>
      <p> Description: {description}</p>
      <button>
        <Link href={`/courses/${id}`} passHref>
          Cards
        </Link>
      </button>
    </article>
  );
}
