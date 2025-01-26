"use client";
import { useRouter } from "next/navigation";
import { useForm, useFieldArray } from "react-hook-form";
import { FieldComponent, FormField } from "@/components/fieldComponent";
import { v4 as uuidv4 } from 'uuid';

type Option = {
  label: string;
  value: string;
};

type FormValues = {
  name: string;
  description: string;
  fields: FormField[];
};

const Create_form = () => {
  const { control, handleSubmit, register, setValue } = useForm<FormValues>({
    defaultValues: {
      name: '',
      description: '',
      fields: [],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "fields",
  });

  // Function to handle field addition
  const addField = (type: string) => {
    const id = uuidv4();

    const newField: FormField = {
      id: id,
      name: `field_${id}`,
      label: ``,
      placeholder: `Enter your question`,
      type,
      isRequired: false,
      options: [], // Ensure options are initialized as empty
    };

    append(newField); // Use append to add the field to the form state
  };

  // Function to handle adding a new option to a specific field

  const addOption = (fieldId: string, newOption: Option) => {
    // Find the field by its ID
    const fieldIndex = fields.findIndex((field) => field.id === fieldId);

    if (fieldIndex !== -1) {
        // If the field exists, update its options
        const updatedFields = [...fields];
        const updatedField = { ...updatedFields[fieldIndex] };

        // Ensure the field has options and push the new option
        updatedField.options = updatedField.options ? [...updatedField.options, newOption] : [newOption];

        // Update the fields state with the new options
        updatedFields[fieldIndex] = updatedField;
        setValue("fields", updatedFields);
    } else {
        console.error(`Field with ID ${fieldId} not found`);
    }
};


  // Function to handle option update
  const updateOption = (fieldId: string, index: number, option: Option) => {
    const fieldIndex = fields.findIndex((field) => field.id === fieldId);

    if (fieldIndex !== -1) {
        const updatedFields = [...fields];
        const updatedField = { ...updatedFields[fieldIndex] };

        if (updatedField.options && updatedField.options[index]) {
            updatedField.options[index] = option; // Update option safely
        } else {
            console.error(`Option at index ${index} not found for field ID ${fieldId}`);
        }

        updatedFields[fieldIndex] = updatedField;
        setValue("fields", updatedFields);
    } else {
        console.error(`Field with ID ${fieldId} not found`);
    }
};


  // Function to handle option deletion
const deleteOption = (fieldId: string, optionIndex: number) => {
    const updatedFields = fields.map((field) => {
        if (field.id === fieldId) {
            // Remove the option from the selected field
            const updatedOptions = field.options?.filter((_, index) => index !== optionIndex);
            return { ...field, options: updatedOptions };
        }
        return field;
    });

    setValue("fields", updatedFields);
};

  // Function to handle field deletion
  const deleteField = (fieldId: string) => {
    remove(fields.findIndex((field) => field.id === fieldId));
  };

  const onTypeChange = (index: number, newType: string) => {
    const updatedFields = [...fields];
    if (index !== -1) {
      updatedFields[index].type = newType;
      setValue("fields", updatedFields); // Update only the specific field
    } else {
      console.error("Field not found");
    }
  };

  const router = useRouter();
  
  const onSubmit = async (data: FormValues) => {
    console.log("submitting form", data);

    const formLabel = data.name;
    const formDescription = data.description;

    const formData = {
      name: formLabel,
      description: formDescription,
      fields: data.fields.map((field) => ({
        label: field.label,
        type: field.type,
        placeholder: field.placeholder,
        name: field.name,
        isRequired: field.isRequired,
        options: field.options,
      })),
    };

    try {
      const response = await fetch("http://localhost:8000/api/form", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
        credentials: "include",
      });

      if (response.ok) {
        alert("Form submitted successfully!");
        router.push("/forms");
      } else {
        const errorData = await response.json();
        alert(`Failed to submit the form: ${errorData.message}`);
      }
    } catch (error) {
      alert("An error occurred while submitting the form.");
      console.error("Error submitting form:", error);
    }
  };

  return (
    <div className="min-h-screen bg-purple-200 flex items-center justify-center p-6">
      <div className="w-full max-w-2xl rounded-lg space-y-4">
        <div className="px-6 py-4 border-b-2 border-purple-500 bg-white shadow-sm rounded rounded-br-none rounded-bl-none">
          <h1 className="text-2xl font-semibold text-gray-900">Form Submission</h1>
          <p className="text-sm text-gray-600">
            Please fill out the required fields below to submit your information.
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 my-2">
          {/* Form Name */}
          <div className="bg-white w-full p-5 rounded-md shadow-sm mb-4">
            <div className="flex justify-between items-center mb-2">
              <label
                htmlFor="name"
                className="block text-sm font-semibold text-gray-700"
              >
                Form Name
              </label>
            </div>
            <input
              id="name"
              type="text"
              placeholder="Enter form name"
              {...register("name", { required: true })}
              className="w-full p-2 border border-gray-300 rounded mt-1"
            />
          </div>
          {/* Form Description */}
          <div className="bg-white w-full p-5 rounded-md shadow-sm mb-4">
            <div className="flex justify-between items-center mb-2">
              <label
                htmlFor="description"
                className="block text-sm font-semibold text-gray-700"
              >
                Form Description
              </label>
            </div>
            <input
              id="description"
              type="text"
              placeholder="Enter form description"
              {...register("description", { required: true })}
              className="w-full p-2 border border-gray-300 rounded mt-1"
            />
          </div>
          {/* Render dynamic fields */}
          {fields.map((field, index) => (
            <FieldComponent
              key={field.id}
              field={field}
              order={index}
              onDelete={deleteField}
              onAddOption={addOption}
              onDeleteOption={deleteOption}
              onOptionChange={updateOption}
              options={field.options?.map(option => typeof option === 'string' ? { label: option, value: option } : option) || []}
              register={register as unknown as (name: string) => { onChange: () => void; onBlur: () => void; ref: (instance: HTMLInputElement | null) => void; }}
              onTypeChange={(newType) => onTypeChange(index, newType)}
            />
          ))}
          <div className="flex justify-between items-center">
            <button
              type="button"
              onClick={() => addField("text")}
              className="bg-purple-600 text-white py-2 px-4 rounded-lg shadow-md hover:bg-purple-400 transition text-sm font-semibold"
            >
              Add Field
            </button>
            <button
              type="submit"
              className="bg-purple-600 text-white py-2 px-4 rounded-lg shadow-md hover:bg-purple-400 transition text-sm font-semibold"
            >
              Share
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Create_form;