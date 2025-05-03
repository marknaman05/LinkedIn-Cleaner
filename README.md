# LinkedIn Cleaner

A Chrome extension that helps you maintain a clean LinkedIn feed by automatically filtering out sponsored content and spam posts.

## Features

- Automatically hides sponsored posts
- Filters out posts containing spam indicators (telegram links, topmate, etc.)
- Hides posts with more than 5 links (often spam or promotional content)
- Customizable spam indicators
- Real-time feed monitoring
- Lightweight and efficient

## Installation

1. **Download the Extension**
   - Clone or download this repository to your local machine
   - Make sure you have all the required files:
     - `manifest.json`
     - `content.js`
     - `background.js`
     - `popup.html`
     - `popup.js`
     - `styles.css`
     - `icon.svg` (source icon file)
     - `icon48.png` and `icon128.png` (extension icons)

2. **Create Icon Files**
   You need to create two icon files for the extension:
   - `icon48.png` (48x48 pixels)
   - `icon128.png` (128x128 pixels)
   
   You can create these files by:
   - Using the provided `icon.svg` file
   - Converting it to PNG using an online converter or image editor
   - Or using any image editor to create your own icons
   - Make sure to save them in the correct sizes

3. **Load the Extension in Chrome**
   - Open Chrome and go to `chrome://extensions/`
   - Enable "Developer mode" in the top right corner
   - Click "Load unpacked"
   - Select the directory containing the extension files

4. **Verify Installation**
   - You should see the LinkedIn Cleaner extension in your extensions list
   - The extension icon should appear in your Chrome toolbar

## Usage

1. **Basic Usage**
   - The extension works automatically once installed
   - Visit LinkedIn.com and the extension will start filtering your feed
   - The following content will be automatically hidden:
     - Sponsored posts
     - Posts containing spam indicators
     - Posts with more than 5 links
     - Custom spam indicators you've added

2. **Customizing Spam Indicators**
   - Click the extension icon in your Chrome toolbar
   - Use the popup interface to:
     - View current spam indicators
     - Add new custom indicators
     - Remove custom indicators
   - Changes are saved automatically and applied immediately

3. **Default Spam Indicators**
   The extension comes with pre-configured indicators including:
   - Telegram links
   - Topmate links
   - Common spam phrases
   - And more...

## Troubleshooting

If the extension isn't working as expected:

1. **Check Extension Status**
   - Go to `chrome://extensions/`
   - Ensure the extension is enabled
   - Try clicking the "Reload" button on the extension card

2. **Clear Cache**
   - If posts aren't being filtered properly, try refreshing the LinkedIn page
   - You can also try clearing your browser cache

3. **Reinstall**
   - If issues persist, try removing and reinstalling the extension

4. **Icon Issues**
   - If the extension icon is not showing:
     - Make sure both icon files exist (`icon48.png` and `icon128.png`)
     - Verify the icon files are in the correct format (PNG)
     - Check that the file names match exactly what's in the manifest
     - Try reloading the extension

## Contributing

Feel free to contribute to this project by:
- Reporting bugs
- Suggesting new features
- Adding new spam indicators
- Improving the code

## License

This project is open source and available under the MIT License.

## Support

If you encounter any issues or have questions:
- Open an issue in the repository
- Contact the maintainers

---

**Note**: This extension is not affiliated with LinkedIn. It's a third-party tool designed to improve your LinkedIn experience. 