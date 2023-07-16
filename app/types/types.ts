interface User {
  id: string;
  email: string;
}
type LoginForm = {
  email: string;
  password: string;
};
type RegisterForm = {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
};
type Transaction = {
  id: string;
  value: number;
};
