import './index.css';

class RawHtmlTool {
    constructor({ data, config, api, readOnly }) {
        this.api = api;
        this.readOnly = readOnly;
        this._data = data && typeof data.html === 'string' ? data.html : '';
        this._container = null;
    }

    static get toolbox() {
        return {
            title: 'Raw HTML',
            icon: '<svg width="18" height="14" viewBox="0 0 18 14" xmlns="http://www.w3.org/2000/svg"><path d="M2 7l4-4v8L2 7zm14 0l-4 4V3l4 4z" fill="currentColor"/></svg>'
        };
    }

    static get sanitize() {
        return {
            html: true, // Allow HTML tags
        };
    }

    render() {
        const container = document.createElement('div');
        container.classList.add('ce-raw-html');

        const preview = document.createElement('div');
        preview.classList.add('ce-raw-html__preview');
        preview.innerHTML = this._data || '';
        container.appendChild(preview);

        this._container = container;

        // If there's no data, open the edit modal so the user can add HTML immediately.
        // Avoid activating in read-only contexts (check common readOnly flags).
        if (!this._data && !this.readOnly) {
            // Defer to next tick so Editor.js can mount the block first.
            setTimeout(() => this.openModal(preview), 0);
        }

        return container;
    }

    /**
     * Provide a Block Tune (settings) button that opens the edit modal.
     * Returning an element allows us to attach our own click handler.
     */
    renderSettings() {
        return [
            {
                icon: '<svg width="14" height="14" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04a1.003 1.003 0 0 0 0-1.42l-2.34-2.34a1.003 1.003 0 0 0-1.42 0l-1.83 1.83 3.75 3.75 1.84-1.82z" fill="currentColor"/></svg>',
                label: 'Edit HTML',
                onActivate: () => {
                    const preview = this._container && this._container.querySelector('.ce-raw-html__preview');
                    if (preview) this.openModal(preview);
                }
            }
        ];
    }

    openModal(preview) {
        const overlay = document.createElement('div');
        overlay.classList.add('ce-raw-html__overlay');

        const dialog = document.createElement('div');
        dialog.classList.add('ce-raw-html__dialog');

        const textarea = document.createElement('textarea');
        textarea.classList.add('ce-raw-html__textarea');
        textarea.value = this._data || '';

        const footer = document.createElement('div');
        footer.classList.add('ce-raw-html__dialog-footer');

        const saveBtn = document.createElement('button');
        saveBtn.type = 'button';
        saveBtn.classList.add('ce-raw-html__save-btn');
        saveBtn.innerText = 'Save';
        saveBtn.addEventListener('click', () => {
            this._data = textarea.value;
            preview.innerHTML = this._data;
            document.body.removeChild(overlay);
        });

        const cancelBtn = document.createElement('button');
        cancelBtn.type = 'button';
        cancelBtn.classList.add('ce-raw-html__cancel-btn');
        cancelBtn.innerText = 'Cancel';
        cancelBtn.addEventListener('click', () => {
            document.body.removeChild(overlay);
        });

        footer.appendChild(cancelBtn);
        footer.appendChild(saveBtn);

        dialog.appendChild(textarea);
        dialog.appendChild(footer);
        overlay.appendChild(dialog);

        overlay.addEventListener('click', (e) => {
            if (e.target === overlay) document.body.removeChild(overlay);
        });

        const escListener = (e) => {
            if (e.key === 'Escape' && document.body.contains(overlay)) {
                document.body.removeChild(overlay);
                document.removeEventListener('keydown', escListener);
            }
        };

        document.addEventListener('keydown', escListener);

        document.body.appendChild(overlay);
        textarea.focus();
    }

    save() {
        return {
            html: this._data || ''
        };
    }

    validate(savedData) {
        return typeof savedData.html === 'string';
    }
}

module.exports = RawHtmlTool;
