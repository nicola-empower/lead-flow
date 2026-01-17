"use client";

import { useCallback, useMemo, useEffect } from 'react';
import {
    ReactFlow,
    MiniMap,
    Controls,
    Background,
    useNodesState,
    useEdgesState,
    addEdge,
    Connection,
    Edge,
    BackgroundVariant,
    Node,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { useSimulation } from '@/hooks/useSimulation';

import { SourceNode } from './nodes/SourceNode';
import { ProcessNode } from './nodes/ProcessNode';
import { OutcomeNode } from './nodes/OutcomeNode';
import { AnimatedPipeEdge } from './edges/AnimatedPipeEdge';

// Unified Node Data Type
interface AppNodeData extends Record<string, unknown> {
    label: string;
    visitors?: number;
    cost?: number;
    type?: string;
    sourceType?: string;
    conversionRate?: number;
    revenue?: number;
}

type AppNode = Node<AppNodeData>;

const initialNodes: AppNode[] = [
    // Sources
    {
        id: 's1',
        type: 'source',
        position: { x: 0, y: 50 },
        data: { label: 'Facebook Ads', type: 'facebook', visitors: 12500, cost: 4500, sourceType: 'facebook' }
    },
    {
        id: 's2',
        type: 'source',
        position: { x: 0, y: 250 },
        data: { label: 'Google Search', type: 'organic', visitors: 8200, cost: 2100, sourceType: 'organic' }
    },
    {
        id: 's3',
        type: 'source',
        position: { x: 0, y: 450 },
        data: { label: 'LinkedIn Outreach', type: 'direct', visitors: 3400, cost: 5000, sourceType: 'direct' }
    },

    // Level 1: Entry Points
    {
        id: 'p1',
        type: 'process',
        position: { x: 400, y: 150 },
        data: { label: 'Webinar Landing Page', visitors: 15900, conversionRate: 28.5 }
    },
    {
        id: 'p2',
        type: 'process',
        position: { x: 400, y: 400 },
        data: { label: 'Case Study Download', visitors: 8200, conversionRate: 42.0 }
    },

    // Level 2: Nurture
    {
        id: 'p3',
        type: 'process',
        position: { x: 800, y: 50 },
        data: { label: 'Live Webinar Room', visitors: 4531, conversionRate: 15.0 }
    },
    {
        id: 'p4',
        type: 'process',
        position: { x: 800, y: 250 },
        data: { label: 'Replay Sequence', visitors: 2500, conversionRate: 5.2 }
    },
    {
        id: 'p5',
        type: 'process',
        position: { x: 800, y: 450 },
        data: { label: 'Email Nurture Series', visitors: 3444, conversionRate: 8.5 }
    },

    // Level 3: Outcomes
    {
        id: 'o1',
        type: 'outcome',
        position: { x: 1200, y: 100 },
        data: { label: 'High Ticket Deal', revenue: 125000 }
    },
    {
        id: 'o2',
        type: 'outcome',
        position: { x: 1200, y: 400 },
        data: { label: 'Self-Serve Product', revenue: 14500 }
    },
];

const initialEdges = [
    // Sources to Entry
    { id: 'e-s1-p1', source: 's1', target: 'p1', type: 'animated', animated: true, style: { stroke: '#6366F1', strokeWidth: 2 } },
    { id: 'e-s1-p2', source: 's1', target: 'p2', type: 'animated', animated: true, style: { stroke: '#6366F1', strokeWidth: 2 } },
    { id: 'e-s2-p1', source: 's2', target: 'p1', type: 'animated', animated: true, style: { stroke: '#6366F1', strokeWidth: 2 } },
    { id: 'e-s2-p2', source: 's2', target: 'p2', type: 'animated', animated: true, style: { stroke: '#6366F1', strokeWidth: 2 } },
    { id: 'e-s3-p2', source: 's3', target: 'p2', type: 'animated', animated: true, style: { stroke: '#6366F1', strokeWidth: 2 } },

    // Entry to Nurture
    { id: 'e-p1-p3', source: 'p1', target: 'p3', type: 'animated', animated: true, style: { stroke: '#10B981', strokeWidth: 2 } },
    { id: 'e-p1-p4', source: 'p1', target: 'p4', type: 'animated', animated: true, style: { stroke: '#94a3b8', strokeWidth: 2 } },
    { id: 'e-p2-p5', source: 'p2', target: 'p5', type: 'animated', animated: true, style: { stroke: '#94a3b8', strokeWidth: 2 } },

    // Nurture to Outcome
    { id: 'e-p3-o1', source: 'p3', target: 'o1', type: 'animated', animated: true, style: { stroke: '#10B981', strokeWidth: 3 } },
    { id: 'e-p4-o1', source: 'p4', target: 'o1', type: 'animated', animated: true, style: { stroke: '#10B981', strokeWidth: 1 } },
    { id: 'e-p5-o1', source: 'p5', target: 'o1', type: 'animated', animated: true, style: { stroke: '#10B981', strokeWidth: 1 } },
    { id: 'e-p5-o2', source: 'p5', target: 'o2', type: 'animated', animated: true, style: { stroke: '#10B981', strokeWidth: 2 } },
];

const BASE_STATS = {
    s1: { visitors: 12500, cost: 4500 },
    s2: { visitors: 8200, cost: 2100 },
    s3: { visitors: 3400, cost: 5000 },
};

export function FlowCanvas() {
    const [nodes, setNodes, onNodesChange] = useNodesState<AppNode>(initialNodes);
    const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
    const { adSpendMultiplier } = useSimulation();

    useEffect(() => {
        setNodes((nds) => {
            const s1v = Math.floor(BASE_STATS.s1.visitors * adSpendMultiplier);
            const s2v = Math.floor(BASE_STATS.s2.visitors * adSpendMultiplier);
            const s3v = Math.floor(BASE_STATS.s3.visitors * adSpendMultiplier);

            const s1c = Math.floor(BASE_STATS.s1.cost * adSpendMultiplier);
            const s2c = Math.floor(BASE_STATS.s2.cost * adSpendMultiplier);
            const s3c = Math.floor(BASE_STATS.s3.cost * adSpendMultiplier);

            const p1v = Math.floor((s1v * 0.70) + (s2v * 0.40));
            const p2v = Math.floor((s1v * 0.30) + (s2v * 0.60) + s3v);

            const p3v = Math.floor(p1v * 0.285);
            const p4v = Math.floor(p1v * 0.150);
            const p5v = Math.floor(p2v * 0.420);

            const o1_deals = Math.floor((p3v * 0.15) + (p4v * 0.052) + (p5v * 0.02));
            const o1_rev = o1_deals * 5000;
            const o2_deals = Math.floor(p5v * 0.085);
            const o2_rev = o2_deals * 297;

            return nds.map((node) => {
                const newData: AppNodeData = { ...node.data, label: node.data.label as string };
                switch (node.id) {
                    case 's1': newData.visitors = s1v; newData.cost = s1c; break;
                    case 's2': newData.visitors = s2v; newData.cost = s2c; break;
                    case 's3': newData.visitors = s3v; newData.cost = s3c; break;
                    case 'p1': newData.visitors = p1v; break;
                    case 'p2': newData.visitors = p2v; break;
                    case 'p3': newData.visitors = p3v; break;
                    case 'p4': newData.visitors = p4v; break;
                    case 'p5': newData.visitors = p5v; break;
                    case 'o1': newData.revenue = o1_rev; break;
                    case 'o2': newData.revenue = o2_rev; break;
                }
                return { ...node, data: newData };
            });
        });
    }, [adSpendMultiplier, setNodes]);

    const nodeTypes = useMemo(() => ({
        source: SourceNode,
        process: ProcessNode,
        outcome: OutcomeNode,
    }), []);

    const edgeTypes = useMemo(() => ({
        animated: AnimatedPipeEdge,
    }), []);

    const onConnect = useCallback(
        (params: Connection) => setEdges((eds) => addEdge({ ...params, type: 'animated', animated: true }, eds)),
        [setEdges],
    );

    return (
        <div className="w-full h-full bg-slate-950/50">
            <ReactFlow
                nodes={nodes}
                edges={edges}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                onConnect={onConnect}
                nodeTypes={nodeTypes}
                edgeTypes={edgeTypes}
                fitView
                colorMode="dark"
                proOptions={{ hideAttribution: true }}
            >
                <Controls className="bg-slate-800 border-slate-700 fill-white" />
                <MiniMap className="bg-slate-800 border-slate-700" nodeColor="#6366F1" maskColor="rgba(0, 0, 0, 0.4)" />
                <Background variant={BackgroundVariant.Dots} gap={24} size={1} color="#334155" />
            </ReactFlow>
        </div>
    );
}
