"use client";

import { useMemo, useState } from "react";
import type { CSSProperties, KeyboardEvent } from "react";
import {
  baselineDemand,
  capacitySeries,
  decisions,
  demandSeries,
  peakDemand,
  peakHires,
  startingBacklog,
  technicalBaseline,
  technicalPeak,
} from "./data";

type ViewId = "overview" | "demand" | "capacity" | "scenario" | "decisions";

const views: Array<{ id: ViewId; number: string; label: string }> = [
  { id: "overview", number: "01", label: "Overview" },
  { id: "demand", number: "02", label: "Demand" },
  { id: "capacity", number: "03", label: "Capacity" },
  { id: "scenario", number: "04", label: "Scenario Lab" },
  { id: "decisions", number: "05", label: "Decision Guide" },
];

const demandMultiple = (peakDemand / baselineDemand).toFixed(1);
const technicalMultiple = (technicalPeak / technicalBaseline).toFixed(1);
const netPeakBacklog = technicalPeak - peakHires;

function BarChart({
  kind,
}: {
  kind: "demand" | "capacity";
}) {
  const max = kind === "demand" ? 35 : 20;
  const series =
    kind === "demand"
      ? demandSeries.map((point) => ({
          month: point.month,
          primary: point.requested,
          secondary: point.approved,
        }))
      : capacitySeries.map((point) => ({
          month: point.month,
          primary: point.technicalDemand,
          secondary: point.hires,
        }));

  return (
    <div className="chart-wrap">
      <div
        className={`bar-chart bar-chart-${kind}`}
        role="img"
        aria-label={
          kind === "demand"
            ? "Monthly requested and approved headcount across the twelve-month synthetic period."
            : "Monthly technical hiring demand and completed hires across the twelve-month synthetic period."
        }
      >
        <div className="grid-line grid-line-100" aria-hidden="true" />
        <div className="grid-line grid-line-75" aria-hidden="true" />
        <div className="grid-line grid-line-50" aria-hidden="true" />
        <div className="grid-line grid-line-25" aria-hidden="true" />
        {series.map((point) => {
          return (
            <div className="bar-group" key={point.month}>
              <div className="bar-pair" aria-hidden="true">
                <span
                  className="bar bar-primary"
                  style={
                    { "--bar-height": `${(point.primary / max) * 100}%` } as CSSProperties
                  }
                >
                  <span className="bar-value">{point.primary}</span>
                </span>
                <span
                  className="bar bar-secondary"
                  style={
                    { "--bar-height": `${(point.secondary / max) * 100}%` } as CSSProperties
                  }
                >
                  <span className="bar-value">{point.secondary}</span>
                </span>
              </div>
              <span className="bar-label">{point.month}</span>
            </div>
          );
        })}
      </div>

      <table className="sr-only">
        <caption>
          {kind === "demand"
            ? "Synthetic demand and approval data"
            : "Synthetic technical demand and hiring output data"}
        </caption>
        <thead>
          <tr>
            <th>Month</th>
            <th>{kind === "demand" ? "Requested" : "Technical demand"}</th>
            <th>{kind === "demand" ? "Approved" : "Hires"}</th>
          </tr>
        </thead>
        <tbody>
          {series.map((point) => (
            <tr key={point.month}>
              <th>{point.month}</th>
              <td>{point.primary}</td>
              <td>{point.secondary}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function MetricCard({
  value,
  label,
  note,
  featured = false,
}: {
  value: string;
  label: string;
  note?: string;
  featured?: boolean;
}) {
  return (
    <article className={`metric-card${featured ? " metric-card-featured" : ""}`}>
      <strong>{value}</strong>
      <span>{label}</span>
      {note ? <small>{note}</small> : null}
    </article>
  );
}

function Overview() {
  return (
    <section className="panel panel-overview" aria-labelledby="overview-title">
      <div className="panel-copy">
        <p className="section-kicker">Executive model · Illustrative 12-month period</p>
        <h1 id="overview-title">
          When hiring demand grows faster than <em>delivery capacity.</em>
        </h1>
        <p className="lead">
          A synthetic operating model for seeing the pressure early, quantifying
          the gap, and making sequencing decisions before the queue compounds.
        </p>
      </div>

      <div className="metric-grid metric-grid-four" aria-label="Scenario summary">
        <MetricCard value="31" label="Peak monthly requests" note={`${demandMultiple}× baseline`} />
        <MetricCard value="18" label="Peak technical demand" note={`${technicalMultiple}× prior average`} featured />
        <MetricCard value="7" label="Peak monthly hires" note="Record illustrative output" />
        <MetricCard value="+11" label="Roles added to queue" note="Demand less output" />
      </div>

      <div className="question-card">
        <span>Operating question</span>
        <p>
          Which roles should the team sequence first when demand is rising faster
          than delivery capacity—and what would change that decision?
        </p>
      </div>
    </section>
  );
}

function Demand() {
  return (
    <section className="panel" aria-labelledby="demand-title">
      <div className="panel-heading">
        <div>
          <p className="section-kicker">Demand · Synthetic company-wide view</p>
          <h2 id="demand-title">A step-change, not ordinary variance.</h2>
        </div>
        <p>
          The illustrative peak reaches <strong>31 requests</strong>, compared
          with a 14-request baseline. Approval volume rises with it, so the
          delivery queue absorbs most of the change.
        </p>
      </div>

      <div className="legend" aria-hidden="true">
        <span><i className="legend-primary" /> Requested</span>
        <span><i className="legend-secondary" /> Approved</span>
      </div>
      <BarChart kind="demand" />

      <div className="insight-row">
        <div>
          <span>Baseline</span>
          <p>Ten months clustered around <strong>14 requests</strong>.</p>
        </div>
        <div className="insight-accent">
          <span>Signal</span>
          <p>The peak is <strong>{demandMultiple}× baseline</strong>, with six decisions still pending.</p>
        </div>
        <div>
          <span>Implication</span>
          <p>Prioritization becomes an operating requirement, not a planning exercise.</p>
        </div>
      </div>
    </section>
  );
}

function Capacity() {
  return (
    <section className="panel" aria-labelledby="capacity-title">
      <div className="panel-heading">
        <div>
          <p className="section-kicker">Capacity · Technical portfolio</p>
          <h2 id="capacity-title">A record month still added 11 roles to the queue.</h2>
        </div>
        <p>
          Technical demand rises to <strong>18 roles</strong> while output reaches
          an illustrative record of <strong>7 hires</strong>. Strong delivery
          reduces the gap; it does not reverse it.
        </p>
      </div>

      <div className="legend" aria-hidden="true">
        <span><i className="legend-primary" /> Technical demand</span>
        <span><i className="legend-green" /> Completed hires</span>
      </div>
      <BarChart kind="capacity" />

      <div className="metric-grid metric-grid-four compact-metrics">
        <MetricCard value="18" label="Peak demand" />
        <MetricCard value="5.3" label="Prior 3-mo average" />
        <MetricCard value={`${technicalMultiple}×`} label="Demand vs. average" featured />
        <MetricCard value={`+${netPeakBacklog}`} label="Net queue growth" />
      </div>
    </section>
  );
}

function RangeControl({
  id,
  label,
  value,
  min,
  max,
  suffix,
  onChange,
}: {
  id: string;
  label: string;
  value: number;
  min: number;
  max: number;
  suffix: string;
  onChange: (value: number) => void;
}) {
  return (
    <label className="range-control" htmlFor={id}>
      <span>
        {label}
        <strong>{value}{suffix}</strong>
      </span>
      <input
        id={id}
        type="range"
        min={min}
        max={max}
        value={value}
        onChange={(event) => onChange(Number(event.target.value))}
      />
      <small><span>{min}{suffix}</span><span>{max}{suffix}</span></small>
    </label>
  );
}

function ScenarioLab() {
  const [monthlyDemand, setMonthlyDemand] = useState(12);
  const [monthlyThroughput, setMonthlyThroughput] = useState(7);
  const [backlog, setBacklog] = useState(startingBacklog);
  const [horizon, setHorizon] = useState(6);

  const projection = useMemo(() => {
    const monthlyChange = monthlyDemand - monthlyThroughput;
    const values = Array.from({ length: horizon + 1 }, (_, index) =>
      Math.max(0, backlog + monthlyChange * index),
    );
    return {
      monthlyChange,
      values,
      endingBacklog: values.at(-1) ?? backlog,
      pressure: monthlyDemand / monthlyThroughput,
    };
  }, [backlog, horizon, monthlyDemand, monthlyThroughput]);

  const projectionMax = Math.max(...projection.values, 1);
  const trendWord = projection.monthlyChange > 0 ? "grows" : projection.monthlyChange < 0 ? "shrinks" : "holds";

  return (
    <section className="panel scenario-panel" aria-labelledby="scenario-title">
      <div className="panel-heading">
        <div>
          <p className="section-kicker">Scenario lab · Adjust the operating assumptions</p>
          <h2 id="scenario-title">Pressure is a relationship, not a single number.</h2>
        </div>
        <p>
          Change demand, throughput, starting backlog, and time horizon to see
          how quickly an apparently manageable gap compounds.
        </p>
      </div>

      <div className="scenario-grid">
        <div className="control-stack">
          <RangeControl id="demand-input" label="Monthly demand" value={monthlyDemand} min={6} max={24} suffix=" roles" onChange={setMonthlyDemand} />
          <RangeControl id="throughput-input" label="Monthly throughput" value={monthlyThroughput} min={3} max={12} suffix=" hires" onChange={setMonthlyThroughput} />
          <RangeControl id="backlog-input" label="Starting backlog" value={backlog} min={8} max={48} suffix=" roles" onChange={setBacklog} />
          <RangeControl id="horizon-input" label="Forecast horizon" value={horizon} min={3} max={12} suffix=" mo" onChange={setHorizon} />
        </div>

        <div className="projection-card" aria-live="polite">
          <div className="projection-summary">
            <span>Projected backlog</span>
            <strong>{projection.endingBacklog}</strong>
            <p>
              The queue {trendWord} by <b>{Math.abs(projection.monthlyChange)}</b> {Math.abs(projection.monthlyChange) === 1 ? "role" : "roles"} per month at a <b>{projection.pressure.toFixed(1)}×</b> demand-to-throughput ratio.
            </p>
          </div>
          <div className="projection-bars" aria-hidden="true">
            {projection.values.map((value, index) => (
              <span key={index}>
                <i style={{ "--projection-height": `${Math.max(8, (value / projectionMax) * 100)}%` } as CSSProperties} />
                <small>{index === 0 ? "Now" : `M${index}`}</small>
              </span>
            ))}
          </div>
          <p className="sr-only">
            Projected backlog by month: {projection.values.join(", ")} roles.
          </p>
        </div>
      </div>
    </section>
  );
}

function DecisionGuide() {
  return (
    <section className="panel" aria-labelledby="decisions-title">
      <div className="panel-heading decision-heading">
        <div>
          <p className="section-kicker">Decision guide · From signal to action</p>
          <h2 id="decisions-title">Three moves when the model turns red.</h2>
        </div>
        <p>
          The model is useful only if each signal has an owner, a threshold,
          and a quality guardrail attached to it.
        </p>
      </div>

      <div className="decision-grid">
        {decisions.map((decision) => (
          <article className={`decision-card decision-${decision.tone}`} key={decision.number}>
            <div className="decision-number">{decision.number}</div>
            <p className="decision-eyebrow">{decision.eyebrow}</p>
            <h3>{decision.title}</h3>
            <p>{decision.body}</p>
            <dl>
              <div>
                <dt>Trigger</dt>
                <dd>{decision.trigger}</dd>
              </div>
              <div>
                <dt>Watch</dt>
                <dd>{decision.measure}</dd>
              </div>
            </dl>
          </article>
        ))}
      </div>

      <details className="methodology">
        <summary>About the model and synthetic data</summary>
        <p>
          Every organization name, figure, date label, threshold, and narrative
          in this demonstration was created specifically for this public project.
          It does not reproduce or transform a private employer dataset. The model
          is illustrative and is not a workforce-planning recommendation.
        </p>
      </details>
    </section>
  );
}

const panels: Record<ViewId, React.ReactNode> = {
  overview: <Overview />,
  demand: <Demand />,
  capacity: <Capacity />,
  scenario: <ScenarioLab />,
  decisions: <DecisionGuide />,
};

export function CapacityLab() {
  const [activeView, setActiveView] = useState<ViewId>("overview");
  const activeIndex = views.findIndex((view) => view.id === activeView);

  function selectView(id: ViewId) {
    setActiveView(id);
    window.requestAnimationFrame(() => {
      document.getElementById(`tab-${id}`)?.focus();
    });
  }

  function handleTabKeyDown(event: KeyboardEvent<HTMLButtonElement>) {
    let nextIndex: number | null = null;
    if (event.key === "ArrowRight") nextIndex = (activeIndex + 1) % views.length;
    if (event.key === "ArrowLeft") nextIndex = (activeIndex - 1 + views.length) % views.length;
    if (event.key === "Home") nextIndex = 0;
    if (event.key === "End") nextIndex = views.length - 1;
    if (nextIndex === null) return;
    event.preventDefault();
    selectView(views[nextIndex].id);
  }

  return (
    <main className="app-shell">
      <a className="skip-link" href="#main-panel">Skip to analysis</a>
      <header className="topbar">
        <div className="brand-lockup">
          <span className="brand-mark" aria-hidden="true">CL</span>
          <div>
            <strong>Hiring Capacity Lab</strong>
            <span>Talent operations model</span>
          </div>
        </div>
        <div className="data-badge">
          <span aria-hidden="true" />
          100% synthetic data
        </div>
      </header>

      <nav className="view-tabs" aria-label="Analysis sections" role="tablist">
        {views.map((view) => (
          <button
            id={`tab-${view.id}`}
            key={view.id}
            type="button"
            role="tab"
            aria-selected={activeView === view.id}
            aria-controls="main-panel"
            tabIndex={activeView === view.id ? 0 : -1}
            onClick={() => selectView(view.id)}
            onKeyDown={handleTabKeyDown}
          >
            <span>{view.number}</span>
            {view.label}
          </button>
        ))}
      </nav>

      <div
        id="main-panel"
        className="panel-stage"
        role="tabpanel"
        aria-labelledby={`tab-${activeView}`}
        tabIndex={-1}
        key={activeView}
      >
        {panels[activeView]}
      </div>

      <footer className="app-footer">
        <p>
          Public portfolio demonstration · No employer information or production records are used.
          <span className="footer-attribution">
            Built by <a href="https://tristancouvares.com/" rel="author">Tristan Couvares</a> ·{" "}
            <a href="https://github.com/tristancouvares/hiring-capacity-lab">Source</a>
          </span>
        </p>
        <div className="footer-controls">
          <button
            type="button"
            disabled={activeIndex === 0}
            onClick={() => selectView(views[activeIndex - 1].id)}
          >
            <span aria-hidden="true">←</span> Previous
          </button>
          <div className="progress-dots" aria-label={`Section ${activeIndex + 1} of ${views.length}`}>
            {views.map((view, index) => (
              <span key={view.id} className={index === activeIndex ? "active" : ""} />
            ))}
          </div>
          <button
            type="button"
            disabled={activeIndex === views.length - 1}
            onClick={() => selectView(views[activeIndex + 1].id)}
          >
            Next <span aria-hidden="true">→</span>
          </button>
        </div>
      </footer>
    </main>
  );
}
