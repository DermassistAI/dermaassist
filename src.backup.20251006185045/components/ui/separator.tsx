import React from 'react';

export const Separator: React.FC<React.HTMLAttributes<HTMLHRElement>> = ({ className = '', ...props }) => (
  <hr className={`my-4 border-t ${className}`} {...props} />
);

export default Separator;
