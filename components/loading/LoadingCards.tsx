import { SkeletonCard } from '#/ui/SkeletonCard'
import React, { useEffect, useState } from 'react'

const LoadingCards = ({ quantity = 1, speed = 1000 }: { quantity?: number, speed?: number }) => {
    const [reticences, setReticences] = useState<string>(".");

    useEffect(() => {
        const interval = setInterval(() => {
            setReticences((prevState) => prevState === "." ? ".." : prevState === ".." ? "..." : prevState === "..." ? "." : '..');
        }, speed);
        return () => clearInterval(interval);
    }, [])
    return (
        <div className="space-y-4">
            <h1 className="text-xl font-medium text-gray-400/80">Loading{reticences}</h1>

            <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
                {Array(quantity).fill(<SkeletonCard isLoading={true} />).map(((item, i) => item))}
            </div>
        </div>
    )
}

export default LoadingCards