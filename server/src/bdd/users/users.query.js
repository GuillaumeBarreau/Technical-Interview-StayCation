import camelCase from "camelcase-keys";
import DB from "../../../client-pg.js";

const findUserById = async ({ userId }) => {
  const query = `
    SELECT * FROM users WHERE id=$1::int
  `;

  const { rows } = await DB.query(query, [userId]);
  return camelCase(rows[0]);
};

export const usersQuery = {
  findUserById,
};
