"use client";

import { motion } from "framer-motion";

export default function Transition({
    children,
}: {
    children: React.ReactNode;
}) {
    console.log(`Rendered Transition ${window.location.href}`);
    return (
        <motion.div
            initial={{ /*opacity: 0,*/ background: "red" }}
            animate={{ /*opacity: 1,*/ background: "initial" }}
            exit={{ /*opacity: 0,*/ background: "red" }}
            transition={{ ease: "easeInOut", duration: 2 }}
            className="h-full w-full"
        >
            {children}
        </motion.div>
    );
}
