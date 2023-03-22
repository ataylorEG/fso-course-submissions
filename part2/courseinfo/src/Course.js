import React from 'react';

const Header = ({ name }) => <h2>{name}</h2>;

const Content = ({ parts }) => {
  const totalExercises = parts.reduce((sum, part) => sum + part.exercises, 0);

  return (
    <div>
      {parts.map((part) => (
        <Part key={part.id} part={part} />
      ))}
      <strong>Total of {totalExercises} exercises</strong>
    </div>
  );
};

const Part = ({ part }) => (
  <div style={{ marginBottom: '1rem' }}>
    {part.name} {part.exercises}
  </div>
);

const Course = ({ course }) => {
  return (
    <div>
      <Header name={course.name} />
      <Content parts={course.parts} />
    </div>
  );
};

export default Course;