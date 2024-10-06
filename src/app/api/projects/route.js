import { authOptions } from "@/utils/authOptions";
import { getServerSession } from "next-auth";
import { prisma } from "../../../../prisma/prisma";

export default async function handler(req, res) {
  const session = await getServerSession(req, res, authOptions);

  if (req.method === "POST") {
    if (!session) return res.status(401).json({ error: "Unauthorized" });

    const { name, cid, size, number_of_files, mime_type, group_id, keyvalues } =
      req.body;

    try {
      const newProject = await prisma.project.create({
        data: {
          name,
          cid,
          size,
          number_of_files,
          mime_type,
          group_id,
          keyvalues,
          userId: session.user.id,
        },
      });
      res.status(201).json(newProject);
    } catch (error) {
      console.error("Error creating project:", error);
      res.status(500).json({ error: "Failed to create project" });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
