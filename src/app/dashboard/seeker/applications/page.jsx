import { getApplicationByApplicant } from "@/lib/api/application";
import { getUserSession } from "@/lib/core/session";
import SeekerApplicationTable from "@/components/Dashboard/SeekerApplicationTable";

const Applications = async () => {

    const user = await getUserSession();
    let jobs = [];
    try {
        jobs = await getApplicationByApplicant(user.id);
    } catch (error) {
        console.error("Failed to fetch applications:", error);
    }

    return (
        <div className="w-full  mx-auto p-4 sm:p-6 lg:p-8">
            <div className="mb-8 flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-white mb-2">My Applications</h1>
                    <p className="text-zinc-400">Track and manage your job applications.</p>
                </div>
            </div>

            <div className="pb-6">
                <SeekerApplicationTable jobs={jobs} />
            </div>
        </div>
    );
}

export default Applications;
