import supabase from "../config/supabaseClientNode.js";
import { jobServices } from "../data/jobServices.js";

const jobServicesUpload = async () => {
  try {
    const { data, error } = await supabase
      .from("job_items")
      .insert(jobServices)
      .select();

    if (error) {
      console.error(error);
      return;
    }

    console.log(`Uploaded ${data.length} job_items rows.`);
    return data;
  } catch (error) {
    console.log(error);
  }
};
jobServicesUpload();