import Inspect from 'vite-plugin-inspect'
import { resolve } from 'path'
import { fileURLToPath } from 'url';

export default {
    plugins: [Inspect()],
    build: {
        rollupOptions: {
            input: {
                main: resolve(__dirName, 'index.html'),
                menu: resolve(__dirName, 'menu/index.html'),
                orders: resolve(__dirName, 'orders/index.html'),
                status: resolve(__dirName, 'status/index.html')
            }
        }
    }
}