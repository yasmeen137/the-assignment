import React, { useState } from 'react';

type FormField = {
  id: number;
  label: string;
  type: string;
  placeholder: string;
  name: string;
  required: boolean;
  options: { label: string; value: string }[] | undefined;
};

type FormIdComponentProps = {
  formId: string;
  form: {
    name: string;
    description: string;
    fields: FormField[];
  };
};

const FormIdComponent = ({ form, formId }: FormIdComponentProps) => {
  const [formData, setFormData] = useState<any>({});
  const [responseCount, ] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Handle changes in form fields
  const handleChange = (e: React.ChangeEvent<any>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData: any) => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  
    // Check if required fields are filled
    for (const field of form.fields) {
      if (field.required && !formData[field.name]) {
        setError(`${field.label} is required`);
        return;
      }
      console.log('Form Fields:', form.fields);
    }
  
    // Clear any previous error messages
    setError(null);
  
    const submissionData = {
      formAnswers: form.fields.map((field) => ({
        fieldId: field.id,
        value: formData[field.name] || '', // Use empty string if no value is provided
      })),
    };

    console.log('Submission Data:', submissionData);
    try {
      const response: Response = await fetch(`http://localhost:8000/api/form/${formId}/submit`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(submissionData),
      });
  
      if (!response.ok) {
        const errorData: { message?: string } = await response.json();
        throw new Error(errorData.message || 'Unknown error occurred');
      }
  
      console.log('Form submitted successfully:');
      alert('Form submitted successfully!');
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error('Error:', error.message);
        setError(error.message);
      } else {
        console.error('Error:', error);
      }
    }
  };

  return (
    <div className="bg-purple-200 min-h-screen p-6">
      {/* Title centered at the top */}
      <h1 className="text-3xl font-semibold text-gray-700 text-center mb-8">
        Submit the Form
      </h1>

      {/* Form Name and Description */}
      <div className="bg-white w-1/2 mx-auto p-3 rounded-md shadow-sm mb-4 border-b-2 border-purple-500">
        <div className="text-center mb-2">
          <label htmlFor="formName" className="block text-1xl font-semibold text-gray-700">
            Form Name
          </label>
        </div>
        <p className="text-gray-900 text-center">{form.name}</p>
      </div>

      <div className="bg-white w-1/2 mx-auto p-3 rounded-md shadow-sm mb-4 border-b-2 border-purple-500">
        <div className="text-center mb-2">
          <label htmlFor="formDescription" className="block text-1xl font-semibold text-gray-700">
            Form Description
          </label>
        </div>
        <p className="text-gray-900 text-center">{form.description}</p>
      </div>

      {/* Form Fields */}
      <form onSubmit={handleSubmit}>
        {form.fields?.map((field) => (
          <div key={field.id} className="bg-white w-1/2 mx-auto p-3 rounded-md shadow-sm mb-4 border-b-2 border-purple-500">
            <div className="text-center mb-2">
              <label htmlFor={field.name} className="block text-sm font-semibold text-gray-700">
                {field.label}
              </label>
            </div>

            {/* Render Text Input */}
            {field.type === 'text' && (
              <input
                id={field.name}
                type="text"
                name={field.name}
                placeholder={field.placeholder}
                value={formData[field.name] || ''}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded mt-1"
                required={field.required}
              />
            )}

            {/* Render Checkbox */}
            {field.type === 'checkbox' && (field.options?.length ?? 0) > 0 ? (
              <div className="mt-2">
                {field.options?.map((option) => {
                  const optionValue = option.value || option.label;
                  return (
                    <div key={`${field.id}-${optionValue}`} className="flex items-center mb-2">
                      <input
                        type="checkbox"
                        id={`${field.name}-${optionValue}`}
                        name={field.name}
                        value={optionValue}
                        checked={formData[field.name]?.includes(optionValue)}
                        onChange={handleChange}
                        className="mr-2"
                      />
                      <label htmlFor={`${field.name}-${optionValue}`} className="text-sm text-gray-700">
                        {option.label}
                      </label>
                    </div>
                  );
                })}
              </div>
            ) : field.type === 'checkbox' ? (
              <p className="text-red-500">No options available for this checkbox.</p>
            ) : null}

            {/* Render Radio */}
            {field.type === 'radio' && (field.options?.length ?? 0) > 0 ? (
              <div className="mt-2">
                {field.options?.map((option) => {
                  const optionValue = option.value || option.label;
                  return (
                    <div key={`${field.id}-${optionValue}`} className="flex items-center mb-2">
                      <input
                        type="radio"
                        id={`${field.name}-${optionValue}`}
                        name={field.name}
                        value={optionValue}
                        checked={formData[field.name] === optionValue}
                        onChange={handleChange}
                        className="mr-2"
                      />
                      <label htmlFor={`${field.name}-${optionValue}`} className="text-sm text-gray-700">
                        {option.label}
                      </label>
                    </div>
                  );
                })}
              </div>
            ) : field.type === 'radio' ? (
              <p className="text-red-500">No options available for this radio group.</p>
            ) : null}

            {/* Render Dropdown */}
            {field.type === 'dropdown' && (field.options?.length ?? 0) > 0 && (
              <select
                id={field.name}
                name={field.name}
                value={formData[field.name] || ''}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded mt-1"
                required={field.required}
              >
                {field.options?.map((option) => (
                  <option key={`${field.id}-${option.value}`} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            )}
          </div>
        ))}

        {/* Submit Button */}
        <div className="text-center mt-4">
          <button
            type="submit"
            className="bg-purple-500 text-white p-2 rounded-md shadow-md hover:bg-purple-600"
          >
            Submit
          </button>
        </div>
      </form>

      {/* Show Response Count */}
      {responseCount !== null && (
        <div className="mt-4 text-center">
          <p className="text-lg font-semibold text-gray-700">Response Count: {responseCount}</p>
        </div>
      )}

      {/* Show Error */}
      {error && (
        <div className="mt-4 text-center text-red-500">
          <p>{error}</p>
        </div>
      )}
    </div>
  );
};

export default FormIdComponent;