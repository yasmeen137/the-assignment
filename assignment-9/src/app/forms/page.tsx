"use client";

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
interface Form {
  id: number;
  name: string;
  description: string;
}

const Forms = () => {
  const [forms, setForms] = useState<Form[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchForms = async () => {
      try {
        setLoading(true); 
        const res = await fetch('http://localhost:8000/api/form', {
          method: 'GET',
          credentials: 'include',
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }

        const data = await res.json();
        console.log("Fetched Forms:", data.forms); // Log to inspect the data

        const liteForm = data.forms.map((f: Form) => ({
          id: f.id,
          name: f.name,
          description: f.description,
        }));

        setForms(liteForm || []);
      } catch (err) {
        console.error("Error fetching forms:", err);
      } finally {
        setLoading(false); // Stop loading
      }
    };

    fetchForms();
  }, []);

  return (
    <div className="bg-purple-200 min-h-screen flex flex-col">

      <div className="max-w-7xl mx-auto px-6 py-12 mt-24 flex-1">
        <h1 className="text-3xl font-bold text-gray-600 mb-6 text-center">Make Your Own Forms</h1>

        <div className="flex justify-center items-center mb-6">
          <Link
            href="/forms/create"
            className="inline-block px-4 py-2 text-white bg-blue-600 hover:bg-blue-700 rounded-md shadow-md transition duration-300"
          >
            Create a Form
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {loading ? (
            <p className="col-span-3 text-center text-gray-500">Loading forms...</p>
          ) : forms.length > 0 ? (
            forms.map((form) => (
              <Card key={form.id} className="max-w-xs mx-auto bg-white shadow-lg hover:shadow-xl transition-shadow duration-300">
                <CardHeader>
                  <CardTitle>{form.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>
                    {form.description || 'No description available'}
                  </CardDescription>
                </CardContent>
                <CardFooter className="flex justify-center">
                  <Link
                    href={`/forms/${form.id}`}
                    className="text-blue-600 hover:text-blue-800 font-medium"
                  >
                    View Details
                  </Link>
                </CardFooter>
              </Card>
            ))
          ) : (
            <p className="col-span-3 text-center text-gray-500">No existing forms</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Forms;