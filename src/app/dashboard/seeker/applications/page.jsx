import { getApplicationByApplicant } from "@/lib/api/application";
import { getUserSession } from "@/lib/core/session";

const Applications = async () => {

    const user = await getUserSession();
    const jobs = await getApplicationByApplicant(user.id);
    console.log(jobs, "user job data");
    return (
        <div>
            <h1 className="text-2xl font-semibold">Applications ({jobs.length})</h1>
        </div>
    );
}

export default Applications;
