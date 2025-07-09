// rute yang bisa diakses orang publik
export const publicRoutes = ["/", '/browse', "/auth/new-verification"];

// rute autentikasi redirect ke dashboard masing-masing.
export const authRoutes = [
  "/auth/login",
  "/auth/register",
  "/auth/register/mahasiswa",
  "/auth/register/success",
  "/auth/reset-password",
  "/auth/reset-password/success",
  "/auth/new-password",
  "/auth/new-password/success",
];

export const apiAuthPrefix = "/api/auth";
