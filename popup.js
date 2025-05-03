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
    'academy',
    'Connect with top mentors here',
    'DSA was extremely HARD'
];

// Load and display indicators
function loadIndicators() {
    chrome.storage.sync.get(['customIndicators', 'disabledDefaults'], function(result) {
        const customIndicators = result.customIndicators || [];
        const disabledDefaults = result.disabledDefaults || [];
        
        const indicatorList = document.getElementById('indicatorList');
        indicatorList.innerHTML = '';
        
        // Display default indicators
        defaultIndicators.forEach(indicator => {
            const item = document.createElement('div');
            item.className = 'indicator-item';
            
            const type = document.createElement('span');
            type.className = 'indicator-type';
            type.textContent = 'Default';
            
            const text = document.createElement('span');
            text.className = 'indicator-text';
            text.textContent = indicator;
            
            const deleteBtn = document.createElement('button');
            deleteBtn.className = 'delete-btn';
            deleteBtn.textContent = 'x';
            deleteBtn.onclick = () => toggleDefaultIndicator(indicator, disabledDefaults);
            
            if (disabledDefaults.includes(indicator)) {
                deleteBtn.style.backgroundColor = '#28a745';
                deleteBtn.title = 'Enable indicator';
            } else {
                deleteBtn.style.backgroundColor = '#dc3545';
                deleteBtn.title = 'Disable indicator';
            }
            
            item.appendChild(type);
            item.appendChild(text);
            item.appendChild(deleteBtn);
            indicatorList.appendChild(item);
        });
        
        // Display custom indicators
        customIndicators.forEach(indicator => {
            const item = document.createElement('div');
            item.className = 'indicator-item';
            
            const type = document.createElement('span');
            type.className = 'indicator-type';
            type.textContent = 'Custom';
            
            const text = document.createElement('span');
            text.className = 'indicator-text';
            text.textContent = indicator;
            
            const deleteBtn = document.createElement('button');
            deleteBtn.className = 'delete-btn';
            deleteBtn.textContent = '-';
            deleteBtn.onclick = () => removeIndicator(indicator);
            
            item.appendChild(type);
            item.appendChild(text);
            item.appendChild(deleteBtn);
            indicatorList.appendChild(item);
        });
    });
}

// Toggle default indicator
function toggleDefaultIndicator(indicator, disabledDefaults) {
    chrome.storage.sync.get(['disabledDefaults'], function(result) {
        const currentDisabled = result.disabledDefaults || [];
        let newDisabled;
        
        if (currentDisabled.includes(indicator)) {
            newDisabled = currentDisabled.filter(i => i !== indicator);
        } else {
            newDisabled = [...currentDisabled, indicator];
        }
        
        chrome.storage.sync.set({ disabledDefaults: newDisabled }, function() {
            loadIndicators();
            notifyContentScript();
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
            if (!customIndicators.includes(newIndicator) && !defaultIndicators.includes(newIndicator)) {
                customIndicators.push(newIndicator);
                chrome.storage.sync.set({ customIndicators }, function() {
                    input.value = '';
                    loadIndicators();
                    notifyContentScript();
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
            notifyContentScript();
        });
    });
}

// Notify content script of changes
function notifyContentScript() {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        if (tabs[0]) {
            chrome.tabs.sendMessage(tabs[0].id, {type: 'updateIndicators'});
        }
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