import { useRouter } from "next/router.js";
import useSWR from "swr";
import Cards from "../../../components/Cards";
import Link from "next/link";
import Logo from "@/components/Logo";

// 1 Unterseite YOUR CARDS

export default function CourseOverviev() {
  const router = useRouter();
  const { isReady } = router;
  // id verlinkt auf die [id] im ordnerverzeichnis
  const { id } = router.query;
  const { data: course, isLoading, error } = useSWR(`/api/courses/${id}`);

  // der aktuelle course wird angezeigt
  console.log("course:", course);

  if (!isReady || isLoading) return <h2>Loading...</h2>;
  if (error) return <h2>Error! 🔥</h2>;

  return (
    <>
      <Logo />
      <div>
        <p className="page-description">
          your {course.cards.length} Cards from {course.name}
        </p>
        <Cards />
      </div>
      <div className="navigation">
        <Link href={`/courses/${id}/create-card`} passHref legacyBehavior>
          <p className="navigation-text">create card</p>
        </Link>
      </div>
      <div className="navigation-start-quiz">
        <Link href={`/courses/${id}/start-quiz`} passHref legacyBehavior>
          <p className="navigation-text">start quiz</p>
        </Link>
      </div>
    </>
  );
}
