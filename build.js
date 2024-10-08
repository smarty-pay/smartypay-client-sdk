const esbuild = require('esbuild');
// const { dtsPlugin } = require('esbuild-plugin-d.ts');
const fs = require('fs');
const util = require('util');
const exec = util.promisify(require('child_process').exec);

const cssFile = 'src/assets/style.css';
const cssFileMin = 'src/assets/style.min.css';
const cssFileInit = 'src/assets/style.init.css';

const svgFile = 'src/assets/icon.svg';
const svgFileMin = 'src/assets/icon.min.svg';
const svgFileInit = 'src/assets/icon.init.svg';

const VERSION = 'v1';

async function build() {
  try {
    // minify svg
    fs.writeFileSync(svgFileMin, fs.readFileSync(svgFile, 'utf-8').split('\n').join(''));
    fs.renameSync(svgFile, svgFileInit);
    fs.renameSync(svgFileMin, svgFile);

    // minify css
    await esbuild.build({
      logLevel: 'info',
      entryPoints: [cssFile],
      minify: true,
      outfile: cssFileMin,
    });

    // temp replace min css for main build
    fs.renameSync(cssFile, cssFileInit);
    fs.renameSync(cssFileMin, cssFile);

    // make global js
    await esbuild.build({
      logLevel: 'info',
      entryPoints: ['src/global.ts'],
      bundle: true,
      minify: true,
      sourcemap: 'external',
      outfile: `dist/esbuild/smartypay-client-sdk-${VERSION}.js`,
      loader: {
        '.css': 'text',
        '.svg': 'text',
      },
    });

    // make lib js
    await esbuild.build({
      logLevel: 'info',
      entryPoints: ['src/index.ts'],
      bundle: true,
      minify: true,
      format: 'esm',
      sourcemap: 'external',
      outfile: `dist/esbuild/index.js`,
      loader: {
        '.css': 'text',
        '.svg': 'text',
      },
      // plugins: [dtsPlugin()], // broken by typescript 5, see next code-block
    });

    // make d.ts files
    // old solution with "dtsPlugin()" is not working because of entryPoints, only full mode working now
    await exec('npx tsc  --declaration --emitDeclarationOnly');

    // remove stub entry point for declarations
    const stubDeclarationEntryFiel = 'dist/tsc/global.d.ts';
    if (fs.existsSync(stubDeclarationEntryFiel)) {
      fs.unlinkSync(stubDeclarationEntryFiel);
    }
  } finally {
    // replace svg back
    if (fs.existsSync(svgFileInit)) {
      if (fs.existsSync(svgFile)) {
        fs.unlinkSync(svgFile);
      }
      fs.renameSync(svgFileInit, svgFile);
    }

    // replace css back
    if (fs.existsSync(cssFileInit)) {
      if (fs.existsSync(cssFile)) {
        fs.unlinkSync(cssFile);
      }
      fs.renameSync(cssFileInit, cssFile);
    }
  }
}

build().catch((e) => {
  console.error('build error', e);
  process.exit(1);
});
