import { Panel } from "shared/types";

interface PanelStatusProps {
  panel: Panel;
}

const PanelStatus = ({ panel }: PanelStatusProps) => {
  let status;

  const couldBeVisible =
    panel.isApproved && !panel.isDeprecated && !panel.isHidden;

  if (
    couldBeVisible &&
    panel.showFrom >= new Date() &&
    panel.showTill <= new Date()
  )
    status = "Viditelné";
  else if (couldBeVisible && panel.showFrom <= new Date())
    status = "Čeká na zobrazení";
  else if (couldBeVisible && panel.showTill >= new Date())
    status = "Archivováno";
  else if (panel.isDeprecated) status = "Nahrazeno novou verzí";
  else if (panel.isHidden) status = "Skryto";
  else if (!panel.isApproved) status = "Čeká na schválení";
  else status = "Neznámý stav";

  return <>{status}</>;
};

export default PanelStatus;
