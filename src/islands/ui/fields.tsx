import type { ComponentChildren } from 'preact';

interface BaseFieldProps {
  id: string;
  label: string;
  hint?: string;
  error?: string | null;
  optional?: boolean;
}

function FieldShell({ id, label, hint, error, optional, children }: BaseFieldProps & { children: ComponentChildren }) {
  return (
    <div class="field">
      <label class="label" for={id}>
        <span>{label}</span>
        {optional && <span class="opt">optioneel</span>}
      </label>
      {children}
      {error ? (
        <span class="error" id={`${id}-err`} role="alert">
          {error}
        </span>
      ) : hint ? (
        <span class="hint" id={`${id}-hint`}>
          {hint}
        </span>
      ) : null}
    </div>
  );
}

interface NumberInputProps extends BaseFieldProps {
  value: string;
  onInput: (v: string) => void;
  prefix?: string;
  suffix?: string;
  placeholder?: string;
  /** "decimal" opent een numeriek toetsenbord met komma; "numeric" zonder. */
  mode?: 'decimal' | 'numeric';
}

/** Tekstveld met numeriek toetsenbord. We gebruiken type="text" zodat zowel komma als punt werken. */
export function NumberInput({ id, label, hint, error, optional, value, onInput, prefix, suffix, placeholder, mode = 'decimal' }: NumberInputProps) {
  const describedBy = error ? `${id}-err` : hint ? `${id}-hint` : undefined;
  return (
    <FieldShell id={id} label={label} hint={hint} error={error} optional={optional}>
      <div class="input-wrap">
        {prefix && <span class="input-affix prefix">{prefix}</span>}
        <input
          id={id}
          class={`input${prefix ? ' has-prefix' : ''}${suffix ? ' has-suffix' : ''}`}
          type="text"
          inputMode={mode}
          autoComplete="off"
          enterKeyHint="done"
          value={value}
          placeholder={placeholder}
          aria-invalid={error ? 'true' : undefined}
          aria-describedby={describedBy}
          onInput={(e) => onInput((e.currentTarget as HTMLInputElement).value)}
        />
        {suffix && <span class="input-affix suffix">{suffix}</span>}
      </div>
    </FieldShell>
  );
}

export const CurrencyInput = (p: Omit<NumberInputProps, 'prefix'>) => <NumberInput {...p} prefix="€" />;
export const PercentageInput = (p: Omit<NumberInputProps, 'suffix'>) => <NumberInput {...p} suffix="%" />;

interface SelectProps extends BaseFieldProps {
  value: string;
  onChange: (v: string) => void;
  options: { value: string; label: string }[];
}

export function SelectField({ id, label, hint, error, optional, value, onChange, options }: SelectProps) {
  return (
    <FieldShell id={id} label={label} hint={hint} error={error} optional={optional}>
      <select id={id} class="input" value={value} onChange={(e) => onChange((e.currentTarget as HTMLSelectElement).value)}>
        {options.map((o) => (
          <option value={o.value} key={o.value}>
            {o.label}
          </option>
        ))}
      </select>
    </FieldShell>
  );
}

interface DateInputProps extends BaseFieldProps {
  value: string;
  onInput: (v: string) => void;
  min?: string;
  max?: string;
}

export function DateInput({ id, label, hint, error, optional, value, onInput, min, max }: DateInputProps) {
  return (
    <FieldShell id={id} label={label} hint={hint} error={error} optional={optional}>
      <input
        id={id}
        class="input"
        type="date"
        value={value}
        min={min}
        max={max}
        aria-invalid={error ? 'true' : undefined}
        onInput={(e) => onInput((e.currentTarget as HTMLInputElement).value)}
      />
    </FieldShell>
  );
}

interface SegmentedProps<V extends string> {
  name: string;
  legend: string;
  value: V;
  onChange: (v: V) => void;
  options: { value: V; label: string }[];
  tabs?: boolean;
  hideLegend?: boolean;
}

/** Radiogroep in de vorm van een segmented control; toetsenbord- en schermlezer-vriendelijk. */
export function Segmented<V extends string>({ name, legend, value, onChange, options, tabs, hideLegend }: SegmentedProps<V>) {
  return (
    <fieldset class="field" style={{ border: 0, padding: 0, margin: 0, minWidth: 0 }}>
      <legend class={hideLegend ? 'visually-hidden' : 'label'} style={{ marginBottom: hideLegend ? 0 : '6px', padding: 0 }}>
        {legend}
      </legend>
      <div class={`segmented${tabs ? ' segmented-tabs' : ''}`}>
        {options.map((o) => (
          <label key={o.value}>
            <input type="radio" name={name} value={o.value} checked={value === o.value} onChange={() => onChange(o.value)} />
            <span>{o.label}</span>
          </label>
        ))}
      </div>
    </fieldset>
  );
}

export function Checkbox({ id, label, checked, onChange }: { id: string; label: string; checked: boolean; onChange: (v: boolean) => void }) {
  return (
    <label class="check" for={id}>
      <input id={id} type="checkbox" checked={checked} onChange={(e) => onChange((e.currentTarget as HTMLInputElement).checked)} />
      <span>{label}</span>
    </label>
  );
}
