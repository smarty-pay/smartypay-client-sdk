const esbuild = require('esbuild');
const fs = require('fs');

async function build(){

  try {

    // minify css
    await esbuild.build({
      entryPoints: ['src/style.css'],
      minify: true,
      outfile: 'src/style-min.css',
    });

    // temp replace min css for main build
    fs.renameSync('src/style.css', 'src/style-init.css');
    fs.renameSync('src/style-min.css', 'src/style.css');

    // make js
    await esbuild.build({
      entryPoints: ['src/payment-button.ts'],
      bundle: true,
      minify: true,
      sourcemap: 'external',
      outfile: 'dist/esbuild/payment-button.js',
      loader: {
        '.css': 'text'
      },
    });

  } finally {

    // replace css back
    if(fs.existsSync('src/style-init.css')){

      if(fs.existsSync('src/style.css')){
        fs.unlinkSync('src/style.css');
      }
      
      fs.renameSync('src/style-init.css', 'src/style.css');
    }
  }
}


build().catch(() => process.exit(1));

