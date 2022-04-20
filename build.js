const esbuild = require('esbuild');
const fs = require('fs');

const cssFile = 'src/assets/style.css';
const cssFileMin = 'src/assets/style.min.css';
const cssFileInit = 'src/assets/style.init.css';

const svgFile = 'src/assets/icon.svg';
const svgFileMin = 'src/assets/icon.min.svg';
const svgFileInit = 'src/assets/icon.init.svg';

async function build(){

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

    // make js
    await esbuild.build({
      logLevel: 'info',
      entryPoints: ['src/index.ts'],
      bundle: true,
      minify: true,
      sourcemap: 'external',
      outfile: 'dist/esbuild/smartypay-client-sdk.js',
      loader: {
        '.css': 'text',
        '.svg': 'text',
      },
    });

  } finally {

    // replace svg back
    if(fs.existsSync(svgFileInit)){
      if(fs.existsSync(svgFile)){
        fs.unlinkSync(svgFile);
      }
      fs.renameSync(svgFileInit, svgFile);
    }

    // replace css back
    if(fs.existsSync(cssFileInit)){
      if(fs.existsSync(cssFile)){
        fs.unlinkSync(cssFile);
      }
      fs.renameSync(cssFileInit, cssFile);
    }
  }
}


build().catch(() => process.exit(1));

