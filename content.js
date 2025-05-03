// Default spam indicators
const defaultSpamIndicators = [
    'telegram.me',
    't.me',
    'topmate.io',
    'topmate',
    'dm me',
    'message me',
    'contact me',
    'reach out',
    'check my profile',
    'check out my profile',
    'follow me',
    'connect with me',
    'telegram',
    'Bosscoder',
    'academy',
    'Connect with top mentors here',
    '𝐜𝐫𝐚𝐜𝐤𝐞𝐝 𝐨𝐟𝐟𝐞𝐫𝐬',
    'DSA was extremely HARD'
];

const MAX_LINKS = 5; // Maximum number of links allowed in a post
let spamIndicators = [...defaultSpamIndicators];
let processedPosts = new WeakSet();

// Load custom indicators from storage
function loadCustomIndicators() {
    chrome.storage.sync.get(['customIndicators'], function(result) {
        const customIndicators = result.customIndicators || [];
        spamIndicators = [...defaultSpamIndicators, ...customIndicators];
        processFeed();
    });
}

// Function to count links in a post
function countLinks(postElement) {
    const links = postElement.querySelectorAll('a[href]');
    return links.length;
}

// Function to check if a post contains spam
function isSpamPost(postText) {
    const lowerText = postText.toLowerCase();
    return spamIndicators.some(indicator => lowerText.includes(indicator.toLowerCase()));
}

// Function to hide a post
function hidePost(postElement) {
    postElement.style.display = 'none';
}

// Function to process the feed
function processFeed() {
    const posts = document.querySelectorAll('.feed-shared-update-v2');
    
    posts.forEach(post => {
        // Skip if already processed
        if (processedPosts.has(post)) return;
        
        // Check for sponsored content
        const sponsoredIndicator = post.querySelector('.feed-shared-actor__sub-description');
        if (sponsoredIndicator && sponsoredIndicator.textContent.includes('Sponsored')) {
            hidePost(post);
            processedPosts.add(post);
            return;
        }

        // Check for too many links
        const linkCount = countLinks(post);
        if (linkCount > MAX_LINKS) {
            hidePost(post);
            processedPosts.add(post);
            return;
        }

        // Get post text content
        const postText = post.textContent;
        if (isSpamPost(postText)) {
            hidePost(post);
            processedPosts.add(post);
        }
    });
}

// Debounce function to limit how often processFeed is called
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Create a debounced version of processFeed
const debouncedProcessFeed = debounce(processFeed, 250);

// Create a MutationObserver to watch for new posts
const observer = new MutationObserver((mutations) => {
    let shouldProcess = false;
    
    // Only process if new posts were actually added
    mutations.forEach((mutation) => {
        if (mutation.addedNodes.length) {
            shouldProcess = true;
        }
    });
    
    if (shouldProcess) {
        debouncedProcessFeed();
    }
});

// Start observing the feed container
function startObserving() {
    const feedContainer = document.querySelector('.scaffold-finite-scroll');
    if (feedContainer) {
        observer.observe(feedContainer, {
            childList: true,
            subtree: true
        });
    } else {
        setTimeout(startObserving, 2000);
    }
}

// Listen for messages from popup
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.type === 'updateIndicators') {
        loadCustomIndicators();
    }
});

// Initial processing and setup
function initialize() {
    loadCustomIndicators();
    startObserving();
}

// Run when the page is loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initialize);
} else {
    initialize();
} 