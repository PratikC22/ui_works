import * as React from "react";
import Sidebar from "../Sidebar/Sidebar.jsx";
import BackButton from "../BackButton/BackButton.jsx";

const TreeNode = ({ node, level = 0 }) => {
  const [collapsed, setCollapsed] = React.useState(false);
  const hasChildren = node.children && node.children.length > 0;

  const toggleCollapse = () => setCollapsed(!collapsed);

  return (
    <>
      <style>{`
        .tree-node {
          user-select: none;
          font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
          color: #222;
          padding: 8px 0;
          border-bottom: 1px solid #e0e0e0;
          display: flex;
          align-items: center;
          cursor: pointer;
          outline: none;
          text-decoration: none !important;
          /* Indent entire row by level */
          padding-left: calc(var(--level) * 24px + 16px);
        }
        .tree-node:focus-visible {
          outline: none;
          box-shadow: 0 0 0 3px #0b74deaa;
          border-radius: 4px;
          /* no margin/padding change => no layout shift */
        }
        .tree-node.no-children {
          cursor: default;
          padding-left: calc(var(--level) * 24px + 16px);
        }
        .tree-node-label {
          font-weight: 500;
          font-size: 15px;
          user-select: text;
        }
        .tree-node-root .tree-node-label {
          font-weight: 700;
          font-size: 18px;
        }
        /* Arrow icon as before pseudo */
        .tree-node.has-children::before {
          content: "";
          display: inline-block;
          position: absolute;
          left: calc(var(--level) * 24px);
          width: 10px;
          height: 10px;
          border-style: solid;
          border-width: 2px 2px 0 0;
          border-color: #555;
          transform: rotate(45deg);
          transition: transform 0.25s ease;
          will-change: transform;
          margin-left: -4px;
        }
        .tree-node.has-children.collapsed::before {
          transform: rotate(-45deg);
        }
        .tree-node-container {
          position: relative;
        }
      `}</style>

      <div className={`tree-node-container`} style={{ "--level": level }}>
        <div
          className={`tree-node ${
            hasChildren ? "has-children" : "no-children"
          } ${level === 0 ? "tree-node-root" : ""} ${
            collapsed ? "collapsed" : ""
          }`}
          role={hasChildren ? "button" : undefined}
          tabIndex={hasChildren ? 0 : undefined}
          aria-expanded={!collapsed}
          onClick={hasChildren ? toggleCollapse : undefined}
          onKeyDown={(e) => {
            if (hasChildren && (e.key === "Enter" || e.key === " ")) {
              e.preventDefault();
              toggleCollapse();
            }
          }}
        >
          <span className="tree-node-label">{node.label || "Tree Node"}</span>
        </div>
      </div>

      {hasChildren && !collapsed && (
        <div>
          {node.children.map((child) => (
            <TreeNode key={child.id} node={child} level={level + 1} />
          ))}
        </div>
      )}
    </>
  );
};

const TreeView = ({ data = [] }) => {
  const [copySuccess, setCopySuccess] = React.useState("");
  const configText = JSON.stringify(data, null, 2);

  const handleCopy = () => {
    navigator.clipboard.writeText(configText).then(() => {
      setCopySuccess("Copied!");
      setTimeout(() => setCopySuccess(""), 2000);
    });
  };

  const styles = {
    container: {
      width: "100vw",
      display: "flex",
      alignItems: "flex-start",
      color: "#222",
      height: "100%",
    },
    mainSection: {
      width: "100%",
      textAlign: "center",
      padding: "72px",
    },
    header: {
      fontSize: 24,
      marginBottom: 24,
      color: "#222",
      userSelect: "none",
    },
    treeContainer: {
      border: "1px solid #ddd",
      borderRadius: 12,
      background: "#f9f9f9",
      boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
      padding: 20,
      maxHeight: 400,
      overflowY: "auto",
      textAlign: "left",
    },
    row: {
      display: "flex",
      width: "100%",
      maxWidth: 1280,
      gap: 24,
      justifyContent: "space-between",
      flexWrap: "wrap",
    },
    panel: {
      flex: "1 1 300px",
      background: "#f9f9f9",
      padding: 24,
      borderRadius: 12,
      boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
      fontSize: 14,
      minWidth: 280,
      position: "relative",
      color: "#222",
      userSelect: "text",
    },
    panelHeader: {
      fontSize: 18,
      marginBottom: 12,
      color: "#111",
      borderBottom: "1px solid #ccc",
      paddingBottom: 4,
      margin: "0 0 12px 0",
      fontWeight: 700,
      userSelect: "none",
    },
    list: {
      listStyle: "disc",
      paddingLeft: 20,
      margin: 0,
    },
    listItem: {
      marginBottom: 8,
    },
    configBox: {
      backgroundColor: "#eee",
      padding: 12,
      borderRadius: 6,
      fontFamily: "monospace",
      fontSize: 13,
      maxHeight: 150,
      overflowY: "auto",
      whiteSpace: "pre-wrap",
      wordBreak: "break-word",
      marginTop: 0,
      marginBottom: 32,
      userSelect: "text",
    },
    copyButton: {
      position: "absolute",
      top: 16,
      right: 16,
      backgroundColor: "#444",
      border: "none",
      color: "#fff",
      padding: "6px 12px",
      fontSize: 12,
      borderRadius: 4,
      cursor: "pointer",
      userSelect: "none",
      transition: "background-color 0.2s ease",
    },
    copySuccessText: {
      position: "absolute",
      top: 50,
      right: 16,
      fontSize: 12,
      color: "green",
      fontWeight: 600,
      userSelect: "none",
    },
  };

  return (
    <div style={styles.container}>
      <Sidebar>
        <BackButton />
        <section style={styles.row}>
          <aside style={styles.panel}>
            <h2 style={styles.panelHeader}>Rules</h2>
            <ul style={styles.list}>
              <li style={styles.listItem}>Data nodes must have unique IDs</li>
              <li style={styles.listItem}>Each node displays its label</li>
              <li style={styles.listItem}>Supports nested tree structure</li>
              <li style={styles.listItem}>
                Nodes can be expanded/collapsed by clicking
              </li>
              <li style={styles.listItem}>
                Keyboard accessible with Enter/Space
              </li>
              <li style={styles.listItem}>
                Clean and minimal UI consistent with app
              </li>
            </ul>
          </aside>

          <aside style={styles.panel}>
            <h2 style={styles.panelHeader}>Hints</h2>
            <pre style={styles.configBox}>{configText}</pre>
            <button
              style={styles.copyButton}
              onClick={handleCopy}
              onMouseOver={(e) =>
                (e.currentTarget.style.backgroundColor = "#222")
              }
              onMouseOut={(e) =>
                (e.currentTarget.style.backgroundColor = "#444")
              }
              aria-label="Copy config JSON to clipboard"
            >
              Copy
            </button>
            {copySuccess && (
              <div style={styles.copySuccessText}>{copySuccess}</div>
            )}
          </aside>
        </section>
      </Sidebar>
      <section style={styles.mainSection}>
        <h1 style={styles.header}>Tree View</h1>
        <div style={styles.treeContainer}>
          {data.length === 0 && (
            <div
              style={{ color: "#555", fontStyle: "italic", padding: "8px 0" }}
            >
              No nodes available
            </div>
          )}
          {data.map((node) => (
            <TreeNode key={node.id} node={node} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default TreeView;
