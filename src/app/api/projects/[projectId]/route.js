import { auth } from "@/utils/auth";
import { prisma } from "../../../../../prisma/prisma";

export async function DELETE(req, { params }) {
  const { projectId } = params;

  try {
    const response = await prisma.project.delete({
      where: {
        groupId: projectId,
      },
    });

    return new Response(JSON.stringify(response), { status: 201 });
  } catch (error) {
    console.error("Error deleting project:", error);
    return new Response(JSON.stringify({ error: "Failed to delete project" }), {
      status: 500,
    });
  }
}

export async function PUT(req, { params }) {
  const session = await auth();
  const { projectId } = params;

  if (!session) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), {
      status: 401,
    });
  }

  const { name, groupId, createdAt, updatedAt, pinataUserId } =
    await req.json();

  try {
    const newProject = await prisma.project.update({
      where: { groupId: projectId },
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
    console.error("Error updating project:", error);
    return new Response(JSON.stringify({ error: "Failed to update project" }), {
      status: 500,
    });
  }
}
