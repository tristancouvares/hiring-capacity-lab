export type DemandPoint = {
  month: string;
  requested: number;
  approved: number;
};

export type CapacityPoint = {
  month: string;
  technicalDemand: number;
  hires: number;
};

export const demandSeries: DemandPoint[] = [
  { month: "Mar", requested: 13, approved: 11 },
  { month: "Apr", requested: 14, approved: 13 },
  { month: "May", requested: 12, approved: 10 },
  { month: "Jun", requested: 15, approved: 13 },
  { month: "Jul", requested: 11, approved: 9 },
  { month: "Aug", requested: 13, approved: 12 },
  { month: "Sep", requested: 16, approved: 14 },
  { month: "Oct", requested: 14, approved: 12 },
  { month: "Nov", requested: 17, approved: 15 },
  { month: "Dec", requested: 15, approved: 13 },
  { month: "Jan", requested: 31, approved: 25 },
  { month: "Feb*", requested: 27, approved: 23 },
];

export const capacitySeries: CapacityPoint[] = [
  { month: "Mar", technicalDemand: 4, hires: 4 },
  { month: "Apr", technicalDemand: 5, hires: 4 },
  { month: "May", technicalDemand: 3, hires: 5 },
  { month: "Jun", technicalDemand: 5, hires: 4 },
  { month: "Jul", technicalDemand: 4, hires: 3 },
  { month: "Aug", technicalDemand: 4, hires: 5 },
  { month: "Sep", technicalDemand: 6, hires: 4 },
  { month: "Oct", technicalDemand: 5, hires: 5 },
  { month: "Nov", technicalDemand: 6, hires: 4 },
  { month: "Dec", technicalDemand: 5, hires: 4 },
  { month: "Jan", technicalDemand: 18, hires: 7 },
  { month: "Feb*", technicalDemand: 10, hires: 5 },
];

export const baselineDemand = 14;
export const peakDemand = 31;
export const technicalBaseline = 5.3;
export const technicalPeak = 18;
export const peakHires = 7;
export const startingBacklog = 24;

export const decisions = [
  {
    number: "01",
    eyebrow: "Sequence",
    title: "Make tradeoffs visible",
    body: "Place every approved role into a shared tier based on business criticality, vacancy cost, and readiness to interview.",
    trigger: "When approved demand exceeds 1.5× monthly throughput",
    measure: "Priority coverage and days waiting to launch",
    tone: "blue",
  },
  {
    number: "02",
    eyebrow: "Flex",
    title: "Add capacity before the queue compounds",
    body: "Use bounded contract or sourcing support for the role families creating the largest share of the projected backlog.",
    trigger: "When the eight-week forecast exceeds 40 open roles",
    measure: "Net backlog change and qualified slates per week",
    tone: "orange",
  },
  {
    number: "03",
    eyebrow: "Protect",
    title: "Treat quality as a constraint",
    body: "Watch conversion and acceptance alongside speed so a capacity intervention does not simply move poor-fit candidates faster.",
    trigger: "Whenever throughput rises more than 25% above baseline",
    measure: "Slate conversion, offer acceptance, and 90-day quality",
    tone: "green",
  },
] as const;
