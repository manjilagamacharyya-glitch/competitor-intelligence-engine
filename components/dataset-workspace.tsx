'use client'

import * as React from 'react'
import {
  Badge,
  Body1,
  Body1Strong,
  Button,
  Card,
  Caption1,
  Divider,
  ProgressBar,
  Subtitle1,
  Title1,
  Title3,
  makeStyles,
  tokens,
} from '@fluentui/react-components'
import {
  ArrowReset24Regular,
  ArrowUpload24Regular,
  CheckmarkCircle24Regular,
  DocumentTable24Regular,
  DismissCircle24Regular,
  Sparkle24Regular,
} from '@fluentui/react-icons'

type Analysis = {
  summary: string
  keyFindings: string[]
  competitorSignals: string[]
  risks: string[]
  recommendedActions: string[]
}

type Stage = 'idle' | 'uploading' | 'analyzing' | 'success' | 'error'

const useStyles = makeStyles({
  page: { display: 'flex', flexDirection: 'column', gap: tokens.spacingVerticalL, maxWidth: '1100px' },
  intro: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', gap: tokens.spacingHorizontalL, flexWrap: 'wrap' },
  eyebrow: { color: tokens.colorBrandForeground1, textTransform: 'uppercase', letterSpacing: '0.08em' },
  introCopy: { display: 'flex', flexDirection: 'column', gap: tokens.spacingVerticalXS, maxWidth: '680px' },
  uploadCard: { paddingTop: tokens.spacingVerticalXXL, paddingBottom: tokens.spacingVerticalXXL, paddingLeft: tokens.spacingHorizontalXXL, paddingRight: tokens.spacingHorizontalXXL, border: `${tokens.strokeWidthThin} dashed ${tokens.colorBrandStroke1}`, backgroundColor: tokens.colorNeutralBackground1 },
  dropzone: { display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: tokens.spacingVerticalM, textAlign: 'center', minHeight: '230px', paddingLeft: tokens.spacingHorizontalL, paddingRight: tokens.spacingHorizontalL },
  uploadIcon: { width: '56px', height: '56px', display: 'grid', placeItems: 'center', borderRadius: tokens.borderRadiusCircular, color: tokens.colorBrandForeground1, backgroundColor: tokens.colorBrandBackground2 },
  helper: { color: tokens.colorNeutralForeground3 },
  status: { display: 'flex', flexDirection: 'column', gap: tokens.spacingVerticalS, width: '100%', maxWidth: '560px' },
  statusRow: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: tokens.spacingHorizontalM },
  statusIcon: { color: tokens.colorBrandForeground1 },
  errorIcon: { color: tokens.colorPaletteRedForeground1 },
  resultsGrid: { display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0, 1fr))', gap: tokens.spacingHorizontalL, '@media (max-width: 760px)': { gridTemplateColumns: '1fr' } },
  resultCard: { paddingTop: tokens.spacingVerticalL, paddingBottom: tokens.spacingVerticalL, paddingLeft: tokens.spacingHorizontalL, paddingRight: tokens.spacingHorizontalL, display: 'flex', flexDirection: 'column', gap: tokens.spacingVerticalM },
  resultHeading: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: tokens.spacingHorizontalM },
  list: { display: 'flex', flexDirection: 'column', gap: tokens.spacingVerticalS, margin: 0, paddingLeft: tokens.spacingHorizontalL },
  summary: { paddingTop: tokens.spacingVerticalL, paddingBottom: tokens.spacingVerticalL, paddingLeft: tokens.spacingHorizontalL, paddingRight: tokens.spacingHorizontalL, backgroundColor: tokens.colorNeutralBackground3, borderRadius: tokens.borderRadiusMedium },
  history: { display: 'flex', flexDirection: 'column', gap: tokens.spacingVerticalS },
  historyRow: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: tokens.spacingHorizontalM, paddingTop: tokens.spacingVerticalS, paddingBottom: tokens.spacingVerticalS },
  hiddenInput: { display: 'none' },
})

function ListCard({ title, items, tone = 'brand' }: { title: string; items: string[]; tone?: 'brand' | 'danger' | 'success' }) {
  const styles = useStyles()
  return <Card className={styles.resultCard}><div className={styles.resultHeading}><Title3 as="h2">{title}</Title3><Badge appearance="tint" color={tone === 'danger' ? 'danger' : tone === 'success' ? 'success' : 'brand'}>{items.length} insights</Badge></div><Divider /><ul className={styles.list}>{(items.length ? items : ['No specific patterns were detected in the preview.']).map((item, index) => <li key={`${item}-${index}`}><Body1>{item}</Body1></li>)}</ul></Card>
}

