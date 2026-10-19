interface CountdownElement {
  textContent: string | null;
  removeAttribute(name: string): void;
  setAttribute(name: string, value: string): void;
  addEventListener(name: string, listener: (event: Event) => void): void;
}
interface CountdownDocument {
  querySelector(selector: string): CountdownElement | null;
}

// Serialized into the sign-in page. Pass the browser document explicitly because
// the server imports this module too; keep callbacks anonymous and self-contained.
export function loginCountdown(seconds: number, document: CountdownDocument): void {
  const message = document.querySelector('[data-login-countdown]');
  const link = document.querySelector('[data-login-link]');
  if (!message || !link) {
    return;
  }
  const deadline = Date.now() + seconds * 1000;
  link.addEventListener('click', (event) => {
    if (Date.now() < deadline) {
      event.preventDefault();
    }
  });
  const timer = setInterval(() => {
    // Recompute elapsed time so background tabs catch up instead of losing ticks.
    const remaining = Math.max(0, Math.ceil((deadline - Date.now()) / 1000));
    message.textContent = remaining
      ? `Wait at least ${remaining} seconds, then start a new sign-in below.`
      : 'You can try signing in again now.';
    if (remaining === 0) {
      clearInterval(timer);
      link.removeAttribute('aria-disabled');
      link.removeAttribute('tabindex');
      message.setAttribute('role', 'status');
    }
  }, 250);
}
