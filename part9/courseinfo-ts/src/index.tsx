import React from "react";
import ReactDOM from "react-dom";

interface HeaderProps {
  name: string;
}

const Header: React.FC<HeaderProps> = ({ name }) => {
  return <h1>{ name }</h1>
};

interface CoursePartBase {
  name: string;
  exerciseCount: number;
}

interface CoursePartDescribed extends CoursePartBase {
  description: string;
}

interface CoursePartOne extends CoursePartDescribed {
  name: "Fundamentals";
}

interface CoursePartTwo extends CoursePartBase {
  name: "Using props to pass data";
  groupProjectCount: number;
}

interface CoursePartThree extends CoursePartDescribed {
  name: "Deeper type usage";
  exerciseSubmissionLink: string;
}

interface MyCoursePart extends CoursePartDescribed {
  name: "My own course";
  important: boolean;
}

type CoursePart = CoursePartOne | CoursePartTwo | CoursePartThree | MyCoursePart;

interface ContentProps {
  courseParts: Array<CoursePart>;
}

const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

interface PartProps {
  part: CoursePart;
}

const Part: React.FC<PartProps> = ({ part }) => {
  switch (part.name) {
    case 'Fundamentals':
      return <p>{ part.name } { part.exerciseCount } { part.description }</p>
    case 'Using props to pass data':
      return <p>{ part.name } { part.exerciseCount } { part.groupProjectCount }</p>
    case 'Deeper type usage':
      return (
        <p>
          { part.name }&nbsp;
          { part.exerciseCount }&nbsp;
          { part.description }&nbsp;
          { part.exerciseSubmissionLink }&nbsp;
        </p>
      )
    case 'My own course':
      return (
        <p>
        { part.name }&nbsp;
        { part.exerciseCount }&nbsp;
        { part.description }&nbsp;
        <b>important: </b>{ part.important ? 'Yes' : 'No' }&nbsp;
        </p>
      )
    default:
      return assertNever(part);
  }
}

const Content: React.FC<ContentProps> = ({ courseParts }) => {
  return (
    <div>
      {
        courseParts.map(coursePart => <Part part={ coursePart } />)
      }
    </div>
  )
};

interface TotalProps {
  total: number;
}

const Total: React.FC<TotalProps> = ({ total }) => {
  return (
    <p>
      Number of exercises { total }
    </p>
  )
};

const App: React.FC = () => {
  const courseName = "Half Stack application development";
  const courseParts: CoursePart[] = [
    {
      name: "Fundamentals",
      exerciseCount: 10,
      description: "This is an awesome course part"
    },
    {
      name: "Using props to pass data",
      exerciseCount: 7,
      groupProjectCount: 3
    },
    {
      name: "Deeper type usage",
      exerciseCount: 14,
      description: "Confusing description",
      exerciseSubmissionLink: "https://fake-exercise-submit.made-up-url.dev"
    },
    {
      name: "My own course",
      exerciseCount: 0,
      description: "Super necessary course",
      important: false
    }
  ];

  return (
    <div>
      <Header name={ courseName } />
      <Content courseParts={ courseParts } />
      <Total total={ courseParts.reduce((carry, part) => carry + part.exerciseCount, 0) } />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));