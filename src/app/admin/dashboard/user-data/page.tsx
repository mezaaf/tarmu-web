import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import supabaseAdmin from "@/utils/supabase/admin";
import { columns } from "./columns";
import { DataTable } from "./data-table";
import Link from "next/link";

export type UserProfileTable = {
  id: string;
  email: string;
  username: string;
  full_name: string;
  role: string;
};

async function getData(): Promise<UserProfileTable[]> {
  const { data, error } = await supabaseAdmin.from("user_profiles").select("*");

  if (error) {
    console.error("Gagal ambil user:", error.message);
    return [];
  }
  return data as UserProfileTable[];
}

const AdminUserDataPage = async () => {
  const users = await getData();

  return (
    <div className="flex flex-col gap-5">
      <header className="flex flex-row items-center justify-between">
        <h1 className="text-2xl font-bold">Data User</h1>
        <Link href="/admin/dashboard/user-data/create-user">
          <Button className="cursor-pointer">Buat User</Button>
        </Link>
      </header>
      <Card className="flex flex-col items-center justify-center p-5">
        <DataTable columns={columns} data={users} />
      </Card>
    </div>
  );
};

export default AdminUserDataPage;
