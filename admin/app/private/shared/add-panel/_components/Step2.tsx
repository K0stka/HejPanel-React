import { Button } from "@/components/ui/button";
import DateRangePicker from "@/components/inputs/DateRangePicker";
import { SetState } from "shared/types";
import { cs } from "date-fns/locale";

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
                from={showFrom ?? new Date()}
                to={showTill ?? new Date()}
                onChange={({ from, to }) => {
                    setShowFrom(from);
                    setShowTill(to);
                }}
                min={new Date()}
                locale={cs}
            />
            <pre suppressHydrationWarning>
                {JSON.stringify({ showFrom, showTill }, null, 2)}
            </pre>
            {showFrom && showTill && <Button onClick={nextStep}>Další</Button>}
        </>
    );
};

export default Step2;
