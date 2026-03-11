import { FastifyInstance } from 'fastify';
import fastifyCors from '@fastify/cors';

export async function corsPlugin(fastify: FastifyInstance) {
    await fastify.register(fastifyCors, {
        origin: true,
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
    });
}
