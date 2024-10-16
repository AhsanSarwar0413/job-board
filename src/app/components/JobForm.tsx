"use client";
import { useState } from "react";
import '@radix-ui/themes/styles.css';
import { Button, RadioGroup, TextArea, TextField, Theme } from "@radix-ui/themes";
import {
    CitySelect,
    CountrySelect,
    StateSelect,
} from "react-country-state-city";
import "react-country-state-city/dist/react-country-state-city.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faPhone, faStar, faUser } from "@fortawesome/free-solid-svg-icons";
import ImageUpload from "./ImageUpload";
import { redirect } from "next/navigation";
import saveJob from "../server/actions/saveJob";

interface Location {
    country: string;
    state: string;
    city: string;
}


export default function JobForm({
    orgId,
    jobDoc
}: {
    orgId: string,
    jobDoc?: JobType
}) {
    const [countryId, setCountryId] = useState(Number(jobDoc?.countryId) || 0);
    const [stateId, setstateId] = useState(jobDoc?.stateId || 0);
    const [cityId, setCityId] = useState(jobDoc?.cityId || 0);
    const [location, setLocation] = useState<Location>({
        country: jobDoc?.country || '',
        state: jobDoc?.state || '',
        city: jobDoc?.city || ''
    });


    async function submitJob(data: FormData) {
        data.set('country', location.country);
        data.set('state', location.state);
        data.set('city', location.city);
        data.set('countryId', countryId.toString());
        data.set('stateId', stateId.toString());
        data.set('cityId', cityId.toString());
        data.set('orgId', orgId);
        data.set('createdAt', new Date().toISOString());
        if (jobDoc) {
            data.set('id', jobDoc._id)
        }
        const jobDocument = await saveJob(data);
        redirect(`/jobs/${jobDocument.orgId}`);
    }

    return (
        <Theme>
            <form action={submitJob} className="container mt-6 flex flex-col gap-4">
                <TextField.Root
                    placeholder="Job Title"
                    name="title"
                    defaultValue={jobDoc?.title || ''}
                />
                <div className="grid md:grid-cols-3 gap-3 *:grow">
                    <div>
                        Remote?
                        <RadioGroup.Root defaultValue={jobDoc?.remote || 'onsite'} name="remote">
                            <RadioGroup.Item value="onsite">On-site</RadioGroup.Item>
                            <RadioGroup.Item value="hybrid">Hybrid-remote</RadioGroup.Item>
                            <RadioGroup.Item value="remote">Fully Remote</RadioGroup.Item>
                        </RadioGroup.Root>
                    </div>
                    <div>
                        Full Time?
                        <RadioGroup.Root defaultValue={jobDoc?.type || "full"} name="type">
                            <RadioGroup.Item value="project">Project</RadioGroup.Item>
                            <RadioGroup.Item value="part">Part-time</RadioGroup.Item>
                            <RadioGroup.Item value="full">Full-time</RadioGroup.Item>
                        </RadioGroup.Root>
                    </div>
                    <div>
                        Salary
                        <TextField.Root name="salary" defaultValue={jobDoc?.salary || ''}>
                            <TextField.Slot>
                                $
                            </TextField.Slot>
                            <TextField.Slot>
                                k/year
                            </TextField.Slot>
                        </TextField.Root>
                    </div>
                </div>
                <div>
                    <div>
                        Location
                        <div className="flex md:flex-row flex-col gap-4 *:grow">
                            <CountrySelect
                                defaultValue={countryId ? {
                                    id: countryId,
                                    name: location.country
                                } : 0}
                                onChange={(e: any) => {
                                    setCountryId(e.id);
                                    setLocation({
                                        ...location,
                                        country: e.name
                                    })
                                }}
                                placeHolder="Select Country"
                            />
                            <StateSelect
                                defaultValue={stateId ? {
                                    id: stateId,
                                    name: location.state
                                } : 0}
                                countryid={countryId}
                                onChange={(e: any) => {
                                    setstateId(e.id);
                                    setLocation({
                                        ...location,
                                        state: e.name,
                                    })
                                }}
                                placeHolder="Select State"
                            />
                            <CitySelect
                                countryid={countryId}
                                stateid={stateId}
                                defaultValue={cityId ? {
                                    id: cityId,
                                    name: location.city
                                } : 0}
                                onChange={(e: any) => {
                                    setCityId(e.id);
                                    setLocation({
                                        ...location,
                                        city: e.name,
                                    })
                                }}
                                placeHolder="Select City"
                            />
                        </div>
                    </div>
                </div>
                <div className="sm:flex">
                    <div className="w-1/3 md:my-0 my-2">
                        <h3>Job icon</h3>
                        <ImageUpload icon={faStar} name="jobIcon" defaultValue={jobDoc?.jobIcon || ''} />
                    </div>
                    <div className="grow">
                        <h3>Contact Person</h3>
                        <div className="flex gap-2">
                            <div>
                                <ImageUpload icon={faUser} name="contactPhoto" defaultValue={jobDoc?.contactPhoto || ''} />
                            </div>
                            <div className="grow flex flex-col gap-1">
                                <TextField.Root name="contactName" placeholder="Name" defaultValue={jobDoc?.contactName || ''}>
                                    <TextField.Slot>
                                        <FontAwesomeIcon icon={faUser} />
                                    </TextField.Slot>
                                </TextField.Root>
                                <TextField.Root name="contactPhone" placeholder="Phone" defaultValue={jobDoc?.contactPhone || ''}>
                                    <TextField.Slot>
                                        <FontAwesomeIcon icon={faPhone} />
                                    </TextField.Slot>
                                </TextField.Root>
                                <TextField.Root type="email" placeholder="Email" name="contactEmail" defaultValue={jobDoc?.contactEmail || ''}>
                                    <TextField.Slot>
                                        <FontAwesomeIcon icon={faEnvelope} />
                                    </TextField.Slot>
                                </TextField.Root>
                            </div>
                        </div>
                    </div>
                </div>
                <TextArea placeholder="Job Description" resize="vertical" name="description" defaultValue={jobDoc?.description || ''} />
                <div className="flex justify-end">
                    <Button size="2" type="submit">Save</Button>
                </div>
            </form>
        </Theme>
    )
}