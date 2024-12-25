"use client";

import {
  ArrowLeft,
  ArrowRight,
  Clapperboard,
  Image,
  LetterText,
} from "lucide-react";
import { Panel, PanelBackground } from "shared/types";
import { Variants, motion } from "framer-motion";
import { addPanel, getPanelBackgrounds } from "./actions";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { DateInput } from "@/components/inputs/DateInput";
import { DateRangePicker } from "@/components/inputs/DateRangePicker";
import { NextPage } from "next";
import { Progress } from "@/components/ui/progress";
import { Textarea } from "@/components/ui/textarea";

const AddPanelPage: NextPage = () => {
  const [step, setStep] = useState(0);
  const [maxStep, setMaxStep] = useState(0);

  const [type, setType] = useState<Panel["type"]>();
  const [showFrom, setShowFrom] = useState<Date>();
  const [showTill, setShowTill] = useState<Date>();
  const [content, setContent] = useState<{ [key: string]: any }>();

  const nextStep = () => {
    setStep((step) => step + 1);
    setMaxStep((maxStep) => Math.max(maxStep, step + 1));
  };
  const prevStep = () => setStep((step) => step - 1);

  const PanelTypeButton = ({
    type: panelType,
    name,
    icon,
  }: {
    type: Panel["type"];
    name: string;
    icon: React.ReactNode;
  }) => (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={`flex size-36 cursor-pointer flex-col items-center justify-center gap-1 rounded-md border-2 ${panelType === type ? "border-primary" : "border-primary/10"}`}
      onClick={() => {
        setType(panelType);
        setContent({});
        nextStep();
      }}
    >
      {icon}
      {name}
    </motion.div>
  );

  const [backgrounds, setBackgrounds] = useState<PanelBackground[]>([]);

  useEffect(() => {
    getPanelBackgrounds().then(setBackgrounds);
  }, []);

  const submitPanel = async () => {
    let panelContent;

    switch (type) {
      case "image":
        panelContent = {
          url: "",
        };
        break;
      case "video":
        panelContent = {
          url: "",
        };
        break;
      case "text":
        panelContent = {
          content: content?.content,
          background: content?.background,
        };
        break;
    }

    await addPanel({
      type: type!,
      showFrom: showFrom!,
      showTill: showTill!,
      content: panelContent!,
    });
  };

  const steps = [
    <>
      <h1 className="nunito text-2xl font-bold">Zvolte typ panelu</h1>
      <div className="flex gap-5">
        <PanelTypeButton
          type="image"
          name="Obrázek"
          icon={<Image className="size-24" />}
        />
        <PanelTypeButton
          type="video"
          name="Video"
          icon={<Clapperboard className="size-24" />}
        />
        <PanelTypeButton
          type="text"
          name="Text"
          icon={<LetterText className="size-24" />}
        />
      </div>
    </>,
    <>
      <h1 className="nunito text-2xl font-bold">Zvolte datum</h1>
      <DateRangePicker
        initialDateFrom={showFrom}
        initialDateTo={showTill}
        showCompare={false}
        inline={true}
        align="center"
        fromDate={new Date()}
        onUpdate={(range) => {
          setShowFrom(range.range.from);
          setShowTill(range.range.to);
        }}
      />
      {showFrom && showTill && <Button onClick={nextStep}>Další</Button>}
    </>,
    <>
      <h1 className="nunito bold text-2xl">Zvolte obsah panelu</h1>
      {type === "image" && <div>Not implemented</div>}
      {type === "video" && <div>Not implemented</div>}
      {type === "text" && (
        <>
          <Textarea
            className="h-24 w-96 resize-none"
            onChange={(e) =>
              setContent((oldContent) => ({
                ...oldContent,
                content: e.target.value,
              }))
            }
          />
          <div className="grid grid-cols-3 gap-5 overflow-y-hidden">
            {backgrounds.map((background) => (
              <div
                key={background.id}
                className={`size-16 cursor-pointer overflow-hidden rounded-md border-4 bg-secondary ${content?.background === background.id ? "border-primary" : "border-primary/10"}`}
                onClick={() => {
                  setContent((oldContent) => ({
                    ...oldContent,
                    background: background.id,
                  }));
                }}
              >
                <img
                  src={background.url}
                  className="h-full w-full object-cover"
                />
              </div>
            ))}
          </div>
        </>
      )}
      {type === "text" &&
        content &&
        content.background &&
        content.content &&
        content.content.length > 0 && <Button onClick={nextStep}>Další</Button>}
    </>,
    <>
      <h1 className="nunito bold text-2xl">Rekapitulace</h1>
      <div className="aspect-video h-96 rounded-md bg-secondary">
        {type === "image" && (
          <img src="" className="h-full w-full object-cover" />
        )}
        {type === "video" && (
          <video src="" className="h-full w-full object-cover" />
        )}
        {type === "text" && (
          <div
            className={`flex h-full w-full flex-col items-center justify-center bg-secondary`}
            style={{
              backgroundImage: `url(${
                backgrounds.find(
                  (background) => background.id === content?.background,
                )?.url
              })`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              color: backgrounds.find(
                (background) => background.id === content?.background,
              )?.textColor,
            }}
          >
            {content?.content}
          </div>
        )}
      </div>
      <div className="flex items-center justify-center gap-5">
        <DateInput value={showFrom} readOnly={true} />
        -
        <DateInput value={showTill} readOnly={true} />
      </div>
      <Button onClick={submitPanel}>Odeslat</Button>
    </>,
  ];

  const animationStates: Variants = {
    seen: { opacity: 0, pointerEvents: "none", translateY: "-200px" },
    current: { opacity: 1, pointerEvents: "auto", translateY: 0 },
    unseen: { opacity: 0, pointerEvents: "none", translateY: "200px" },
  };

  return (
    <div className="relative grid min-h-full w-full grid-rows-[auto_1fr] gap-5 p-10">
      <div className="grid grid-cols-[auto,1fr,auto] items-center gap-5">
        <Button variant="ghost" disabled={step === 0} onClick={prevStep}>
          <ArrowLeft />
        </Button>
        <Progress value={(step / (steps.length - 1)) * 100} />
        <Button variant="ghost" disabled={step === maxStep} onClick={nextStep}>
          <ArrowRight />
        </Button>
      </div>
      <div className="relative flex h-full w-full flex-col items-center justify-center">
        {steps.map((stepContent, index) => (
          <motion.div
            key={index}
            animate={
              index === step ? "current" : index < step ? "seen" : "unseen"
            }
            transition={{ duration: 0.3 }}
            variants={animationStates}
            className="absolute flex flex-col items-center gap-5 opacity-0"
          >
            {stepContent}
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default AddPanelPage;
