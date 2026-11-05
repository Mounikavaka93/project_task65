import { useState } from 'react';
import { levels } from '../data/catalog';
import { useTitle } from '../hooks/useTitle';
import { IconClock, IconPin } from '../components/Icons';

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const topics = ['Atrium visit', 'A store', 'An order', 'Press', 'Something else'];

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', topic: topics[0], message: '' });
  const [errors, setErrors] = useState({});
  const [sent, setSent] = useState(false);
  useTitle('Contact');

  function setField(key, value) {
    setForm((current) => ({ ...current, [key]: value }));
  }

  function submit(event) {
    event.preventDefault();
    const next = {};
    if (!form.name.trim()) next.name = 'Add your name so the desk knows who wrote.';
    if (!emailPattern.test(form.email.trim())) next.email = 'Use a full email address.';
    if (form.message.trim().length < 12) next.message = 'Give the desk a little more than a word.';
    setErrors(next);
    if (Object.keys(next).length) return;
    setSent(true);
  }

  return (
    <div className="wrap py-10">
      <p className="eyebrow">Contact us</p>
      <h1 className="mt-2 max-w-3xl font-display text-5xl leading-tight">Write the Level 0 desk.</h1>
      <p className="mt-3 max-w-2xl text-ink/70">
        Visits, lost bags, press, and anything the stair cannot answer. This form stays on the page. It is not emailed.
      </p>

      <div className="mt-10 grid gap-8 lg:grid-cols-2">
        <div className="space-y-4">
          <article className="rounded-[1.6rem] bg-ink p-6 text-paper">
            <p className="flex items-center gap-2 text-goldbright">
              <IconPin className="h-4 w-4" />
              Visit
            </p>
            <p className="mt-3 font-display text-3xl">Velthara Spiral</p>
            <p className="mt-2 text-sm text-paper/75">18 Helix Lane<br />Aurora District</p>
            <p className="mt-4 flex items-center gap-2 text-sm text-paper/75">
              <IconClock className="h-4 w-4" />
              Open daily 10:00 – 22:00
            </p>
            <p className="mt-4 text-sm">hello@velthara.gallery</p>
            <p className="text-sm">+1 (415) 555-0198</p>
          </article>
          <ol className="rounded-[1.6rem] border border-line bg-white p-5">
            {levels.map((level) => (
              <li key={level.floor} className="flex gap-4 border-b border-line py-3 last:border-0">
                <span className="w-10 font-display text-xl text-ember">{level.floor}</span>
                <span>
                  <span className="block font-medium">{level.name}</span>
                  <span className="text-sm text-ink/60">{level.detail}</span>
                </span>
              </li>
            ))}
          </ol>
        </div>

        <div className="rounded-[1.6rem] bg-white p-6 shadow-card">
          {sent ? (
            <div>
              <p className="font-display text-4xl">The desk has your note.</p>
              <p className="mt-3 text-ink/70">
                Thank you, {form.name.trim()}. In this demo the note is not sent anywhere. A real desk would read atrium mail each morning.
              </p>
              <button
                type="button"
                className="btn-ink mt-6"
                onClick={() => {
                  setSent(false);
                  setForm({ name: '', email: '', topic: topics[0], message: '' });
                }}
              >
                Write another
              </button>
            </div>
          ) : (
            <form onSubmit={submit} className="space-y-4" noValidate>
              <div>
                <label htmlFor="contact-name" className="text-sm">Name</label>
                <input id="contact-name" value={form.name} onChange={(event) => setField('name', event.target.value)} className="field mt-1" autoComplete="name" />
                {errors.name ? <p className="mt-1 text-xs text-ember">{errors.name}</p> : null}
              </div>
              <div>
                <label htmlFor="contact-email" className="text-sm">Email</label>
                <input id="contact-email" type="email" value={form.email} onChange={(event) => setField('email', event.target.value)} className="field mt-1" autoComplete="email" />
                {errors.email ? <p className="mt-1 text-xs text-ember">{errors.email}</p> : null}
              </div>
              <div>
                <label htmlFor="contact-topic" className="text-sm">Topic</label>
                <select id="contact-topic" value={form.topic} onChange={(event) => setField('topic', event.target.value)} className="field mt-1">
                  {topics.map((topic) => (
                    <option key={topic}>{topic}</option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor="contact-message" className="text-sm">Message</label>
                <textarea id="contact-message" rows={6} value={form.message} onChange={(event) => setField('message', event.target.value)} className="field mt-1 resize-y" />
                {errors.message ? <p className="mt-1 text-xs text-ember">{errors.message}</p> : null}
              </div>
              <button type="submit" className="btn-ember">Send to the desk</button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
