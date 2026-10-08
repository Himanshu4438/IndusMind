function Reports() {
  const reportData = [
    {
      metric: "Production Efficiency",
      current: "87.4%",
      target: "90%",
      change: "+3.6%",
      status: "On Track",
      statusClass: "healthy",
    },
    {
      metric: "Machine Availability",
      current: "90%",
      target: "95%",
      change: "+2.8%",
      status: "On Track",
      statusClass: "healthy",
    },
    {
      metric: "Inventory Health",
      current: "72%",
      target: "85%",
      change: "+4.1%",
      status: "Needs Attention",
      statusClass: "warning",
    },
    {
      metric: "Operational Risk",
      current: "68/100",
      target: "< 40",
      change: "-6.2%",
      status: "High Risk",
      statusClass: "danger",
    },
  ];

  return (
    <div className="main">
      <div className="page-title">
        <div className="breadcrumb">Factory 01 / Reports</div>
        <h1>Factory Reports</h1>
        <p>
          Performance, operational risk and financial impact summary.
        </p>
      </div>

      {/* Financial Overview */}
      <div className="metrics">
        <div className="metric-card">
          <div className="metric-top">
            <span>Total Revenue</span>
            <div className="metric-icon blue">₹</div>
          </div>

          <div className="metric-value">₹24.8L</div>

          <div className="metric-bottom">
            <span className="trend positive">↑ 8.4%</span>
            <span>vs last month</span>
          </div>
        </div>

        <div className="metric-card">
          <div className="metric-top">
            <span>Projected Revenue</span>
            <div className="metric-icon purple">↗</div>
          </div>

          <div className="metric-value">₹28.4L</div>

          <div className="metric-bottom">
            <span>Based on current performance</span>
          </div>
        </div>

        <div className="metric-card risk-metric">
          <div className="metric-top">
            <span>Revenue at Risk</span>
            <div className="metric-icon red">⚠</div>
          </div>

          <div className="metric-value">₹2.1L</div>

          <div className="metric-bottom">
            <span className="trend negative">Operational risk</span>
          </div>
        </div>

        <div className="metric-card">
          <div className="metric-top">
            <span>AI Savings Potential</span>
            <div className="metric-icon blue">✦</div>
          </div>

          <div className="metric-value">₹1.4L</div>

          <div className="metric-bottom">
            <span>Estimated monthly impact</span>
          </div>
        </div>
      </div>

      {/* Performance Report */}
      <section className="panel" style={{ marginTop: "24px" }}>
        <div className="panel-header">
          <div>
            <h2>Performance Summary</h2>
            <p>Current factory performance against target</p>
          </div>

          <button className="small-button">This Month ▾</button>
        </div>

        <div className="machine-table">
          <div className="table-head">
            <span>Metric</span>
            <span>Current</span>
            <span>Target</span>
            <span>Change</span>
            <span>Status</span>
          </div>

          {reportData.map((item) => (
            <div className="machine-row" key={item.metric}>
              <div className="machine-name">
                <div className={`machine-symbol ${item.statusClass}`}>
                  ◈
                </div>

                <div>
                  <strong>{item.metric}</strong>
                  <span>Factory KPI</span>
                </div>
              </div>

              <strong>{item.current}</strong>

              <span>{item.target}</span>

              <span
                className={
                  item.change.startsWith("+")
                    ? "trend positive"
                    : "trend negative"
                }
              >
                {item.change}
              </span>

              <span className={`machine-status ${item.statusClass}`}>
                <i></i>
                {item.status}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* Financial Impact */}
      <section className="panel" style={{ marginTop: "24px" }}>
        <div className="panel-header">
          <div>
            <h2>Financial Impact</h2>
            <p>Operational issues translated into financial impact</p>
          </div>

          <span className="live-badge">AI</span>
        </div>

        <div className="metrics">
          <div className="metric-card">
            <div className="metric-top">
              <span>Downtime Loss</span>
              <div className="metric-icon red">↓</div>
            </div>

            <div className="metric-value">₹86K</div>

            <div className="metric-bottom">
              <span>Production downtime</span>
            </div>
          </div>

          <div className="metric-card">
            <div className="metric-top">
              <span>Inventory Risk</span>
              <div className="metric-icon purple">⚠</div>
            </div>

            <div className="metric-value">₹54K</div>

            <div className="metric-bottom">
              <span>Potential shortage impact</span>
            </div>
          </div>

          <div className="metric-card">
            <div className="metric-top">
              <span>Maintenance Impact</span>
              <div className="metric-icon blue">⚙</div>
            </div>

            <div className="metric-value">₹32K</div>

            <div className="metric-bottom">
              <span>Estimated maintenance cost</span>
            </div>
          </div>
        </div>
      </section>

      {/* AI Report */}
      <section className="panel" style={{ marginTop: "24px" }}>
        <div className="panel-header">
          <div>
            <h2>AI Executive Summary</h2>
            <p>IndusMind's operational assessment</p>
          </div>

          <span className="live-badge">✦ AI</span>
        </div>

        <div className="ai-message">
          <div className="ai-message-icon">✦</div>

          <div>
            <span className="message-label">AI SUMMARY</span>

            <h3>
              Factory performance is improving, but operational risk
              remains high.
            </h3>

            <p>
              Production efficiency is currently at 87.4% and machine
              availability is 90%. However, M-102 has a high failure
              probability and inventory levels for selected materials
              are below the recommended threshold.
            </p>
          </div>
        </div>

        <div className="recommendation">
          <div className="recommendation-title">
            <span>✓</span>
            Management Recommendation
          </div>

          <p>
            Prioritize M-102 preventive maintenance, replenish low-stock
            materials and monitor production efficiency to reduce the
            current ₹2.1L revenue exposure.
          </p>
        </div>
      </section>
    </div>
  );
}

export default Reports;