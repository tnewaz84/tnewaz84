/**
 * Analytics JavaScript for Tanvir Newaz's Portfolio
 * Author: Tanvir Newaz
 * Version: 1.0
 */

// Simple analytics tracking system
(function() {
    // Initialize analytics object
    const analytics = {
        // Track page views
        trackPageView: function() {
            const pageData = {
                path: window.location.pathname,
                referrer: document.referrer,
                title: document.title,
                timestamp: new Date().toISOString(),
                viewportWidth: window.innerWidth,
                viewportHeight: window.innerHeight
            };
            
            // In a real implementation, this would send data to a server
            console.log('Page View:', pageData);
            
            // Store in local storage for demo purposes
            this.storeEvent('pageview', pageData);
        },
        
        // Track user interactions
        trackEvent: function(category, action, label, value) {
            const eventData = {
                category: category,
                action: action,
                label: label || '',
                value: value || '',
                path: window.location.pathname,
                timestamp: new Date().toISOString()
            };
            
            // In a real implementation, this would send data to a server
            console.log('Event:', eventData);
            
            // Store in local storage for demo purposes
            this.storeEvent('event', eventData);
        },
        
        // Store events in local storage (for demo purposes)
        storeEvent: function(type, data) {
            try {
                // Get existing events or initialize empty array
                const events = JSON.parse(localStorage.getItem('portfolio_analytics') || '[]');
                
                // Add new event
                events.push({
                    type: type,
                    data: data
                });
                
                // Store back in local storage (limit to last 100 events)
                localStorage.setItem('portfolio_analytics', JSON.stringify(events.slice(-100)));
            } catch (e) {
                console.error('Analytics storage error:', e);
            }
        }
    };
    
    // Track page view on load
    analytics.trackPageView();
    
    // Track clicks on important elements
    document.addEventListener('click', function(e) {
        // Track CTA button clicks
        if (e.target.classList.contains('primary-button') || 
            e.target.classList.contains('secondary-button') ||
            e.target.classList.contains('cta-button')) {
            
            analytics.trackEvent('button', 'click', e.target.textContent.trim());
        }
        
        // Track navigation clicks
        if (e.target.closest('nav a')) {
            const navLink = e.target.closest('nav a');
            analytics.trackEvent('navigation', 'click', navLink.textContent.trim());
        }
        
        // Track form submissions
        if (e.target.closest('form button[type="submit"]')) {
            const form = e.target.closest('form');
            analytics.trackEvent('form', 'submit', form.id || 'unknown-form');
        }
    });
    
    // Track scroll depth
    let scrollDepthMarkers = [25, 50, 75, 100];
    let scrollDepthTracked = [];
    
    window.addEventListener('scroll', function() {
        // Calculate scroll depth as percentage
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrollPercentage = Math.round((scrollTop / scrollHeight) * 100);
        
        // Track scroll depth at 25%, 50%, 75%, and 100%
        scrollDepthMarkers.forEach(function(marker) {
            if (scrollPercentage >= marker && !scrollDepthTracked.includes(marker)) {
                analytics.trackEvent('scroll', 'depth', marker + '%');
                scrollDepthTracked.push(marker);
            }
        });
    });
    
    // Track time spent on page
    let timeSpentInterval;
    let timeSpentSeconds = 0;
    
    function startTimeTracking() {
        timeSpentInterval = setInterval(function() {
            timeSpentSeconds += 10;
            
            // Track time spent at 30 second intervals
            if (timeSpentSeconds % 30 === 0) {
                analytics.trackEvent('engagement', 'time', timeSpentSeconds + ' seconds');
            }
        }, 10000); // Check every 10 seconds
    }
    
    function stopTimeTracking() {
        clearInterval(timeSpentInterval);
        analytics.trackEvent('engagement', 'total_time', timeSpentSeconds + ' seconds');
    }
    
    // Start tracking time
    startTimeTracking();
    
    // Stop tracking when page is hidden or unloaded
    document.addEventListener('visibilitychange', function() {
        if (document.visibilityState === 'hidden') {
            stopTimeTracking();
        } else {
            startTimeTracking();
        }
    });
    
    window.addEventListener('beforeunload', function() {
        stopTimeTracking();
    });
    
    // Expose analytics object globally
    window.portfolioAnalytics = analytics;
})();
