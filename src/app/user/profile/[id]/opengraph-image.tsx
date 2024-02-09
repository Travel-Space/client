import { ImageResponse } from "next/server";

export default async function Image({ params }: { params: { id: string } }) {
  const url = `https://travelspace.world/api/user/other/${params.id}`;
  const user = await fetch(url).then(res => res.json());

  return new ImageResponse(
    (
      <div
        style={{
          backgroundImage: `url(${user.profileImage})`,
          fontSize: 48,
          background: "white",
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        `${user.nickName} (${user.email}) / Travel Space
      </div>
    ),
    { width: 1200, height: 630 },
  );
}
