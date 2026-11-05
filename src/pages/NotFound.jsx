import { Link } from 'react-router-dom';
import { useTitle } from '../hooks/useTitle';
import Atrium from '../components/Atrium';

export default function NotFound() {
  useTitle('Missing floor');
  return (
    <div className="wrap py-12">
      <div className="overflow-hidden rounded-[2rem] bg-ink">
        <Atrium />
      </div>
      <h1 className="mt-8 font-display text-5xl">This floor does not exist.</h1>
      <p className="mt-3 max-w-lg text-ink/70">The stair does not stop here. Head back to the atrium, or pick a floor that does.</p>
      <div className="mt-6 flex flex-wrap gap-3">
        <Link to="/" className="btn-ember">Back to Velthara</Link>
        <Link to="/category/all" className="btn-line">Browse pieces</Link>
      </div>
    </div>
  );
}
