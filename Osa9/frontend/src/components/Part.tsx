import React from 'react';
import { CoursePart } from '../types';

const Part: React.FC<{ part: CoursePart }> = ({ part }) => {

  switch (part.name) {
    case 'Fundamentals':
      return (
        <>
          <h4>{part.name}</h4>
          <p>{part.description}</p>
          <p>Exercises: {part.exerciseCount}</p>
        </>
      );
    case 'Using props to pass data':
      return (
        <>
          <h4>{part.name}</h4>
          <p>Exercises: {part.exerciseCount}</p>
          <p>Projects: {part.groupProjectCount}</p>
        </>
      );
    case 'Deeper type usage':
      return (
        <>
          <h4>{part.name}</h4>
          <p>{part.description}</p>
          <p>Exercises: {part.exerciseCount}</p>
          <p>You can submit your exercises <a href={part.exerciseSubmissionLink}>here</a></p>
        </>
      );
  }
};

export default Part;