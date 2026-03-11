import fastify from 'fastify';
import cors from '@fastify/cors';
import fastifyStatic from '@fastify/static';
import { PrismaClient } from '@prisma/client';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const server = fastify({ logger: true });
const prisma = new PrismaClient();

server.register(cors, {
    origin: true
});

// Register static file serving for videos
const videosPath = path.join('C:', 'Users', 'krris', 'OneDrive', 'Desktop', 'ISL_MODEL-2', 'isl module 1', 'archive (7)', 'videos');

server.register(fastifyStatic, {
    root: videosPath,
    prefix: '/videos/',
});

server.get('/', async (request, reply) => {
    return { status: 'OK', message: 'ISL API is running' };
});

// API endpoint to serve videos by word/gloss
server.get('/api/signs/:word/video', async (request, reply) => {
    const { word } = request.params as { word: string };

    // Import the mapping dynamically
    const { getVideoId } = await import('./videoMapping');
    const videoId = getVideoId(word);

    if (!videoId) {
        reply.code(404).send({ error: `Video not found for word: ${word}` });
        return;
    }

    const videoFile = `${videoId}.mp4`;
    const videoPath = path.join(videosPath, videoFile);

    // Check if file exists
    if (!fs.existsSync(videoPath)) {
        reply.code(404).send({ error: `Video file not found: ${videoFile}` });
        return;
    }

    reply.type('video/mp4');
    return fs.createReadStream(videoPath);
});

// API endpoint to get sign metadata (used for validation)
server.get('/api/signs/:word', async (request, reply) => {
    const { word } = request.params as { word: string };

    // Import the mapping
    const { getVideoId } = await import('./videoMapping');
    const videoId = getVideoId(word);

    if (!videoId) {
        reply.code(404).send({ error: `Sign not found: ${word}` });
        return;
    }

    const videoFile = `${videoId}.mp4`;
    const videoPath = path.join(videosPath, videoFile);

    if (!fs.existsSync(videoPath)) {
        reply.code(404).send({ error: `Video file not found: ${videoFile}` });
        return;
    }

    reply.send({
        word,
        videoId,
        videoUrl: `/api/signs/${word}/video`,
        available: true
    });
});

const start = async () => {
    try {
        await server.listen({ port: 3000, host: '0.0.0.0' });
        console.log('Server is running on http://localhost:3000');
    } catch (err) {
        server.log.error(err);
        process.exit(1);
    }
};

start();
