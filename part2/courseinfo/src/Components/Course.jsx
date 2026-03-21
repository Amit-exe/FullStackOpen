import React from "react";
import Header from "./Header";
import Part from "./Part";

function Course({ course }) {
  console.log(course);

  return (
    <div>
      <Header header={course.content} />
      {/* {course.parts.map((p) => (
        <Part key={p.id} part={p} />
      ))}
      <p>
        <b>
          total of {course.parts.reduce((a, b) => a + b.exercises, 0)} exercises
        </b>
      </p> */}
    </div>
  );
}

export default Course;
