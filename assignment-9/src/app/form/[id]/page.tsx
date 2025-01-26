"use client";
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import FormIdComponent from '@/components/ui/FormIdComponent'; 

type Form = {
  id: number;
  name: string;
  description: string;
  userId: number;
  fields: FormFields[];
};

type FormFields = {
  id: number;
  label: string;
  type: string;
  placeholder: string;
  name: string;
  required: boolean;
  options: Option[];
};

type Option = {
  label: string;
  value: string;
};

async function fetchForm(formId: string) {
  try {
    console.log(formId);
    const response = await fetch(`http://localhost:8000/api/form/${formId}/public`, {
      method: 'GET',
      headers: {
        'Content-type': 'application/json'
      },
      credentials: 'include'
    });
    return await response.json();
  } catch (error: unknown) {
    console.error(error);
  }
}

export default function PublicFormPage() {
  const { id } = useParams<{ id: string }>();
  const [form, setForm] = useState<Form | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadForm(formId: string) {
      setLoading(true); 
      const data = await fetchForm(formId);
      console.log('form data', data);
      setForm(data.form);  
      setLoading(false);  
    }

    if (id) {
      loadForm(id);
    }
  }, [id]);

  if (loading) return <div>Loading...</div>;

  if (!form) {
    return <p>Form not found</p>;
  }

  return (
    <div>
      <FormIdComponent formId={id} form={form} />
    </div>
  );
}
