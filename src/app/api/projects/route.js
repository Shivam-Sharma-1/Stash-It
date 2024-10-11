import { prisma } from "@/prisma/prisma";
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

export async function GET(req) {
  const session = await auth();
  console.log("GET", session);

  if (!session) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), {
      status: 401,
    });
  }

  try {
    const projects = await prisma.project.findMany({
      where: {
        userId: session.user.id,
      },
    });
    return new Response(JSON.stringify(projects), { status: 201 });
  } catch (error) {
    console.error("Error fetching projects:", error);
    return new Response(JSON.stringify({ error: "Failed to fetch projects" }), {
      status: 500,
    });
  }
}
