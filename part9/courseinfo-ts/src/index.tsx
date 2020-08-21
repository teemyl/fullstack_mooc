import React from "react";
import ReactDOM from "react-dom";

interface HeaderProps {
  name: string;
}

const Header: React.FC<HeaderProps> = ({ name }) => {
  return <h1>{ name }</h1>
};

interface CoursePart {
  name: string;
  exerciseCount: number;
}

interface ContentProps {
  courseParts: Array<CoursePart>;
}

const Content: React.FC<ContentProps> = ({ courseParts }) => {
  return (
    <div>
      {
        courseParts.map(cp => <p>{ cp.name } { cp.exerciseCount }</p>)
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
  const courseParts = [
    {
      name: "Fundamentals",
      exerciseCount: 10
    },
    {
      name: "Using props to pass data",
      exerciseCount: 7
    },
    {
      name: "Deeper type usage",
      exerciseCount: 14
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