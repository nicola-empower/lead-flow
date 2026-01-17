import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

// Define the path to the JSON storage file
const DATA_FILE_PATH = path.join(process.cwd(), 'data', 'flow-storage.json');

// Ensure data directory exists
async function ensureDataDir() {
    try {
        await fs.access(path.dirname(DATA_FILE_PATH));
    } catch {
        await fs.mkdir(path.dirname(DATA_FILE_PATH), { recursive: true });
    }
}

export async function GET() {
    await ensureDataDir();

    try {
        const fileContent = await fs.readFile(DATA_FILE_PATH, 'utf-8');
        const data = JSON.parse(fileContent);
        return NextResponse.json(data);
    } catch (error) {
        // If file doesn't exist or is empty, return default empty state
        return NextResponse.json({ nodes: [], edges: [] });
    }
}

export async function POST(request: Request) {
    await ensureDataDir();

    try {
        const data = await request.json();
        await fs.writeFile(DATA_FILE_PATH, JSON.stringify(data, null, 2), 'utf-8');
        return NextResponse.json({ success: true, message: 'Flow saved successfully' });
    } catch (error) {
        return NextResponse.json({ success: false, error: 'Failed to save flow' }, { status: 500 });
    }
}
