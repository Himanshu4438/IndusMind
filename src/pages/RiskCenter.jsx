function RiskCenter() {
  const risks = [
    {
      machine: "M-102",
      name: "Hydraulic Press",
      risk: "82%",
      level: "HIGH",
      levelClass: "danger",
      reason: "High temperature + abnormal vibration",
      impact: "Possible production downtime",
    },
    {
      machine: "M-107",
      name: "CNC Unit",
      risk: "64%",
      level: "MEDIUM",
      levelClass: "warning",
      reason: "Increasing vibration trend",
      impact: "Maintenance may be required",
    },
    {
      machine: "M-114",
      name: "Cooling System",
      risk: "48%",
      level: "MEDIUM",
      levelClass: "warning",
      reason: "Temperature rising gradually",
      impact: "Efficiency may decrease",
    },
    {
      machine: "M-103",
      name: "Assembly Unit",
      risk: "12%",
      level: "LOW",
      levelClass: "healthy",
      reason: "Operating within normal range",
      impact: "No immediate impact",
    },
  ];

  return (
    <div className="main">
      <div className="page-title">
        <div className="breadcrumb">Factory 01 / Risk Center</div>
        <h1>Operational Risk Center</h1>
        <p>
          AI-powered detection of machine and production risks.
        </p>
      </div>

      <div className="metrics">
        <div className="metric-card risk-metric">
          <div className="metric-top">
            <span>Overall Risk Score</span>
            <div className="metric-icon red">⚠</div>
          </div>

          <div className="metric-value">68/100</div>

          <div className="metric-bottom">
            <span className="trend negative">HIGH RISK</span>
            <span>Current status</span>
          </div>
        </div>

        <div className="metric-card">
          <div className="metric-top">
            <span>High Risk</span>
            <div className="metric-icon red">!</div>
          </div>

          <div className="metric-value">1</div>

          <div className="metric-bottom">
            <span>Immediate attention</span>
          </div>
        </div>

        <div className="metric-card">
          <div className="metric-top">
            <span>Medium Risk</span>
            <div className="metric-icon purple">⚠</div>
          </div>

          <div className="metric-value">2</div>

          <div className="metric-bottom">
            <span>Monitor closely</span>
          </div>
        </div>

        <div className="metric-card">
          <div className="metric-top">
            <span>Potential Exposure</span>
            <div className="metric-icon blue">₹</div>
          </div>

          <div className="metric-value">₹2.1L</div>

          <div className="metric-bottom">
            <span>Revenue at risk</span>
          </div>
        </div>
      </div>

      <section className="panel" style={{ marginTop: "24px" }}>
        <div className="panel-header">
          <div>
            <h2>AI Risk Detection</h2>
            <p>Current operational risks detected by IndusMind</p>
          </div>

          <span className="live-badge">● LIVE</span>
        </div>

        <div className="machine-table">
          <div className="table-head">
            <span>Machine</span>
            <span>Failure Risk</span>
            <span>Risk Level</span>
            <span>Reason</span>
            <span>Impact</span>
          </div>

          {risks.map((item) => (
            <div className="machine-row" key={item.machine}>
              <div className="machine-name">
                <div className={`machine-symbol ${item.levelClass}`}>
                  ⚙
                </div>

                <div>
                  <strong>{item.machine}</strong>
                  <span>{item.name}</span>
                </div>
              </div>

              <strong>{item.risk}</strong>

              <span className={`machine-status ${item.levelClass}`}>
                <i></i>
                {item.level}
              </span>

              <span>{item.reason}</span>

              <span>{item.impact}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="panel" style={{ marginTop: "24px" }}>
        <div className="panel-header">
          <div>
            <h2>Critical Risk Alert</h2>
            <p>AI explanation and recommended action</p>
          </div>

          <span className="live-badge">AI</span>
        </div>

        <div className="ai-message">
          <div className="ai-message-icon">⚠</div>

          <div>
            <span className="message-label">HIGH RISK DETECTED</span>

            <h3>M-102 has an 82% failure probability</h3>

            <p>
              IndusMind detected abnormal temperature and vibration
              patterns in the Hydraulic Press. These signals indicate
              an increased probability of machine failure.
            </p>
          </div>
        </div>

        <div className="recommendation">
          <div className="recommendation-title">
            <span>✓</span>
            Recommended Action
          </div>

          <p>
            Stop non-critical operation of M-102, inspect the cooling
            system and vibration components, and schedule preventive
            maintenance before the next production cycle.
          </p>
        </div>
      </section>
    </div>
  );
}

export default RiskCenter;