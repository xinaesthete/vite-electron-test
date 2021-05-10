/* eslint-env node */

import {chrome} from '../../electron-vendors.config.json';
import path from 'path';
import { builtinModules } from 'module';
import {defineConfig} from 'vite';
import reactRefresh from '@vitejs/plugin-react-refresh';
import {loadAndSetEnv} from '../../scripts/loadAndSetEnv.mjs';
import tsconfigPaths from 'vite-tsconfig-paths';

const PACKAGE_ROOT = __dirname;
//const commonRoot = 
/**
 * Vite looks for `.env.[mode]` files only in `PACKAGE_ROOT` directory.
 * Therefore, you must manually load and set the environment variables from the root directory above
 */
loadAndSetEnv(process.env.MODE, process.cwd());


/**
 * @see https://vitejs.dev/config/
 */
export default defineConfig({
  root: PACKAGE_ROOT,
  resolve: {
    alias: {
      '/@/': path.join(PACKAGE_ROOT, 'src') + '/',
      '/@common/': path.resolve(PACKAGE_ROOT, '../common') + '/',
    },
  },
  plugins: [reactRefresh(), tsconfigPaths({projects: ['.']})],
  base: '',
  build: {
    sourcemap: true,
    target: `chrome${chrome}`,
    polyfillDynamicImport: false,
    outDir: 'dist',
    assetsDir: '.',
    terserOptions: {
      ecma: 2020,
      compress: {
        passes: 2,
      },
      safari10: false,
    },
    rollupOptions: {
      external: [
        ...builtinModules,
      ],
    },
    emptyOutDir: true,
  },
});

