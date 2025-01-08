import { ImageResponse } from "next/og";
import { NextRequest } from "next/server";
import SRGH from "@/components/icons/SRGH";

export const GET = async (req: NextRequest) => {
    return new ImageResponse(<SRGH />);
};
