"use server";

// import { createClient } from "@/utils/supabase/server";

// export async function retrieveData(tableName: string) {
//   const supabase = await createClient();
//   const { data, error } = await supabase.from(tableName).select("*");
//   if (error) {
//     return { status: false, message: error.message, data: null };
//   } else {
//     return { status: true, message: "Success", data };
//   }
// }

// export async function retrieveDataByIdentity(
//   tableName: string,
//   columnName: string,
//   identity: string
// ) {
//   const supabase = await createClient();
//   const { data, error } = await supabase
//     .from(tableName)
//     .select("*")
//     .eq(columnName, identity);
//   if (error) {
//     return { status: false, message: error.message, data: null };
//   } else {
//     return { status: true, message: "Success", data };
//   }
// }
