import React from 'react';

const Total: React.FC<{ sum: number }> = ({ sum }) => {

  return (
    <div>
      <p>{`Total: ${sum}`}</p>
    </div>
  );
};

export default Total;