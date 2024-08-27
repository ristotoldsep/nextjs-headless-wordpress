// Fieldset.js
import React, { ReactNode } from 'react';

interface FieldsetProps {
  children: ReactNode;
}

const Fieldset: React.FC<FieldsetProps> = ({ children }) => {
  return (
    <div className="flex flex-col">
      {children}
    </div>
  );
};

export default Fieldset;
