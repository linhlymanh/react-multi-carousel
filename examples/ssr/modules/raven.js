const isProd = process.env.NODE_ENV === "production";
class Raven {
  constructor() {
    this.sentry = undefined;
  }
  async loadSentry() {
    const ravenPromise = import("@sentry/browser");
    this.sentry = await ravenPromise;
    this.sentry.init({
      dsn: process.env.SENTRY_DSN,
    });
  }
  async init() {
    if (!isProd) {
      return;
    }
    await this.loadSentry();
  }
  async catchError(error, errorInfo, level) {
    if (isProd && this.sentry) {
      this.sentry.withScope(scope => {
        if (level) {
          scope.setLevel(level);
        }
        if (errorInfo) {
          scope.setExtra("component", errorInfo);
        }
        return this.sentry.captureException(error);
      });
    }
  }
}
const raven = new Raven();

export default raven;
