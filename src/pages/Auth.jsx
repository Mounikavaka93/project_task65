import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useMall } from '../context/MallContext';
import { useTitle } from '../hooks/useTitle';
import Atrium from '../components/Atrium';

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function Auth({ mode }) {
  const isSignUp = mode === 'signup';
  const { user, signIn, signUp, signOut } = useMall();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: '', email: '', password: '', confirm: '' });
  const [errors, setErrors] = useState({});
  const [formError, setFormError] = useState('');
  useTitle(isSignUp ? 'Create account' : 'Sign in');

  function setField(key, value) {
    setForm((current) => ({ ...current, [key]: value }));
  }

  function validate() {
    const next = {};
    if (isSignUp && !form.name.trim()) next.name = 'Tell the desk what to call you.';
    if (!emailPattern.test(form.email.trim())) next.email = 'Use a full email address.';
    if (form.password.length < 6) next.password = 'Use at least 6 characters.';
    if (isSignUp && form.confirm !== form.password) next.confirm = 'The two passwords do not match.';
    return next;
  }

  function submit(event) {
    event.preventDefault();
    const next = validate();
    setErrors(next);
    setFormError('');
    if (Object.keys(next).length) return;
    const result = isSignUp
      ? signUp({ name: form.name, email: form.email, password: form.password })
      : signIn({ email: form.email, password: form.password });
    if (!result.ok) {
      setFormError(result.message);
      return;
    }
    navigate('/');
  }

  return (
    <div className="grid lg:min-h-[calc(100svh-5rem)] lg:grid-cols-2">
      <div className="bg-ink text-paper lg:grid lg:place-items-center">
        <div className="px-4 py-8">
          <Atrium />
          <p className="mx-auto mt-2 max-w-sm text-center text-sm text-paper/70">
            House accounts live on this device only. The password never leaves the browser.
          </p>
        </div>
      </div>
      <div className="mx-auto flex w-full max-w-md items-center px-5 py-12 lg:mx-0 lg:h-full lg:max-w-none lg:px-14">
        <div className="w-full">
        {user ? (
          <div>
            <p className="eyebrow">House account</p>
            <h1 className="mt-2 font-display text-5xl">You are already in, {user.name}.</h1>
            <p className="mt-3 text-ink/70">{user.email}</p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link to="/" className="btn-ember">Back to the atrium</Link>
              <button type="button" className="btn-line" onClick={signOut}>Sign out</button>
            </div>
          </div>
        ) : (
          <>
            <p className="eyebrow">{isSignUp ? 'Create account' : 'Sign in'}</p>
            <h1 className="mt-2 font-display text-5xl">{isSignUp ? 'Open a house account.' : 'Welcome back to the stair.'}</h1>
            <form onSubmit={submit} className="mt-8 space-y-4" noValidate>
              {isSignUp ? (
                <div>
                  <label htmlFor="name" className="text-sm">Name</label>
                  <input id="name" value={form.name} onChange={(event) => setField('name', event.target.value)} className="field mt-1" autoComplete="name" />
                  {errors.name ? <p className="mt-1 text-xs text-ember">{errors.name}</p> : null}
                </div>
              ) : null}
              <div>
                <label htmlFor="email" className="text-sm">Email</label>
                <input id="email" type="email" value={form.email} onChange={(event) => setField('email', event.target.value)} className="field mt-1" autoComplete="email" />
                {errors.email ? <p className="mt-1 text-xs text-ember">{errors.email}</p> : null}
              </div>
              <div>
                <label htmlFor="password" className="text-sm">Password</label>
                <input id="password" type="password" value={form.password} onChange={(event) => setField('password', event.target.value)} className="field mt-1" autoComplete={isSignUp ? 'new-password' : 'current-password'} />
                {errors.password ? <p className="mt-1 text-xs text-ember">{errors.password}</p> : null}
              </div>
              {isSignUp ? (
                <div>
                  <label htmlFor="confirm" className="text-sm">Confirm password</label>
                  <input id="confirm" type="password" value={form.confirm} onChange={(event) => setField('confirm', event.target.value)} className="field mt-1" autoComplete="new-password" />
                  {errors.confirm ? <p className="mt-1 text-xs text-ember">{errors.confirm}</p> : null}
                </div>
              ) : null}
              {formError ? <p className="text-sm text-ember">{formError}</p> : null}
              <button type="submit" className="btn-ember">{isSignUp ? 'Create account' : 'Sign in'}</button>
            </form>
            <p className="mt-6 text-sm text-ink/70">
              {isSignUp ? (
                <>
                  Already on the list? <Link to="/signin" className="text-ember underline-offset-4 hover:underline">Sign in</Link>
                </>
              ) : (
                <>
                  New to the spiral? <Link to="/signup" className="text-ember underline-offset-4 hover:underline">Create a house account</Link>
                </>
              )}
            </p>
          </>
        )}
        </div>
      </div>
    </div>
  );
}
