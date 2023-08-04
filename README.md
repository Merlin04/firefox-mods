# Merlin04's Firefox Mods

This is a set of userchrome modifications to Firefox that I like using for various reasons.

![Screenshot of Firefox with mods installed](/screenshot.png)

## Installation

0. Install the [Sidebery](https://addons.mozilla.org/en-US/firefox/addon/sidebery/) browser extension, which provides vertical tabs. Go into the sidebery addon settings, go to the bottom of the page, and import the `sidebery-data.json` file in this repo. This includes some custom color settings to match [Dark Purple Theme](https://addons.mozilla.org/en-US/firefox/addon/jb-dark-purple-theme) - if you like that go ahead and install it, otherwise you can change the colors to whatever you want or just remove those keys from the json file.
1. Install [fx-autoconfig](https://github.com/MrOtherGuy/fx-autoconfig#setting-up-configjs-from-program-folder) following the instructions in the README. You only need to follow the parts about setting up the program folder, I've bundled the rest in the `chrome` folder in this repo.
2. In your [about:config](about:config) page, set `toolkit.legacyUserProfileCustomizations.stylesheets` to `true`.
3. Find your firefox profile folder (on linux, it's under `~/.mozilla/firefox` and probably has a name like `n202yk6j.default-release`), and copy in the `chrome` folder from this repo.
4. Restart firefox!

## Credits

Lots of this is just hacked together scripts/css written by other people - primarily, [aminomancer/uc.css.js](https://github.com/aminomancer/uc.css.js). I'm also bundling fx-autoconfig as mentioned above. Other credits should be given in comments but it's all very messy as I didn't ever intend to publish this while writing it. It's just a giant hack that will eventually break but enjoy it while it lasts.