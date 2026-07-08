import { useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import { getMockCourseBySlug } from "@/features/courses";
import CourseDetailsComposition from "@/features/courses/compositions/CourseDetailsComposition";

export function CourseDetailsPage(): React.JSX.Element {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const course = slug ? getMockCourseBySlug(slug) : null;

  useEffect(() => {
    if (course) {
      document.title = `${course.title} | PragyaOS`;
    } else {
      document.title = "Course Not Found | PragyaOS";
    }
  }, [course]);

  if (!course) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center p-6 gap-4 bg-[#FAF7F2] dark:bg-[#0f0f10]">
        <h1 className="font-serif text-3xl font-bold text-stone-900 dark:text-stone-100">
          Course Not Found
        </h1>
        <p className="font-sans text-sm text-stone-500 dark:text-stone-400 max-w-[40ch]">
          The course you are looking for does not exist or may have been moved.
        </p>
        <button
          type="button"
          onClick={() => navigate("/")}
          className="px-5 py-2.5 bg-stone-900 hover:bg-black dark:bg-white dark:hover:bg-stone-100 text-white dark:text-stone-900 text-sm font-sans font-semibold rounded-md transition-all duration-200"
        >
          Go Back Home
        </button>
      </div>
    );
  }

  return <CourseDetailsComposition course={course} />;
}

export default CourseDetailsPage;
