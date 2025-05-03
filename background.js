// Listen for installation
chrome.runtime.onInstalled.addListener(() => {
    console.log('LinkedIn Cleaner extension installed');
});

// Listen for messages from content script
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.type === 'log') {
        console.log('Content script log:', request.message);
    }
    return true;
}); 