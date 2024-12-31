"use client";

import { ArrowLeft, ArrowRight } from "lucide-react";
import { CreatePanelDTO, addPanel } from "./actions";
import { Fragment, useContext, useState } from "react";
import { Variants, motion } from "framer-motion";

import { AuthContext } from "@/auth/context";
import { Button } from "@/components/ui/button";
import { NextPage } from "next";
import { Panel } from "shared/types";
import { Progress } from "@/components/ui/progress";
import Spinner from "@/components/utility/Spinner";
import Step1 from "./_components/Step1";
import Step2 from "./_components/Step2";
import Step3 from "./_components/Step3";
import Step4 from "./_components/Step4";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

interface CreateImagePanelContentState {
    base64: string;
}

interface CreateVideoPanelContentState {
    base64: string;
}

interface CreateTextPanelContentState {
    content: string;
    backgroundId: number;
    background: string;
    textColor: string;
}

export type CreatePanelContentState<T extends Panel["type"] | undefined> =
    T extends "image"
        ? CreateImagePanelContentState
        : T extends "video"
          ? CreateVideoPanelContentState
          : T extends "text"
            ? CreateTextPanelContentState
            : undefined;

const AddPanelPage: NextPage = () => {
    const router = useRouter();

    const user = useContext(AuthContext);

    const [step, setStep] = useState(0);
    const [maxStep, setMaxStep] = useState(0);

    const [type, setType] = useState<Panel["type"]>();
    const [showFrom, setShowFrom] = useState<Date>();
    const [showTill, setShowTill] = useState<Date>();
    const [content, setContent] =
        useState<CreatePanelContentState<typeof type>>();

    const [isSubmitting, setIsSubmitting] = useState(false);

    const nextStep = () => {
        setStep((step) => step + 1);
        setMaxStep((maxStep) => Math.max(maxStep, step + 1));
    };
    const prevStep = () => setStep((step) => step - 1);

    const submitPanel = async () => {
        setIsSubmitting(true);

        let panelContent: CreatePanelDTO["content"];

        switch (type) {
            case "image":
                panelContent = {
                    base64: (content as CreateImagePanelContentState)?.base64,
                };
                break;
            case "video":
                panelContent = {
                    base64: (content as CreateVideoPanelContentState)?.base64,
                };
                break;
            case "text":
                panelContent = {
                    content: (content as CreateTextPanelContentState)?.content,
                    backgroundId: (content as CreateTextPanelContentState)
                        ?.backgroundId,
                };
                break;
        }

        const loadingToast = toast.loading("Přidávám panel");

        addPanel({
            type: type!,
            showFrom: showFrom!,
            showTill: showTill!,
            content: panelContent!,
        })
            .then((newThreadId) => {
                toast.success("Panel byl úspěšně přidán");

                router.push(`/active-panels/${newThreadId}`);
            })
            .catch((e) => {
                toast.error("Panel se nepodařilo přidat", {
                    description: e.message,
                });
            })
            .finally(() => {
                toast.dismiss(loadingToast);
                setIsSubmitting(false);
            });
    };

    const steps = [
        <Step1
            key={1}
            type={type}
            setType={setType}
            setContent={setContent}
            nextStep={nextStep}
        />,
        <Step2
            key={2}
            showFrom={showFrom}
            showTill={showTill}
            setShowFrom={setShowFrom}
            setShowTill={setShowTill}
            nextStep={nextStep}
        />,
        <Fragment key={3}>
            {type ? (
                <Step3
                    type={type}
                    content={content}
                    setContent={setContent}
                    nextStep={nextStep}
                />
            ) : (
                <p>Prosím vyberte typ panelu</p>
            )}
        </Fragment>,
        <Fragment key={4}>
            {type && content ? (
                <Step4
                    type={type}
                    showFrom={showFrom!}
                    showTill={showTill!}
                    content={content}
                    submitPanel={submitPanel}
                />
            ) : (
                <p>Prosím vyberte obsah panelu</p>
            )}
        </Fragment>,
    ];

    const animationStates: Variants = {
        seen: { opacity: 0, pointerEvents: "none", translateY: "-200px" },
        current: { opacity: 1, pointerEvents: "auto", translateY: 0 },
        unseen: { opacity: 0, pointerEvents: "none", translateY: "200px" },
    };

    return isSubmitting ? (
        <Spinner />
    ) : (
        <div className="relative grid min-h-full w-full grid-rows-[auto_1fr] gap-5 p-10">
            <div className="grid grid-cols-[auto,1fr,auto] items-center gap-5">
                <Button
                    variant="ghost"
                    disabled={step === 0}
                    onClick={prevStep}
                >
                    <ArrowLeft />
                </Button>
                <Progress value={(step / (steps.length - 1)) * 100} />
                <Button
                    variant="ghost"
                    disabled={step === maxStep}
                    onClick={nextStep}
                >
                    <ArrowRight />
                </Button>
            </div>
            <div className="relative flex h-full w-full flex-col items-center justify-center">
                {steps.map((stepContent, index) => (
                    <motion.div
                        key={index}
                        animate={
                            index === step
                                ? "current"
                                : index < step
                                  ? "seen"
                                  : "unseen"
                        }
                        transition={{ duration: 0.3 }}
                        variants={animationStates}
                        className="absolute flex h-full w-full flex-col items-center justify-center gap-5 overflow-auto opacity-0"
                    >
                        {stepContent}
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

export default AddPanelPage;
