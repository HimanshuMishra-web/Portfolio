'use client';

import { useEffect, useRef } from 'react';
import grapesjs from 'grapesjs';
import 'grapesjs/dist/css/grapes.min.css';

// Import plugins
import webpage from 'grapesjs-preset-webpage';
import newsletter from 'grapesjs-preset-newsletter';
import blocksBasic from 'grapesjs-blocks-basic';
import forms from 'grapesjs-plugin-forms';
import countdown from 'grapesjs-component-countdown';
// @ts-ignore
import tabs from 'grapesjs-tabs';
import customCode from 'grapesjs-custom-code';
// @ts-ignore
import touch from 'grapesjs-touch';
import postcss from 'grapesjs-parser-postcss';
import tooltip from 'grapesjs-tooltip';
import tuiImageEditor from 'grapesjs-tui-image-editor';

interface GrapesJSEditorProps {
  onSave: (html: string, css: string) => void;
  saving: boolean;
}

const GrapesJSEditor: React.FC<GrapesJSEditorProps> = ({ onSave, saving }) => {
  const editorRef = useRef<HTMLDivElement>(null);
  const editorInstanceRef = useRef<any>(null);

  useEffect(() => {
    if (!editorRef.current) return;

    const editor = grapesjs.init({
      container: editorRef.current,
      height: '600px',
      width: 'auto',
      storageManager: false, // Disable storage since we'll handle saving manually
      assetManager: {
        assets: [],
        upload: false,
      },
      plugins: [
        webpage,
        newsletter,
        blocksBasic,
        forms,
        countdown,
        tabs,
        customCode,
        touch,
        postcss,
        tooltip,
        tuiImageEditor,
      ],
      pluginsOpts: {
        'gjs-preset-webpage': {},
        'gjs-preset-newsletter': {},
        'gjs-blocks-basic': {},
        'gjs-plugin-forms': {},
        'gjs-component-countdown': {},
        'grapesjs-tabs': {},
        'gjs-custom-code': {},
        'grapesjs-touch': {},
        'gjs-parser-postcss': {},
        'grapesjs-tooltip': {},
        'grapesjs-tui-image-editor': {},
      },
    });

    editorInstanceRef.current = editor;

    // Add custom styles for better blog template editing
    editor.addStyle(`
      .gjs-editor {
        border: 1px solid #d1d5db;
        border-radius: 0.375rem;
      }
      .gjs-cv-canvas {
        background-color: #ffffff;
      }
      .gjs-block {
        padding: 8px;
        margin: 4px;
        border-radius: 4px;
        background: white;
        border: 1px solid #e5e7eb;
      }
      .gjs-block:hover {
        background: #f9fafb;
      }
    `);

    // Add save button to the panel
    editor.Panels.addPanel({
      id: 'save-panel',
      el: '.gjs-pn-panels',
      buttons: [
        {
          id: 'save',
          className: 'btn-save-template',
          label: saving ? 'Saving...' : 'Save Template',
          command: () => {
            const html = editor.getHtml() || '';
            const css = editor.getCss() || '';
            onSave(html, css);
          },
          attributes: { title: 'Save Template' },
          active: false,
        },
      ],
    });

    // Style the save button
    const saveBtn = editor.Panels.getButton('save-panel', 'save');
    if (saveBtn) {
      saveBtn.set('className', 'btn-save-template bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium');
    }

    return () => {
      if (editorInstanceRef.current) {
        editorInstanceRef.current.destroy();
        editorInstanceRef.current = null;
      }
    };
  }, [onSave, saving]);

  return (
    <div className="grapesjs-editor-container">
      <div ref={editorRef} className="grapesjs-editor" />
      <style jsx>{`
        .grapesjs-editor-container {
          position: relative;
        }
        .grapesjs-editor {
          border: 1px solid #d1d5db;
          border-radius: 0.375rem;
          overflow: hidden;
        }
        .gjs-pn-panels {
          background: #f9fafb;
          border-bottom: 1px solid #e5e7eb;
        }
        .gjs-blocks-c {
          background: #f9fafb;
        }
        .gjs-layer {
          background: #f9fafb;
        }
        .gjs-traits-c {
          background: #f9fafb;
        }
        .gjs-style-c {
          background: #f9fafb;
        }
        .btn-save-template {
          background: #2563eb !important;
          color: white !important;
          border: none !important;
          padding: 8px 16px !important;
          border-radius: 6px !important;
          font-size: 14px !important;
          font-weight: 500 !important;
          cursor: pointer !important;
          transition: background-color 0.2s !important;
        }
        .btn-save-template:hover {
          background: #1d4ed8 !important;
        }
        .btn-save-template:disabled {
          background: #9ca3af !important;
          cursor: not-allowed !important;
        }
      `}</style>
    </div>
  );
};

export default GrapesJSEditor;