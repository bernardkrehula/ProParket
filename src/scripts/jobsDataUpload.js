import supabase from "../config/supabaseClientNode.js";
import { jobs } from "../data/jobsData.js";

const jobsDataUpload = async () => {
  try {
    const { data, error } = await supabase
      .from("jobs")
      .insert(jobs)
      .select();

    return data;
  } catch (error) {
    console.log(error);
  }
};
jobsDataUpload();