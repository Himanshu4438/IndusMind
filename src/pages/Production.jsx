function Production() {
  const productionData = [
    { time: "08 AM", units: 480, efficiency: "80%" },
    { time: "10 AM", units: 600, efficiency: "84%" },
    { time: "12 PM", units: 550, efficiency: "82%" },
    { time: "02 PM", units: 720, efficiency: "88%" },
    { time: "04 PM", units: 660, efficiency: "86%" },
    { time: "06 PM", units: 880, efficiency: "92%" },
    { time: "08 PM", units: 800, efficiency: "90%" },
    { time: "10 PM", units: 920, efficiency: "94%" },
  ];

  return (
    <div className="main">
      <div className="page-title">
        <div className="breadcrumb">Factory 01 / Production</div>

        <h1>Production Monitoring</h1>
        <p>Track production output, targets and efficiency.</p>
      </div>

      <div className="metrics">
        <div className="metric-card">
          <div className="metric-top">
            <span>Today's Production</span>
            <div className="metric-icon blue">↗</div>
          </div>

          <div className="metric-value">8,740</div>

          <div className="metric-bottom">
            <span className="trend positive">↑ 4.2%</span>
            <span>vs yesterday</span>
          </div>
        </div>

        <div className="metric-card">
          <div className="metric-top">
            <span>Daily Target</span>
            <div className="metric-icon purple">▥</div>
          </div>

          <div className="metric-value">10,000</div>

          <div className="metric-bottom">
            <span>1,260 units</span>
            <span>remaining</span>
          </div>
        </div>

        <div className="metric-card">
          <div className="metric-top">
            <span>Production Efficiency</span>
            <div className="metric-icon blue">✓</div>
          </div>

          <div className="metric-value">87.4%</div>

          <div className="metric-bottom">
            <span className="trend positive">↑ 3.6%</span>
            <span>above average</span>
          </div>
        </div>

        <div className="metric-card risk-metric">
          <div className="metric-top">
            <span>Production Loss</span>
            <div className="metric-icon red">⚠</div>
          </div>

          <div className="metric-value">₹86K</div>

          <div className="metric-bottom">
            <span className="trend negative">Downtime impact</span>
          </div>
        </div>
      </div>

      <section className="panel production-panel" style={{ marginTop: "24px" }}>
        <div className="panel-header">
          <div>
            <h2>Production Performance</h2>
            <p>Hourly production output for today</p>
          </div>

          <button className="small-button">Today ▾</button>
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
              {productionData.map((item, index) => (
                <div
                  className={`chart-bar ${
                    index === productionData.length - 1 ? "highlight" : ""
                  }`}
                  style={{ height: `${(item.units / 1000) * 100}%` }}
                  key={item.time}
                >
                  <span>{item.units}</span>
                </div>
              ))}
            </div>

            <div className="x-axis">
              {productionData.map((item) => (
                <span key={item.time}>{item.time}</span>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="panel" style={{ marginTop: "24px" }}>
        <div className="panel-header">
          <div>
            <h2>Production Analysis</h2>
            <p>Hourly production efficiency</p>
          </div>
        </div>

        <div className="machine-table">
          <div className="table-head">
            <span>Time</span>
            <span>Units Produced</span>
            <span>Efficiency</span>
            <span>Performance</span>
          </div>

          {productionData.map((item) => (
            <div className="machine-row" key={item.time}>
              <strong>{item.time}</strong>
              <span>{item.units} units</span>
              <span>{item.efficiency}</span>

              <span className="machine-status healthy">
                <i></i>
                On Target
              </span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default Production;