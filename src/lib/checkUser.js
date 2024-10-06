const { auth } = require("@/utils/auth");

export const checkUser = async () => {
  const session = await auth();
  if (!session && !session.user.id) return redirect("/auth");

  return session;
};
