import { cookies } from "next/headers";

export const getUserServer = async ({ queryKey }: { queryKey: [string, string] }) => {
  const [_1, userId] = queryKey;
  const res = await fetch(`https://travelspace.world/api/users/${userId}`, {
    next: {
      tags: ["users", userId],
    },
    credentials: "include",
    headers: { Cookie: cookies().toString() },
    cache: "no-store",
  });
  // The return value is *not* serialized
  // You can return Date, Map, Set, etc.

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch data");
  }

  return res.json();
};
