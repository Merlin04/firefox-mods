// ==UserScript==
// @name           Window Label
// @version        1.0.0
// @author         Merlin04
// @description    Adds an editable label to the toolbar so they can be better identified
// @license        This Source Code Form is subject to the terms of the Creative Commons Attribution-NonCommercial-ShareAlike International License, v. 4.0. If a copy of the CC BY-NC-SA 4.0 was not distributed with this file, You can obtain one at http://creativecommons.org/licenses/by-nc-sa/4.0/ or send a letter to Creative Commons, PO Box 1866, Mountain View, CA 94042, USA.
// ==/UserScript==

(() => {
  if (
    /^chrome:\/\/browser\/content\/browser.(xul||xhtml)$/i.test(location) &&
    !CustomizableUI.getPlacementOfWidget("window-label", true)
  )
    CustomizableUI.createWidget({
      id: "window-label",
      type: "custom",
      defaultArea: CustomizableUI.AREA_NAVBAR,
      label: "Window Label",
      removable: true,
      overflows: false,
      tooltiptext: "Window Label",
      onBuild: function (aDoc) {
        const item = aDoc.createXULElement("toolbaritem");
        item.id = "window-label";
        const label = aDoc.createElementNS(
          "http://www.w3.org/1999/xhtml",
          "div"
        );
        label.innerText = "Untitled";
        label.contentEditable = true;
        item.appendChild(label);

        // normally, firefox will capture the backspace, delete, and arrow keys
        // so we need to stop that from happening in the capture phase
        label.addEventListener(
          "keydown",
          (event) => {
            if (
              event.key === "Backspace" ||
              event.key === "Delete" ||
              event.key === "ArrowLeft" ||
              event.key === "ArrowRight"
            )
              event.stopPropagation();
          },
          {
            capture: true
          }
        );
        /*label.addEventListener(
          "keydown",
          (e) => {
            if (e.key === "Backspace" || e.key === "Delete") {
              e.preventDefault();
            }
          },
          true
        );*/
        /*label.addEventListener("keydown", (e) => {
          if (e.keyCode == 8) {
            console.warn("capturing backspace");
            // e.preventDefault();
            e.stopPropagation();
            e.stopImmediatePropagation();
            e.cancelBubble = true;
            return false;
          }
        });*/

        let prefSvc = Services.prefs;
        let obSvc = Services.obs;

        // remove this window's observers when the window closes, since observers are global
        function uninit() {
          window.removeEventListener("unload", uninit, false);
        }

        function toolboxInit() {

        }

        window.addEventListener("unload", uninit, false);

        if (gBrowserInit.delayedStartupFinished) {
          toolboxInit();
        } else {
          let delayedListener2 = (subject, topic) => {
            if (topic == "browser-delayed-startup-finished" && subject == window) {
              obSvc.removeObserver(delayedListener2, topic);
              toolboxInit();
            }
          };
          obSvc.addObserver(delayedListener2, "browser-delayed-startup-finished");
        }
        return item;
      },
    });

  let styleSvc = Cc["@mozilla.org/content/style-sheet-service;1"].getService(
    Ci.nsIStyleSheetService
  );
  let toolboxCSS = `
#window-label {
  display: flex;
  align-items: center;
}
#window-label div {
  background-color: AccentColor;
  color: AccentColorText;
  padding: 4px;
  border-radius: 4px;
  -moz-window-dragging: no-drag;
}
`;
  let styleURI = makeURI("data:text/css;charset=UTF=8," + encodeURIComponent(toolboxCSS));
  if (!styleSvc.sheetRegistered(styleURI, styleSvc.AUTHOR_SHEET))
    styleSvc.loadAndRegisterSheet(styleURI, styleSvc.AUTHOR_SHEET);
})();
