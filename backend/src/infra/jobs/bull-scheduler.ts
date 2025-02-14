// Entities
import { Job } from "@/core/entities/job";

// Jobs
import { Scheduler } from "@/core/jobs/scheduler";

// Environment
import { env } from "@/infra/env";

// Libraries
import { Queue, Worker } from "bullmq";
import { mapper } from "@/infra/jobs/mapper";

// Errors
import { ResourceNotFoundError } from "@/core/errors/resource-not-found";

export class BullScheduler implements Scheduler {
  private queue: Queue;
  private worker: Worker;

  constructor() {
    this.queue = new Queue("tasks", {
      connection: { url: env.TASKS_QUEUE_URL },
    });

    this.worker = new Worker(
      "tasks",
      async (job) => {
        const handler = mapper[job.name as keyof typeof mapper];

        if (!handler) {
          throw new ResourceNotFoundError("Job", job.name);
        }

        await handler(job.data);
      },
      {
        connection: { url: env.TASKS_QUEUE_URL },
      }
    );

    this.worker.on("completed", (job) => {
      const time = new Date().toISOString();
      const took = Date.now() - job.timestamp;

      console.log(
        "%s \x1b[32m%s\x1b[0m: \x1b[36m%s\x1b[0m",
        `[${time}]`,
        "INFO",
        "job finished",
        {
          job_id: job.id,
          name: job.name,
          data: job.data,
          tries: job.attemptsMade,
          took: `${took}ms`,
        }
      );
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
