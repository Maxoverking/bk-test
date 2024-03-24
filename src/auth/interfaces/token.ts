export interface Token {
  token: string
}
export interface AuthRequest {
  token: string,
  data: {
    email: string,
    name: string,
  }
}