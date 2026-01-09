const now = new Date();
const options = { year: "numeric", month: "long", day: "numeric" };
const formattedDate = now.toLocaleDateString("en-US", options);
export const today = formattedDate;