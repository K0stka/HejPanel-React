import { Button } from "@/components/ui/button";
import { DateRangePicker } from "@/components/inputs/DateRangePicker";
import { SetState } from "shared/types";

interface Step2Props {
    showFrom: Date | undefined;
    showTill: Date | undefined;
    setShowFrom: SetState<Date | undefined>;
    setShowTill: SetState<Date | undefined>;
    nextStep: () => void;
}

const Step2 = ({
    showFrom,
    showTill,
    setShowFrom,
    setShowTill,
    nextStep,
}: Step2Props) => {
    return (
        <>
            <h1 className="nunito text-2xl font-bold">Zvolte datum</h1>
            <DateRangePicker
                initialDateFrom={showFrom}
                initialDateTo={showTill}
                showCompare={false}
                inline={true}
                align="center"
                minDate={new Date()}
                onUpdate={(range) => {
                    setShowFrom(range.range.from);
                    setShowTill(range.range.to);
                }}
            />
            {showFrom && showTill && <Button onClick={nextStep}>Další</Button>}
        </>
    );
};

export default Step2;
