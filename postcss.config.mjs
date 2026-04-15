// postcss.config.mjs

const config = {
  plugins: [
    '@tailwindcss/postcss',
    // Kita buat plugin-nya langsung sebagai function di sini
    // Supaya Turbopack gak nyari-nyari module ke node_modules
    () => {
      return {
        postcssPlugin: 'postcss-mangle',
        Rule(rule) {
          // Hanya jalan pas build production (npm run build)
          if (process.env.NODE_ENV === 'production') {
            rule.selectors = rule.selectors.map(sel => {
              // Target: .flex, .bg-black, dsb (bukan hover: atau [data-])
              if (sel.startsWith('.') && !sel.includes(':') && !sel.includes('[') && !sel.includes('>')) {
                const className = sel.slice(1);
                
                // Algoritma Hash Angka (Wajib sama dengan Obfuscator.tsx)
                let hash = 0;
                for (let i = 0; i < className.length; i++) {
                  hash = (hash << 5) - hash + className.charCodeAt(i);
                  hash |= 0;
                }
                return '.x' + Math.abs(hash).toString(36).substring(0, 4);
              }
              return sel;
            });
          }
        }
      }
    }
  ],
};

export default config;