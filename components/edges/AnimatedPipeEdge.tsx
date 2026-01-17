"use client";

import { BaseEdge, EdgeProps, getBezierPath } from '@xyflow/react';
import { motion } from 'framer-motion';

export function AnimatedPipeEdge({
    id,
    sourceX,
    sourceY,
    targetX,
    targetY,
    sourcePosition,
    targetPosition,
    style = {},
    markerEnd,
    data,
}: EdgeProps) {
    const [edgePath] = getBezierPath({
        sourceX,
        sourceY,
        sourcePosition,
        targetX,
        targetY,
        targetPosition,
    });

    const throughput = (data?.throughput as number) || 0;
    const baseThroughput = (data?.baseThroughput as number) || 0; // The "Actual" or "Before" value
    const isGolden = (data?.isGolden as boolean) || false;

    // Animation Speed (Simulated) - ACCESSIBILITY: SLOWED DOWN
    // Duration in seconds: Higher = Slower
    // Base 10s, getting faster (down to 2s) with massive throughput
    const speed = Math.max(2, 10 - (throughput / 2000));

    // Particle Count (Simulated)
    const particleCount = Math.min(10, Math.max(1, Math.floor(throughput / 200)));

    // Actuals (Ghost) Params
    // Speed for actuals - matched scale
    const actualSpeed = Math.max(2, 10 - (baseThroughput / 2000));
    const actualParticleCount = Math.min(10, Math.max(1, Math.floor(baseThroughput / 200)));

    return (
        <>
            <BaseEdge path={edgePath} markerEnd={markerEnd} style={{ ...style, stroke: isGolden ? '#F59E0B' : '#334155', strokeWidth: isGolden ? 3 : 2, opacity: 0.5 }} />
            <svg style={{ position: 'absolute', width: 0, height: 0 }}>
                <defs>
                    <filter id="glow-gold">
                        <feGaussianBlur stdDeviation="2.5" result="coloredBlur" />
                        <feMerge>
                            <feMergeNode in="coloredBlur" />
                            <feMergeNode in="SourceGraphic" />
                        </feMerge>
                    </filter>
                </defs>
            </svg>

            {/* Simulated Flow (Bright) */}
            {throughput > 0 && Array.from({ length: particleCount }).map((_, i) => (
                <circle
                    key={`sim-${i}`}
                    r={isGolden ? "5" : "3"}
                    fill={isGolden ? "#F59E0B" : (i % 2 === 0 ? "#818CF8" : "#34D399")}
                    filter={isGolden ? "url(#glow-gold)" : ""}
                >
                    <animateMotion
                        dur={`${speed}s`}
                        repeatCount="indefinite"
                        path={edgePath}
                        begin={`${-i * (speed / particleCount)}s`}
                    />
                </circle>
            ))}

            {/* Actuals Comparison (Dim/Ghost) */}
            {/* distinct visual for actuals - white/ghost */}
            {baseThroughput > 0 && Array.from({ length: actualParticleCount }).map((_, i) => (
                <circle key={`act-${i}`} r="3" fill="#ffffff" opacity="0.4">
                    <animateMotion
                        dur={`${actualSpeed}s`}
                        repeatCount="indefinite"
                        path={edgePath}
                        begin={`${-i * (actualSpeed / actualParticleCount) - 0.7}s`} // Slightly different phase offset
                    />
                </circle>
            ))}
        </>
    );
}
