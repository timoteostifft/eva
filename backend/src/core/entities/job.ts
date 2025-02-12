import { Entity, EntityRequest } from "@/core/entities/entity";

export type JobName = (typeof Job.names)[number];

export interface JobProps extends EntityRequest {
  name: JobName;
  params: Record<string, unknown>;
  run_at: Date;
}

export class Job extends Entity<JobProps> {
  get name() {
    return this.props.name;
  }

  get params() {
    return this.props.params;
  }

  static create(props: JobProps) {
    return new Job(props);
  }

  static readonly names = ["dispatch-journey"] as const;
}
