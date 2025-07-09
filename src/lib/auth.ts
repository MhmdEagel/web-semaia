import { auth } from "@/auth";

const getCurrentUser = async () => {
  const session = await auth();
  const user = session?.user;
  return user;
};


export default getCurrentUser;
