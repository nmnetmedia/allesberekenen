import { useEffect, useState } from 'preact/hooks';
import { track } from '../../lib/analytics';
import { Icon } from './Icon';

interface ShareResultProps {
  calculatorName: string;
  /** Tekst die gekopieerd of gedeeld wordt. */
  text: string;
  /** Link waarmee het resultaat opnieuw geopend kan worden. */
  url?: string;
  onReset?: () => void;
  disabled?: boolean;
}

async function copyToClipboard(value: string) {
  try {
    await navigator.clipboard.writeText(value);
    return true;
  } catch {
    // Fallback voor oudere browsers of niet-beveiligde contexten.
    const ta = document.createElement('textarea');
    ta.value = value;
    ta.setAttribute('readonly', '');
    ta.style.position = 'fixed';
    ta.style.opacity = '0';
    document.body.appendChild(ta);
    ta.select();
    const ok = document.execCommand('copy');
    ta.remove();
    return ok;
  }
}

export function ShareResult({ calculatorName, text, url, onReset, disabled }: ShareResultProps) {
  const [canShare, setCanShare] = useState(false);
  const [status, setStatus] = useState('');

  useEffect(() => {
    setCanShare(typeof navigator !== 'undefined' && typeof navigator.share === 'function');
  }, []);

  useEffect(() => {
    if (!status) return;
    const t = setTimeout(() => setStatus(''), 2200);
    return () => clearTimeout(t);
  }, [status]);

  const full = url ? `${text}\n\n${url}` : text;

  const onCopy = async () => {
    if (await copyToClipboard(full)) {
      setStatus('Gekopieerd');
      track('calculator_share', calculatorName, { share_method: 'copy' });
    } else setStatus('Kopiëren lukte niet');
  };

  const onShare = async () => {
    try {
      await navigator.share({ title: document.title, text, url });
      track('calculator_share', calculatorName, { share_method: 'web_share' });
    } catch {
      /* gebruiker annuleerde */
    }
  };

  return (
    <div class="actions">
      <button type="button" class="btn btn-secondary btn-sm" onClick={onCopy} disabled={disabled}>
        <Icon name="copy" size={16} /> Resultaat kopiëren
      </button>
      {onReset && (
        <button type="button" class="btn btn-ghost btn-sm" onClick={onReset}>
          <Icon name="reset" size={16} /> Opnieuw berekenen
        </button>
      )}
      {/* Pas na het laden bekend of delen kan; achteraan zodat er niets verspringt. */}
      {canShare && (
        <button type="button" class="btn btn-secondary btn-sm" onClick={onShare} disabled={disabled}>
          <Icon name="share" size={16} /> Delen
        </button>
      )}
      <span class="toast" role="status" aria-live="polite">
        {status}
      </span>
    </div>
  );
}
