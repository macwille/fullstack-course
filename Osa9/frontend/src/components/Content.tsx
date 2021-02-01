import React from 'react';
import Part from './Part';
import { CoursePart } from '../types';

interface ContentProps {
  parts: CoursePart[];
}

const Content: React.FC<ContentProps> = ({ parts }) => {

  return (
    <div>
      {parts.map(p => (
        <Part key={p.name} part={p} />
      ))}
    </div>
  );
};

export default Content;