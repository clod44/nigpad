import { useEffect, useState } from "react";
import { Card, CardHeader, CardBody, Divider, Skeleton } from "@nextui-org/react";

export default function NoteCardSkeleton({
    opacity = 1.0,
    ...props
}) {
    const [skeletonLines, setSkeletonLines] = useState([]);

    useEffect(() => {
        // Pre-calculate the random widths
        const linesCount = Math.ceil(Math.random() * 5) + 3; // Random length between 3 and 8
        const lines = Array.from({ length: linesCount }).map(() => {
            const randomWidth = Math.random() * (1 - 0.4) + 0.4; // Random width between 40% and 100%
            return `${(randomWidth * 100).toFixed(0)}%`; // Store width as percentage string
        });
        setSkeletonLines(lines);
    }, []); // Run once on mount

    return (
        <Card className="bg-default-50 border border-default shadow-md duration-300 hover:border-primary" style={{ opacity: opacity }}>
            <CardHeader className="h-16">
                <Skeleton className="w-3/5 h-4 rounded-lg">
                    <div className="h-full w-full rounded-lg bg-default-300"></div>
                </Skeleton>
            </CardHeader>
            <Divider />
            <CardBody className="min-h-32 max-h-60 relative overflow-hidden pb-0">
                <div className="w-full h-full space-y-3 pt-4">
                    {skeletonLines.map((widthPercentage, index) => (
                        <Skeleton key={index} className={`h-4 rounded-lg`} style={{ width: widthPercentage }}>
                            <div className="h-full w-full rounded-lg bg-default-300"></div>
                        </Skeleton>
                    ))}
                </div>
                <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-b from-transparent to-default-50 pointer-events-none"></div>
            </CardBody>
        </Card>
    );
};
