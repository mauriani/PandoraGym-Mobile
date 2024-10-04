export interface IPlan {
  id: string;
  name: string;
  description: string[];
  price: number;
  personalId: string;
}

export interface IStudent {
  plan: IPlan;
}

export interface IUser {
  id: string;
  name: string;
  email: string;
  avatarUrl: string;
  phone: string;
  student: IStudent;
}