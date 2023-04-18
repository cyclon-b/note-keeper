import type { JwtPayload } from 'jwt-decode';

export interface AuthModel {
  email: string;
  password: string;
}

export interface AuthResponseData {
  accessToken: string;
  user: AuthResponseUser;
}

export interface AuthResponseUser {
  email: string;
  id: number;
}

export interface AuthPayload extends JwtPayload {
  email: string;
  iat: number;
  exp: number;
  sub: string;
}

export interface AppUserData {
  token: string;
  userId: string | undefined;
  userEmail: string;
}
