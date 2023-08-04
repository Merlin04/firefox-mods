// ==UserScript==
// @name           Sidebar Resize
// @version        1.0
// @author         Merlin04
// @homepage       https://github.com/Merlin04
// @description    Custom sidebar resize
// @license        MIT
// ==/UserScript==

(function () {
  function init() {
    let sbWidth = Services.prefs.getIntPref("sidebar.width");
    const updateStyle = () => document.documentElement.style.setProperty("--sidebar-width", (sbWidth - 6) + "px");
    const setDragging = (v) => document.documentElement.classList[v ? "add" : "remove"]("sidebar-custom-resizing");
    
    const setSbWidth = val => Services.prefs.setIntPref("sidebar.width", val);
    
    updateStyle();
    
    const b = document.createElement("box");
    b.id = "sidebar-custom-resizer";
    
    b.addEventListener("mousedown", e => {
        const ac = new AbortController();
        const { signal } = ac;
        setDragging(true);
        function mouseMove(e) {
            sbWidth = e.clientX;
            updateStyle();
        };
        function mouseUp(e) {
            ac.abort();
            setSbWidth(sbWidth);
            setDragging(false);
        }
        document.addEventListener("mousemove", mouseMove, { passive: true, signal });
        document.addEventListener("mouseup", mouseUp, { passive: true, signal });
    });
    
    document.getElementById("sidebar-box").append(b);
  }

  if (gBrowserInit.delayedStartupFinished) {
    init();
  } else {
    let delayedListener = (subject, topic) => {
      if (topic == "browser-delayed-startup-finished" && subject == window) {
        Services.obs.removeObserver(delayedListener, topic);
        init();
      }
    };
    Services.obs.addObserver(delayedListener, "browser-delayed-startup-finished");
  }
})();
