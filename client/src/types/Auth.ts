export type SignupData = { name: string; email: string; password: string };
export type verifyData = { email: string; otp: number };
export type LoginData = { email: string; password: string };

export interface UserInfo {
  _id: string;
  email: string;
  role: string;
}