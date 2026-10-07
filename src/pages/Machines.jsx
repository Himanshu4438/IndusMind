function Machines() {
  const machines = [
    {
      id: "M-101",
      name: "CNC Production Unit",
      type: "CNC",
      temperature: "68°C",
      vibration: "2.1 mm/s",
      status: "Healthy",
      statusClass: "healthy",
    },
    {
      id: "M-102",
      name: "Hydraulic Press",
      type: "Press",
      temperature: "86°C",
      vibration: "5.2 mm/s",
      status: "High Risk",
      statusClass: "danger",
    },
    {
      id: "M-103",
      name: "Assembly Unit",
      type: "Assembly",
      temperature: "64°C",
      vibration: "1.8 mm/s",
      status: "Healthy",
      statusClass: "healthy",
    },
    {
      id: "M-104",
      name: "Cutting Machine",
      type: "Cutting",
      temperature: "61°C",
      vibration: "2.4 mm/s",
      status: "Idle",
      statusClass: "idle",
    },
  ];

  return (
    <div className="main">
      <div className="page-title">
        <div className="breadcrumb">Factory 01 / Machines</div>

        <h1>Machine Monitoring</h1>
        <p>Monitor real-time machine health and performance.</p>
      </div>

      <div className="metrics">
        <div className="metric-card">
          <div className="metric-top">
            <span>Total Machines</span>
            <div className="metric-icon blue">◈</div>
          </div>

          <div className="metric-value">20</div>

          <div className="metric-bottom">
            <span>18 Active</span>
            <span>2 Idle</span>
          </div>
        </div>

        <div className="metric-card">
          <div className="metric-top">
            <span>Machine Availability</span>
            <div className="metric-icon purple">↗</div>
          </div>

          <div className="metric-value">90%</div>

          <div className="metric-bottom">
            <span className="trend positive">↑ 2.8%</span>
            <span>vs yesterday</span>
          </div>
        </div>

        <div className="metric-card">
          <div className="metric-top">
            <span>Healthy Machines</span>
            <div className="metric-icon blue">✓</div>
          </div>

          <div className="metric-value">17</div>

          <div className="metric-bottom">
            <span className="trend positive">85%</span>
            <span>of total machines</span>
          </div>
        </div>

        <div className="metric-card risk-metric">
          <div className="metric-top">
            <span>Machines at Risk</span>
            <div className="metric-icon red">⚠</div>
          </div>

          <div className="metric-value">3</div>

          <div className="metric-bottom">
            <span className="trend negative">Needs attention</span>
          </div>
        </div>
      </div>

      <section className="panel machine-panel" style={{ marginTop: "24px" }}>
        <div className="panel-header">
          <div>
            <h2>Machine Health</h2>
            <p>Real-time condition of factory machines</p>
          </div>

          <span className="live-badge">● LIVE</span>
        </div>

        <div className="machine-table">
          <div className="table-head">
            <span>Machine</span>
            <span>Type</span>
            <span>Temperature</span>
            <span>Vibration</span>
            <span>Status</span>
          </div>

          {machines.map((machine) => (
            <div className="machine-row" key={machine.id}>
              <div className="machine-name">
                <div className={`machine-symbol ${machine.statusClass}`}>
                  ◈
                </div>

                <div>
                  <strong>{machine.id}</strong>
                  <span>{machine.name}</span>
                </div>
              </div>

              <span>{machine.type}</span>

              <span>{machine.temperature}</span>

              <span>{machine.vibration}</span>

              <span
                className={`machine-status ${machine.statusClass}`}
              >
                <i></i>
                {machine.status}
              </span>
            </div>
          ))}
        </div>
      </section>

      <section className="panel" style={{ marginTop: "24px" }}>
        <div className="panel-header">
          <div>
            <h2>AI Machine Insight</h2>
            <p>IndusMind detected an operational risk</p>
          </div>

          <span className="live-badge">AI</span>
        </div>

        <div className="ai-message">
          <div className="ai-message-icon">✦</div>

          <div>
            <span className="message-label">AI INSIGHT</span>

            <h3>M-102 requires immediate attention</h3>

            <p>
              Hydraulic Press M-102 has an elevated failure probability
              because its temperature and vibration are above the normal
              operating range.
            </p>
          </div>
        </div>

        <div className="recommendation">
          <div className="recommendation-title">
            <span>✓</span>
            Recommended Action
          </div>

          <p>
            Inspect the cooling system and check machine vibration before
            the next production cycle.
          </p>
        </div>
      </section>
    </div>
  );
}

export default Machines;