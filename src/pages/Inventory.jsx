function Inventory() {
  const inventory = [
    {
      name: "Steel Sheet",
      category: "Raw Material",
      stock: 120,
      reorder: 100,
      unit: "units",
      status: "Healthy",
      statusClass: "healthy",
    },
    {
      name: "Aluminium",
      category: "Raw Material",
      stock: 280,
      reorder: 150,
      unit: "units",
      status: "Healthy",
      statusClass: "healthy",
    },
    {
      name: "Copper Wire",
      category: "Raw Material",
      stock: 75,
      reorder: 100,
      unit: "units",
      status: "Low Stock",
      statusClass: "danger",
    },
    {
      name: "Industrial Bearings",
      category: "Component",
      stock: 42,
      reorder: 50,
      unit: "units",
      status: "Low Stock",
      statusClass: "danger",
    },
    {
      name: "Lubricant Oil",
      category: "Maintenance",
      stock: 86,
      reorder: 40,
      unit: "litres",
      status: "Healthy",
      statusClass: "healthy",
    },
  ];

  return (
    <div className="main">
      <div className="page-title">
        <div className="breadcrumb">Factory 01 / Inventory</div>
        <h1>Inventory Management</h1>
        <p>Monitor raw materials, stock levels and reorder requirements.</p>
      </div>

      <div className="metrics">
        <div className="metric-card">
          <div className="metric-top">
            <span>Total Items</span>
            <div className="metric-icon blue">▦</div>
          </div>
          <div className="metric-value">47</div>
          <div className="metric-bottom">
            <span>Across factory</span>
          </div>
        </div>

        <div className="metric-card">
          <div className="metric-top">
            <span>Inventory Health</span>
            <div className="metric-icon purple">↗</div>
          </div>
          <div className="metric-value">72%</div>
          <div className="metric-bottom">
            <span className="trend positive">↑ 4.1%</span>
            <span>vs last week</span>
          </div>
        </div>

        <div className="metric-card">
          <div className="metric-top">
            <span>Low Stock Items</span>
            <div className="metric-icon red">⚠</div>
          </div>
          <div className="metric-value">6</div>
          <div className="metric-bottom">
            <span className="trend negative">Needs attention</span>
          </div>
        </div>

        <div className="metric-card">
          <div className="metric-top">
            <span>Inventory Value</span>
            <div className="metric-icon blue">₹</div>
          </div>
          <div className="metric-value">₹8.6L</div>
          <div className="metric-bottom">
            <span>Current stock value</span>
          </div>
        </div>
      </div>

      <section className="panel" style={{ marginTop: "24px" }}>
        <div className="panel-header">
          <div>
            <h2>Inventory Overview</h2>
            <p>Current stock levels and reorder thresholds</p>
          </div>

          <span className="live-badge">● LIVE</span>
        </div>

        <div className="machine-table">
          <div className="table-head">
            <span>Material</span>
            <span>Category</span>
            <span>Current Stock</span>
            <span>Reorder Level</span>
            <span>Status</span>
          </div>

          {inventory.map((item) => (
            <div className="machine-row" key={item.name}>
              <div className="machine-name">
                <div className={`machine-symbol ${item.statusClass}`}>
                  ◈
                </div>

                <div>
                  <strong>{item.name}</strong>
                  <span>{item.unit}</span>
                </div>
              </div>

              <span>{item.category}</span>

              <span>{item.stock} {item.unit}</span>

              <span>{item.reorder} {item.unit}</span>

              <span className={`machine-status ${item.statusClass}`}>
                <i></i>
                {item.status}
              </span>
            </div>
          ))}
        </div>
      </section>

      <section className="panel" style={{ marginTop: "24px" }}>
        <div className="panel-header">
          <div>
            <h2>AI Inventory Insight</h2>
            <p>IndusMind detected a potential stock risk</p>
          </div>

          <span className="live-badge">AI</span>
        </div>

        <div className="ai-message">
          <div className="ai-message-icon">✦</div>

          <div>
            <span className="message-label">AI INSIGHT</span>

            <h3>Copper Wire inventory is below the reorder level</h3>

            <p>
              Current stock is 75 units while the reorder threshold is
              100 units. Continuing production at the current rate may
              create a material shortage.
            </p>
          </div>
        </div>

        <div className="recommendation">
          <div className="recommendation-title">
            <span>✓</span>
            Recommended Action
          </div>

          <p>
            Initiate a purchase order for Copper Wire before the next
            production cycle to avoid potential production delays.
          </p>
        </div>
      </section>
    </div>
  );
}

export default Inventory;