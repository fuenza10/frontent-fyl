declare global {
  interface Question {
    id: string;
    label: string;
    type: string;
    options: Option[];
    formId: string;

    value?: string;
  };
  interface FormField {
    id: string;
    label: string;
    type: string;
    options: Option[];
   
  };
  type Option = {
    value: string;
    // Add more properties as needed
  };
}

export { }