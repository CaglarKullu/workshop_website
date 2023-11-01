// src/Form.tsx
import React, { useState, createContext } from 'react';
import { z, ZodError, ZodRawShape } from 'zod';

interface FormProps {
  onSubmit: (formData: Record<string, string>) => void;
  validationSchema: z.ZodObject<ZodRawShape>;
  children: React.ReactNode;
  className?: string; 
}

export const FormErrorContext = createContext<Record<string, string>>({});

const Form = React.forwardRef<HTMLFormElement, FormProps>(
  ({ onSubmit, validationSchema, children, className = '' }, ref) => {
    const [errors, setErrors] = useState<Record<string, string>>({});

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      const formData = new FormData(event.currentTarget);
      const formDataObj = Object.fromEntries(formData.entries());

      try {
        const validatedData = validationSchema.parse(formDataObj);
        onSubmit(validatedData);
        setErrors({});
    } catch (error) {
        if (error instanceof ZodError) {
            const errorMap = error.formErrors.fieldErrors;
            const formattedErrors: Record<string, string> = {};
    
            for (const key in errorMap) {
                formattedErrors[key] = errorMap[key] ? errorMap[key]![0] : 'Unknown error';
            }
            setErrors(formattedErrors);
        }
    }
    };

    return (
      <FormErrorContext.Provider value={errors}>
        <form onSubmit={handleSubmit} className={className} ref={ref}>
          {children}
        </form>
      </FormErrorContext.Provider>
    );
  }
);

export default Form;
