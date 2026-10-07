function AICopilot() {
  const insights = [
    {
      title: "Machine M-102 Risk",
      text: "Failure probability is currently 82% due to abnormal temperature and vibration.",
      type: "HIGH RISK",
    },
    {
      title: "Inventory Alert",
      text: "Copper Wire stock is below the reorder threshold and may affect upcoming production.",
      type: "INVENTORY",
    },
    {
      title: "Production Opportunity",
      text: "Production efficiency can improve by approximately 3–5% by reducing machine downtime.",
      type: "OPTIMIZATION",
    },
  ];

  return (
    <div className="main">
      <div className="page-title">
        <div className="breadcrumb">Factory 01 / AI Copilot</div>
        <h1>IndusMind AI Copilot</h1>
        <p>
          Ask questions, understand operational risks and get AI-powered
          recommendations.
        </p>
      </div>

      {/* AI Status */}
      <section className="panel">
        <div className="panel-header">
          <div>
            <h2>AI Operations Assistant</h2>
            <p>
              IndusMind is analyzing your factory's operational data.
            </p>
          </div>

          <span className="live-badge">● AI ONLINE</span>
        </div>

        <div className="ai-message">
          <div className="ai-message-icon">✦</div>

          <div>
            <span className="message-label">INDUSMIND AI</span>

            <h3>
              Your factory currently has 1 critical operational risk.
            </h3>

            <p>
              M-102 has an 82% failure probability and Copper Wire
              inventory is below the recommended reorder level.
              Immediate preventive action can reduce potential
              production and revenue loss.
            </p>
          </div>
        </div>
      </section>

      {/* Ask AI */}
      <section className="panel" style={{ marginTop: "24px" }}>
        <div className="panel-header">
          <div>
            <h2>Ask IndusMind</h2>
            <p>Ask questions about your factory operations.</p>
          </div>
        </div>

        <div className="ai-chat-box">
          <div className="chat-message ai">
            <div className="chat-avatar">✦</div>

            <div className="chat-content">
              <strong>IndusMind AI</strong>

              <p>
                Hello! I can help you understand machine health,
                production performance, inventory risks and financial
                impact.
              </p>

              <p>
                Try asking:
                <br />
                <b>“Which machine is most likely to fail?”</b>
                <br />
                <b>“Why is production efficiency low?”</b>
                <br />
                <b>“What should we fix first?”</b>
              </p>
            </div>
          </div>

          <div className="chat-input-area">
            <input
              type="text"
              placeholder="Ask IndusMind about your factory..."
            />

            <button className="ai-send-button">
              Ask AI
            </button>
          </div>
        </div>
      </section>

      {/* AI Insights */}
      <section className="panel" style={{ marginTop: "24px" }}>
        <div className="panel-header">
          <div>
            <h2>AI-Detected Insights</h2>
            <p>Important findings from current factory data</p>
          </div>

          <span className="live-badge">AI</span>
        </div>

        <div className="ai-insight-grid">
          {insights.map((item) => (
            <div className="ai-insight-card" key={item.title}>
              <span className="message-label">{item.type}</span>

              <h3>{item.title}</h3>

              <p>{item.text}</p>

              <button className="insight-action">
                View Analysis →
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Recommendation */}
      <section className="panel" style={{ marginTop: "24px" }}>
        <div className="panel-header">
          <div>
            <h2>Recommended Actions</h2>
            <p>What IndusMind recommends doing next</p>
          </div>
        </div>

        <div className="recommendation">
          <div className="recommendation-title">
            <span>1</span>
            Inspect Machine M-102
          </div>

          <p>
            Check the hydraulic press cooling system and vibration
            components before the next production cycle.
          </p>
        </div>

        <div className="recommendation" style={{ marginTop: "12px" }}>
          <div className="recommendation-title">
            <span>2</span>
            Reorder Copper Wire
          </div>

          <p>
            Current inventory is below the reorder threshold and may
            create a material shortage.
          </p>
        </div>

        <div className="recommendation" style={{ marginTop: "12px" }}>
          <div className="recommendation-title">
            <span>3</span>
            Reduce Machine Downtime
          </div>

          <p>
            Preventive maintenance can potentially recover production
            capacity and reduce the ₹2.1L revenue exposure.
          </p>
        </div>
      </section>
    </div>
  );
}

export default AICopilot;