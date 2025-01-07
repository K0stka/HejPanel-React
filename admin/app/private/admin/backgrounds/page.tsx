import BackgroundsPageClientSide from "./_components/BackgroundsPageClientSide";
import { NextPage } from "next";
import { asc } from "shared/orm";
import db from "shared/db";
import { panelBackgrounds } from "shared/schema";

const BackgroundsPage: NextPage = async () => {
    const backgrounds = await db.query.panelBackgrounds.findMany({
        orderBy: asc(panelBackgrounds.id),
    });

    return <BackgroundsPageClientSide backgrounds={backgrounds} />;
};

export default BackgroundsPage;
