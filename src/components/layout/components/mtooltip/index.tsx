import { ReactNode } from "react";
import { OverlayTrigger, Tooltip } from "react-bootstrap";

type MTooltipT = { id: any, children: ReactNode, title: string, className?: string };

const MToolTip = ({ id, children, title, className }: MTooltipT) => (
    <OverlayTrigger overlay={<Tooltip id={id}>{title}</Tooltip>}>
        <a href="#" className={className}>{children}</a>
    </OverlayTrigger>
);

export default MToolTip;