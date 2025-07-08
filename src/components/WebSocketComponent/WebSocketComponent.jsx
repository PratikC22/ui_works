import React, { useState, useEffect, useRef, useCallback } from "react";
import "./WebSocketComponent.css";

const WebSocketComponent = () => {
  const [connectionStatus, setConnectionStatus] = useState("disconnected");
  const [notifications, setNotifications] = useState([]);
  const [retryCount, setRetryCount] = useState(0);
  const [lastError, setLastError] = useState(null);
  const [autoReconnect, setAutoReconnect] = useState(true);
  const [wsUrl, setWsUrl] = useState("wss://echo.websocket.org");
  const manualDisconnect = useRef(false);

  const wsRef = useRef(null);
  const retryTimeoutRef = useRef(null);
  const reconnectAttempts = useRef(0);
  const maxReconnectAttempts = 5;
  const baseRetryDelay = 1000;

  const getRetryDelay = useCallback((attempt) => {
    return Math.min(baseRetryDelay * Math.pow(2, attempt), 30000);
  }, []);

  const addNotification = useCallback((type, title, message) => {
    const notification = {
      id: Date.now() + Math.random(),
      type,
      title,
      message,
      timestamp: new Date(),
    };
    setNotifications((prev) => [notification, ...prev.slice(0, 49)]);
  }, []);

  const connect = useCallback(() => {
    if (wsRef.current?.readyState === WebSocket.OPEN) return;

    setConnectionStatus("connecting");
    setLastError(null);

    try {
      const ws = new WebSocket(wsUrl);
      wsRef.current = ws;

      ws.onopen = () => {
        setConnectionStatus("connected");
        reconnectAttempts.current = 0;
        setRetryCount(0);
        addNotification(
          "success",
          "Connected",
          "WebSocket connection established"
        );

        // Send a test message
        ws.send(
          JSON.stringify({
            type: "ping",
            message: "Connection test",
            timestamp: new Date().toISOString(),
          })
        );
      };

      ws.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data);
          addNotification(
            "info",
            "Message Received",
            data.message || event.data
          );
        } catch (error) {
          addNotification("info", "Raw Message", event.data);
        }
      };

      ws.onclose = (event) => {
        console.log("WebSocket closed:", event.code, event.reason);
        setConnectionStatus("disconnected");

        const wasManual = manualDisconnect.current;
        manualDisconnect.current = false;

        if (event.code !== 1000) {
          addNotification(
            "warning",
            "Connection Lost",
            `Code: ${event.code}, Reason: ${event.reason || "Unknown"}`
          );
        }

        if (
          !wasManual &&
          autoReconnect &&
          reconnectAttempts.current < maxReconnectAttempts
        ) {
          handleReconnection();
        } else if (
          !wasManual &&
          reconnectAttempts.current >= maxReconnectAttempts
        ) {
          setLastError("Maximum reconnection attempts reached");
          setConnectionStatus("failed");
          addNotification(
            "error",
            "Connection Failed",
            "Max retry attempts exceeded"
          );
        }
      };

      ws.onerror = (error) => {
        console.error("WebSocket error:", error);
        setLastError("Connection error occurred");
        addNotification(
          "error",
          "Connection Error",
          "Failed to establish WebSocket connection"
        );
      };
    } catch (error) {
      console.error("Failed to create WebSocket:", error);
      setLastError(error.message);
      setConnectionStatus("disconnected");
      addNotification("error", "Connection Failed", error.message);
    }
  }, [wsUrl, autoReconnect, addNotification]);

  const handleReconnection = useCallback(() => {
    const delay = getRetryDelay(reconnectAttempts.current);
    reconnectAttempts.current++;
    setRetryCount(reconnectAttempts.current);
    setConnectionStatus("reconnecting");

    retryTimeoutRef.current = setTimeout(() => {
      connect();
    }, delay);
  }, [connect, getRetryDelay]);

  const disconnect = useCallback(() => {
    manualDisconnect.current = true;

    if (retryTimeoutRef.current) {
      clearTimeout(retryTimeoutRef.current);
    }

    if (wsRef.current?.readyState === WebSocket.OPEN) {
      wsRef.current.close(1000, "Manual disconnect");
    }

    setConnectionStatus("disconnected");
    reconnectAttempts.current = 0;
    setRetryCount(0);
    addNotification(
      "info",
      "Disconnected",
      "WebSocket connection closed manually"
    );
  }, [addNotification]);

  const sendMessage = useCallback(() => {
    if (wsRef.current?.readyState === WebSocket.OPEN) {
      const message = {
        type: "user_message",
        message: `Test message sent at ${new Date().toLocaleTimeString()}`,
        timestamp: new Date().toISOString(),
      };
      wsRef.current.send(JSON.stringify(message));
      addNotification("success", "Message Sent", message.message);
    } else {
      addNotification("error", "Send Failed", "WebSocket is not connected");
    }
  }, [addNotification]);

  const clearNotifications = useCallback(() => {
    setNotifications([]);
  }, []);

  const removeNotification = useCallback((id) => {
    setNotifications((prev) => prev.filter((notif) => notif.id !== id));
  }, []);

  useEffect(() => {
    return () => {
      if (retryTimeoutRef.current) {
        clearTimeout(retryTimeoutRef.current);
      }
      if (wsRef.current?.readyState === WebSocket.OPEN) {
        wsRef.current.close();
      }
    };
  }, []);

  const getStatusClass = (status) => {
    return `status-${status}`;
  };

  const getNotificationClass = (type) => {
    return `notification-${type}`;
  };

  return (
    <div className="websocket-container">
      <div className="header">
        <h1 className="title">WebSocket Integration</h1>
      </div>

      <div className="connection-section">
        <div className="connection-header">
          <div className="url-input-group">
            <label htmlFor="wsUrl" className="url-label">
              WebSocket URL:
            </label>
            <input
              id="wsUrl"
              type="text"
              className="url-input"
              value={wsUrl}
              onChange={(e) => setWsUrl(e.target.value)}
              disabled={
                connectionStatus === "connected" ||
                connectionStatus === "connecting"
              }
              placeholder="wss://echo.websocket.org"
            />
          </div>
        </div>

        <div className="status-section">
          <div className="status-header">
            <div className="status-indicator">
              <div
                className={`status-dot ${getStatusClass(connectionStatus)}`}
              />
              <span
                className={`status-text ${getStatusClass(connectionStatus)}`}
              >
                {connectionStatus.charAt(0).toUpperCase() +
                  connectionStatus.slice(1)}
              </span>
            </div>

            <div className="controls">
              <button
                className={`btn ${
                  connectionStatus === "connected"
                    ? "btn-danger"
                    : "btn-success"
                }`}
                onClick={
                  connectionStatus === "connected" ? disconnect : connect
                }
                disabled={connectionStatus === "connecting"}
              >
                {connectionStatus === "connected" ? "Disconnect" : "Connect"}
              </button>

              <button
                className="btn btn-primary"
                onClick={sendMessage}
                disabled={connectionStatus !== "connected"}
              >
                Send Test Message
              </button>

              <button
                className="btn btn-secondary"
                onClick={clearNotifications}
              >
                Clear All
              </button>
            </div>
          </div>

          <div className="info-grid">
            <div className="info-card">
              <div className="info-label">Status</div>
              <div className="info-value">{connectionStatus}</div>
            </div>
            <div className="info-card">
              <div className="info-label">Retry Attempts</div>
              <div className="info-value">
                {retryCount}/{maxReconnectAttempts}
              </div>
            </div>
            <div className="info-card">
              <div className="info-label">Notifications</div>
              <div className="info-value">{notifications.length}</div>
            </div>
            <div className="info-card">
              <div className="info-label">Auto Reconnect</div>
              <div className="info-value">
                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    className="checkbox"
                    checked={autoReconnect}
                    onChange={(e) => setAutoReconnect(e.target.checked)}
                  />
                  {autoReconnect ? "Enabled" : "Disabled"}
                </label>
              </div>
            </div>
          </div>

          {lastError && <div className="error-message">Error: {lastError}</div>}
        </div>
      </div>

      <div className="notifications-section">
        <div className="notifications-header">
          <h3 className="notifications-title">Real-time Notifications</h3>
          <span className="notifications-count">
            {notifications.length} notifications
          </span>
        </div>

        <div className="notifications-list">
          {notifications.length === 0 ? (
            <div className="empty-state">
              {connectionStatus === "connected"
                ? "Connected! Send a message or wait for incoming data..."
                : "Connect to start receiving notifications"}
            </div>
          ) : (
            notifications.map((notification) => (
              <div
                key={notification.id}
                className={`notification ${getNotificationClass(
                  notification.type
                )}`}
              >
                <div className="notification-content">
                  <div className="notification-title">{notification.title}</div>
                  <div className="notification-message">
                    {notification.message}
                  </div>
                  <div className="notification-time">
                    {notification.timestamp.toLocaleTimeString()}
                  </div>
                </div>
                <button
                  className="notification-close"
                  onClick={() => removeNotification(notification.id)}
                  title="Remove notification"
                  aria-label="Remove notification"
                >
                  ×
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default WebSocketComponent;
