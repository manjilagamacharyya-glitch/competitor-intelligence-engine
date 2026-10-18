'use client'

import * as React from 'react'
import {
  Avatar,
  Badge,
  Body1,
  Body1Strong,
  Button,
  Card,
  Caption1,
  Divider,
  Field,
  Input,
  Label,
  ProgressBar,
  Subtitle1,
  Subtitle2,
  Tab,
  TabList,
  Textarea,
  Title1,
  Title3,
  ToggleButton,
  Tooltip,
  makeStyles,
  mergeClasses,
  tokens,
  typographyStyles,
} from '@fluentui/react-components'
import {
  Add24Regular,
  ArrowSync24Regular,
  ArrowTrending24Regular,
  Checkmark24Regular,
  ChevronDown16Regular,
  Copy24Regular,
  DataTrending24Regular,
  DocumentText24Regular,
  Globe24Regular,
  Home24Regular,
  PeopleTeam24Regular,
  Search24Regular,
  Settings24Regular,
  Sparkle24Regular,
  Warning24Regular,
  WeatherMoon24Regular,
  WeatherSunny24Regular,
} from '@fluentui/react-icons'
import { useThemeMode } from '@/app/providers'
import { DatasetWorkspace } from '@/components/dataset-workspace'

const useStyles = makeStyles({
  page: {
    minHeight: '100vh',
    backgroundColor: tokens.colorNeutralBackground2,
    color: tokens.colorNeutralForeground1,
  },
  appShell: {
    display: 'flex',
    minHeight: '100vh',
  },
  sidebar: {
    width: '240px',
    flexShrink: 0,
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: tokens.colorNeutralBackground1,
    borderRight: `${tokens.strokeWidthThin} solid ${tokens.colorNeutralStroke2}`,
    paddingTop: tokens.spacingVerticalL,
    paddingBottom: tokens.spacingVerticalL,
    '@media (max-width: 760px)': {
      display: 'none',
    },
  },
  brand: {
    display: 'flex',
    alignItems: 'center',
    gap: tokens.spacingHorizontalS,
    paddingLeft: tokens.spacingHorizontalL,
    paddingRight: tokens.spacingHorizontalL,
    paddingBottom: tokens.spacingVerticalXXL,
  },
  brandMark: {
    width: '32px',
    height: '32px',
    display: 'grid',
    placeItems: 'center',
    borderRadius: tokens.borderRadiusLarge,
    backgroundColor: tokens.colorBrandBackground,
    color: tokens.colorNeutralForegroundInverted,
    fontWeight: tokens.fontWeightBold,
  },
  brandText: {
    ...typographyStyles.subtitle1,
    letterSpacing: '0.02em',
  },
  nav: {
    display: 'flex',
    flexDirection: 'column',
    gap: tokens.spacingVerticalXXS,
    paddingLeft: tokens.spacingHorizontalS,
    paddingRight: tokens.spacingHorizontalS,
  },
  navButton: {
    justifyContent: 'flex-start',
    width: '100%',
    minHeight: '40px',
    paddingLeft: tokens.spacingHorizontalM,
    color: tokens.colorNeutralForeground2,
  },
  navButtonActive: {
    backgroundColor: tokens.colorBrandBackground2,
    color: tokens.colorBrandForeground1,
  },
  navLabel: {
    paddingLeft: tokens.spacingHorizontalM,
    paddingTop: tokens.spacingVerticalL,
    paddingBottom: tokens.spacingVerticalS,
    color: tokens.colorNeutralForeground3,
  },
  sidebarFooter: {
    marginTop: 'auto',
    paddingLeft: tokens.spacingHorizontalS,
    paddingRight: tokens.spacingHorizontalS,
    display: 'flex',
    flexDirection: 'column',
    gap: tokens.spacingVerticalXS,
  },
  content: {
    flex: 1,
    minWidth: 0,
  },
  topbar: {
    minHeight: '64px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: tokens.spacingHorizontalM,
    paddingLeft: tokens.spacingHorizontalXXL,
    paddingRight: tokens.spacingHorizontalXXL,
    borderBottom: `${tokens.strokeWidthThin} solid ${tokens.colorNeutralStroke2}`,
    backgroundColor: tokens.colorNeutralBackground1,
    '@media (max-width: 760px)': {
      paddingLeft: tokens.spacingHorizontalM,
      paddingRight: tokens.spacingHorizontalM,
    },
  },
  topbarLeft: {
    display: 'flex',
    alignItems: 'center',
    gap: tokens.spacingHorizontalM,
    minWidth: 0,
  },
  mobileBrand: {
    display: 'none',
    '@media (max-width: 760px)': {
      display: 'flex',
      alignItems: 'center',
      gap: tokens.spacingHorizontalXS,
    },
  },
  search: {
    width: '260px',
    '@media (max-width: 760px)': {
      display: 'none',
    },
  },
  topbarActions: {
    display: 'flex',
    alignItems: 'center',
    gap: tokens.spacingHorizontalS,
  },
  main: {
    maxWidth: '1440px',
    marginLeft: 'auto',
    marginRight: 'auto',
    paddingLeft: tokens.spacingHorizontalXXL,
    paddingRight: tokens.spacingHorizontalXXL,
    paddingTop: tokens.spacingVerticalXXL,
    paddingBottom: tokens.spacingVerticalXXXL,
    display: 'flex',
    flexDirection: 'column',
    gap: tokens.spacingVerticalXXL,
    '@media (max-width: 760px)': {
      paddingLeft: tokens.spacingHorizontalM,
      paddingRight: tokens.spacingHorizontalM,
      paddingTop: tokens.spacingVerticalL,
    },
  },
  pageIntro: {
    display: 'flex',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    gap: tokens.spacingHorizontalL,
    flexWrap: 'wrap',
  },
  eyebrow: {
    color: tokens.colorBrandForeground1,
    fontWeight: tokens.fontWeightSemibold,
    letterSpacing: '0.06em',
    textTransform: 'uppercase',
  },
  introCopy: {
    display: 'flex',
    flexDirection: 'column',
    gap: tokens.spacingVerticalXS,
  },
  introActions: {
    display: 'flex',
    gap: tokens.spacingHorizontalS,
    flexWrap: 'wrap',
  },
  metricGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, minmax(0, 1fr))',
    gap: tokens.spacingHorizontalM,
    '@media (max-width: 980px)': {
      gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
    },
    '@media (max-width: 480px)': {
      gridTemplateColumns: '1fr',
    },
  },
  metricCard: {
    paddingTop: tokens.spacingVerticalL,
    paddingBottom: tokens.spacingVerticalL,
    paddingLeft: tokens.spacingHorizontalL,
    paddingRight: tokens.spacingHorizontalL,
    display: 'flex',
    flexDirection: 'column',
    gap: tokens.spacingVerticalS,
  },
  metricHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: tokens.spacingHorizontalS,
  },
  metricValue: {
    ...typographyStyles.title1,
  },
  positive: {
    color: tokens.colorStatusSuccessForeground1,
  },
  warning: {
    color: tokens.colorStatusWarningForeground1,
  },
  sectionGrid: {
    display: 'grid',
    gridTemplateColumns: 'minmax(0, 1.35fr) minmax(320px, 0.65fr)',
    gap: tokens.spacingHorizontalL,
    '@media (max-width: 980px)': {
      gridTemplateColumns: '1fr',
    },
  },
  card: {
    minWidth: 0,
    backgroundColor: tokens.colorNeutralBackground1,
    border: `${tokens.strokeWidthThin} solid ${tokens.colorNeutralStroke2}`,
    borderRadius: tokens.borderRadiusLarge,
    boxShadow: tokens.shadow2,
  },
  cardHeader: {
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    gap: tokens.spacingHorizontalM,
    paddingTop: tokens.spacingVerticalL,
    paddingBottom: tokens.spacingVerticalL,
    paddingLeft: tokens.spacingHorizontalL,
    paddingRight: tokens.spacingHorizontalL,
  },
  cardHeading: {
    display: 'flex',
    flexDirection: 'column',
    gap: tokens.spacingVerticalXXS,
  },
  cardBody: {
    paddingTop: tokens.spacingVerticalL,
    paddingBottom: tokens.spacingVerticalL,
    paddingLeft: tokens.spacingHorizontalL,
    paddingRight: tokens.spacingHorizontalL,
  },
  table: {
    display: 'flex',
    flexDirection: 'column',
  },
  tableRow: {
    display: 'grid',
    gridTemplateColumns: 'minmax(160px, 1.2fr) minmax(120px, 0.8fr) minmax(120px, 0.8fr) 80px',
    alignItems: 'center',
    gap: tokens.spacingHorizontalM,
    paddingTop: tokens.spacingVerticalM,
    paddingBottom: tokens.spacingVerticalM,
    borderBottom: `${tokens.strokeWidthThin} solid ${tokens.colorNeutralStroke2}`,
    '@media (max-width: 640px)': {
      gridTemplateColumns: '1fr auto',
      '& > :nth-child(n+2)': {
        display: 'none',
      },
    },
  },
  tableRowLast: {
    borderBottom: 'none',
  },
  tableLabel: {
    color: tokens.colorNeutralForeground3,
  },
  competitor: {
    display: 'flex',
    alignItems: 'center',
    gap: tokens.spacingHorizontalS,
    minWidth: 0,
  },
  competitorInfo: {
    minWidth: 0,
    display: 'flex',
    flexDirection: 'column',
    gap: tokens.spacingVerticalXXS,
  },
  truncate: {
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  },
  chart: {
    height: '220px',
    display: 'flex',
    alignItems: 'flex-end',
    gap: tokens.spacingHorizontalS,
    paddingTop: tokens.spacingVerticalL,
    paddingBottom: tokens.spacingVerticalS,
  },
  barGroup: {
    flex: 1,
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-end',
    alignItems: 'center',
    gap: tokens.spacingVerticalS,
  },
  bar: {
    width: '100%',
    maxWidth: '44px',
    borderRadius: tokens.borderRadiusSmall,
    backgroundColor: tokens.colorBrandBackground,
    minHeight: '8px',
  },
  barMuted: {
    backgroundColor: tokens.colorBrandBackground2,
  },
  signals: {
    display: 'flex',
    flexDirection: 'column',
    gap: tokens.spacingVerticalS,
  },
  signal: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: tokens.spacingHorizontalS,
    paddingTop: tokens.spacingVerticalS,
    paddingBottom: tokens.spacingVerticalS,
    paddingLeft: tokens.spacingHorizontalS,
    paddingRight: tokens.spacingHorizontalS,
    borderRadius: tokens.borderRadiusMedium,
  },
  signalHover: {
    backgroundColor: tokens.colorNeutralBackground3,
  },
  signalIcon: {
    flexShrink: 0,
    color: tokens.colorBrandForeground1,
  },
  pivot: {
    display: 'grid',
    gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1fr)',
    gap: tokens.spacingHorizontalL,
    paddingTop: tokens.spacingVerticalL,
    paddingBottom: tokens.spacingVerticalL,
    paddingLeft: tokens.spacingHorizontalL,
    paddingRight: tokens.spacingHorizontalL,
    '@media (max-width: 760px)': {
      gridTemplateColumns: '1fr',
    },
  },
  pivotPane: {
    display: 'flex',
    flexDirection: 'column',
    gap: tokens.spacingVerticalM,
  },
  promptBox: {
    backgroundColor: tokens.colorNeutralBackground3,
    borderRadius: tokens.borderRadiusMedium,
    paddingTop: tokens.spacingVerticalM,
    paddingBottom: tokens.spacingVerticalM,
    paddingLeft: tokens.spacingHorizontalM,
    paddingRight: tokens.spacingHorizontalM,
    color: tokens.colorNeutralForeground2,
    minHeight: '108px',
  },
  generated: {
    minHeight: '160px',
    borderRadius: tokens.borderRadiusMedium,
    border: `${tokens.strokeWidthThin} dashed ${tokens.colorBrandStroke1}`,
    backgroundColor: tokens.colorBrandBackground2,
    paddingTop: tokens.spacingVerticalM,
    paddingBottom: tokens.spacingVerticalM,
    paddingLeft: tokens.spacingHorizontalM,
    paddingRight: tokens.spacingHorizontalM,
    display: 'flex',
    flexDirection: 'column',
    gap: tokens.spacingVerticalS,
  },
  pivotFooter: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: tokens.spacingHorizontalM,
    flexWrap: 'wrap',
  },
  footerNote: {
    color: tokens.colorNeutralForeground3,
  },
})

