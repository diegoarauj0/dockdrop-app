import { ContainerStats } from "dockerode";

export function getCPUPercent(stats: ContainerStats): number {
  if (!stats?.precpu_stats || !stats?.cpu_stats) return 0;

  const cpuDelta = stats.cpu_stats.cpu_usage.total_usage - stats.precpu_stats.cpu_usage.total_usage;

  const systemDelta = stats.cpu_stats.system_cpu_usage - stats.precpu_stats.system_cpu_usage;

  const cores = stats.cpu_stats.online_cpus || 1;

  if (cpuDelta > 0 && systemDelta > 0) {
    return (cpuDelta / systemDelta) * cores * 100;
  }

  return 0;
}

export function getMemoryUsage(stats: ContainerStats): { used: number; limit: number; percent: number } {
  if (!stats?.memory_stats) return { used: 0, limit: 0, percent: 0 };

  const usage = stats.memory_stats.usage;
  const limit = stats.memory_stats.limit;

  const inactiveFile = stats.memory_stats.stats?.inactive_file;
  const cache = stats.memory_stats.stats?.cache;

  const reclaimable = inactiveFile ?? cache ?? 0;

  const used = usage - reclaimable;
  const percent = limit ? (used / limit) * 100 : 0;

  return { used, limit, percent };
}

export function formatBytes(bytes: number): string {
  if (!bytes) return "0 B";

  const sizes = ["B", "KB", "MB", "GB", "TB"];
  const i = Math.floor(Math.log(bytes) / Math.log(1024));

  return (bytes / Math.pow(1024, i)).toFixed(2) + " " + sizes[i];
}
