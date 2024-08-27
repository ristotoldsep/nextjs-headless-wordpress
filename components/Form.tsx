import React, { useState, FormEvent, ChangeEvent } from "react";
import Input from "../components/Input";
import Textarea from "../components/Textarea";
import Fieldset from "../components/Fieldset";
import Button from "../components/Button";

interface Field {
  label: string;
  type: "text" | "email" | "textarea";
  name: string;
  id: string;
  value: string;
  validation_error?: boolean;
  validation_message?: string;
}

const initialFields: Field[] = [
  {
    label: "Name",
    type: "text",
    name: "your-name",
    id: "your-name",
    value: "",
  },
  {
    label: "Email",
    type: "email",
    name: "your-email",
    id: "your-email",
    value: "",
  },
  {
    label: "Subject",
    type: "text",
    name: "your-subject",
    id: "your-subject",
    value: "",
  },
  {
    label: "Message",
    type: "textarea",
    name: "your-message",
    id: "your-message",
    value: "",
  },
];

const Form: React.FC = () => {
  const [fields, setFields] = useState<Field[]>(initialFields);
  const [successMessage, setSuccessMessage] = useState<string>("");

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    const reqOptions = {
      method: "POST",
      body: formData,
    };

    const request = await fetch(
      "https://gatsby.vdisain.dev/wp-json/contact-form-7/v1/contact-forms/1598/feedback?_wpcf7_unit_tag=1598",
      reqOptions
    );

    const response = await request.json();

    if (!response) {
      return alert("Unexpected error occurred. Try again later.");
    }

    if (response.invalid_fields && response.invalid_fields.length > 0) {
      setFields(
        fields.map((field) => {
          const error = response.invalid_fields.find(
            (x: any) => x.field === field.name
          );

          return {
            ...field,
            validation_error: !!error,
            validation_message: error ? error.message : "",
          };
        })
      );
    } else {
      setFields(initialFields);
      setSuccessMessage(response.message);
    }
  };

  const handleChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    name: string
  ) => {
    const { value } = event.target;
    setFields(
      fields.map((field) => {
        if (field.name === name) {
          return {
            ...field,
            value,
          };
        }
        return field;
      })
    );
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="flex flex-col gap-6">
        {fields.map((field) => (
          <Fieldset key={field.id}>
            <label htmlFor={field.id} className="text-slate-900">
              {field.label}
            </label>
            {field.type === "text" && (
              <Input
                type={field.type}
                name={field.name}
                id={field.id}
                value={field.value}
                onChange={(event) => handleChange(event, field.name)}
              />
            )}
            {field.type === "email" && (
              <Input
                type={field.type}
                name={field.name}
                id={field.id}
                value={field.value}
                onChange={(event) => handleChange(event, field.name)}
              />
            )}
            {field.type === "textarea" && (
              <Textarea
                name={field.name}
                id={field.id}
                value={field.value}
                onChange={(event) => handleChange(event, field.name)}
              />
            )}
            {field.validation_error && (
              <div className="text-sm text-red-500 mt-1">
                {field.validation_message}
              </div>
            )}
          </Fieldset>
        ))}
        <Button type="submit" className="w-40">
          Submit
        </Button>
      </form>
      {successMessage && (
        <div
          className="flex items-center p-4 mb-4 mt-5 text-sm text-green-800 border border-green-300 rounded-lg bg-green-50 dark:border-green-800"
          role="alert"
        >
          <svg
            className="flex-shrink-0 inline w-4 h-4 me-3"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
          </svg>
          <span className="sr-only">Info</span>
          <div>
            <span className="font-medium">{successMessage}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default Form;
