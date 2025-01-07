import { NextRequest, NextResponse } from "next/server";
import { getSessionUserInfo, validateUser } from "@/auth/session-utils";

import db from "shared/db";
import { eq } from "shared/orm";
import { promises as fs } from "fs";
import { panelBackgrounds } from "shared/schema";

export const dynamic = "error";

export const GET = async (
    req: NextRequest,
    { params }: { params: Promise<{ id: string }> },
) => {
    const id = parseInt((await params).id);

    if (isNaN(id))
        return NextResponse.json({ error: "Invalid ID" }, { status: 400 });

    const panel = await db.query.panelBackgrounds.findFirst({
        where: eq(panelBackgrounds.id, id),
    });

    if (!panel)
        return NextResponse.json({ error: "Invalid ID" }, { status: 404 });

    const file = await fs.readFile(
        process.cwd() + "/uploads/backgrounds/" + panel.fileName,
    );

    return new NextResponse(file, {
        headers: {
            "Content-Type": "image/png",
            "Content-Disposition": `inline; filename="background.png"`,
            "Cache-Control": "public, max-age=31536000, immutable",
        },
    });
};
