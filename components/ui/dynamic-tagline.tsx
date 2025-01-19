"use client";

import { useEffect, useRef } from "react";
import Typed from "typed.js";

type TProps = {
    taglines: string[];
    className?: string;
};

export default function DynamicTagline({ taglines, className }: TProps) {
    const taglineRef = useRef<HTMLSpanElement>(null);

    useEffect(() => {
        if (taglineRef.current) {
            const typed = new Typed(taglineRef.current, {
                strings: taglines,
                typeSpeed: 10,
                backSpeed: 10,
                loop: true,
            });

            return () => {
                typed.destroy();
            };
        }
    }, [taglines]);

    return (
        <div className={className}>
            <span ref={taglineRef} />
        </div>
    );
} 