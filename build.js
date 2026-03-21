const { mkdir, writeFile } = require('fs/promises');
const path = require('path');
const esbuild = require('esbuild');

const OUTFILE = path.resolve(__dirname, 'dist/bundle.js');
const OUTDIR = path.dirname(OUTFILE);
const STYLE_ELEMENT_ID = 'editorjs-raw-html-style';

async function build() {
    startTime = Date.now();
    const result = await esbuild.build({
        entryPoints: ['src/index.js'],
        bundle: true,
        minify: true,
        outfile: OUTFILE,
        write: false,
    });

    const jsFile = result.outputFiles.find((file) => file.path.endsWith('.js'));
    const cssFile = result.outputFiles.find((file) => file.path.endsWith('.css'))

    if (!jsFile) {
        throw new Error('esbuild did not produce a JavaScript bundle.');
    }

    await mkdir(OUTDIR, { recursive: true });

    if (cssFile) {
        console.log(`Bundling ${jsFile.path} with ${cssFile.path}.`);
        const cssInjectionPrelude = `const __rawHtmlCss=${JSON.stringify(cssFile.text)};\nif(typeof document!==\"undefined\"&&__rawHtmlCss){const styleId=\"${STYLE_ELEMENT_ID}\";if(!document.getElementById(styleId)){const style=document.createElement(\"style\");style.id=styleId;style.textContent=__rawHtmlCss;document.head.appendChild(style);}}\n`;
        await writeFile(OUTFILE, `${cssInjectionPrelude}${jsFile.text}`, 'utf8');
    }
    else {
        console.log(`Bundling ${jsFile.path} without CSS (no CSS output from esbuild).`);
        await writeFile(OUTFILE, jsFile.text, 'utf8');
    }
    const endTime = Date.now();
    console.log(`Build completed in ${endTime - startTime}ms.`);
}

build().catch((error) => {
    console.error(error);
    process.exit(1);
});
