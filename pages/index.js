import Link from "next/link";
import Course from "../components/Course";
import useSWR from "swr";
import Form from "@/components/Form-add";

// START FRONTEND

export default function HomePage() {
  const { data } = useSWR("/api/courses", { fallbackData: [] });
  console.log("data:", data);
  return (
    <>
      <div className="homepage">
        <div className="logobox">
          <h1 className="logoschrift">flashcards</h1>
        </div>
        <div>
          <p className="page-description">your Courses</p>
        </div>
        <ul className="course-container">
          {data.map((course) => {
            return (
              <li className="field" key={course._id}>
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
        <div className="navigation">
          <Link href="/create-course" passHref legacyBehavior>
            <p className="navigation-text">add course</p>
          </Link>
        </div>
      </div>
    </>
  );
}
