import prisma from "../../config/db";

export const createUser = async (email: string, password: string) => {
  return prisma.user.create({
    data: { email, password },
  });
};

export const getUsers = async () => {
  return prisma.user.findMany();
};
