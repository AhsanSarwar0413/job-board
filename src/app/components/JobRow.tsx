'use client';
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Timeline from "./Timeline";
import Link from "next/link";
import axios from "axios";
import { JobType } from "../Utils/types";


export default function JobRow({
    jobDoc
}: {
    jobDoc: JobType & { orgName: string };
}) {

    return (
        <div className="bg-white p-4 rounded-lg shadow-sm relative">
            <div className="absolute top-4 cursor-pointer right-4">
                <FontAwesomeIcon icon={faHeart} className="size-4 text-gray-300" />
            </div>
            <div className="flex grow gap-4">
                <div className="content-center">
                    <img
                        className="size-12"
                        src={jobDoc.jobIcon}
                    />
                </div>
                <div className="grow sm:flex">
                    <div className="grow">
                        <div>
                            <Link href={`/jobs/${jobDoc.orgId}`} className="hover:underline text-gray-500 text-sm">{jobDoc?.orgName || '?'}</Link>
                        </div>
                        <div className="font-bold text-lg mb-1">
                            <Link className="hover:underline" href={'/show/' + jobDoc._id}>{jobDoc.title}</Link>
                        </div>
                        <div className="text-gray-500 text-sm capitalize">
                            {jobDoc.remote + " • " + jobDoc.city + ", " + jobDoc.state + ", " + jobDoc.country + " • " + jobDoc.type + "-time"}
                            {jobDoc?.isAdmin && (
                                <>
                                    <span> • </span>
                                    <Link href={`/jobs/edit/${jobDoc._id}`}>Edit</Link>
                                    <span> • </span>
                                    <button type="button" onClick={async () => {
                                        await axios.delete('/api/jobs?id=' + jobDoc._id);
                                        window.location.reload();
                                    }}>Delete</button>
                                </>
                            )}
                        </div>
                    </div>
                    {jobDoc.createdAt && (
                        <div className="content-end text-gray-500 text-sm">
                            <Timeline date={jobDoc.createdAt} />
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}