import supabase, { supabaseUrl } from "./supabase";

export async function loginApi({ email, password }) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) throw new Error(error.message);

  return data;
}

export async function getUserApi() {
  const { data: session } = await supabase.auth.getSession();

  if (!session.session) return null;

  const { data, error } = await supabase.auth.getUser();

  if (error) throw new Error(error.message);

  return data?.user;
}

export async function logoutApi() {
  const { error } = await supabase.auth.signOut();

  if (error) throw new Error(error.message);
}

export async function signupApi(newUser) {
  const { data, error } = await supabase.auth.signUp({
    ...newUser,
    options: {
      data: {
        fullName: newUser.fullName,
        avatar: "",
      },
    },
  });

  if (error) throw new Error(error.message);

  return data;
}

export async function updateCurrentUser({ fullName, avatar, password }) {
  // 1- update password
  if (password) {
    const { data, error } = await supabase.auth.updateUser({ password });

    if (error) throw new Error(error.message);

    return data;
  } else {
    // 2.1- update user data with avatar
    if (avatar) {
      const fileName = `${Math.random()}-${avatar?.name}`.replaceAll("/", "");
      const { error: storageError } = await supabase.storage
        .from("avatars")
        .upload(fileName, avatar);

      if (storageError) throw new Error(storageError.message);

      const { data, error } = await supabase.auth.updateUser({
        data: {
          fullName,
          avatar: `${supabaseUrl}/storage/v1/object/public/avatars/${fileName}`,
        },
      });

      if (error) throw new Error(error.message);

      return data;
    } else {
      //2.2 update user data without the avatar
      const { data, error } = await supabase.auth.updateUser({
        data: { fullName },
      });

      if (error) throw new Error(error.message);

      return data;
    }
  }
}
