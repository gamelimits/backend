import { Hono } from 'hono';

export type RegisterModule = (app: { http: Hono }) => void;
