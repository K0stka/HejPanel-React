import { Button } from "@/components/ui/button";
import { DateRangePicker } from "@/components/DateRangePicker";
import { Label } from "@/components/ui/label";
import { NextPage } from "next";
import PageTemplate from "@/components/PageTemplate";
import addPanel from "./actions";

const AddPanelPage: NextPage = () => {
  return (
    <PageTemplate title="Přidat panel">
      <form
        action={addPanel}
        className="flex min-h-full flex-col items-center justify-center gap-5"
      >
        <div className="aspect-video w-4/5 rounded-md border-2 border-primary/10 bg-secondary"></div>
        <Label className="inline-flex items-center gap-3">
          <b>Zobrazit:</b>
          <DateRangePicker
            showCompare={false}
            align="center"
            fromDate={new Date()}
          />
        </Label>
        <Button>Potvrdit</Button>
      </form>
    </PageTemplate>
  );
};

export default AddPanelPage;
