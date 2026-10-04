/**
 * Analytics-eventstructuur. Werkt met Google Tag Manager (dataLayer) én met
 * een directe GA4-installatie (gtag). Zonder geconfigureerde ID's worden
 * events alleen in de dataLayer gezet en gebeurt er verder niets.
 *
 * Events: calculator_view, calculator_start, calculator_completed, calculator_share
 * Parameter: calculator_name (+ optioneel share_method)
 */
export type CalculatorEvent = 'calculator_view' | 'calculator_start' | 'calculator_completed' | 'calculator_share';

declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[];
    gtag?: (...args: unknown[]) => void;
    __rwAnalytics?: { gtm: boolean; ga4: boolean };
  }
}

export function track(event: CalculatorEvent, calculatorName: string, extra: Record<string, string | number> = {}) {
  if (typeof window === 'undefined') return;
  const params = { calculator_name: calculatorName, ...extra };
  const mode = window.__rwAnalytics;
  if (mode?.ga4 && !mode.gtm && typeof window.gtag === 'function') {
    window.gtag('event', event, params);
    return;
  }
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ event, ...params });
}
