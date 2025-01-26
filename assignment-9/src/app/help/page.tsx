"use client";

import React from 'react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const HelpPage = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-purple-200 text-gray-900 p-4">
            <div className="max-w-2xl w-full bg-white p-8 rounded-xl shadow-lg">
                <h1 className="text-4xl font-semibold mb-6 text-center text-purple-700">Help</h1>
                <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="item-1">
                        <AccordionTrigger>Getting Started with Forms</AccordionTrigger>
                        <AccordionContent>
                            <p className="text-gray-700 mt-2">Here how to get started with creating forms:</p>
                            <ul className="list-disc list-inside text-gray-700 mt-2 space-y-1">
                                <li>Click on the Create New Form button.</li>
                                <li>Fill in the form details such as form name , description, and fields.</li>
                                <li>Click share to create your form.</li>
                            </ul>
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-2">
                        <AccordionTrigger>Managing Forms</AccordionTrigger>
                        <AccordionContent>
                            <p className="text-gray-700 mt-2">Once you have created a form, you can manage it as follows:</p>
                            <ul className="list-disc list-inside text-gray-700 mt-2 space-y-1">
                                <li>Go to the Forms section to see a list of your forms.</li>
                                <li>Click on a form to view its details </li>
                            </ul>
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-3">
                        <AccordionTrigger>Form Field Types</AccordionTrigger>
                        <AccordionContent>
                            <p className="text-gray-700 mt-2">You can add various types of fields to your forms:</p>
                            <ul className="list-disc list-inside text-gray-700 mt-2 space-y-1">
                                <li><strong>Add Field:</strong> Use this for to add a Field.</li>
                                <li><strong>Text Area:</strong> Use this for longer text entries.</li>
                                <li><strong>Checkbox:</strong> Use this for multiple selections.</li>
                                <li><strong>Radio Button:</strong> Use this for single selections.</li>
                                <li><strong>Dropdown:</strong> Use this for a dropdown list of options.</li>
                            </ul>
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-4">
                        <AccordionTrigger>Submitting Forms</AccordionTrigger>
                        <AccordionContent>
                            <p className="text-gray-700 mt-2">To submit a form:</p>
                            <ul className="list-disc list-inside text-gray-700 mt-2 space-y-1">
                                <li>Fill in all the required fields.</li>
                                <li>Click the Submit button at the bottom of the form.</li>
                                <li>You will see a confirmation message upon successful submission.</li>
                            </ul>
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-5">
                        <AccordionTrigger>Viewing Form Responses</AccordionTrigger>
                        <AccordionContent>
                            <p className="text-gray-700 mt-2">To view responses for a form:</p>
                            <ul className="list-disc list-inside text-gray-700 mt-2 space-y-1">
                                <li>Enter the form Id number to find the form</li>
                                <li>Click ont button to see the result </li>
                                <li>view all submitted responses</li>
                            </ul>
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>
            </div>
        </div>
    );
};

export default HelpPage;
