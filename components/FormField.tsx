import React, { useContext } from 'react';
import { FormErrorContext } from './Form';

interface FormFieldProps {
  name: string;
  label: string;
  type?: string;
  placeholder?: string;
  textarea?: boolean; 
  className?: string;  
}

const FormField = React.forwardRef<HTMLInputElement, FormFieldProps>(
  ({ name, label, type = 'text', placeholder = '', textarea = false, className }, ref) => {
    const errors = useContext(FormErrorContext);
    const errorMessage = errors[name];

    return (
      <div className="mb-4">
        <label htmlFor={name} className="block mb-2">
          {label}
        </label>
        {textarea ? (
        <textarea 
        id={name} 
        name={name}
        placeholder={placeholder}
        aria-describedby={errorMessage ? `${name}-error` : undefined} 
        className={`w-full p-2 border rounded ${className} ${errorMessage ? 'border-red-500' : ''} row-span-4`}/>  // Default to 4 rows for the textarea
      ) : (
        <input
        id={name}
        name={name}
        type={type}
        placeholder={placeholder}
        aria-describedby={errorMessage ? `${name}-error` : undefined}
        className={`w-full p-2 border rounded  ${className} ${errorMessage ? 'border-red-500' : ''}`}
        ref={ref}
      />
      )}
    
        {errorMessage && (
          <div id={`${name}-error`} className="mt-1 text-sm text-red-500">
            {errorMessage}
          </div>
        )}
      </div>
    );
  }
);

FormField.defaultProps = {
  type: 'text',
  placeholder: ''
};

export default FormField;
