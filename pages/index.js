import Link from "next/link";
import Course from "../components/Course";
import useSWR from "swr";
import Logo from "@/components/Logo";
import Image from "next/image";

// START FRONTEND

export default function HomePage() {
  const { data } = useSWR("/api/courses", { fallbackData: [] });
  console.log("data from HomePage:", data);
  return (
    <>
      <Logo />
      <div>
        <p className="page-description">
          {data.length === 0
            ? "Add your Courses"
            : data.length === 1
            ? "your 1 Course"
            : `your ${data.length} Courses`}
        </p>
      </div>
      <ul className="course-container">
        {data.toReversed().map((course) => {
          return (
            <li className="field" key={course._id}>
              {/* Mapt über die Data der Coures in MongoDB */}
              <Course
                name={course.name}
                description={course.description}
                id={`${course._id.$oid ?? course._id}`}
                length={course.cards.length}
              />
            </li>
          );
        })}
      </ul>
      <div>
        <Link href="/create-course" passHref legacyBehavior>
          <div className="navigation">
            <p className="navigation-text">create course</p>
            <Image
              className="navigation-plus"
              src="/assets/plus.svg"
              alt="edit-and-delete-options"
              width={25}
              height={25}
            />
          </div>
        </Link>
      </div>
    </>
  );
}
