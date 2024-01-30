import camelCase from "camelcase-keys";
import DB from "../../../client-pg.js";

export const querySelectLastSafeDate = async () => {
  const query = `
    SELECT id
    FROM public.sale_dates
    ORDER BY id DESC
    LIMIT 1 
  `;

  const { rows } = await DB.query(query);
  return camelCase(rows[0]);
};
