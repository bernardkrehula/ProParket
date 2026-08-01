export type JobType = {
  id: string;
  address: string;
  client_name: string;
  phone: string;
  date: string;
  end_date: string | null;
  start_time: string | null;
  notes: string | null;
  created_at: string;
  date_started: string;
  date_finished: string | null;
};

export type EditedJob = Omit<JobType, "id" | "created_at">;

export type NewJob = Omit<JobType, "id" | "created_at">;