export function DatasetWorkspace() {
  const styles = useStyles()
  const inputRef = React.useRef<HTMLInputElement>(null)
  const [stage, setStage] = React.useState<Stage>('idle')
  const [file, setFile] = React.useState<File | null>(null)
  const [error, setError] = React.useState('')
  const [analysis, setAnalysis] = React.useState<Analysis | null>(null)
  const [history, setHistory] = React.useState<string[]>([])

  const reset = () => { setStage('idle'); setFile(null); setAnalysis(null); setError(''); if (inputRef.current) inputRef.current.value = '' }

  const analyze = async (selectedFile: File) => {
    setFile(selectedFile); setError(''); setAnalysis(null); setStage('uploading')
    try {
      const formData = new FormData(); formData.append('file', selectedFile)
      const uploadResponse = await fetch('/api/datasets/upload', { method: 'POST', body: formData })
      const uploadData = await uploadResponse.json()
      if (!uploadResponse.ok) throw new Error(uploadData.error ?? 'Upload failed.')
      const preview = (await selectedFile.text()).slice(0, 48000)
      setStage('analyzing')
      const response = await fetch('/api/datasets/analyze', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ filename: selectedFile.name, preview, pathname: uploadData.pathname }) })
      const data = await response.json()
      if (!response.ok) throw new Error(data.error ?? 'Analysis failed.')
      setAnalysis(data.analysis); setHistory((current) => [selectedFile.name, ...current.filter((name) => name !== selectedFile.name)].slice(0, 4)); setStage('success')
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : 'Something went wrong. Try again.'); setStage('error')
    }
  }

  const onFileChange = (event: React.ChangeEvent<HTMLInputElement>) => { const selectedFile = event.target.files?.[0]; if (selectedFile) void analyze(selectedFile) }

  return <div className={styles.page}>
    <div className={styles.intro}><div className={styles.introCopy}><Caption1 className={styles.eyebrow}>Dataset intelligence lab</Caption1><Title1 as="h1">Upload your market data.</Title1><Body1>Drop in competitor pricing, product updates, or customer reviews. CompetIQ will turn the raw dataset into signals, risks, and actions for your next move.</Body1></div><Badge appearance="tint" color="brand" icon={<Sparkle24Regular />}>AI-powered analysis</Badge></div>
    <Card className={styles.uploadCard}>
      {stage === 'success' && analysis ? <div className={styles.status}><div className={styles.statusRow}><div><Subtitle1>Analysis complete</Subtitle1><Caption1>{file?.name} · private upload</Caption1></div><CheckmarkCircle24Regular className={styles.statusIcon} /></div><div className={styles.summary}><Body1Strong>{analysis.summary}</Body1Strong></div><Button appearance="secondary" icon={<ArrowReset24Regular />} onClick={reset}>Analyze another dataset</Button></div> : stage === 'error' ? <div className={styles.dropzone}><DismissCircle24Regular className={styles.errorIcon} fontSize={40} /><Title3 as="h2">We couldn&apos;t analyze that file</Title3><Body1>{error}</Body1><div><Button appearance="primary" onClick={() => file && void analyze(file)}>Retry</Button><Button appearance="subtle" onClick={reset}>Choose another file</Button></div></div> : stage === 'uploading' || stage === 'analyzing' ? <div className={styles.dropzone}><DocumentTable24Regular className={styles.statusIcon} fontSize={48} /><Title3 as="h2">{stage === 'uploading' ? 'Uploading securely…' : 'Reading your dataset…'}</Title3><Body1>{file?.name}</Body1><div className={styles.status}><ProgressBar value={stage === 'uploading' ? 0.42 : 0.78} /><Caption1 className={styles.helper}>Your file is kept private. Only a bounded preview is sent for analysis.</Caption1></div></div> : <div className={styles.dropzone}><div className={styles.uploadIcon}><ArrowUpload24Regular fontSize={28} /></div><Title3 as="h2">Drop your dataset here</Title3><Body1>or choose a file from your computer</Body1><Button appearance="primary" icon={<ArrowUpload24Regular />} onClick={() => inputRef.current?.click()}>Choose dataset</Button><Caption1 className={styles.helper}>CSV, JSON, or TXT · up to 8 MB</Caption1><input ref={inputRef} className={styles.hiddenInput} type="file" accept=".csv,.json,.txt,text/csv,application/json,text/plain" onChange={onFileChange} aria-label="Choose dataset file" /></div>}
    </Card>
    {analysis && stage === 'success' && <div className={styles.resultsGrid}><ListCard title="Key findings" items={analysis.keyFindings} /><ListCard title="Competitor signals" items={analysis.competitorSignals} tone="success" /><ListCard title="Risks to watch" items={analysis.risks} tone="danger" /><ListCard title="Recommended actions" items={analysis.recommendedActions} tone="success" /></div>}
    {history.length > 0 && <Card className={styles.resultCard}><div className={styles.resultHeading}><div><Title3 as="h2">Recent analyses</Title3><Caption1>Files analyzed in this session</Caption1></div><DocumentTable24Regular /></div><Divider /><div className={styles.history}>{history.map((name) => <div className={styles.historyRow} key={name}><Body1>{name}</Body1><Badge appearance="tint" color="success">Analyzed</Badge></div>)}</div></Card>}
  </div>
}
