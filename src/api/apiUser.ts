import routes from "./routes";
import { ICreateUser } from "../features/register/interface/ICreateUser";
import { ILoginUser } from "../features/login/interface/ILoginUser";

// TongaTest;
// gaston@correo.com
// BobyChimo!

const createUser = async (user: ICreateUser) =>
  await fetch(routes.REGISTER, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  });

const login = async (credentials: ILoginUser) =>
  await fetch(routes.LOGIN, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
  });

export { createUser, login };
