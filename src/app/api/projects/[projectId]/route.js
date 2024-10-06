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
