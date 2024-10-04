import supabase, { supabaseUrl } from "./supabase";

export async function getCabins() {
  const { data, error } = await supabase.from("cabins").select("*");

  if (error) throw new Error(`cabins could not be found. ${error.message}`);

  return data;
}

export async function createEditCabin(newCabin) {
  const hasImagePath = newCabin.image?.startsWith?.(supabaseUrl);

  const imageName = `${Math.random()}-${newCabin?.image?.name}`.replaceAll(
    "/",
    ""
  );

  const imagePath = hasImagePath
    ? newCabin.image
    : `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;

  // 1- create / edit new cabin
  let query = supabase.from("cabins");

  // A) Create
  if (!newCabin.id) query = query.insert([{ ...newCabin, image: imagePath }]);

  // B) Edit
  if (newCabin.id)
    query = query
      .update({ ...newCabin, image: imagePath })
      .eq("id", newCabin.id);

  const { data, error } = await query.select();

  if (error) throw new Error(`cabins could not be created. ${error.message}`);

  // 2- upload image file
  const { error: storageError } = await supabase.storage
    .from("cabin-images")
    .upload(imageName, newCabin.image);

  if (storageError) {
    deleteCabinApi(data.id);
    throw new Error(`Image could not be uploaded. ${error.message}`);
  }

  return data;
}

export async function deleteCabinApi(id) {
  const { data, error } = await supabase.from("cabins").delete().eq("id", id);

  if (error) throw new Error(`cabins could not be deleted. ${error.message}`);

  return data;
}
