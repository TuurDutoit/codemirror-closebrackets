import {
  EditorState,
  EditorSelection,
  Transaction,
} from "@codemirror/next/state";
import { EditorView } from "@codemirror/next/view";
import { javascript } from "@codemirror/next/lang-javascript";
import { basicSetup } from "@codemirror/next/basic-setup";

const extensions = [basicSetup, javascript()];

const initialState = EditorState.create({
  doc: "doSomething",
  extensions,
});

const view = new EditorView({
  parent: document.querySelector("#editor"),
  state: initialState,
});

function insertText(text) {
  const { from, to } = view.state.selection.main;
  view.dispatch({
    annotations: Transaction.userEvent.of("input"),
    changes: { from, insert: text, to },
    selection: EditorSelection.cursor(from + text.length),
  });
}

document.querySelectorAll("button").forEach(($button) => {
  $button.addEventListener("click", (event) => {
    event.preventDefault();
    $button.disabled = true;
    setTimeout(() => {
      insertText("(");
      insertText(")");
      $button.disabled = false;
    }, 3000);
  });
});
