export type JobType = {
  id: string;
  address: string;
  client_name: string;
  phone: string;
  /** Planned start date of the job ("YYYY-MM-DD"). */
  date: string;
  /** Planned end date; null means a single-day job. */
  end_date: string | null;
  /** Planned start time of day, stored as "HH:MM" (or null). */
  start_time: string | null;
  notes: string | null;
  created_at: string;
  date_started: string;
  date_finished: string | null;
};

export type EditedJob = Omit<JobType, "id" | "created_at">;

export type NewJob = Omit<JobType, "id" | "created_at">;
