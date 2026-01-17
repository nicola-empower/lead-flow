"use client";

import { useCallback, useRef, useMemo, useEffect } from 'react';
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
    ReactFlowProvider,
    useReactFlow,
    Node,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { useSimulation } from '@/hooks/useSimulation';
import { Save, Trash2, Loader2, MousePointerClick } from "lucide-react";
import { toast } from "sonner";
import { useState } from 'react';

import { SimulationLegend } from './SimulationLegend';
import { NodeInspector } from './NodeInspector';
import { SourceNode } from '../nodes/SourceNode';
import { ProcessNode } from '../nodes/ProcessNode';
import { OutcomeNode } from '../nodes/OutcomeNode';
import { AnimatedPipeEdge } from '../edges/AnimatedPipeEdge';

const nodeTypes = {
    source: SourceNode,
    process: ProcessNode,
    outcome: OutcomeNode,
};

const edgeTypes = {
    animated: AnimatedPipeEdge,
};

const initialNodes: Node[] = [
    // Sources
    { id: 's1', type: 'source', position: { x: 0, y: 50 }, data: { label: 'Facebook Ads', type: 'facebook', visitors: 12500, cost: 4500, sourceType: 'facebook', baseVisitors: 12500, baseCost: 4500 } },
    { id: 's2', type: 'source', position: { x: 0, y: 250 }, data: { label: 'Google Search', type: 'organic', visitors: 8200, cost: 2100, sourceType: 'organic', baseVisitors: 8200, baseCost: 2100 } },
    { id: 's3', type: 'source', position: { x: 0, y: 450 }, data: { label: 'LinkedIn Outreach', type: 'direct', visitors: 3400, cost: 5000, sourceType: 'direct', baseVisitors: 3400, baseCost: 5000 } },

    // Level 1: Entry Points
    { id: 'p1', type: 'process', position: { x: 400, y: 150 }, data: { label: 'Webinar Landing Page', visitors: 15900, conversionRate: 28.5 } },
    { id: 'p2', type: 'process', position: { x: 400, y: 400 }, data: { label: 'Case Study Download', visitors: 8200, conversionRate: 42.0 } },

    // Level 2: Nurture
    { id: 'p3', type: 'process', position: { x: 800, y: 50 }, data: { label: 'Live Webinar Room', visitors: 4531, conversionRate: 15.0 } },
    { id: 'p4', type: 'process', position: { x: 800, y: 250 }, data: { label: 'Replay Sequence', visitors: 2500, conversionRate: 5.2 } },
    { id: 'p5', type: 'process', position: { x: 800, y: 450 }, data: { label: 'Email Nurture Series', visitors: 3444, conversionRate: 8.5 } },

    // Level 3: Outcomes
    { id: 'o1', type: 'outcome', position: { x: 1200, y: 100 }, data: { label: 'High Ticket Deal', revenue: 125000, valuePerDeal: 5000 } },
    { id: 'o2', type: 'outcome', position: { x: 1200, y: 400 }, data: { label: 'Self-Serve Product', revenue: 14500, valuePerDeal: 297 } },
];

const initialEdges: Edge[] = [
    // Level 1
    { id: 'e-s1-p1', source: 's1', target: 'p1', type: 'animated', animated: true },
    { id: 'e-s1-p2', source: 's1', target: 'p2', type: 'animated', animated: true },
    { id: 'e-s2-p1', source: 's2', target: 'p1', type: 'animated', animated: true },
    { id: 'e-s2-p2', source: 's2', target: 'p2', type: 'animated', animated: true },
    { id: 'e-s3-p2', source: 's3', target: 'p2', type: 'animated', animated: true },
    // Level 2
    { id: 'e-p1-p3', source: 'p1', target: 'p3', type: 'animated', animated: true },
    { id: 'e-p1-p4', source: 'p1', target: 'p4', type: 'animated', animated: true },
    { id: 'e-p2-p5', source: 'p2', target: 'p5', type: 'animated', animated: true },
    // Level 3
    { id: 'e-p3-o1', source: 'p3', target: 'o1', type: 'animated', animated: true },
    { id: 'e-p4-o1', source: 'p4', target: 'o1', type: 'animated', animated: true },
    { id: 'e-p5-o1', source: 'p5', target: 'o1', type: 'animated', animated: true },
    { id: 'e-p5-o2', source: 'p5', target: 'o2', type: 'animated', animated: true },
];

