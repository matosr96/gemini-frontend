export type PartialInstitution = Partial<Institution>;

export interface Institution {
  uuid: string;
  user: string;
  name: string;
  nit: number;
  email: string;
  password: string;
  phone: string;
  photo: string;
  address: string;
  status: string;
}

export const EmptyInstitutionsState: PartialInstitution[] = [
  {
    uuid: "",
    user: "",
    name: "",
    nit: 0,
    email: "",
    password: "",
    phone: "",
    photo: "",
    address: "",
    status: "",
  },
];

export interface InstitutionInfo {
  institutions: Institution;
  loading: boolean;
  success: boolean;
  successSignup: boolean;
  successVerification: boolean;
  error: string;
}

export const EmptyInstitutionState: PartialInstitution = {
  uuid: "",
  user: "",
  name: "",
  nit: 0,
  email: "",
  password: "",
  phone: "",
  photo: "",
  address: "",
};
