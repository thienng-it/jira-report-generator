import React from "react";
import CopyWithToast from "../ui/copywithtoast";
import clsx from "clsx";
import DownloadWithToast from "./downloadWithToast.tsx";

interface ActionBarProps {
    text: string;
    className?: string;
    fileName: string;
    content: string;
}

const ActionBar: React.FC<ActionBarProps> = ({ text, className, fileName, content }) => {
    return (
        <div
            className={clsx(
                "flex gap-3 pt-6 mt-6 border-t border-white/20 dark:border-white/10",
                className
            )}
        >
            <div className="flex-1">
                <CopyWithToast text={text} />
            </div>

            <div className="flex-1">
                <DownloadWithToast filename={fileName} content={content}></DownloadWithToast>
            </div>
        </div>
    );
};

export default ActionBar;
