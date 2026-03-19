# editorjs-raw-html

A small Editor.js tool for inserting raw HTML blocks (Raw HTML block for Editor.js).

## Features

- Renders raw HTML preview in the editor.
- Provides an edit modal to update the HTML.
- Automatically opens the editor modal when a new block has no data (not opened in read-only mode).

## Usage

Include the built tool in your Editor.js setup and register the tool:

```js
import EditorJS from '@editorjs/editorjs';
import {RawHtmlTool} from '@editorjs-raw-html';

const editor = new EditorJS({
  holder: 'editorjs',
  tools: {
    rawHtml: RawHtmlTool,
  }
});
```

When a Raw HTML block is inserted with no `html` data, the edit modal will open automatically so users can paste or type HTML.

## Development

Install dependencies and run the demo:

```bash
npm install
# open demo/index.html in a browser (live-server or similar recommended)
```

## Files

- `src/index.js` — main tool implementation
- `demo/index.html` — simple demo page

## License

Apache 2.0
