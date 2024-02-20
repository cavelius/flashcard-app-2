import Link from "next/link";
import Course from "../components/Course";
import useSWR from "swr";

// START FRONTEND

export default function HomePage() {
  const { data } = useSWR("/api/courses", { fallbackData: [] });
  console.log("data:", data);
  return (
    <>
      <div className="logobox">
        <h1 className="logoschrift">flashcards</h1>
      </div>
      <div>
        <p className="page-description">your Courses</p>
      </div>
      <ul role="list">
        {data.map((course) => {
          return (
            <li key={course._id}>
              {/* Mapt über die Data der Coures in MongoDB */}
              <Course
                name={course.name}
                description={course.description}
                id={`${course._id.$oid ?? course._id}`}
              />
            </li>
          );
        })}
      </ul>
      <Link href="/create" passHref legacyBehavior>
        <button>+ course</button>
      </Link>
    </>
  );
}
