import { logger } from '@/lib/logger';

/**
 * Centralized Logger Utility
 *
 * Provides structured logging with different levels and proper error tracking.
 * In production, this should be connected to a logging service like LogRocket, Datadog, or similar.
 */

type LogLevel = 'debug' | 'info' | 'warn' | 'error';

interface LogContext {
  [key: string]: unknown;
}

class Logger {
  private isDevelopment = process.env.NODE_ENV === 'development';
  private isProduction = process.env.NODE_ENV === 'production';

  private getTimestamp(): string {
    return new Date().toISOString();
  }

  private formatMessage(
    level: LogLevel,
    message: string,
    context?: LogContext
  ): unknown {
    const baseLog = {
      timestamp: this.getTimestamp(),
      level,
      message,
      ...context
    };

    if (this.isDevelopment) {
      // In development, use colored output for better readability
      const colors = {
        debug: '\x1b[36m', // Cyan
        info: '\x1b[32m', // Green
        warn: '\x1b[33m', // Yellow
        error: '\x1b[31m' // Red
      };
      const reset = '\x1b[0m';
      const color = colors[level];

      return {
        formatted: `${color}[${level.toUpperCase()}]${reset} ${message}`,
        context
      };
    }

    return baseLog;
  }

  private shouldLog(level: LogLevel): boolean {
    // In production, skip debug logs
    if (this.isProduction && level === 'debug') {
      return false;
    }
    return true;
  }

  debug(message: string, context?: LogContext): void {
    if (!this.shouldLog('debug')) return;

    const log = this.formatMessage('debug', message, context);

    if (this.isDevelopment) {
      logger.info(log.formatted, log.context || '');
    } else {
      // In production, send to logging service
      this.sendToLoggingService('debug', message, context);
    }
  }

  info(message: string, context?: LogContext): void {
    if (!this.shouldLog('info')) return;

    const log = this.formatMessage('info', message, context);

    if (this.isDevelopment) {
      logger.info(log.formatted, log.context || '');
    } else {
      logger.info(JSON.stringify(log));
      this.sendToLoggingService('info', message, context);
    }
  }

  warn(message: string, context?: LogContext): void {
    if (!this.shouldLog('warn')) return;

    const log = this.formatMessage('warn', message, context);

    if (this.isDevelopment) {
      logger.warn(log.formatted, log.context || '');
    } else {
      logger.warn(JSON.stringify(log));
      this.sendToLoggingService('warn', message, context);
    }
  }

  error(message: string, error?: Error | unknown, context?: LogContext): void {
    if (!this.shouldLog('error')) return;

    const errorContext: LogContext = {
      ...context
    };

    if (error instanceof Error) {
      errorContext.error = {
        message: error.message,
        stack: error.stack,
        name: error.name
      };
    } else if (error) {
      errorContext.error = error;
    }

    const log = this.formatMessage('error', message, errorContext);

    if (this.isDevelopment) {
      logger.error(log.formatted, errorContext);
    } else {
      logger.error(JSON.stringify(log));
      this.sendToLoggingService('error', message, errorContext);
    }
  }

  /**
   * Log API requests
   */
  logRequest(
    method: string,
    path: string,
    statusCode: number,
    duration: number,
    context?: LogContext
  ): void {
    const message = `${method} ${path} ${statusCode} ${duration}ms`;

    if (statusCode >= 500) {
      this.error(`Request failed: ${message}`, undefined, context);
    } else if (statusCode >= 400) {
      this.warn(`Request error: ${message}`, context);
    } else {
      this.info(`Request: ${message}`, context);
    }
  }

  /**
   * Log database queries (useful for debugging)
   */
  logQuery(query: string, duration: number, context?: LogContext): void {
    this.debug(`Database query (${duration}ms)`, {
      query,
      duration,
      ...context
    });
  }

  /**
   * Log performance metrics
   */
  logPerformance(
    operation: string,
    duration: number,
    context?: LogContext
  ): void {
    const level = duration > 1000 ? 'warn' : 'info';

    if (level === 'warn') {
      this.warn(`Slow operation: ${operation} took ${duration}ms`, {
        operation,
        duration,
        ...context
      });
    } else {
      this.info(`Performance: ${operation} completed in ${duration}ms`, {
        operation,
        duration,
        ...context
      });
    }
  }

  /**
   * Create a child logger with predefined context
   */
  createChildLogger(defaultContext: LogContext): Logger {
    const childLogger = new Logger();
    const originalMethods = {
      debug: childLogger.debug.bind(childLogger),
      info: childLogger.info.bind(childLogger),
      warn: childLogger.warn.bind(childLogger),
      error: childLogger.error.bind(childLogger)
    };

    childLogger.debug = (message: string, context?: LogContext) => {
      originalMethods.debug(message, { ...defaultContext, ...context });
    };

    childLogger.info = (message: string, context?: LogContext) => {
      originalMethods.info(message, { ...defaultContext, ...context });
    };

    childLogger.warn = (message: string, context?: LogContext) => {
      originalMethods.warn(message, { ...defaultContext, ...context });
    };

    childLogger.error = (
      message: string,
      error?: Error | unknown,
      context?: LogContext
    ) => {
      originalMethods.error(message, error, { ...defaultContext, ...context });
    };

    return childLogger;
  }

  /**
   * Send logs to external logging service
   * This is a placeholder - implement with your preferred service (Sentry, LogRocket, etc.)
   */
  private sendToLoggingService(
    level: LogLevel,
    message: string,
    context?: LogContext
  ): void {
    // TODO: Implement integration with logging service
    // Example services:
    // - Sentry for errors
    // - LogRocket for session recording
    // - Datadog for metrics
    // - CloudWatch for AWS

    if (this.isProduction) {
      // In production, you would send to your logging service
      // For now, we'll just use console as fallback
      // Example Sentry integration (if Sentry is configured):
      // if (level === 'error' && typeof window !== 'undefined' && window.Sentry) {
      //   window.Sentry.captureMessage(message, level);
      // }
    }
  }
}

// Export singleton instance
export const logger = new Logger();

// Export for testing
export { Logger };

// Convenience exports
export const { debug, info, warn, error } = logger;
