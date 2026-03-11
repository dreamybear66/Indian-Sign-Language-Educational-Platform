import { FastifyInstance } from 'fastify';
import fs from 'fs';
import path from 'path';

// Load signs data from JSON file
const SIGNS_JSON_PATH = path.join(process.cwd(), 'backend', 'src', 'data', 'signs.json');
let signsData: any[] = [];

try {
    if (fs.existsSync(SIGNS_JSON_PATH)) {
        signsData = JSON.parse(fs.readFileSync(SIGNS_JSON_PATH, 'utf-8'));
        console.log(`✅ Loaded ${signsData.length} signs from JSON file`);
    } else {
        console.warn(`⚠️ Signs JSON file not found at ${SIGNS_JSON_PATH}`);
    }
} catch (error) {
    console.error('❌ Error loading signs data:', error);
}

/**
 * Sign Routes
 * 
 * Serving metadata for sign language words.
 * Backend only serves metadata + CDN URLs. No video processing.
 */
export async function signsRoutes(fastify: FastifyInstance) {

    // GET /api/signs - List all signs
    fastify.get('/', {
        schema: {
            response: {
                200: {
                    type: 'array',
                    items: {
                        type: 'object',
                        properties: {
                            word: { type: 'string' },
                            videoUrl: { type: 'string' },
                            durationMs: { type: ['number', 'null'] },
                            dominantHand: { type: 'string' }
                        }
                    }
                }
            }
        }
    }, async (request, reply) => {
        return signsData;
    });

    // GET /api/signs/:word - Lookup a single sign (case-insensitive)
    fastify.get('/:word', {
        schema: {
            params: {
                type: 'object',
                properties: {
                    word: { type: 'string' }
                }
            },
            response: {
                200: {
                    type: 'object',
                    properties: {
                        word: { type: 'string' },
                        videoUrl: { type: 'string' },
                        durationMs: { type: ['number', 'null'] },
                        dominantHand: { type: 'string' }
                    }
                },
                404: {
                    type: 'object',
                    properties: {
                        error: { type: 'string' },
                        message: { type: 'string' }
                    }
                }
            }
        }
    }, async (request, reply) => {
        const { word } = request.params as { word: string };
        console.log(`🔍 [API] Fetching sign for: "${word}"`);

        const sign = signsData.find(s => s.word.toUpperCase() === word.toUpperCase());

        if (!sign) {
            console.warn(`❌ [API] Sign for "${word}" NOT FOUND.`);
            return reply.code(404).send({
                error: 'Not Found',
                message: `Sign for word '${word}' not found.`
            });
        }

        console.log(`✅ [API] Found sign for: "${word}" -> ${sign.videoUrl}`);
        return sign;
    });
}
