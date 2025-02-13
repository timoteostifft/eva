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
          throw new ResourceNotFoundError("job", job.name);
        }

        await handler(job.data);
      },
      {
        connection: { url: env.TASKS_QUEUE_URL },
      }
    );

    this.worker.on("completed", (jobId) => {
      console.log(`Job ${jobId} done!`);
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
