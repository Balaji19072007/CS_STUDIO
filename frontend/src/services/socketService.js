// frontend/src/services/socketService.js
import { io } from 'socket.io-client';

class SocketService {
  constructor() {
    this.socket = null;
    this.isConnected = false;
    this.eventCallbacks = new Map();
    this.connectionAttempts = 0;
    this.maxConnectionAttempts = 5;
    this.reconnectTimeout = null;
    this.userId = null;
  }

  connect(token) {
    // Prevent multiple connections
    if (this.socket) {
      console.log('🔌 Socket already initialized or connecting');
      return;
    }

    // Clear any pending reconnect
    if (this.reconnectTimeout) {
      clearTimeout(this.reconnectTimeout);
      this.reconnectTimeout = null;
    }

    const API_URL = import.meta.env.VITE_SOCKET_URL || import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';
    
    console.log('🔌 Attempting socket connection to:', API_URL);
    
    try {
      // Get user ID before connecting
      this.userId = this.getUserId();
      
      this.socket = io(API_URL, {
        auth: {
          token: token
        },
        transports: ['websocket', 'polling'],
        timeout: 10000,
        forceNew: true,
        reconnection: true,
        reconnectionAttempts: this.maxConnectionAttempts,
        reconnectionDelay: 1000,
        reconnectionDelayMax: 5000,
        randomizationFactor: 0.5
      });

      this.setupEventListeners();
      
    } catch (error) {
      console.error('🔌❌ Socket connection setup failed:', error);
    }
  }

  getUserId() {
    try {
      const userData = localStorage.getItem('userData');
      if (userData) {
        const user = JSON.parse(userData);
        return user.id || user._id;
      }
    } catch (error) {
      console.error('Error getting user ID:', error);
    }
    return null;
  }

  joinNotificationRoom() {
    if (this.socket && this.isConnected && this.userId) {
      console.log('👤 Joining notification room for user:', this.userId);
      this.socket.emit('join-notifications', this.userId);
    }
  }

  setupEventListeners() {
    if (!this.socket) return;

    this.socket.on('connect', () => {
      console.log('🔌✅ Connected to server, Socket ID:', this.socket.id);
      this.isConnected = true;
      this.connectionAttempts = 0;
      
      // Join notification room immediately after connection
      this.joinNotificationRoom();
    });

    this.socket.on('disconnect', (reason) => {
      console.log('🔌❌ Disconnected from server:', reason);
      this.isConnected = false;
      
      // Attempt reconnect for unexpected disconnects
      if (reason !== 'io client disconnect') {
        this.attemptReconnect();
      }
    });

    this.socket.on('new-notification', (notification) => {
      console.log('📢 REAL-TIME: New notification received via socket:', notification);
      this.triggerCallbacks('new-notification', notification);
    });

    this.socket.on('connect_error', (error) => {
      console.error('🔌❌ Socket connection error:', error.message);
      this.isConnected = false;
      this.attemptReconnect();
    });

    this.socket.on('reconnect_attempt', (attempt) => {
      console.log(`🔄 Reconnection attempt ${attempt}/${this.maxConnectionAttempts}`);
    });

    this.socket.on('reconnect', () => {
      console.log('✅ Reconnected to server, rejoining rooms...');
      this.joinNotificationRoom();
    });

    this.socket.on('reconnect_failed', () => {
      console.error('❌ All reconnection attempts failed');
    });

    // Debug: log all incoming events
    this.socket.onAny((event, ...args) => {
      if (event !== 'pong') { // Filter out ping/pong noise
        console.log('🔍 Incoming socket event:', event, args);
      }
    });
  }

  attemptReconnect() {
    const token = localStorage.getItem('token');
    
    if (this.connectionAttempts < this.maxConnectionAttempts && token) {
      this.connectionAttempts++;
      console.log(`🔄 Reconnecting... (${this.connectionAttempts}/${this.maxConnectionAttempts})`);
      
      this.reconnectTimeout = setTimeout(() => {
        this.connect(token);
      }, 2000 * this.connectionAttempts);
    }
  }

  disconnect() {
    if (this.reconnectTimeout) {
      clearTimeout(this.reconnectTimeout);
      this.reconnectTimeout = null;
    }

    if (this.socket) {
      console.log('🔌 Disconnecting socket...');
      this.socket.disconnect();
      this.socket = null;
      this.isConnected = false;
      this.connectionAttempts = 0;
      this.userId = null;
    }
  }

  on(event, callback) {
    if (!this.eventCallbacks.has(event)) {
      this.eventCallbacks.set(event, []);
    }
    this.eventCallbacks.get(event).push(callback);

    // Also register with socket if connected
    if (this.socket) {
      this.socket.on(event, callback);
    }
  }

  off(event, callback) {
    const callbacks = this.eventCallbacks.get(event);
    if (callbacks) {
      const index = callbacks.indexOf(callback);
      if (index > -1) {
        callbacks.splice(index, 1);
      }
    }

    if (this.socket) {
      this.socket.off(event, callback);
    }
  }

  triggerCallbacks(event, data) {
    const callbacks = this.eventCallbacks.get(event) || [];
    callbacks.forEach(callback => {
      try {
        callback(data);
      } catch (error) {
        console.error(`Error in ${event} callback:`, error);
      }
    });
  }

  // Specific notification methods
  onNotification(callback) {
    this.on('new-notification', callback);
  }

  offNotification(callback) {
    this.off('new-notification', callback);
  }

  // Get connection status
  getStatus() {
    return {
      isConnected: this.isConnected,
      socketId: this.socket?.id,
      userId: this.userId,
      connectionAttempts: this.connectionAttempts
    };
  }

  // Manual reconnect
  manualReconnect() {
    const token = localStorage.getItem('token');
    if (token) {
      console.log('🔄 Manual reconnect triggered');
      this.disconnect();
      setTimeout(() => this.connect(token), 500);
    }
  }

  // Force join notification room
  forceJoinRoom() {
    this.joinNotificationRoom();
  }

  // Compiler-specific methods
  setupCompilerListeners(onOutputCallback) {
    if (!this.socket) return;

    this.socket.on('execution-result', (result) => {
      onOutputCallback(result.output, !result.success, false);
    });
    
    this.socket.on('execution-output', (data) => {
      onOutputCallback(data.output, Boolean(data.isError), true);
    });

    this.socket.on('waiting-for-input', () => {
      onOutputCallback('', false, true, true);
    });
  }

  removeCompilerListeners() {
    if (!this.socket) return;
    
    this.socket.off('execution-result');
    this.socket.off('execution-output');
    this.socket.off('waiting-for-input');
  }

  executeCode(code, language, input = '', args = '') {
    if (this.socket && this.isConnected) {
      this.socket.emit('execute-code', { 
        code, 
        language: language.toLowerCase(),
        input,
        args
      });
    } else {
      throw new Error('Compiler socket is not connected.');
    }
  }

  sendInput(input) {
    if (this.socket && this.isConnected) {
      this.socket.emit('send-input', input);
    }
  }

  stopExecution() {
    if (this.socket && this.isConnected) {
      this.socket.emit('stop-execution');
    }
  }
}

// Create instance and expose to window for debugging
const socketService = new SocketService();

// Expose to window for debugging
if (typeof window !== 'undefined') {
  window.socketService = socketService;
  console.log('🔌 SocketService exposed to window.socketService');
}

export default socketService;