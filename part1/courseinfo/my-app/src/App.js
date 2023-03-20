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

  const Header = ({ course }) => {
    return <h1>{course.name}</h1>;
  };

  const Part = ({ course, index }) => {
    return (
        <p>
          {course.parts[index].name} {course.parts[index].exercises}
        </p>
    );
  }
  
  const Content = () => {
    return (
      <div>
        <Part course = {course} index = {0}/>
        <Part course = {course} index = {1}/>
        <Part course = {course} index = {2}/>
      </div>
    );
  };
  
  const Total = ({ course }) => {
    const totalExercises = course.parts.reduce((sum, part) => sum + part.exercises, 0);
    return <p>Number of exercises {totalExercises}</p>;
  };

  return (
    <div>
      <Header course = {course} />
      <Content/>
      <Total course = {course} />
    </div>
  )
}

export default App