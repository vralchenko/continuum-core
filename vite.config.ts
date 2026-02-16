import { defineConfig } from 'vite';
import { resolve } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default defineConfig({
    server: {
        port: 3000,
        open: true
    },
    build: {
        outDir: 'dist',
        target: 'esnext',
        rollupOptions: {
            input: {
                main: resolve(__dirname, 'index.html'),
                contact: resolve(__dirname, 'contact.html'),
                mission: resolve(__dirname, 'mission.html'),
                products: resolve(__dirname, 'products.html'),
                team: resolve(__dirname, 'team.html'),
                tools_page: resolve(__dirname, 'tools.html'),
                
                'asset-overview': resolve(__dirname, 'components/tools/asset-overview.html'),
                'bereavement-support': resolve(__dirname, 'components/tools/bereavement-support.html'),
                'death-checklist': resolve(__dirname, 'components/tools/death-checklist.html'),
                'executor': resolve(__dirname, 'components/tools/executor.html'),
                'legal-docs': resolve(__dirname, 'components/tools/legal-docs.html'),
                'sidebar': resolve(__dirname, 'components/tools/sidebar.html'),
                'templates': resolve(__dirname, 'components/tools/templates.html'),
                'will-builder': resolve(__dirname, 'components/tools/will-builder.html'),
                
                'header': resolve(__dirname, 'components/header.html'),
                'footer': resolve(__dirname, 'components/footer.html'),
            }
        }
    }
});