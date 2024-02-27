import Image from "next/image";
import Link from "next/link";

export default function Course({ name, description, id, length }) {
  return (
    <>
      <div className="card-options">
        <h1 className="card-options-course">course:</h1>
        <button className="btn-edit-and-delete-options">
          <Link href={`/courses/${id}/edit-and-delete`}>
            <Image
              src="/assets/edit-and-delete.svg"
              alt="edit-and-delete-options"
              width={20}
              height={20}
            />
          </Link>
        </button>
      </div>
      <div className="field-name-description">
        <h1 className="course-name">{name}</h1>
        <p className="course-description">{description}</p>
      </div>
      <div className="options-field-bottom">
        <Link className="link" href={`/courses/${id}`}>
          <div className="course-length-info">
            <p className="course-lengt-info-font">
              {length} {length === 1 ? "card" : "cards"}
            </p>
          </div>
        </Link>

        <button>
          <Link className="link-arrow" href={`/courses/${id}/start-quiz`}>
            <Image
              src="/assets/arrow.svg"
              alt="edit-and-delete-options"
              width={40}
              height={40}
            />
          </Link>
        </button>
      </div>
    </>
  );
}
