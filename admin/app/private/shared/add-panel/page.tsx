import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Button } from "@/components/ui/button";
import { DateRangePicker } from "@/components/inputs/DateRangePicker";
import { Label } from "@/components/ui/label";
import { NextPage } from "next";
import PageTemplate from "@/components/utility/PageTemplate";
import { Textarea } from "@/components/ui/textarea";
import addPanel from "./actions";

const AddPanelPage: NextPage = () => {
  return (
    <PageTemplate title="Přidat panel">
      <form
        action={addPanel}
        className="flex min-h-full flex-col items-center justify-center gap-5"
      >
        <div className="aspect-video w-96 rounded-md border-2 border-primary/10 bg-secondary"></div>
        <Label className="inline-flex items-center gap-3">
          <b>Zobrazit:</b>
          <DateRangePicker
            showCompare={false}
            align="center"
            fromDate={new Date()}
          />
        </Label>
        <Label>
          <b>Typ:</b>
          <Select name="type" required>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Theme" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="image">Image</SelectItem>
              <SelectItem value="text">Text</SelectItem>
            </SelectContent>
          </Select>
        </Label>
        <Label>
          <b>Obsah:</b>
          <Textarea
            name="content"
            required
            className="h-40 w-full resize-none rounded-md border-2 border-primary/10"
          />
        </Label>
        <Button>Potvrdit</Button>
      </form>
    </PageTemplate>
  );
};

export default AddPanelPage;
