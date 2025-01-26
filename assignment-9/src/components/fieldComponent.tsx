import { Trash2Icon } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";

type Option = {
  label: string;
  value: string;
};

export interface FormField {
  id: string;
  name: string;
  label: string;
  placeholder: string;
  type: string;
  isRequired: boolean;
  options?: (string | { label: string; value: string })[];
}

type FieldProps = {
  field: FormField;
  order: number;
  onDelete: (id: string) => void;
  onAddOption: (id: string, option: Option) => void;
  onOptionChange: (id: string, index: number, option: Option) => void;
  onDeleteOption: (id: string, index: number) => void;
  options: Option[];
  register: (name: string) => {
    onChange: () => void;
    onBlur: () => void;
    ref: (instance: HTMLInputElement | null) => void;
  }; // React Hook Form's register function
  onTypeChange: (newType: string) => void; // إضافة هذه الخاصية للتعامل مع تغيير النوع
};

const FieldComponent = ({
  field,
  order,
  onDelete,
  onAddOption,
  onDeleteOption,
  options,
  register,
  onTypeChange,
}: FieldProps) => {
  console.log("in field component:", field.id);
  return (
    <div className="p-4 rounded border bg-white">
      <div className="flex flex-col gap-y-4">
        {/* Header */}
        <div className="flex justify-between w-full">
          <Label className="font-bold text-sm">Field Label</Label>
          <Trash2Icon className="w-5 h-5" onClick={() => onDelete(field.id)} />
        </div>
        {/* Field Label & Type */}
        <div className="flex justify-between">
          <Input
            placeholder={field.placeholder}
            {...register(`fields.${order}.label`)} // تسجيل الحقل
          />
          <select
            value={field.type} // تعيين نوع الحقل بشكل ديناميكي
            onChange={(e) => onTypeChange(e.target.value)} // تغيير النوع عند الاختيار
            className="ml-2 p-2 border rounded"
          >
            <option value="text">text</option>
            <option value="radio">radio</option>
            <option value="dropdown">dropdown</option>
            <option value="checkbox">checkbox</option>
          </select>
        </div>
      </div>
      {["dropdown", "checkbox", "radio"].includes(field.type) && (
        <div className="space-y-4 mt-4">
          {options &&
            options.map((o, index) => (
              <div key={index} className="flex items-center space-x-2">
                <Input
                  type="text"
                  placeholder="Option label"
                  {...register(`fields.${order}.options.${index}.label`)}
                />
                <Trash2Icon
                  className="cursor-pointer"
                  onClick={() => onDeleteOption(field.id, index)} // Ensure field.id is passed correctly
                />
              </div>
            ))}
          <Button
            onClick={() => onAddOption(field.id, { label: "", value: "" })}
            className="mt-4"
          >
            Add Option
          </Button>
        </div>
      )}
    </div>
  );
};

export { FieldComponent };
