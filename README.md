# editorjs-raw-html

A small Editor.js tool for inserting raw HTML blocks (Raw HTML block for Editor.js).

## Features

- Renders raw HTML preview in the editor.
- Provides an edit modal to update the HTML.
- Automatically opens the editor modal when a new block has no data (not opened in read-only mode).
- Includes a persistent settings toggle to show/hide preview in the editor.

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

To disable preview for a specific block, store `preview: false` in the block data:

```js
{
  type: 'rawHtml',
  data: {
    html: '<div>Stored HTML without rendered preview in editor</div>',
    preview: false
  }
}
```

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
