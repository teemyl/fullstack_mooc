import React from 'react'
import ReactDOM from 'react-dom'

const Header = (props) => {
  return (
    <h1>{ props.course.name }</h1>
  )
}

const Content = (props) => {
  return (
    <>
      <Part num={props.parts[0].exercises} name={props.parts[0].name} />
      <Part num={props.parts[1].exercises} name={props.parts[1].name} />
      <Part num={props.parts[2].exercises} name={props.parts[2].name} />
    </>
  )
}

const Part = (props) => {
  return (
    <p>
      {props.name} {props.num}
    </p>
  )
}

const Total = (props) => {

  const getExerciseCount = () => (
    props.parts[0].exercises + props.parts[1].exercises + props.parts[2].exercises
  )

  return (
    <p>Number of exercises { getExerciseCount() }</p>
  )
}

const App = () => {

  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }

  return (
    <div>
      <Header course={ course } />
      <Content parts={ course.parts }/>
      <Total parts={ course.parts } />
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))