export const apiClient = {
    async request(url, options = {}) {
        // Initial request with access token
        let response = await this._makeRequest(url, options);
        
        // If unauthorized, try refresh
        if (response.status === 401) {
            const refreshed = await this._refreshToken();
            if (refreshed) {
                // Retry with new token
                response = await this._makeRequest(url, options);
            } else {
                this._clearAuth();
                window.location.href = '/login';
            }
        }
        
        return response;
    },

    async _makeRequest(url, options) {
        console.log('Available tokens during request:');
        console.log('accessToken:', localStorage.getItem('accessToken'));
        console.log('refreshToken:', localStorage.getItem('refreshToken'));
        
        const token = localStorage.getItem('accessToken');
        const headers = new Headers(options.headers || {});
        
        // Only set Content-Type if it's not FormData (browser will set it automatically for FormData)
        if (!(options.body instanceof FormData)) {
            headers.set('Content-Type', 'application/json');
        }
        
        if (token) headers.set('Authorization', `Bearer ${token}`);
        
        // Log request details for debugging
        console.log('Making request to:', url);
        console.log('Request options:', {
            ...options,
            headers: Object.fromEntries(headers.entries()),
            body: options.body instanceof FormData ? '[FormData]' : options.body
        });
        
        return fetch(url, {
            ...options,
            headers,
            credentials: 'include'
        });
    },

    async _refreshToken() {
        try {
            const refreshToken = localStorage.getItem('refreshToken');
            if (!refreshToken) {
                console.error('No refresh token available');
                return false;
            }
  
            const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/refresh`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${refreshToken}`,
                    'Content-Type': 'application/json'
                }
            });
            
            if (!response.ok) throw new Error('Refresh failed');
            
            const data = await response.json();
            console.log('Refresh token response:', data);
            
            if (data.accessToken) {
                localStorage.setItem('accessToken', data.accessToken);
                
                if (data.refreshToken) {
                    localStorage.setItem('refreshToken', data.refreshToken);
                }
                
                return true;
            }
            
            return false;
            
        } catch (error) {
            console.error('Refresh failed:', error);
            return false;
        }
    },

    _clearAuth() {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        // Clear any other user-related state if needed
    }
};