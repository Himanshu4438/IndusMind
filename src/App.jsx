import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Machines from "./pages/Machines";
import Production from "./pages/Production";
import Inventory from "./pages/Inventory";
import RiskCenter from "./pages/RiskCenter";
import AICopilot from "./pages/AICopilot";
import Reports from "./pages/Reports";
import "./index.css";

function Dashboard() {
  const machines = [
    {
      id: "M-101",
      name: "CNC Production Unit",
      temp: "68°C",
      vibration: "2.1 mm/s",
      status: "Healthy",
      type: "healthy",
    },
    {
      id: "M-102",
      name: "Hydraulic Press",
      temp: "86°C",
      vibration: "5.2 mm/s",
      status: "High Risk",
      type: "danger",
    },
    {
      id: "M-103",
      name: "Assembly Unit",
      temp: "64°C",
      vibration: "1.8 mm/s",
      status: "Healthy",
      type: "healthy",
    },
    {
      id: "M-104",
      name: "Cutting Machine",
      temp: "61°C",
      vibration: "2.4 mm/s",
      status: "Idle",
      type: "idle",
    },
  ];

  return (
    <div className="app">

      {/* SIDEBAR */}
      <aside className="sidebar">

        <div className="brand">
          <div className="brand-logo">I</div>
          <div>
            <h2>IndusMind</h2>
            <span>Factory Intelligence</span>
          </div>
        </div>

        <div className="menu-title">WORKSPACE</div>

        <nav className="navigation">
          <Link to="/" className="nav-link active">
            <span>⌂</span>
             Dashboard
             </Link>

          <Link to="/machines" className="nav-link">
              <span>◈</span>
                 Machines
                </Link>

          <Link to="/production" className="nav-link">
               <span>▥</span>
                 Production
                 </Link>

          <Link to="/inventory" className="nav-link">
               <span>▦</span>
                Inventory
                </Link>

          <Link to="/risk-center" className="nav-link">
               <span>⚠</span>
               Risk Center
               <b className="nav-alert">3</b>
             </Link>

          <Link to="/ai-copilot" className="nav-link">
                <span>✦</span>
                AI Copilot
              </Link>

          <Link to="/reports" className="nav-link">
               <span>▤</span>
               Reports
             </Link>
        </nav>

        <div className="sidebar-bottom">

          <div className="system-status">
            <div className="live-dot"></div>
            <div>
              <strong>System Online</strong>
              <span>All services operational</span>
            </div>
          </div>

          <div className="profile">
            <div className="avatar">AM</div>
            <div>
              <strong>Factory Admin</strong>
              <span>Administrator</span>
            </div>
            <span className="more">•••</span>
          </div>

        </div>
      </aside>


      {/* MAIN */}
      <main className="main">

        {/* TOP BAR */}
        <header className="topbar">

          <div className="page-title">
            <div className="breadcrumb">
              Factory 01 <span>/</span> Overview
            </div>

            <h1>Operations Dashboard</h1>
            <p>Monitor your factory and make data-driven decisions.</p>
          </div>

          <div className="top-actions">

            <button className="icon-button">
              ⌕
            </button>

            <button className="icon-button notification">
              ♢
              <i></i>
            </button>

            <div className="factory-button">
              <div className="factory-icon">⌂</div>
              <div>
                <span>Current Factory</span>
                <strong>Factory 01</strong>
              </div>
              <span>⌄</span>
            </div>

          </div>
        </header>


        {/* STATUS BAR */}
        <div className="status-bar">
          <div className="status-left">
            <span className="green-dot"></span>
            Live factory data
            <span className="separator"></span>
            Last updated 2 min ago
          </div>

          <button className="date-button">
            Today ▾
          </button>
        </div>


        {/* KPI SECTION */}
        <section className="metrics">

          <div className="metric-card">
            <div className="metric-top">
              <span>Production Efficiency</span>
              <div className="metric-icon blue">↗</div>
            </div>

            <div className="metric-value">87.4%</div>

            <div className="metric-bottom">
              <span className="trend positive">↑ 4.2%</span>
              <span>vs yesterday</span>
            </div>
          </div>


          <div className="metric-card">
            <div className="metric-top">
              <span>Machine Availability</span>
              <div className="metric-icon purple">◈</div>
            </div>

            <div className="metric-value">90.0%</div>

            <div className="metric-bottom">
              <span className="trend positive">↑ 2.8%</span>
              <span>18 of 20 active</span>
            </div>
          </div>


          <div className="metric-card">
            <div className="metric-top">
              <span>Inventory Health</span>
              <div className="metric-icon orange">▦</div>
            </div>

            <div className="metric-value">72%</div>

            <div className="metric-bottom">
              <span className="trend negative">↓ 8.0%</span>
              <span>needs attention</span>
            </div>
          </div>


          <div className="metric-card risk-metric">
            <div className="metric-top">
              <span>Operational Risk</span>
              <div className="metric-icon red">⚠</div>
            </div>

            <div className="risk-score">
              <div>
                <strong>68</strong>
                <span>/100</span>
              </div>

              <div className="risk-level">HIGH</div>
            </div>

            <div className="risk-progress">
              <div></div>
            </div>

            <div className="metric-bottom">
              <span className="trend negative">3 alerts</span>
              <span>require attention</span>
            </div>
          </div>

        </section>


        {/* MAIN DASHBOARD GRID */}
        <section className="dashboard-grid">

          {/* PRODUCTION CHART */}
          <div className="panel production-panel">

            <div className="panel-header">
              <div>
                <h2>Production Performance</h2>
                <p>Actual production output over today</p>
              </div>

              <button className="small-button">
                Last 24h ▾
              </button>
            </div>

            <div className="chart-summary">
              <div>
                <strong>8,740</strong>
                <span>Units produced</span>
              </div>

              <div>
                <strong>10,000</strong>
                <span>Daily target</span>
              </div>

              <div>
                <strong>87.4%</strong>
                <span>Achievement</span>
              </div>
            </div>

            <div className="chart-area">

              <div className="y-axis">
                <span>1000</span>
                <span>750</span>
                <span>500</span>
                <span>250</span>
                <span>0</span>
              </div>

              <div className="chart-content">

                <div className="grid-line one"></div>
                <div className="grid-line two"></div>
                <div className="grid-line three"></div>
                <div className="grid-line four"></div>
                <div className="grid-line five"></div>

                <div className="bars">
                  <div className="chart-bar" style={{ height: "48%" }}>
                    <span>480</span>
                  </div>

                  <div className="chart-bar" style={{ height: "60%" }}>
                    <span>600</span>
                  </div>

                  <div className="chart-bar" style={{ height: "55%" }}>
                    <span>550</span>
                  </div>

                  <div className="chart-bar" style={{ height: "72%" }}>
                    <span>720</span>
                  </div>

                  <div className="chart-bar" style={{ height: "66%" }}>
                    <span>660</span>
                  </div>

                  <div className="chart-bar highlight" style={{ height: "88%" }}>
                    <span>880</span>
                  </div>

                  <div className="chart-bar" style={{ height: "80%" }}>
                    <span>800</span>
                  </div>

                  <div className="chart-bar" style={{ height: "92%" }}>
                    <span>920</span>
                  </div>
                </div>

                <div className="x-axis">
                  <span>08 AM</span>
                  <span>10 AM</span>
                  <span>12 PM</span>
                  <span>02 PM</span>
                  <span>04 PM</span>
                  <span>06 PM</span>
                  <span>08 PM</span>
                  <span>10 PM</span>
                </div>

              </div>

            </div>
          </div>
          <section className="panel" style={{ marginTop: "24px" }}>
  <div className="panel-header">
    <div>
      <h2>Financial Impact</h2>
      <p>AI-estimated financial impact of current operations</p>
    </div>

    <span className="live-badge">AI</span>
  </div>

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
        <span>Current projection</span>
      </div>
    </div>

    <div className="metric-card risk-metric">
      <div className="metric-top">
        <span>Revenue at Risk</span>
        <div className="metric-icon red">⚠</div>
      </div>

      <div className="metric-value">₹2.1L</div>

      <div className="metric-bottom">
        <span className="trend negative">Operational exposure</span>
      </div>
    </div>

    <div className="metric-card">
      <div className="metric-top">
        <span>AI Savings Potential</span>
        <div className="metric-icon blue">✦</div>
      </div>

      <div className="metric-value">₹1.4L</div>

      <div className="metric-bottom">
        <span>Estimated monthly</span>
      </div>
    </div>
  </div>

  <div className="recommendation" style={{ marginTop: "20px" }}>
    <div className="recommendation-title">
      <span>✦</span>
      IndusMind Financial Insight
    </div>

    <p>
      Current operational risks could expose approximately ₹2.1L in
      revenue. Preventive maintenance, inventory replenishment and
      downtime reduction could recover a significant portion of this
      exposure.
    </p>
  </div>
</section>

          {/* RISK PANEL */}
          <div className="panel risk-panel">

            <div className="panel-header">
              <div>
                <h2>Risk Overview</h2>
                <p>AI detected operational risks</p>
              </div>

              <span className="live-badge">LIVE</span>
            </div>

            <div className="risk-circle">
              <div className="circle-inner">
                <strong>68</strong>
                <span>Risk Score</span>
              </div>
            </div>

            <div className="risk-label">
              <span></span>
              Elevated operational risk
            </div>

            <div className="risk-items">

              <div>
                <span className="risk-dot red-dot"></span>
                <strong>1</strong>
                <small>Critical</small>
              </div>

              <div>
                <span className="risk-dot orange-dot"></span>
                <strong>2</strong>
                <small>Warning</small>
              </div>

              <div>
                <span className="risk-dot green-dot2"></span>
                <strong>15</strong>
                <small>Normal</small>
              </div>

            </div>

          </div>

        </section>


        {/* LOWER SECTION */}
        <section className="lower-grid">

          {/* MACHINE HEALTH */}
          <div className="panel machine-panel">

            <div className="panel-header">
              <div>
                <h2>Machine Health</h2>
                <p>Real-time machine condition</p>
              </div>

              <button className="text-button">
                View all →
              </button>
            </div>

            <div className="machine-table">

              <div className="table-head">
                <span>Machine</span>
                <span>Temperature</span>
                <span>Vibration</span>
                <span>Status</span>
              </div>

              {machines.map((machine) => (
                <div className="machine-row" key={machine.id}>

                  <div className="machine-name">
                    <div className={`machine-symbol ${machine.type}`}>
                      ◈
                    </div>

                    <div>
                      <strong>{machine.id}</strong>
                      <span>{machine.name}</span>
                    </div>
                  </div>

                  <span>{machine.temp}</span>

                  <span>{machine.vibration}</span>

                  <span className={`machine-status ${machine.type}`}>
                    <i></i>
                    {machine.status}
                  </span>

                </div>
              ))}

            </div>

          </div>


          {/* AI COPILOT */}
          <div className="panel copilot-panel">

            <div className="copilot-header">

              <div className="ai-logo">
                ✦
              </div>

              <div>
                <h2>IndusMind AI</h2>
                <p>Operational Copilot</p>
              </div>

              <span className="ai-online">
                ● Online
              </span>

            </div>

            <div className="ai-message">

              <div className="ai-message-icon">
                ✦
              </div>

              <div>
                <span className="message-label">AI INSIGHT</span>

                <h3>M-102 requires attention</h3>

                <p>
                  Machine M-102 has an <strong>82% failure probability</strong>.
                  Temperature and vibration are significantly above its normal
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
                Inspect the cooling system and check vibration before the next
                production cycle.
              </p>

            </div>

            <button className="copilot-button">
              Open AI Copilot
              <span>→</span>
            </button>

          </div>

        </section>


        {/* ALERTS */}
        <section className="alerts-panel panel">

          <div className="panel-header">
            <div>
              <h2>Attention Required</h2>
              <p>Issues detected by IndusMind</p>
            </div>

            <button className="text-button">
              View Risk Center →
            </button>
          </div>

          <div className="alerts-list">

            <div className="alert-row critical">

              <div className="alert-symbol">!</div>

              <div className="alert-content">
                <strong>Machine M-102 — High Failure Risk</strong>
                <span>
                  Temperature 86°C and vibration 5.2 mm/s detected.
                </span>
              </div>

              <div className="alert-time">
                2 min ago
              </div>

              <button>Analyze</button>

            </div>


            <div className="alert-row warning-alert">

              <div className="alert-symbol">!</div>

              <div className="alert-content">
                <strong>Steel Sheet — Low Inventory</strong>
                <span>
                  Current stock is below the recommended reorder level.
                </span>
              </div>

              <div className="alert-time">
                2 hrs ago
              </div>

              <button>Review</button>

            </div>

          </div>

        </section>

        <footer>
          <span>IndusMind © 2026</span>
          <span>AI-powered factory operations intelligence</span>
        </footer>

      </main>
    </div>
  );
}



function App() {
  return (
    <BrowserRouter>

      <Routes>

        <Route path="/" element={<Dashboard />} />

        <Route path="/machines" element={<Machines />} />

        <Route path="/production" element={<Production />} />


        <Route path="/inventory" element={<Inventory />} />

        <Route path="/risk-center" element={<RiskCenter />} />

        <Route path="/ai-copilot" element={<AICopilot />} />

        <Route path="/reports" element={<Reports />} />

      </Routes>

    </BrowserRouter>
  );
}

export default App;