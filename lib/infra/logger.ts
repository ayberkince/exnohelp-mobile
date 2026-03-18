type LogLevel = 'INFO' | 'WARN' | 'ERROR';

export function log(level: LogLevel, message: string, data?: any) {
  const timestamp = new Date().toISOString();
  const logMessage = `[${timestamp}] [${level}] ${message}`;

  if (level === 'ERROR') {
    console.error(logMessage, data || '');
    // Future: Push to Sentry/Logtail here
  } else {
    console.log(logMessage, data || '');
  }
}
