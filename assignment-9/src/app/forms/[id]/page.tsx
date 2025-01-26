"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import FormIdComponent from "@/components/ui/FormIdComponent"; 
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

type Submission = {
  id: number;
  formId: number;
  field_answers: FieldAnswer[];
  fields: FormFields[];
};

type FieldAnswer = {
  fieldId: number;
  value: string;
};

type Form = {
  id: number;
  name: string;
  description: string;
  userId: number;
  fields: FormFields[];
  submissions: Submission[];
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
    const response = await fetch(`http://localhost:8000/api/form/${formId}`, {
      method: "GET",
      headers: {
        "Content-type": "application/json",
      },
      credentials: "include",
    });
    return await response.json();
  } catch (error: unknown) {
    console.error(error);
  }
}

export default function FormPage() {
  const { id } = useParams<{ id: string }>();
  const [form, setForm] = useState<Form | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadForm(formId: string) {
      setLoading(true); 
      const data = await fetchForm(formId);
      console.log("form data", data);
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

  console.log("Form:", form);

  return (
    <div className="bg-purple-200 min-h-screen flex flex-col overflow-scroll">
      <Tabs
        defaultValue="form"
        className="w-[1200px] mt-20 mx-auto max-w-7xl bg-purple-200"
      >
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="form">Form</TabsTrigger>
          <TabsTrigger value="submissions">Submissions</TabsTrigger>
        </TabsList>

        <TabsContent value="form">
          <FormIdComponent formId={id} form={form} />
        </TabsContent>

        <TabsContent value="submissions">
          <div className="flex flex-col items-center justify-center">
            <h1 className="text-3xl font-bold mb-4">Submissions</h1>
            {form.submissions.length === 0 && <p className="text-lg mb-4">No submissions yet.</p>}
            <div className="flex flex-wrap justify-center">
              {form.submissions.map((submission, index) => (
                <Card key={submission.id} className="w-full max-w-md mb-4 mr-4 shadow-lg rounded-lg overflow-hidden">
                  <CardHeader className="bg-purple-500 text-white">
                    <CardTitle>Submission {index + 1}</CardTitle>
                  </CardHeader>
                  <CardContent className="p-4 bg-white">
                    <div className="grid grid-cols-4 gap-4">
                      {submission.field_answers.map((field_answer) => (
                        <div key={`${submission.id}-${field_answer.fieldId}`}>
                          <strong>{form.fields.find((field: FormFields) => field.id === field_answer.field_id)?.label}:</strong> {field_answer.value}
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
