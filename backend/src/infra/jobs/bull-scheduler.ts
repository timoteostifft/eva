// Entities
import { Job } from "@/core/entities/job";

// Jobs
import { Scheduler } from "@/core/jobs/scheduler";

// Environment
import { env } from "@/infra/env";

// Libraries
import { Queue } from "bullmq";

export class BullScheduler implements Scheduler {
  private queue: Queue;

  constructor() {
    this.queue = new Queue("tasks", {
      connection: { url: env.TASKS_QUEUE_URL },
    });
  }

  async schedule(job: Job) {
    await this.queue.add(job.name, job.params, {
      jobId: job.id.value,
      delay: job.run_at.getTime() - new Date().getTime(),
      attempts: 3,
      timestamp: job.created_at.getTime(),
    });
  }
}
