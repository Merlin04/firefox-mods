// ==UserScript==
// @name           A11y Menu Shortener
// @version        1.0.0
// @author         Merlin04
// @description    Shortens the "Inspect Accessibility Properties" right-click menu item
// @license        This Source Code Form is subject to the terms of the Creative Commons Attribution-NonCommercial-ShareAlike International License, v. 4.0. If a copy of the CC BY-NC-SA 4.0 was not distributed with this file, You can obtain one at http://creativecommons.org/licenses/by-nc-sa/4.0/ or send a letter to Creative Commons, PO Box 1866, Mountain View, CA 94042, USA.
// ==/UserScript==

(() => {
    const e=document.getElementById("context-inspect-a11y");if(e) e.label="Inspect A11y Props";
})();
