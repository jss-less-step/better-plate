import type { TDescendant } from '@udecode/slate';

import { jsx } from 'slate-hyperscript';

import type { PlateEditor } from '../../../types/PlateEditor';

import { deserializeHtmlNodeChildren } from './deserializeHtmlNodeChildren';
import { pipeDeserializeHtmlElement } from './pipeDeserializeHtmlElement';

/** Deserialize HTML to Element. */
export const htmlElementToElement = (
  editor: PlateEditor,
  element: HTMLElement
) => {
  const deserialized = pipeDeserializeHtmlElement(editor, element);

  if (deserialized) {
    const { node, withoutChildren } = deserialized;

    let descendants =
      node.children ??
      (deserializeHtmlNodeChildren(editor, element) as TDescendant[]);

    if (descendants.length === 0 || withoutChildren) {
      descendants = [{ text: '' }];
    }

    return jsx('element', node, descendants) as TDescendant;
  }
};
