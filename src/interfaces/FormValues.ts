export interface SignUpValues {
  fullName: string;
  email: string;
  password: string;
  cnfPassword: string;
}

export interface LoginValues {
  email: string;
  password: string;
}

export interface NoteFormProps {
  title: string | undefined;
  description: string | undefined;
}
