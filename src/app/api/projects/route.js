import { prisma } from "../../../../prisma/prisma";
import { auth } from "@/utils/auth";

export async function POST(req) {
  const session = await auth();

  if (!session) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), {
      status: 401,
    });
  }

  const { name, groupId, createdAt, updatedAt, pinataUserId } =
    await req.json();

  console.log("Received request:", req.method);
  console.log("Request body:", {
    name,
    groupId,
    createdAt,
    updatedAt,
    pinataUserId,
  });

  try {
    const newProject = await prisma.project.create({
      data: {
        name,
        groupId,
        createdAt,
        updatedAt,
        pinataUserId,
        user: {
          connect: {
            id: session.user.id,
          },
        },
      },
    });
    return new Response(JSON.stringify(newProject), { status: 201 });
  } catch (error) {
    console.error("Error creating project:", error);
    return new Response(JSON.stringify({ error: "Failed to create project" }), {
      status: 500,
    });
  }
}
