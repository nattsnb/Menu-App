import Inspect from "vite-plugin-inspect";
import { resolve } from "path";

export default {
  plugins: [Inspect()],
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, "index.html"),
        menu: resolve(__dirname, "menu/index.html"),
        orders: resolve(__dirname, "orders/index.html"),
        status: resolve(__dirname, "status/index.html"),
      },
    },
  },
};
