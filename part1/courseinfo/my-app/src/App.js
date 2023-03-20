const App = () => {
  const course = 'Half Stack application development'
  const content = [
    { name: 'Fundamentals of React', exercises: 10 },
    { name: 'Using props to pass data', exercises: 7 },
    { name: 'State of a component', exercises: 14 },
  ];

  const Header = ({ course }) => {
    return <h1>{course}</h1>;
  };

  const Part = ({ content, index }) => {
    return (
        <p>
          {content[index].name} {content[index].exercises}
        </p>
    );
  }
  
  const Content = () => {
    return (
      <div>
        <Part content = {content} index = {0}/>
        <Part content = {content} index = {1}/>
        <Part content = {content} index = {2}/>
      </div>
    );
  };
  
  const Total = ({ content }) => {
    const totalExercises = content.reduce((sum, part) => sum + part.exercises, 0);
    return <p>Number of exercises {totalExercises}</p>;
  };

  return (
    <div>
      <Header course = {course} />
      <Content/>
      <Total content = {content} />
    </div>
  )
}

export default App