interface IRegister {
  fullname: string;
  email: string;
  password: string;
}

interface ILogin {
  email: string;
  password: string;
}

interface IResetPassword {
  email: string;
}

interface INewPassword {
  password: string;
}

export type {IRegister, ILogin, IResetPassword, INewPassword};