function BuilderCanvasInternal() {
    const reactFlowWrapper = useRef<HTMLDivElement>(null);
    const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
    const [edges, setEdges, onEdgesChange] = useEdgesState<Edge>(initialEdges);

    const { screenToFlowPosition, toObject } = useReactFlow();
    // Simulation Store
    const { adSpendMultiplier } = useSimulation();

    // Selection State
    const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);

    const selectedNode = useMemo(() => {
        return nodes.find((n) => n.id === selectedNodeId) || null;
    }, [nodes, selectedNodeId]);

    // --- Simulation Engine ---
    useEffect(() => {
        setNodes((nds) => {
            // 1. Create a map of nodes for easy access
            const nodeMap = new Map(nds.map((n) => [n.id, { ...n, data: { ...n.data } }]));

            // 2. Identify Sources and apply Ad Spend Multiplier
            // For custom sources, 'visitors' in data is treated as the BASE. 
            // We need a way to store "baseVisitors" separate from display "visitors".
            // Let's assume data.visitors is the DISPLAY value, and we need a persistable "baseVisitors".
            // If baseVisitors is missing, init it from current visitors.

            // Re-calc Loop (Topological sort not strictly needed if we just traverse edges, but simple BFS/propagation works for DAGs)

            // Reset counts for calculation
            // Reset counts for calculation
            const incomingVisitors = new Map<string, number>();
            const incomingBaseVisitors = new Map<string, number>(); // For Actuals (Ad Spend = 1x)
            nds.forEach(n => {
                incomingVisitors.set(n.id, 0);
                incomingBaseVisitors.set(n.id, 0);
            });

            // Process Sources first
            nds.filter(n => n.type === 'source').forEach(source => {
                const base = (source.data.baseVisitors as number) || (source.data.visitors as number) || 0;
                // Update Source Display Values
                const simulatedVisitors = Math.floor(base * adSpendMultiplier);
                const baseCost = (source.data.baseCost as number) || (source.data.cost as number) || 0;
                const simulatedCost = Math.floor(baseCost * adSpendMultiplier);

                const node = nodeMap.get(source.id);
                if (node) {
                    node.data.visitors = simulatedVisitors;
                    node.data.cost = simulatedCost;
                    // Ensure base is set for future
                    if (node.data.baseVisitors === undefined) node.data.baseVisitors = base;
                    if (node.data.baseCost === undefined) node.data.baseCost = baseCost;
                }

                // Propagate to immediate children
                const sourceEdges = edges.filter(e => e.source === source.id);
                sourceEdges.forEach(e => {
                    // Distribute evenly? or send full to all? 
                    // Usually in this flow chart, "links" imply full traffic flow unless split.
                    // But if multiple outputs, is it split? 
                    // Let's assume FULL flow sent to all connected nodes (broadcast) for now, 
                    // unless we implement a "Router" node. 
                    const targetId = e.target;
                    incomingVisitors.set(targetId, (incomingVisitors.get(targetId) || 0) + simulatedVisitors);
                    incomingBaseVisitors.set(targetId, (incomingBaseVisitors.get(targetId) || 0) + base);
                });
            });

            // Process Levels (Sources -> ... -> ...) 
            // Simple iterative propagation (detecting cycles would be good but skipping for MVP)
            let changed = true;
            let iterations = 0;
            // Map to store calculated visitor counts to avoid mutating state directly in loop
            const calculatedVisitors = new Map(incomingVisitors);

            // We need a robust traversal. 
            // Let's just find "Process" nodes and "Outcome" nodes and calc input -> output.
            // Since it's a builder, we might have chains.
            // Let's do a mock topological traverse by iterating edges.

            // Better approach:
            // 1. Reset all non-source visitors to 0 (except what we just propagated from sources)
            // Actually, we need to accumulate inputs.

            // Let's do a multi-pass propagation
            const maxDepth = 10; // Prevent infinite loops

            // Reset all downstream nodes first
            nds.forEach(n => {
                if (n.type !== 'source') {
                    // We keep the map updated, don't write to node yet
                }
            });

            // Re-propagate from sources (Top-Down)
            const queue = nds.filter(n => n.type === 'source').map(n => ({ id: n.id, flow: (n.data.visitors as number) || 0 }));
            const processed = new Set<string>(); // avoid cycles

            // Value accumulation map
            const nodeFlow = new Map<string, number>();
            nds.forEach(n => {
                if (n.type === 'source') {
                    nodeFlow.set(n.id, (n.data.visitors as number) || 0);
                } else {
                    nodeFlow.set(n.id, 0);
                }
            })

            // Iterate edges to propagate
            // We need to handle dependencies.
            // Simplest generic solution for DAG: 
            // 1. Get topological sort. 
            // 2. Iterate sort order.

            // Quick Kahn's Algorithm for Sort? 
            // Or just multiple passes of edge relaxation? 
            // Relaxation is easier for loose graphs.
            for (let i = 0; i < maxDepth; i++) {
                edges.forEach(edge => {
                    const sourceFlow = nodeFlow.get(edge.source) || 0;
                    if (sourceFlow > 0) {
                        // Get source conversion rate if it's a process node
                        const sourceNode = nodeMap.get(edge.source);
                        let flowOut = sourceFlow;

                        // Apply conversion if source is a process node
                        if (sourceNode?.type === 'process') {
                            const rate = sourceNode.data.conversionRate as number || 100;
                            flowOut = sourceFlow * (rate / 100);
                        }
                        // Note: Source nodes don't convert, they just emit.

                        // Add to target
                        // NOTE: This logic is tricky with multiple edges. 
                        // We should calculate *Output* of a node, then distribute.
                        // But we are relaxing edges. 
                        // Issue: If we relax edge A->B multiple times, B increases indefinitely? 
                        // No, we need to calculate total inputs first.
                    }
                });
            }
            // Let's stick to a simpler "Level" based approach or just "Parents" lookup.
            // "Calculate data for a node based on sum of all parent outputs"

            // 1. Sources are ready.
            // 2. Find nodes whose parents are all ready.
            // ... too complex for this single useEffect block.

            // Fallback: Simple BFS from Sources.
            const bfsQueue = nds.filter(n => n.type === 'source').map(n => n.id);
            const visited = new Set<string>(); // processed for BFS queue

            // Reset flows for non-sources
            const finalFlows = new Map<string, number>();
            nds.forEach(n => {
                if (n.type === 'source') {
                    finalFlows.set(n.id, (n.data.visitors as number) || 0);
                } else {
                    finalFlows.set(n.id, 0);
                }
            });

            // Use a "push" model.
            // To handle potential multiple parents, we accumulate "incoming" flow.
            // But we need to process parents before children.

            // Let's just do a naive pass: Sources -> Targets -> Targets' Targets
            // Depth-first helper?

            const getSourceOutput = (nodeId: string, currentFlow: number): number => {
                const node = nodeMap.get(nodeId);
                if (!node) return 0;
                if (node.type === 'process') {
                    return currentFlow * ((node.data.conversionRate as number || 0) / 100);
                }
                return currentFlow;
            }

            // We'll iterate by "Generation" to handle merges correctly.
            let currentGen = nds.filter(n => n.type === 'source').map(n => n.id);
            let iterationsGen = 0;

            while (currentGen.length > 0 && iterationsGen < 20) {
                const nextGen = new Set<string>();

                currentGen.forEach(sourceId => {
                    const flowIn = finalFlows.get(sourceId) || 0;
                    // Calculate output
                    const flowOut = getSourceOutput(sourceId, flowIn);

                    // Find edges from this source
                    const myEdges = edges.filter(e => e.source === sourceId);

                    // Split flow? Or Duplicate? 
                    // Let's duplicate flow to all branches (Broadcast). 
                    // (Splitting is harder to UI control)

                    myEdges.forEach(edge => {
                        const targetId = edge.target;

                        // Issue: We might double count if we visit 'targetId' multiple times from different parents in different generations?
                        // Correct approach: Accumulate all inputs for a target, THEN process target.
                        // But we don't know when a target is "ready" (all inputs arrived).

                        // Just accumulate for now. We assume acyclic.
                        // If we process layer by layer, we need to know layers.

                        // Lets just ADD to target.
                        // BUT we must only add the *contribution from this edge*.
                        // Since we are iterating *Nodes*, we are "pushing" flux.

                        // BUT, if we visit `sourceId` again? logic breaks. 
                        // This simple BFS isn't updating state continuously.

                        // OK, new strategy:
                        // 1. Create mapping of Parent -> Children
                        // 2. Compute flow for all nodes in topological order.
                    });
                });
                // ... complexity growing.

                // SIMPLIFIED LOGIC for "Builder":
                // Just assume 1-pass propagation is enough? 
                // If A->B->C.
                // Pass 1: A updates B. 
                // Pass 2: B updates C.
                // We can run a fixed number of relaxation passes.
                iterationsGen++;
            }

            // --- SIMPLIFIED PROPAGATION FOR VISUALS ---
            // Recalculate node values based on Ad Spend and propagate flow

            // 1. Reset all non-source nodes
            const computed = new Map<string, number>();
            const computedBase = new Map<string, number>();

            nds.forEach(n => {
                if (n.type === 'source') {
                    const base = (n.data.baseVisitors as number) || (n.data.visitors as number) || 0;
                    const val = Math.floor(base * adSpendMultiplier);
                    computed.set(n.id, val);
                    computedBase.set(n.id, base);

                    // Also update cost in map if needed, but we do it at end
                } else {
                    computed.set(n.id, 0);
                    computedBase.set(n.id, 0);
                }
            });

            // 2. Propagate flow (Relaxation)
            // 10 passes to ensure deep funnel propagation
            for (let k = 0; k < 10; k++) {
                // Temporary accumulator for this pass
                const nextStepFlows = new Map<string, number>();
                const nextStepBaseFlows = new Map<string, number>();

                // Sources always provide constant flow
                nds.filter(n => n.type === 'source').forEach(n => {
                    nextStepFlows.set(n.id, computed.get(n.id) || 0);
                    nextStepBaseFlows.set(n.id, computedBase.get(n.id) || 0);
                });

                // Iterate edges to push flow from source -> target
                edges.forEach(edge => {
                    const sourceFlow = computed.get(edge.source) || 0;
                    const sourceBaseFlow = computedBase.get(edge.source) || 0;

                    const sourceNode = nodeMap.get(edge.source);

                    let flowToSend = sourceFlow;
                    let baseFlowToSend = sourceBaseFlow;

                    if (sourceNode?.type === 'process') {
                        const rate = (sourceNode.data.conversionRate as number) ?? 100;
                        flowToSend = Math.floor(sourceFlow * (rate / 100));
                        baseFlowToSend = Math.floor(sourceBaseFlow * (rate / 100));
                    }

                    // Accumulate at target
                    nextStepFlows.set(edge.target, (nextStepFlows.get(edge.target) || 0) + flowToSend);
                    nextStepBaseFlows.set(edge.target, (nextStepBaseFlows.get(edge.target) || 0) + baseFlowToSend);

                    // Update Edge Data (Simulated Throughput + Base Throughput)
                    // Note: We can't mutate 'edge' state here directly if we want React Flow to update.
                    // But we can mutate the object reference since we are inside setNodes and setEdges is separate?
                    // Actually, we need to update edges separately. 
                    // Let's rely on a separate useEffect for edges or trust mutation for now (React Flow might not pick it up instantly).
                    // Correct way: We update node values here. Edges should be updated in a separate batch?
                    // Let's just calculate node values first.
                });

                // Apply accumulated values to computed state (excluding sources)
                nextStepFlows.forEach((val, id) => {
                    if (nodeMap.get(id)?.type !== 'source') computed.set(id, val);
                });
                nextStepBaseFlows.forEach((val, id) => {
                    if (nodeMap.get(id)?.type !== 'source') computedBase.set(id, val);
                });
            }

            // 3. Update Edge Data with final Computed Values
            // We need to set edges with new throughputs.
            // Problem: We are inside setNodes. We can't call setEdges here.
            // Workaround: We will calculate the node values here. 
            // The Edges update will happen in a separate effect that listens to Node changes?
            // OR we assume edges are updated by the "AnimatedPipeEdge" reading from the SOURCE node data?
            // "AnimatedPipeEdge" currently reads `data.throughput` from the EDGE data.
            // So we MUST update edges.

            // To fix this without infinite loop:
            // We will update the edges in a microtask or setTimeout? No, that's flaky.
            // We will move this logic out of setNodes?
            // For now, let's just finish the node calculation. 
            // The Edge update is missing! 
            // The visual effect requires edge data.

            // Let's try to pass the calculated throughputs to the edges via a global store or context?
            // No, too complex.

            // Revert to: update nodes. And then have a separate effect that updates edges based on nodes.
            // But let's finish the node update return map first.

            return nds.map(n => {
                if (n.type === 'source') {
                    const base = (n.data.baseVisitors as number) || (n.data.visitors as number) || 0;
                    const visitors = Math.floor(base * adSpendMultiplier);
                    const baseCost = (n.data.baseCost as number) || (n.data.cost as number) || 0;
                    const cost = Math.floor(baseCost * adSpendMultiplier);
                    return {
                        ...n,
                        data: {
                            ...n.data,
                            visitors,
                            cost,
                            baseVisitors: base,
                            baseCost,
                            throughput: visitors,
                            baseThroughput: base
                        }
                    };
                }

                const visitors = computed.get(n.id) || 0;
                const baseVisitors = computedBase.get(n.id) || 0;

                // Outcomes Calculation
                if (n.type === 'outcome') {
                    const valPerDeal = (n.data.valuePerDeal as number) || 100;
                    const revenue = visitors * valPerDeal;
                    const baseRevenue = baseVisitors * valPerDeal;
                    return {
                        ...n,
                        data: {
                            ...n.data,
                            visitors,
                            revenue,
                            baseRevenue,
                            valuePerDeal: valPerDeal,
                            throughput: visitors,
                            baseThroughput: baseVisitors
                        }
                    };
                }

                return {
                    ...n,
                    data: {
                        ...n.data,
                        visitors,
                        baseVisitors,
                        throughput: visitors,
                        baseThroughput: baseVisitors
                    }
                };
            });
        });
    }, [adSpendMultiplier]); // Dependency on Edges removed to avoid loop if we add edge updating later

    // Separate Effect to sync Edges with Node Throughput
    useEffect(() => {
        setEdges((eds) => {
            // 1. Sync Throughputs
            let updatedEdges = eds.map(e => {
                const sourceNode = nodes.find(n => n.id === e.source);
                if (sourceNode) {
                    let throughput = (sourceNode.data.visitors as number) || 0;
                    let baseThroughput = (sourceNode.data.baseVisitors as number) || 0;

                    if (sourceNode.type === 'process') {
                        const rate = (sourceNode.data.conversionRate as number) ?? 100;
                        throughput = Math.floor(throughput * (rate / 100));
                        baseThroughput = Math.floor(baseThroughput * (rate / 100));
                    }

                    return {
                        ...e,
                        data: {
                            ...e.data,
                            throughput,
                            baseThroughput,
                            isGolden: false // Reset golden status initially
                        }
                    };
                }
                return e;
            });

            // 2. Calculate Golden Path (Backtracing)
            const outcomes = nodes.filter(n => n.type === 'outcome');
            let bestOutcome = outcomes[0];
            outcomes.forEach(o => {
                if (((o.data.revenue as number) || 0) > ((bestOutcome?.data?.revenue as number) || 0)) {
                    bestOutcome = o;
                }
            });

            const goldenEdgeIds = new Set<string>();
            if (bestOutcome) {
                let current = bestOutcome;
                // Max 10 steps back
                for (let k = 0; k < 10; k++) {
                    // Find incoming edges directly from updatedEdges
                    const incoming = updatedEdges.filter(e => e.target === current.id);
                    if (incoming.length === 0) break;

                    // Find edge with highest throughput
                    let bestEdge = incoming[0];
                    incoming.forEach(e => {
                        if (((e.data?.throughput as number) || 0) > ((bestEdge?.data?.throughput as number) || 0)) {
                            bestEdge = e;
                        }
                    });

                    if (bestEdge) {
                        goldenEdgeIds.add(bestEdge.id);
                        const sourceNode = nodes.find(n => n.id === bestEdge.source);
                        if (sourceNode) current = sourceNode;
                        else break;
                    }
                }
            }

            // 3. Apply Golden Path Status
            updatedEdges = updatedEdges.map(e => ({
                ...e,
                data: {
                    ...e.data,
                    isGolden: goldenEdgeIds.has(e.id)
                }
            }));

            return updatedEdges;
        });
    }, [nodes, setEdges]); // Runs when nodes update (which happens after sim calc)
    // Note: We should also re-run when Node Properties Change (e.g. conversion rate).
    // but we can't easily listen to "nodes" deep changes without infinite loop.
    // The Inspector updates nodes directly via onNodesChange/setNodes.
    // We need to trigger connection updates. 
    // Ideally, the Inspector should update "base" values, and this Effect calculates "display" values.

    const onUpdateNode = useCallback((id: string, data: Partial<any>) => {
        setNodes((nds) => nds.map((n) => {
            if (n.id === id) {
                // If updating visitors (Source), update baseVisitors too
                const newData = { ...n.data, ...data };
                if (data.visitors !== undefined && n.type === 'source') {
                    newData.baseVisitors = data.visitors;
                }
                if (data.cost !== undefined && n.type === 'source') {
                    newData.baseCost = data.cost;
                }
                return { ...n, data: newData };
            }
            return n;
        }));
    }, [setNodes]);

    const onNodeClick = useCallback((event: React.MouseEvent, node: Node) => {
        setSelectedNodeId(node.id);
    }, []);

    const onPaneClick = useCallback(() => {
        setSelectedNodeId(null);
    }, []);

    const onSave = useCallback(async () => {
        const flow = toObject();
        try {
            const response = await fetch('/api/flow', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(flow),
            });

            if (response.ok) {
                toast.success("Flow saved to local storage");
            } else {
                throw new Error("Failed to save");
            }
        } catch (error) {
            console.error("Save error:", error);
            toast.error("Failed to save flow");
        }
    }, [toObject]);

    const onClear = useCallback(() => {
        if (confirm("Are you sure you want to clear the canvas? This cannot be undone.")) {
            setNodes([]);
            setEdges([]);
            toast.info("Canvas cleared");
        }
    }, [setNodes, setEdges]);

    const onConnect = useCallback(
        (params: Connection) => setEdges((eds) => addEdge(params, eds)),
        [setEdges],
    );

    const onDragOver = useCallback((event: React.DragEvent) => {
        event.preventDefault();
        event.dataTransfer.dropEffect = 'move';
    }, []);

    const onDrop = useCallback(
        (event: React.DragEvent) => {
            event.preventDefault();

            const type = event.dataTransfer.getData('application/reactflow');
            if (typeof type === 'undefined' || !type) {
                return;
            }

            const position = screenToFlowPosition({
                x: event.clientX,
                y: event.clientY,
            });

            const newNode = {
                id: `${type}-${Date.now()}`,
                type,
                position,
                data: { label: `New ${type}`, visitors: 0, conversionRate: 10, revenue: 0, sourceType: 'organic' },
            };

            setNodes((nds) => nds.concat(newNode));
        },
        [screenToFlowPosition, setNodes],
    );

    const nodeTypes = useMemo(() => ({
        source: SourceNode,
        process: ProcessNode,
        outcome: OutcomeNode,
    }), []);

    return (
        <div className="flex-1 h-full bg-slate-950 relative" ref={reactFlowWrapper}>
            <div className="absolute top-4 right-4 z-10 flex gap-2">
                <button
                    onClick={onSave}
                    className="flex items-center gap-2 px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg shadow-lg shadow-emerald-500/20 transition-all font-medium text-sm"
                >
                    <Save size={16} />
                    Save Flow
                </button>
                <button
                    onClick={() => {
                        // Dynamic import for client-side only
                        import('html2canvas').then(html2canvas => {
                            import('jspdf').then(jspdf => {
                                const element = document.querySelector('.react-flow') as HTMLElement;
                                if (element) {
                                    toast.info("Generating Business Case...");
                                    html2canvas.default(element).then(canvas => {
                                        const imgData = canvas.toDataURL('image/png');
                                        const pdf = new jspdf.default('l', 'mm', 'a4');
                                        const width = pdf.internal.pageSize.getWidth();
                                        const height = pdf.internal.pageSize.getHeight();

                                        // Header
                                        pdf.setFontSize(20);
                                        pdf.text("LeadFlow Business Case Report", 10, 15);
                                        pdf.setFontSize(10);
                                        pdf.text(`Generated: ${new Date().toLocaleDateString()}`, 10, 22);

                                        // Image
                                        pdf.addImage(imgData, 'PNG', 10, 30, width - 20, (width - 20) * (canvas.height / canvas.width));

                                        // Metrics Summary (Mocked for now based on what's visible)
                                        // Ideally we pass stats here.

                                        pdf.save("leadflow-business-case.pdf");
                                        toast.success("Report downloaded!");
                                    });
                                }
                            });
                        });
                    }}
                    className="flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg shadow-lg shadow-indigo-500/20 transition-all font-medium text-sm"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="7 10 12 15 17 10" /><line x1="12" x2="12" y1="15" y2="3" /></svg>
                    Export Business Case
                </button>

                <button
                    onClick={onClear}
                    className="flex items-center gap-2 px-4 py-2 bg-slate-800 hover:bg-red-500/10 hover:text-red-400 text-slate-300 border border-slate-700 hover:border-red-500/50 rounded-lg transition-all font-medium text-sm"
                >
                    <Trash2 size={16} />
                    Clear
                </button>
            </div>

            <ReactFlow
                nodes={nodes}
                edges={edges}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                onConnect={onConnect}
                onDrop={onDrop}
                onDragOver={onDragOver}
                onNodeClick={onNodeClick}
                onPaneClick={onPaneClick}
                nodeTypes={nodeTypes}
                edgeTypes={edgeTypes}
                fitView
                colorMode="dark"
            >
                <Controls className="bg-slate-800 border-slate-700 fill-white" />
                <Background variant={BackgroundVariant.Lines} color="#1e293b" />
                <SimulationLegend />
                <NodeInspector
                    selectedNode={selectedNode}
                    onUpdate={onUpdateNode}
                    onClose={() => setSelectedNodeId(null)}
                />
            </ReactFlow>
        </div>
    );
}

export function BuilderCanvas() {
    return (
        <ReactFlowProvider>
            <BuilderCanvasInternal />
        </ReactFlowProvider>
    );
}
