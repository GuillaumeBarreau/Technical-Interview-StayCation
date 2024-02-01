import camelCase from "camelcase-keys";
import { usersQuery } from "./users.query.js";

const getUserById = async (userId) => {
  const responseQuery = await usersQuery.findUserById(querySelectUserById, [
    userId,
  ]);
  return camelCase(responseQuery);
};

export const usersControllers = {
  getUserById,
};
