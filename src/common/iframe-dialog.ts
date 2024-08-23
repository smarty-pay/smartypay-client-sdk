import { makeElem } from '../util';

export interface IFrameDialogProps {
  frameOrigin: string;
  frameUrl: string;
  root: ShadowRoot;
  onClose: () => void;
  onEvent?: (event: string) => void;
}

export function initIFrameDialog({ frameOrigin, frameUrl, root, onClose, onEvent }: IFrameDialogProps) {
  const iframeParent = makeElem('<div class="iframe-container"></div>');
  const iframe = makeElem(`<iframe class="frame" src="${frameUrl}" scrolling="0" frameborder="0"></iframe>`);

  iframeParent.appendChild(iframe);
  root.appendChild(iframeParent);

  // close events
  const onEsc = (event: KeyboardEvent) => {
    if (event.key === 'Escape') {
      closeDialog();
    }
  };
  document.addEventListener('keydown', onEsc);

  // iframe events
  const onFrameEvent = (event: MessageEvent) => {
    if (event.origin !== frameOrigin) {
      return;
    }

    const { type, value } = event.data || {};

    if (type === 'smartypay-event') {
      onEvent?.(value);

      if (value === 'close') {
        closeDialog();
      }
    }
  };
  window.addEventListener('message', onFrameEvent);

  // close logic
  const closeDialog = () => {
    document.removeEventListener('keydown', onEsc);
    window.removeEventListener('message', onFrameEvent);

    root.removeChild(iframeParent);
    onClose();
  };
}
