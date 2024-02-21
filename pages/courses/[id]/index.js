import { useRouter } from "next/router.js";
import useSWR from "swr";
import Cards from "../../../components/Cards";
import Link from "next/link";

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
      <div className="homepage">
        <div className="logobox">
          <h1 className="logoschrift">flashcards</h1>
        </div>
        <div>
          <p className="page-description">your Cards</p>
        </div>
        <Cards />
      </div>
      <div className="navigation">
        <Link href={`/courses/${id}/create-card`} passHref legacyBehavior>
          <p className="navigation-text">create card</p>
        </Link>
      </div>
    </>
  );
}