const competitors = [
  { name: 'Linear', domain: 'linear.app', score: '8.6', change: '+12%', tone: 'good', initials: 'L' },
  { name: 'Jira', domain: 'atlassian.com/jira', score: '6.9', change: '-4%', tone: 'warn', initials: 'J' },
  { name: 'Height', domain: 'height.app', score: '7.8', change: '+7%', tone: 'good', initials: 'H' },
  { name: 'Asana', domain: 'asana.com', score: '5.4', change: '-11%', tone: 'warn', initials: 'A' },
]

const signals = [
  { title: 'Jira launched a new AI summary feature', meta: 'Product Hunt · 18 min ago', icon: <Sparkle24Regular /> },
  { title: 'Linear pricing page updated', meta: 'linear.app · 2 hours ago', icon: <ArrowTrending24Regular /> },
  { title: 'Height sentiment dropped 8 points', meta: 'Reviews · Yesterday', icon: <Warning24Regular /> },
]

const chartData = [38, 52, 46, 72, 62, 84, 78, 94]

export function CompetitorDashboard() {
  const styles = useStyles()
  const { mode, setMode } = useThemeMode()
  const [selectedNav, setSelectedNav] = React.useState('Overview')
  const [activeTab, setActiveTab] = React.useState('All signals')
  const [pivotInput, setPivotInput] = React.useState('Users are frustrated by slow exports and unclear project status updates.')
  const [generatedPitch, setGeneratedPitch] = React.useState('')
  const [copied, setCopied] = React.useState(false)
  const [scanState, setScanState] = React.useState('Scan competitors')
  const [selectedReport, setSelectedReport] = React.useState<string | null>(null)

  const generatePitch = () => {
    setGeneratedPitch(`I noticed teams often lose momentum when exports are slow and project status is hard to find. CompetIQ gives your team a clear, real-time command center with fast exports and shared context built in — so everyone knows what to do next.`)
  }

  const copyPitch = async () => {
    if (!generatedPitch) return
    await navigator.clipboard?.writeText(generatedPitch)
    setCopied(true)
    window.setTimeout(() => setCopied(false), 1800)
  }

  const scan = () => {
    setScanState('Scanning…')
    window.setTimeout(() => setScanState('Scan complete'), 900)
    window.setTimeout(() => setScanState('Scan competitors'), 2300)
  }

  return (
    <div className={styles.page}>
      <div className={styles.appShell}>
        <aside className={styles.sidebar} aria-label="Primary navigation">
          <div className={styles.brand}>
            <div className={styles.brandMark}>C</div>
            <span className={styles.brandText}>CompetIQ</span>
          </div>
          <Caption1 className={styles.navLabel}>Workspace</Caption1>
          <nav className={styles.nav}>
            {[
              ['Overview', <Home24Regular key="home" />],
              ['Competitors', <PeopleTeam24Regular key="people" />],
              ['Signals', <DataTrending24Regular key="signals" />],
              ['Dataset lab', <DocumentText24Regular key="dataset" />],
              ['Pitch Pivot', <Sparkle24Regular key="pivot" />],
            ].map(([label, icon]) => (
              <Button
                key={label as string}
                appearance="subtle"
                icon={icon as React.ReactElement}
                className={mergeClasses(styles.navButton, selectedNav === label && styles.navButtonActive)}
                onClick={() => setSelectedNav(label as string)}
              >
                {label as string}
              </Button>
            ))}
          </nav>
          <Caption1 className={styles.navLabel}>Manage</Caption1>
          <nav className={styles.nav}>
            <Button appearance="subtle" icon={<DocumentText24Regular />} className={mergeClasses(styles.navButton, selectedNav === 'Reports' && styles.navButtonActive)} onClick={() => { setSelectedNav('Reports'); setSelectedReport(null) }}>Reports</Button>
            <Button appearance="subtle" icon={<Settings24Regular />} className={mergeClasses(styles.navButton, selectedNav === 'Settings' && styles.navButtonActive)} onClick={() => setSelectedNav('Settings')}>Settings</Button>
          </nav>
          <div className={styles.sidebarFooter}>
            <Divider />
            <Button appearance="subtle" icon={<Add24Regular />} className={styles.navButton}>Add competitor</Button>
          </div>
        </aside>

        <div className={styles.content}>
          <header className={styles.topbar}>
            <div className={styles.topbarLeft}>
              <div className={styles.mobileBrand}>
                <div className={styles.brandMark}>C</div>
                <Body1Strong>CompetIQ</Body1Strong>
              </div>
              <Input className={styles.search} contentBefore={<Search24Regular />} placeholder="Search signals, competitors..." aria-label="Search" />
            </div>
            <div className={styles.topbarActions}>
              <Badge appearance="tint" color="success">Live monitoring</Badge>
              <Tooltip content={mode === 'light' ? 'Switch to dark theme' : 'Switch to light theme'} relationship="label">
                <ToggleButton
                  appearance="subtle"
                  checked={mode === 'dark'}
                  onClick={() => setMode(mode === 'light' ? 'dark' : 'light')}
                  icon={mode === 'light' ? <WeatherMoon24Regular /> : <WeatherSunny24Regular />}
                  aria-label="Toggle theme"
                />
              </Tooltip>
              <Button appearance="subtle" onClick={() => { window.location.href = '/sign-in' }} aria-label="Open demo account"><Avatar name="Alex Morgan" color="brand" aria-label="Alex Morgan" /></Button>
            </div>
          </header>

          <main className={styles.main}>
            {selectedNav === 'Dataset lab' ? <DatasetWorkspace /> : selectedNav === 'Reports' ? <>
              {selectedReport ? <>
                <section className={styles.pageIntro}>
                  <div className={styles.introCopy}><Caption1 className={styles.eyebrow}>Report detail</Caption1><Title1 as="h1">{selectedReport}</Title1><Body1>Generated from the latest competitor intelligence in your workspace.</Body1></div>
                  <Button appearance="secondary" onClick={() => setSelectedReport(null)}>Back to reports</Button>
                </section>
                <Card className={styles.card}>
                  <div className={styles.cardHeader}><div className={styles.cardHeading}><Title3 as="h2">Executive summary</Title3><Caption1>Ready to share with your team</Caption1></div><Badge appearance="tint" color="success">Complete</Badge></div>
                  <Divider />
                  <div className={styles.cardBody}><Body1Strong>Market conditions are shifting across the tracked competitors.</Body1Strong><p><Body1>This report brings together pricing movement, product changes, customer sentiment, and recommended actions so your team can decide what to investigate next.</Body1></p><div className={styles.signals}><div className={styles.signal}><Sparkle24Regular className={styles.signalIcon} /><div className={styles.competitorInfo}><Body1Strong>Key opportunity</Body1Strong><Caption1>Use competitor weaknesses to sharpen positioning and sales messaging.</Caption1></div></div><div className={styles.signal}><Warning24Regular className={styles.signalIcon} /><div className={styles.competitorInfo}><Body1Strong>Watch closely</Body1Strong><Caption1>Review new pricing and product signals before the next planning cycle.</Caption1></div></div></div></div>
                </Card>
              </> : <>
              <section className={styles.pageIntro}>
                <div className={styles.introCopy}><Caption1 className={styles.eyebrow}>Manage</Caption1><Title1 as="h1">Reports</Title1><Body1>Review the intelligence your team has collected and turn it into a clear next move.</Body1></div>
                <Button appearance="primary" icon={<DocumentText24Regular />}>Create report</Button>
              </section>
              <Card className={styles.card}>
                <div className={styles.cardHeader}><div className={styles.cardHeading}><Title3 as="h2">Recent reports</Title3><Caption1>Saved intelligence for your team</Caption1></div><Badge appearance="tint" color="brand">4 reports</Badge></div>
                <Divider />
                <div className={styles.cardBody}><div className={styles.signals}>{['Weekly competitor pulse', 'Pricing movement briefing', 'Customer complaint digest', 'Executive market summary'].map((report, index) => <div className={styles.signal} key={report}><DocumentText24Regular className={styles.signalIcon} /><div className={styles.competitorInfo}><Body1Strong>{report}</Body1Strong><Caption1>{index + 1} day{index ? 's' : ''} ago · Ready to view</Caption1></div><Button appearance="subtle" onClick={() => setSelectedReport(report)}>Open</Button></div>)}</div></div>
              </Card>
              </>}
            </> : selectedNav === 'Settings' ? <>
              <section className={styles.pageIntro}><div className={styles.introCopy}><Caption1 className={styles.eyebrow}>Manage</Caption1><Title1 as="h1">Settings</Title1><Body1>Manage your workspace preferences and monitoring configuration.</Body1></div></section>
              <Card className={styles.card}>
                <div className={styles.cardHeader}><div className={styles.cardHeading}><Title3 as="h2">Workspace settings</Title3><Caption1>Configure how CompetIQ works for you</Caption1></div><Settings24Regular /></div>
                <Divider />
                <div className={styles.cardBody}><div className={styles.signals}><div className={styles.signal}><div className={styles.competitorInfo}><Body1Strong>Live monitoring</Body1Strong><Caption1>Monitor competitor sources continuously</Caption1></div><Badge appearance="tint" color="success">Enabled</Badge></div><div className={styles.signal}><div className={styles.competitorInfo}><Body1Strong>Analysis model</Body1Strong><Caption1>Gemini Flash for dataset intelligence</Caption1></div><Badge appearance="tint" color="brand">Active</Badge></div><div className={styles.signal}><div className={styles.competitorInfo}><Body1Strong>Workspace name</Body1Strong><Caption1>CompetIQ workspace</Caption1></div><Button appearance="outline">Edit</Button></div></div></div>
              </Card>
            </> : <>
            <section className={styles.pageIntro}>
              <div className={styles.introCopy}>
                <Caption1 className={styles.eyebrow}>Counter-intelligence workspace</Caption1>
                <Title1 as="h1">Good morning, Alex.</Title1>
                <Body1>See where competitors are slipping — and turn every signal into your next advantage.</Body1>
              </div>
              <div className={styles.introActions}>
                <Button appearance="secondary" icon={<ArrowSync24Regular />} onClick={scan}>{scanState}</Button>
                <Button appearance="primary" icon={<Sparkle24Regular />} onClick={() => setSelectedNav('Pitch Pivot')}>Create pitch pivot</Button>
              </div>
            </section>

            <section className={styles.metricGrid} aria-label="Workspace metrics">
              <Card className={styles.metricCard}>
                <div className={styles.metricHeader}><Caption1>Competitors tracked</Caption1><PeopleTeam24Regular /></div>
                <span className={styles.metricValue}>24</span>
                <Caption1 className={styles.positive}>+3 this month</Caption1>
              </Card>
              <Card className={styles.metricCard}>
                <div className={styles.metricHeader}><Caption1>New signals</Caption1><Sparkle24Regular /></div>
                <span className={styles.metricValue}>186</span>
                <Caption1 className={styles.positive}>+28% vs last week</Caption1>
              </Card>
              <Card className={styles.metricCard}>
                <div className={styles.metricHeader}><Caption1>Opportunity score</Caption1><ArrowTrending24Regular /></div>
                <span className={styles.metricValue}>82<span className={styles.tableLabel}>/100</span></span>
                <Caption1 className={styles.positive}>High potential</Caption1>
              </Card>
              <Card className={styles.metricCard}>
                <div className={styles.metricHeader}><Caption1>Last scan</Caption1><Globe24Regular /></div>
                <span className={styles.metricValue}>12m</span>
                <Caption1>All sources healthy</Caption1>
              </Card>
            </section>

            <section className={styles.sectionGrid}>
              <Card className={styles.card}>
                <div className={styles.cardHeader}>
                  <div className={styles.cardHeading}>
                    <Title3 as="h2">Competitor pulse</Title3>
                    <Caption1>Market momentum across your watchlist</Caption1>
                  </div>
                  <Button appearance="subtle" icon={<ChevronDown16Regular />}>Last 30 days</Button>
                </div>
                <Divider />
                <div className={styles.cardBody}>
                  <div className={styles.table}>
                    <div className={styles.tableRow}>
                      <Caption1 className={styles.tableLabel}>Competitor</Caption1><Caption1 className={styles.tableLabel}>Sentiment</Caption1><Caption1 className={styles.tableLabel}>Signals</Caption1><Caption1 className={styles.tableLabel}>Score</Caption1>
                    </div>
                    {competitors.map((competitor, index) => (
                      <div className={mergeClasses(styles.tableRow, index === competitors.length - 1 && styles.tableRowLast)} key={competitor.name}>
                        <div className={styles.competitor}><Avatar name={competitor.name} color={index % 2 === 0 ? 'brand' : 'orange'} size={28} /><div className={styles.competitorInfo}><Body1Strong className={styles.truncate}>{competitor.name}</Body1Strong><Caption1 className={styles.truncate}>{competitor.domain}</Caption1></div></div>
                        <Badge appearance="tint" color={competitor.tone === 'good' ? 'success' : 'warning'}>{competitor.tone === 'good' ? 'Improving' : 'Declining'}</Badge>
                        <Body1>{index * 8 + 12} new</Body1>
                        <Body1Strong className={competitor.tone === 'good' ? styles.positive : styles.warning}>{competitor.score}</Body1Strong>
                      </div>
                    ))}
                  </div>
                </div>
              </Card>

              <Card className={styles.card}>
                <div className={styles.cardHeader}>
                  <div className={styles.cardHeading}><Title3 as="h2">Signal velocity</Title3><Caption1>New intelligence discovered</Caption1></div>
                  <DataTrending24Regular aria-hidden />
                </div>
                <Divider />
                <div className={styles.cardBody}>
                  <div className={styles.chart} aria-label="Signal velocity chart">
                    {chartData.map((value, index) => <div className={styles.barGroup} key={index}><div className={mergeClasses(styles.bar, index < 3 && styles.barMuted)} style={{ height: `${value}%` }} /><Caption1>{['M', 'T', 'W', 'T', 'F', 'S', 'S', 'M'][index]}</Caption1></div>)}
                  </div>
                  <ProgressBar value={0.78} thickness="medium" />
                  <div className={styles.metricHeader}><Caption1>78% of weekly signal goal</Caption1><Body1Strong>+16%</Body1Strong></div>
                </div>
              </Card>
            </section>

            <section className={styles.sectionGrid}>
              <Card className={styles.card}>
                <div className={styles.cardHeader}>
                  <div className={styles.cardHeading}><Title3 as="h2">Latest signals</Title3><Caption1>Fresh changes worth your attention</Caption1></div>
                  <TabList selectedValue={activeTab} onTabSelect={(_, data) => setActiveTab(data.value as string)} size="small"><Tab value="All signals">All</Tab><Tab value="Product">Product</Tab><Tab value="Reviews">Reviews</Tab></TabList>
                </div>
                <Divider />
                <div className={styles.cardBody}><div className={styles.signals}>{signals.map((signal) => <div className={styles.signal} key={signal.title}><span className={styles.signalIcon}>{signal.icon}</span><div className={styles.competitorInfo}><Body1Strong>{signal.title}</Body1Strong><Caption1>{signal.meta}</Caption1></div></div>)}</div></div>
                <div className={styles.cardHeader}><Button appearance="outline">View all signals</Button></div>
              </Card>

              <Card className={styles.card}>
                <div className={styles.cardHeader}><div className={styles.cardHeading}><Title3 as="h2">Coverage health</Title3><Caption1>Source monitoring status</Caption1></div><Badge appearance="tint" color="success">Healthy</Badge></div>
                <Divider />
                <div className={styles.cardBody}><div className={styles.signals}><div className={styles.signal}><Globe24Regular className={styles.signalIcon} /><div className={styles.competitorInfo}><Body1Strong>Public web pages</Body1Strong><Caption1>24 of 24 sources available</Caption1></div><Checkmark24Regular className={styles.positive} /></div><div className={styles.signal}><DocumentText24Regular className={styles.signalIcon} /><div className={styles.competitorInfo}><Body1Strong>Review sources</Body1Strong><Caption1>12 of 12 sources available</Caption1></div><Checkmark24Regular className={styles.positive} /></div><div className={styles.signal}><ArrowSync24Regular className={styles.signalIcon} /><div className={styles.competitorInfo}><Body1Strong>Last sync</Body1Strong><Caption1>Completed 12 minutes ago</Caption1></div><Checkmark24Regular className={styles.positive} /></div></div></div>
              </Card>
            </section>

            <section className={styles.card} aria-labelledby="pivot-heading">
              <div className={styles.cardHeader}><div className={styles.cardHeading}><Title3 as="h2" id="pivot-heading">Pitch Pivot</Title3><Caption1>Turn competitor weakness into a message your prospects can act on.</Caption1></div><Badge appearance="tint" color="brand" icon={<Sparkle24Regular />}>AI-assisted</Badge></div>
              <Divider />
              <div className={styles.pivot}>
                <div className={styles.pivotPane}><Subtitle1>1. Add a market signal</Subtitle1><Field label="What are customers frustrated by?" hint="Use a review, support thread, or signal from your watchlist."><Textarea value={pivotInput} onChange={(_, data) => setPivotInput(data.value)} resize="vertical" /></Field><Button appearance="primary" icon={<Sparkle24Regular />} onClick={generatePitch}>Generate pitch pivot</Button></div>
                <div className={styles.pivotPane}><Subtitle1>2. Get your angle</Subtitle1>{generatedPitch ? <div className={styles.generated}><Badge appearance="tint" color="success">Recommended angle</Badge><Body1>{generatedPitch}</Body1><div className={styles.pivotFooter}><Caption1 className={styles.footerNote}>Based on 18 related signals</Caption1><Button appearance="subtle" icon={copied ? <Checkmark24Regular /> : <Copy24Regular />} onClick={copyPitch}>{copied ? 'Copied' : 'Copy draft'}</Button></div></div> : <div className={styles.promptBox}><Body1>Generate a tailored sales message from the latest competitor intelligence.</Body1></div>}</div>
              </div>
            </section>
            </>}
          </main>
        </div>
      </div>
    </div>
  )
}
