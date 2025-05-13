//types of forms

export interface OwnerForm {
  name: string;
  email: string;
  password: string;
  phone: string;
  petType: string;
  petName: string;
  petAge: number;
  petBreed: string;
  petGender: string;
  petImage: string;
  location: string;
  availability: string;
}

export interface CaretakerForm {
  name: string;
  email: string;
  phone: string;
  location: string;
  availability: string;
  image: string;
}

export interface PetForm {
  name: string;
  type: string;
  breed: string;
  age: number;
  weight: number;
  image: string;
}
export interface LoginForm {
  email: string;
  password: string;
}
