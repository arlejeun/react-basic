import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import dts from "vite-plugin-dts";
import * as path from 'path';
import { existsSync } from 'fs';
import * as dotenv from 'dotenv';

dotenv.config({
    path: existsSync('.env') ? '.env' : path.resolve('envs', `.env.${process.env.NODE_ENV}`)
});

const viteBuild = ({ mode }) => {
    // Load app-level env vars to node-level env vars.
    //process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };
    process.env = { ...loadEnv(mode, process.cwd()) };

    console.log('Environemnts' + JSON.stringify(process.env))

    // https://vitejs.dev/config/
    const viteConfig = {
        plugins: [
            react(), 
            dts({
                insertTypesEntry: true,
              }
            )
        ],
        resolve: {
            alias: {
                '@@': path.resolve(__dirname),
                '@': path.resolve(__dirname, 'src')
            }
        },
        server: {
            cors: true,
            port: process.env.VITE_PORT as unknown as number,
            hmr: {
                host: 'localhost',
                protocol: 'ws',
                port: process.env.VITE_PORT as unknown as number
            }
        }
    };
    return defineConfig(viteConfig)
};
export default viteBuild;
