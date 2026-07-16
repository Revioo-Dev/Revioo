import { createClient } from "@/lib/supabase/server";

type AccessRequest = {
  id: string;
  business_name: string;
  owner_name: string;
  email: string;
  phone: string;
  category: string;
  status: string;
  created_at: string;
};

export default async function AdminRequestsPage() {
  const supabase = await createClient();

  const { data: requests, error } = await supabase
    .from("access_requests")
    .select("*")
    .eq("status", "pending")
    .order("created_at", { ascending: false })
    .returns<AccessRequest[]>();

  if (error) {
    return <div>Error loading requests</div>;
  }

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Admin Requests</h1>

      {requests?.length === 0 && <p>No pending requests</p>}

      <div className="space-y-4">
        {requests?.map((request) => (
          <div key={request.id} className="border rounded-xl p-5">
            <h2 className="text-xl font-semibold">{request.business_name}</h2>
            <p>Owner: {request.owner_name}</p>
            <p>Email: {request.email}</p>
            <p>Phone: {request.phone}</p>
            <p>Category: {request.category}</p>

            <div className="mt-4 flex gap-3">
              <button className="bg-green-600 text-white px-4 py-2 rounded">
                Approve
              </button>
              <button className="bg-red-600 text-white px-4 py-2 rounded">
                Reject
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
