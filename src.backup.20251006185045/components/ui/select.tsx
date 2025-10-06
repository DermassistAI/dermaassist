import React from 'react';

export const Select: React.FC<any> = ({ children, value, onValueChange, className = '', ...props }) => {
  // simple controlled select wrapper
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (onValueChange) onValueChange(e.target.value);
  };

  return (
    <select
      aria-label={(props as any)['aria-label'] || (props as any)['aria-labelledby']}
      value={value}
      onChange={handleChange}
      className={`border rounded-md px-2 py-2 ${className}`}
      {...props}
    >
      {children}
    </select>
  );
};

export const SelectTrigger = (props: any) => <div {...props} />;
export const SelectValue = (props: any) => <span {...props} />;
export const SelectContent = (props: any) => <div {...props} />;
export const SelectItem = (props: any) => <option {...props} />;

export default Select;
