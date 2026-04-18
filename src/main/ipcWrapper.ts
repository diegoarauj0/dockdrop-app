/* eslint-disable @typescript-eslint/no-explicit-any */
interface InterfaceIpcError {
  message?: string;
  details?: any;
  code?: string;
}

interface InterfaceIpcResponse {
  error?: InterfaceIpcError;
  success: boolean;
  data?: any;
}

export class IpcWrapper {
  public static wrap(callback: (...args: any[]) => Promise<any>): (...args: any[]) => Promise<InterfaceIpcResponse> {
    return async (...args: any[]): Promise<InterfaceIpcResponse> => {
      try {
        const data = await callback(...args);

        return { success: true, data };
      } catch (err: unknown) {
        const { code, details, message } = err as InterfaceIpcError;

        return {
          success: false,
          error: { message: message ?? "", code: code || "UNKNOWN_ERROR", details },
        };
      }
    };
  }
}
