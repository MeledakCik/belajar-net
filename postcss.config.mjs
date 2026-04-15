// postcss.config.mjs
const config = {
  plugins: [
    '@tailwindcss/postcss',
    () => {
      return {
        postcssPlugin: 'postcss-mangle',
        Rule(rule) {
          // WAJIB ADA: Biar pas dev tampilannya nggak hancur
          if (process.env.NODE_ENV === 'production') {
            rule.selectors = rule.selectors.map(sel => {
              if (sel.startsWith('.') && !sel.includes(':') && !sel.includes('[') && !sel.includes('>')) {
                const className = sel.slice(1);
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