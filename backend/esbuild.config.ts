import { context } from 'esbuild';

const build = async () => {
  const ctx = await context({
    entryPoints: ['src/index.ts'],
    bundle: true,
    minify: true,
    platform: 'node',
    target: 'node22',
    outfile: 'dist/Links.cjs',
    format: 'cjs',
    sourcemap: true,
    tsconfig: 'tsconfig.json',
    external: [],
    logLevel: 'info',
  });
  await ctx.rebuild();
  await ctx.dispose();
};

const start = async () => {
  try {
    await build();
  } catch (error) {
    console.error('Build failed: ', error);
    process.exit(1);
  }
};

void start();
