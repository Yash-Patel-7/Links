import { spawn } from 'child_process';

/**
 * Get the platform-specific command for opening URLs
 */
const getOpenCommand = (): string => {
  switch (process.platform) {
    case 'darwin':
      return 'open';
    case 'win32':
      return 'start';
    case 'linux':
      return 'xdg-open';
    default:
      throw new Error(`Unsupported platform: ${process.platform}`);
  }
};

/**
 * Open a URL using the appropriate command for the current platform
 * @param url - The URL to open
 * @returns Promise that resolves when the open command completes successfully
 * @throws Error if the open command fails or is not supported
 */
export const openUrl = (url: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    const command = getOpenCommand();
    const child = spawn(command, [url]);

    let settled = false;
    let errorText = '';

    const safeResolve = () => {
      if (!settled) {
        settled = true;
        resolve();
      }
    };
    const safeReject = (err: Error) => {
      if (!settled) {
        settled = true;
        reject(err);
      }
    };

    child.on('error', (error) => {
      safeReject(error);
    });

    child.stderr.setEncoding('utf8');

    child.stderr.on('data', (data: string) => {
      errorText += data;
    });

    child.stderr.on('end', () => {
      if (errorText) {
        safeReject(new Error(`Error opening URL: ${errorText}`));
      }
    });

    child.on('close', (code) => {
      if (!errorText && code === 0) {
        safeResolve();
      } else {
        const status = code?.toString() || 'unknown';
        safeReject(
          new Error(
            `Open command exited with code ${status} and error: ${errorText}`,
          ),
        );
      }
    });
  });
};
