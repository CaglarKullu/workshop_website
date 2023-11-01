"use client"
import React, { useState } from 'react';
import Form from '@/components/Form';
import FormField from './FormField';
import { contactUsSchema } from '@/lib/utils/validationSchemas';
import { ZodError } from 'zod';

const ContactUsForm: React.FC = () => {
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleSubmit = (formData: Record<string, string>) => {
    try {
      const validatedData = contactUsSchema.parse(formData);
      console.log('Validated Data:', validatedData);
      setErrors({});
      // You can send `validatedData` to your backend or process it further here
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
    <Form onSubmit={handleSubmit} validationSchema={contactUsSchema}>
      <FormField name="name" label="Name" />
      {errors.name && <p className="text-red-500">{errors.name}</p>}

      <FormField name="email" label="Email" type="email" />
      {errors.email && <p className="text-red-500">{errors.email}</p>}

      <FormField name="message" label="Message" type="textarea" textarea={true}/>
      {errors.message && <p className="text-red-500">{errors.message}</p>}

      <button type="submit" className="mt-4 px-4 py-2 bg-primary text-white rounded">
        Submit
      </button>
    </Form>
  );
};

export default ContactUsForm;
