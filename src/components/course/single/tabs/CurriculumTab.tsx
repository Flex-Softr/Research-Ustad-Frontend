const CurriculumTab = ({ course }) => {
  const totalLessons =
    course.modules?.reduce(
      (total, module) => total + module.lessons.length,
      0
    ) || 0;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold text-gray-900">
          Course Curriculum
          {(!course.curriculum || !course.curriculum.trim()) && (
            <span className="text-sm font-normal text-gray-500 ml-2">
              (Generated)
            </span>
          )}
        </h3>
        <div className="text-sm text-gray-600">
          {course.duration} • {totalLessons} lessons
        </div>
      </div>

      <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8">
        {course.curriculum ? (
          <div
            className="[&>h1]:text-2xl [&>h1]:font-bold [&>h1]:text-gray-900 [&>h1]:mb-4 [&>h1]:mt-6
                       [&>h2]:text-xl [&>h2]:font-semibold [&>h2]:text-gray-900 [&>h2]:mb-3 [&>h2]:mt-5
                       [&>h3]:text-lg [&>h3]:font-medium [&>h3]:text-gray-800 [&>h3]:mb-2 [&>h3]:mt-4
                       [&>h4]:text-base [&>h4]:font-medium [&>h4]:text-gray-800 [&>h4]:mb-2 [&>h4]:mt-3
                       [&>h5]:text-sm [&>h5]:font-medium [&>h5]:text-gray-700 [&>h5]:mb-1 [&>h5]:mt-2
                       [&>h6]:text-xs [&>h6]:font-medium [&>h6]:text-gray-600 [&>h6]:mb-1 [&>h6]:mt-2
                       [&>p]:mb-3 
                       [&>ul]:list-disc [&>ul]:pl-6 
                       [&>ol]:list-decimal [&>ol]:pl-6 
                       [&>li]:mb-1 
                       [&>strong]:font-semibold 
                       [&>em]:italic 
                       [&>blockquote]:border-l-4 [&>blockquote]:border-brand-secondary [&>blockquote]:pl-4 [&>blockquote]:italic [&>blockquote]:text-gray-600"
            dangerouslySetInnerHTML={{
              __html: course.curriculum,
            }}
          />
        ) : (
          <div className="prose prose-lg max-w-none">
            <h2>Course Overview</h2>
            <p>
              This comprehensive course is designed to take you from the
              fundamentals to advanced concepts in{" "}
              {course.category.toLowerCase()}.
            </p>

            <h3>What You'll Learn</h3>
            <ul>
              {(course.whatYouWillLearn || []).map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>

            <h3>Course Structure</h3>
            <p>
              The course is organized into {course.modules?.length || 0} main
              modules, each focusing on specific aspects of the subject matter:
            </p>

            {(course.modules || []).map((module, index) => (
              <div key={index} className="mb-6 p-4 bg-gray-50 rounded-lg">
                <h4 className="text-lg font-semibold text-gray-900 mb-2">
                  Module {index + 1}: {module.title}
                </h4>
                <p className="text-gray-600 mb-3">{module.description}</p>
                <ul className="space-y-1">
                  {module.lessons.map((lesson, lessonIndex) => (
                    <li
                      key={lessonIndex}
                      className="flex items-center gap-2 text-sm"
                    >
                      <span className="w-2 h-2 bg-brand-secondary rounded-full"></span>
                      {lesson.title}
                      <span className="text-gray-500">({lesson.duration})</span>
                      {lesson.free && (
                        <span className="px-2 py-1 bg-green-100 text-green-600 text-xs rounded-full">
                          Free
                        </span>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}

            <h3>Learning Outcomes</h3>
            <p>By the end of this course, you will have:</p>
            <ul>
              {(course.learningOutcomes || []).map((outcome, index) => (
                <li key={index}>{outcome}</li>
              ))}
            </ul>

            <h3>Assessment and Certification</h3>
            <p>
              {course.assessmentInfo ||
                "Complete assessments to earn your certificate."}
            </p>

            <div className="bg-brand-secondary/10 border border-brand-secondary/20 rounded-lg p-4 mt-6">
              <h4 className="font-semibold text-brand-secondary mb-2">
                Course Features
              </h4>
              <ul className="text-sm space-y-1">
                <li>✓ HD video lectures with expert instructors</li>
                <li>✓ Downloadable resources and materials</li>
                <li>✓ Interactive quizzes and assessments</li>
                <li>✓ Hands-on projects and exercises</li>
                <li>✓ Certificate of completion</li>
                <li>✓ Lifetime access to course materials</li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CurriculumTab;
