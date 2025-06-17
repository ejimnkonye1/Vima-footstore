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
        const token = localStorage.getItem('accessToken');
        const headers = new Headers(options.headers || {});
        headers.set('Content-Type', 'application/json');
        if (token) headers.set('Authorization', `Bearer ${token}`);
        
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
  
            // Option 2: Send refresh token in Authorization header (alternative)
            const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/refresh`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${refreshToken}`
                }
            });
            

            if (!response.ok) throw new Error('Refresh failed');
            
            const data = await response.json();
            console.log(data)
            // Store the new access token
            if (data.accessToken) {
                localStorage.setItem('accessToken', data.accessToken);
                
                // If backend returns a new refresh token (rotation), store it
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
        // You might want to clear user state here too
    }
};