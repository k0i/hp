export interface HealthCheckInfo {
  checks: HealthCheck[];
}
interface HealthCheck {
  name: string;
  status: "up" | "down" | "grace";
  last_ping: "string";
}
