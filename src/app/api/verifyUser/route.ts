import { userList } from "@@/data/userList";

export async function POST(req: Request) {
  const data = await req.json();

  const user = userList.find(
    (user) =>
      user.name.toLowerCase() === data.name.toLowerCase() &&
      user.password === data.password
  );

  if (user) {
    return new Response(
      JSON.stringify({ 
        status: 200,
        user: {
          name: user.name,
          picLink: user.picLink,
          inviteMessage: user.inviteMessage
        }
      }), 
      { status: 200 }
    );
  } else {
    return new Response(JSON.stringify({ status: 401 }), {
      status: 401,
    });
  }
}