import supabase from "#/config/supabaseClientVite";
import { GenericError } from "#/utils/GenericError";
import { MATERIALS_TABLE } from "./requestJobMaterials";

export type JobMaterialInput = {
  room: string | null;
  name: string;
  quantity: number;
  unit_price: number;
};

export const requestSaveJobMaterials = async (
  jobId: string,
  materials: JobMaterialInput[],
) => {
  const deleteResponse = await supabase
    .from(MATERIALS_TABLE)
    .delete()
    .eq("job_id", jobId);

  // Surfaced verbatim rather than collapsed into a generic error: a failure
  // here is almost always a schema or policy mismatch, and the Postgres
  // message names the offending column.
  if (deleteResponse.error) {
    throw new GenericError(
      `${MATERIALS_TABLE} (brisanje): ${deleteResponse.error.message}`,
    );
  }

  if (materials.length === 0) return deleteResponse;

  const insertResponse = await supabase
    .from(MATERIALS_TABLE)
    .insert(materials.map((material) => ({ ...material, job_id: jobId })));

  if (insertResponse.error) {
    throw new GenericError(
      `${MATERIALS_TABLE} (spremanje): ${insertResponse.error.message}`,
    );
  }

  return insertResponse;
};
