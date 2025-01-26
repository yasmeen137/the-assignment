import React, { useState, useCallback } from "react";
import { useForm, Controller } from "react-hook-form";

export interface FormField {
  id: number;
  name: string;
  label: string;
  type: "text" | "dropdown" | "checkbox" | "radio";
  placeholder?: string;
  options?: { label: string; value: string }[];
  isRequired: boolean;
  onTypeChange?: (newType: "text" | "dropdown" | "checkbox" | "radio") => void;
}
type FormData = {
  [key: string]: string | string[] | boolean;
};

export default function FormBuilder() {
  const [fields, setFields] = useState<FormField[]>([]);
  const { control, handleSubmit } = useForm<FormData>();

  // Add a new field
  const addField = useCallback((type: "text" | "dropdown" | "checkbox" | "radio") => {
    const newFieldId = Date.now();
    setFields((prev) => [
      ...prev,
      {
        id: newFieldId,
        name: `field_${prev.length + 1}`,
        label: "New Field",
        type,
        placeholder: type === "text" ? "Enter text" : undefined,
        isRequired: false,
        options: type === "dropdown" || type === "radio" || type === "checkbox" ? [] : undefined,
        onTypeChange: (newType: "text" | "dropdown" | "checkbox" | "radio") => {
          setFields((fields) =>
            fields.map((field) =>
              field.id === newFieldId ? { ...field, type: newType } : field
            )
          );
        },
      },
    ]);
  }, []);

  // Update a field
  const updateField = useCallback((id: number, updatedField: Partial<FormField>) => {
    setFields((prev) => prev.map((field) => (field.id === id ? { ...field, ...updatedField } : field)));
  }, []);

  // Delete a field
  const deleteField = useCallback((id: number) => {
    setFields((prev) => prev.filter((field) => field.id !== id));
  }, []);

  // Add an option to a dropdown, radio or checkbox field
  const addOption = useCallback((id: number, option: string) => {
    if (option.trim() !== "") {
      setFields((prev) =>
        prev.map((field) =>
          field.id === id
            ? {
                ...field,
                options: [...(field.options || []), { label: option, value: option }],
              }
            : field
        )
      );
    }
  }, []);

  // Delete an option from a dropdown, radio or checkbox field
  const deleteOption = useCallback((id: number, optionValue: string) => {
    setFields((prev) =>
      prev.map((field) =>
        field.id === id
          ? {
              ...field,
              options: field.options?.filter((opt) => opt.value !== optionValue),
            }
          : field
      )
    );
  }, []);

  // Handle form submission
  const onSubmit = useCallback((data: FormData) => {
    console.log("Form Data:", data);
  }, []);

  return (
    <div className="p-5">
      {/* Buttons to add fields */}
      <div className="mb-5">
        <button onClick={() => addField("text")} className="px-4 py-2 bg-blue-500 text-white rounded-md mr-2">
          Add Text Field
        </button>
        <button onClick={() => addField("dropdown")} className="px-4 py-2 bg-blue-500 text-white rounded-md">
          Add Dropdown Field
        </button>
        <button onClick={() => addField("checkbox")} className="px-4 py-2 bg-blue-500 text-white rounded-md">
          Add Checkbox Field
        </button>
        <button onClick={() => addField("radio")} className="px-4 py-2 bg-blue-500 text-white rounded-md">
          Add Radio Field
        </button>
      </div>

      {/* Form rendering */}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {fields.map((field) => (
          <div key={field.id} className="bg-gray-100 p-4 rounded-md">
            {/* Field header with edit and delete buttons */}
            <div className="flex justify-between items-center mb-2">
              <label className="block text-sm font-medium text-gray-700">{field.label}</label>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() =>
                    updateField(field.id, { label: prompt("Enter new label", field.label) || field.label })
                  }
                  className="text-sm text-blue-500 hover:text-blue-700"
                >
                  Edit
                </button>
                <button
                  type="button"
                  onClick={() => deleteField(field.id)}
                  className="text-sm text-red-500 hover:text-red-700"
                >
                  Delete
                </button>
              </div>
            </div>
            {/* Render input based on field type */}
            {field.type === "text" && (
              <Controller
                name={field.name}
                control={control}
                defaultValue=""
                rules={{ required: field.isRequired }}
                render={({ field: rhfField, fieldState }) => (
                  <>
                    <input
                      {...rhfField}
                      value={String(rhfField.value)}
                      placeholder={field.placeholder}
                      className="block w-full p-2 border rounded-md"
                    />
                    {fieldState.error && <span className="text-red-500 text-sm">This field is required</span>}
                  </>
                )}
              />
            )}
            {/* Dropdown field with options */}
            {field.type === "dropdown" && (
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <input
                    type="text"
                    placeholder="Enter option"
                    className="block w-full p-2 border rounded-md"
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && e.currentTarget.value) {
                        e.preventDefault();
                        addOption(field.id, e.currentTarget.value);
                        e.currentTarget.value = "";
                      }
                    }}
                  />
                  <button
                    type="button"
                    onClick={() => {
                      const option = prompt("Enter an option");
                      if (option) addOption(field.id, option);
                    }}
                    className="px-3 py-1 bg-green-500 text-white rounded-md"
                  >
                    Add Option
                  </button>
                </div>
                {field.options && field.options.length > 0 ? (
                  <div>
                    <select className="block w-full p-2 border rounded-md">
                      <option value="">Select an option</option>
                      {field.options.map((option, index) => (
                        <option key={index} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                    <div className="mt-2">
                      {field.options.map((option, index) => (
                        <div key={index} className="flex justify-between items-center">
                          <span>{option.label}</span>
                          <button
                            type="button"
                            onClick={() => deleteOption(field.id, option.value)}
                            className="text-sm text-red-500 hover:text-red-700"
                          >
                            Delete
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  <span className="text-gray-500 text-sm">No options added yet</span>
                )}
              </div>
            )}

            {/* Checkbox field with options */}
            {field.type === "checkbox" && (
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <input
                    type="text"
                    placeholder="Enter option"
                    className="block w-full p-2 border rounded-md"
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && e.currentTarget.value) {
                        e.preventDefault();
                        addOption(field.id, e.currentTarget.value);
                        e.currentTarget.value = "";
                      }
                    }}
                  />
                  <button
                    type="button"
                    onClick={() => {
                      const option = prompt("Enter an option");
                      if (option) addOption(field.id, option);
                    }}
                    className="px-3 py-1 bg-green-500 text-white rounded-md"
                  >
                    Add Option
                  </button>
                </div>
                {field.options && field.options.length > 0 ? (
                  <div>
                    {field.options.map((option, index) => (
                      <div key={index} className="flex items-center">
                        <input
                          type="checkbox"
                          id={`${field.name}-${option.value}`}
                          value={option.value}
                          className="h-4 w-4"
                        />
                        <label htmlFor={`${field.name}-${option.value}`} className="ml-2 text-sm">
                          {option.label}
                        </label>
                      </div>
                    ))}
                  </div>
                ) : (
                  <span className="text-gray-500 text-sm">No options added yet</span>
                )}
              </div>
            )}
            {/* Radio field with options */}
            {field.type === "radio" && (
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <input
                    type="text"
                    placeholder="Enter option"
                    className="block w-full p-2 border rounded-md"
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && e.currentTarget.value) {
                        e.preventDefault();
                        addOption(field.id, e.currentTarget.value);
                        e.currentTarget.value = "";
                      }
                    }}
                  />
                  <button
                    type="button"
                    onClick={() => {
                      const option = prompt("Enter an option");
                      if (option) addOption(field.id, option);
                    }}
                    className="px-3 py-1 bg-green-500 text-white rounded-md"
                  >
                    Add Option
                  </button>
                </div>
                {field.options && field.options.length > 0 ? (
                  <div>
                    {field.options.map((option, index) => (
                      <div key={index} className="flex items-center">
                        <input
                          type="radio"
                          name={field.name}
                          value={option.value}
                          id={`${field.name}-${option.value}`}
                          className="h-4 w-4"
                        />
                        <label htmlFor={`${field.name}-${option.value}`} className="ml-2 text-sm">
                          {option.label}
                        </label>
                      </div>
                    ))}
                  </div>
                ) : (
                  <span className="text-gray-500 text-sm">No options added yet</span>
                )}
              </div>
            )}
          </div>
        ))}
        {/* Submit button */}
        <button type="submit" className="px-4 py-2 bg-green-500 text-white rounded-md">
          Submit
        </button>
      </form>
    </div>
  );
}
