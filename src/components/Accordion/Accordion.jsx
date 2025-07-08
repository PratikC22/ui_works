import React, { useState, useRef } from "react";
import BackButton from "../BackButton/BackButton";
import Sidebar from "../Sidebar/Sidebar";

const Accordion = () => {
  const items = [
    {
      id: 1,
      title: "Accordion Rules",
      content: (
        <div>
          <ul style={{ listStyle: "disc", paddingLeft: "20px", margin: 0 }}>
            <li style={{ marginBottom: "8px" }}>
              Only one section can be open at a time
            </li>
            <li style={{ marginBottom: "8px" }}>
              Click any header to expand that section
            </li>
            <li style={{ marginBottom: "8px" }}>
              Click the same header again to collapse it
            </li>
            <li style={{ marginBottom: "8px" }}>
              Use keyboard navigation (Tab/Enter/Space) for accessibility
            </li>
            <li style={{ marginBottom: "8px" }}>
              Content should expand smoothly without jumping
            </li>
          </ul>
        </div>
      ),
    },
    {
      id: 2,
      title: "Implementation Hints",
      content: (
        <div>
          <ul style={{ listStyle: "disc", paddingLeft: "20px", margin: 0 }}>
            <li style={{ marginBottom: "8px" }}>
              <span
                style={{
                  display: "inline-block",
                  width: "12px",
                  height: "12px",
                  backgroundColor: "#f9f9f9",
                  border: "1px solid #999",
                  marginRight: "6px",
                  verticalAlign: "middle",
                  borderRadius: "2px",
                }}
              ></span>
              Use background{" "}
              <code
                style={{
                  background: "#f0f0f0",
                  padding: "2px 4px",
                  borderRadius: "3px",
                  fontSize: "13px",
                }}
              >
                #f9f9f9
              </code>{" "}
              for headers
            </li>
            <li style={{ marginBottom: "8px" }}>
              <span
                style={{
                  display: "inline-block",
                  width: "12px",
                  height: "12px",
                  backgroundColor: "#fff",
                  border: "1px solid #999",
                  marginRight: "6px",
                  verticalAlign: "middle",
                  borderRadius: "2px",
                }}
              ></span>
              Use background{" "}
              <code
                style={{
                  background: "#f0f0f0",
                  padding: "2px 4px",
                  borderRadius: "3px",
                  fontSize: "13px",
                }}
              >
                #fff
              </code>{" "}
              for content
            </li>
            <li style={{ marginBottom: "8px" }}>
              <span
                style={{
                  display: "inline-block",
                  width: "12px",
                  height: "12px",
                  backgroundColor: "#333",
                  border: "1px solid #000",
                  marginRight: "6px",
                  verticalAlign: "middle",
                  borderRadius: "2px",
                }}
              ></span>
              Use{" "}
              <code
                style={{
                  background: "#f0f0f0",
                  padding: "2px 4px",
                  borderRadius: "3px",
                  fontSize: "13px",
                }}
              >
                #333
              </code>{" "}
              for main borders
            </li>
            <li style={{ marginBottom: "8px" }}>
              <span
                style={{
                  display: "inline-block",
                  width: "12px",
                  height: "12px",
                  backgroundColor: "#ccc",
                  border: "1px solid #999",
                  marginRight: "6px",
                  verticalAlign: "middle",
                  borderRadius: "2px",
                }}
              ></span>
              Use{" "}
              <code
                style={{
                  background: "#f0f0f0",
                  padding: "2px 4px",
                  borderRadius: "3px",
                  fontSize: "13px",
                }}
              >
                #ccc
              </code>{" "}
              for divider borders
            </li>
            <li style={{ marginBottom: "8px" }}>
              Animate height directly, not maxHeight for smooth transitions
            </li>
            <li style={{ marginBottom: "8px" }}>
              Use refs to measure actual content height
            </li>
          </ul>
        </div>
      ),
    },
    {
      id: 3,
      title: "Best Practices",
      content: (
        <div>
          <ul style={{ listStyle: "disc", paddingLeft: "20px", margin: 0 }}>
            <li style={{ marginBottom: "8px" }}>
              Keep content concise and scannable
            </li>
            <li style={{ marginBottom: "8px" }}>
              Use clear, descriptive section titles
            </li>
            <li style={{ marginBottom: "8px" }}>
              Maintain consistent spacing and typography
            </li>
            <li style={{ marginBottom: "8px" }}>
              Provide visual feedback for hover and active states
            </li>
            <li style={{ marginBottom: "8px" }}>
              Include ARIA attributes for screen readers
            </li>
            <li style={{ marginBottom: "8px" }}>
              Test with keyboard navigation
            </li>
            <li style={{ marginBottom: "8px" }}>
              Consider mobile responsiveness
            </li>
          </ul>
        </div>
      ),
    },
    {
      id: 4,
      title: "Common Issues",
      content: (
        <div>
          <ul style={{ listStyle: "disc", paddingLeft: "20px", margin: 0 }}>
            <li style={{ marginBottom: "8px" }}>
              <strong>Jittery animations:</strong> Avoid maxHeight transitions,
              use actual height
            </li>
            <li style={{ marginBottom: "8px" }}>
              <strong>Poor accessibility:</strong> Missing ARIA labels and
              keyboard support
            </li>
            <li style={{ marginBottom: "8px" }}>
              <strong>Layout shifts:</strong> Content jumping during
              expand/collapse
            </li>
            <li style={{ marginBottom: "8px" }}>
              <strong>Mobile issues:</strong> Touch targets too small, poor
              responsive design
            </li>
            <li style={{ marginBottom: "8px" }}>
              <strong>Performance:</strong> Too many DOM manipulations during
              animation
            </li>
            <li style={{ marginBottom: "8px" }}>
              <strong>Browser compatibility:</strong> CSS transitions not
              supported in older browsers
            </li>
          </ul>
        </div>
      ),
    },
  ];

  const [openId, setOpenId] = useState(null);
  const contentRefs = useRef({});

  const toggle = (id) => setOpenId(openId === id ? null : id);

  const styles = {
    accordion: {
      maxWidth: "800px",
      margin: "2rem auto",
      borderRadius: "12px",
      overflow: "hidden",
      boxShadow: "0 4px 12px rgba(0, 0, 0, 0.05)",
      background: "#fff",
      border: "4px solid #333",
      height: "fit-content",
    },
    accordionInner: {
      borderRadius: "8px",
      overflow: "hidden",
      background: "#fff",
    },
    accordionItem: {
      borderBottom: "1px solid #ccc",
      transition: "all 0.3s ease",
      overflow: "hidden",
    },
    accordionItemLast: {
      borderBottom: "none",
    },
    accordionHeader: {
      width: "100%",
      textAlign: "left",
      padding: "20px 24px",
      fontWeight: "600",
      fontSize: "16px",
      color: "#111",
      background: "#f9f9f9",
      border: "none",
      cursor: "pointer",
      transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
      position: "relative",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      fontFamily: '"Segoe UI", sans-serif',
    },
    accordionHeaderHover: {
      background: "#f0f0f0",
      transform: "translateY(-1px)",
    },
    accordionHeaderActive: {
      background: "#e8e8e8",
      color: "#000",
    },
    chevron: {
      width: "20px",
      height: "20px",
      transition: "transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
      fill: "currentColor",
    },
    chevronOpen: {
      transform: "rotate(180deg)",
    },
    accordionContent: {
      overflow: "hidden",
      transition: "height 0.3s ease-out",
      background: "#fff",
    },
    accordionContentOpen: {
      borderTop: "1px solid #ccc",
    },
    accordionContentInner: {
      padding: "24px",
      color: "#222",
      lineHeight: "1.6",
      fontSize: "14px",
      fontFamily: '"Segoe UI", sans-serif',
    },
  };

  const ChevronIcon = ({ isOpen }) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 24 24"
      style={{
        transition: "transform 0.3s ease",
        transform: isOpen ? "rotate(90deg)" : "rotate(0deg)",
        transformOrigin: "center",
      }}
    >
      <path
        fill="currentColor"
        d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6z"
      />
    </svg>
  );

  return (
    <section
      style={{
        width: "100vw",
        height: "100%",
        display: "flex",
      }}
    >
      <Sidebar>
        <BackButton />
      </Sidebar>
      <div style={styles.accordion}>
        <div style={styles.accordionInner}>
          {items.map(({ id, title, content }, index) => {
            const isOpen = openId === id;
            const isLast = index === items.length - 1;

            return (
              <div
                key={id}
                style={{
                  ...styles.accordionItem,
                  ...(isLast ? styles.accordionItemLast : {}),
                }}
              >
                <button
                  style={{
                    ...styles.accordionHeader,
                    ...(isOpen ? styles.accordionHeaderActive : {}),
                  }}
                  onMouseEnter={(e) => {
                    if (!isOpen) {
                      Object.assign(
                        e.target.style,
                        styles.accordionHeaderHover
                      );
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isOpen) {
                      Object.assign(e.target.style, {
                        background: "#f9f9f9",
                        transform: "translateY(0)",
                      });
                    }
                  }}
                  onClick={() => toggle(id)}
                  aria-expanded={isOpen}
                  aria-controls={`panel-${id}`}
                  id={`accordion-${id}`}
                >
                  <span>{title}</span>
                  <ChevronIcon isOpen={isOpen} />
                </button>
                <div
                  ref={(el) => (contentRefs.current[id] = el)}
                  id={`panel-${id}`}
                  role="region"
                  aria-labelledby={`accordion-${id}`}
                  style={{
                    ...styles.accordionContent,
                    ...(isOpen ? styles.accordionContentOpen : {}),
                    height: isOpen
                      ? contentRefs.current[id]?.scrollHeight || "auto"
                      : "0px",
                  }}
                >
                  <div style={styles.accordionContentInner}>{content}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Accordion;
