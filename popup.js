// Default indicators
const defaultIndicators = [
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
    'academy'
];

// Load and display indicators
function loadIndicators() {
    chrome.storage.sync.get(['customIndicators'], function(result) {
        const customIndicators = result.customIndicators || [];
        const allIndicators = [...defaultIndicators, ...customIndicators];
        
        const indicatorList = document.getElementById('indicatorList');
        indicatorList.innerHTML = '';
        
        allIndicators.forEach(indicator => {
            const item = document.createElement('div');
            item.className = 'indicator-item';
            
            const text = document.createElement('span');
            text.textContent = indicator;
            
            const deleteBtn = document.createElement('button');
            deleteBtn.className = 'delete-btn';
            deleteBtn.textContent = '×';
            deleteBtn.onclick = () => removeIndicator(indicator);
            
            item.appendChild(text);
            item.appendChild(deleteBtn);
            indicatorList.appendChild(item);
        });
    });
}

// Add new indicator
function addIndicator() {
    const input = document.getElementById('newIndicator');
    const newIndicator = input.value.trim();
    
    if (newIndicator) {
        chrome.storage.sync.get(['customIndicators'], function(result) {
            const customIndicators = result.customIndicators || [];
            if (!customIndicators.includes(newIndicator)) {
                customIndicators.push(newIndicator);
                chrome.storage.sync.set({ customIndicators }, function() {
                    input.value = '';
                    loadIndicators();
                    // Notify content script to update indicators
                    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
                        chrome.tabs.sendMessage(tabs[0].id, {type: 'updateIndicators'});
                    });
                });
            }
        });
    }
}

// Remove indicator
function removeIndicator(indicator) {
    chrome.storage.sync.get(['customIndicators'], function(result) {
        const customIndicators = result.customIndicators || [];
        const updatedIndicators = customIndicators.filter(i => i !== indicator);
        chrome.storage.sync.set({ customIndicators: updatedIndicators }, function() {
            loadIndicators();
            // Notify content script to update indicators
            chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
                chrome.tabs.sendMessage(tabs[0].id, {type: 'updateIndicators'});
            });
        });
    });
}

// Event listeners
document.addEventListener('DOMContentLoaded', function() {
    loadIndicators();
    
    document.getElementById('addIndicator').addEventListener('click', addIndicator);
    document.getElementById('newIndicator').addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            addIndicator();
        }
    });
}); 