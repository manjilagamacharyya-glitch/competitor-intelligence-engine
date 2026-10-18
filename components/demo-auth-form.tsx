'use client'

import * as React from 'react'
import { useRouter } from 'next/navigation'
import { Button, Card, Field, Input, Subtitle1, Title1, Body1, Caption1, makeStyles, tokens } from '@fluentui/react-components'
import { ArrowRight24Regular, Eye24Regular, EyeOff24Regular } from '@fluentui/react-icons'

const useStyles = makeStyles({
  page: { minHeight: '100vh', display: 'grid', placeItems: 'center', padding: tokens.spacingHorizontalL, backgroundColor: tokens.colorNeutralBackground2 },
  shell: { width: '100%', maxWidth: '440px', display: 'flex', flexDirection: 'column', gap: tokens.spacingVerticalL },
  brand: { display: 'flex', alignItems: 'center', gap: tokens.spacingHorizontalS },
  mark: { width: '36px', height: '36px', display: 'grid', placeItems: 'center', borderRadius: tokens.borderRadiusLarge, backgroundColor: tokens.colorBrandBackground, color: tokens.colorNeutralForegroundInverted, fontWeight: tokens.fontWeightBold },
  card: { display: 'flex', flexDirection: 'column', gap: tokens.spacingVerticalL, paddingTop: tokens.spacingVerticalXXL, paddingBottom: tokens.spacingVerticalXXL, paddingLeft: tokens.spacingHorizontalXXL, paddingRight: tokens.spacingHorizontalXXL },
  heading: { display: 'flex', flexDirection: 'column', gap: tokens.spacingVerticalXS },
  form: { display: 'flex', flexDirection: 'column', gap: tokens.spacingVerticalM },
  password: { display: 'flex', alignItems: 'center', gap: tokens.spacingHorizontalXS },
  passwordInput: { flex: 1 },
  footer: { textAlign: 'center', color: tokens.colorNeutralForeground3 },
})

export function DemoAuthForm({ mode }: { mode: 'sign-in' | 'sign-up' }) {
  const styles = useStyles(); const router = useRouter()
  const [showPassword, setShowPassword] = React.useState(false); const [error, setError] = React.useState('')
  const isSignUp = mode === 'sign-up'
  const submit = (event: React.FormEvent<HTMLFormElement>) => { event.preventDefault(); const form = new FormData(event.currentTarget); const email = String(form.get('email') ?? ''); const password = String(form.get('password') ?? ''); if (!email.includes('@')) return setError('Enter a valid email address.'); if (password.length < 8) return setError('Use at least 8 characters for your password.'); router.push('/') }
  return <main className={styles.page}><div className={styles.shell}><div className={styles.brand}><div className={styles.mark}>C</div><Subtitle1>CompetIQ</Subtitle1></div><Card className={styles.card}><div className={styles.heading}><Title1 as="h1">{isSignUp ? 'Create your workspace' : 'Welcome back'}</Title1><Body1>{isSignUp ? 'Start turning competitor signals into your next advantage.' : 'Sign in to continue to your intelligence workspace.'}</Body1></div><form className={styles.form} onSubmit={submit}><Field label={isSignUp ? 'Full name' : 'Email address'}>{isSignUp ? <Input name="name" placeholder="Alex Morgan" required /> : <Input name="email" type="email" placeholder="alex@company.com" required />}</Field>{isSignUp && <Field label="Email address"><Input name="email" type="email" placeholder="alex@company.com" required /></Field>}<Field label="Password" validationMessage={error} validationState={error ? 'error' : 'none'}><div className={styles.password}><Input className={styles.passwordInput} name="password" type={showPassword ? 'text' : 'password'} placeholder="8+ characters" required /><Button type="button" appearance="subtle" icon={showPassword ? <EyeOff24Regular /> : <Eye24Regular />} onClick={() => setShowPassword((value) => !value)} aria-label={showPassword ? 'Hide password' : 'Show password'} /></div></Field><Button type="submit" appearance="primary" icon={<ArrowRight24Regular />} iconPosition="after">{isSignUp ? 'Create account' : 'Sign in'}</Button></form><Caption1 className={styles.footer}>{isSignUp ? <>Already have an account? <Button appearance="transparent" onClick={() => router.push('/sign-in')}>Sign in</Button></> : <>New to CompetIQ? <Button appearance="transparent" onClick={() => router.push('/sign-up')}>Create an account</Button></>}</Caption1></Card><Caption1 className={styles.footer}>Demo authentication · no account data is stored</Caption1></div></main>
}
