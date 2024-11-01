"use client";
import React, { LegacyRef, useEffect, useState } from "react";
import '@radix-ui/themes/styles.css';
import { Button, ChevronDownIcon, RadioGroup, TextArea, TextField, Theme } from "@radix-ui/themes";
import { Country, State, City } from 'country-state-city';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faPhone, faStar, faUser, faChevronUp, faCheck } from "@fortawesome/free-solid-svg-icons";
import classnames from "classnames";
import ImageUpload from "./ImageUpload";
import { redirect } from "next/navigation";
import saveJob from "../server/actions/saveJob";
import { JobType } from "../Utils/types";
import * as Select from "@radix-ui/react-select";

export default function JobForm({
    orgId,
    jobDoc
}: {
    orgId: string,
    jobDoc?: JobType
}) {
    const [countryCode, setCountryCode] = useState<string>(jobDoc?.country ?? '');
    const [stateCode, setStateCode] = useState<string>(jobDoc?.state ?? '');
    const [cityName, setCityName] = useState<string>(jobDoc?.city ?? '');

    useEffect(() => {
        if (jobDoc?.country && jobDoc?.state && jobDoc?.city) {
            const selectedState = State.getAllStates().find(state => state.countryCode === jobDoc?.country && state.isoCode === jobDoc?.state);
            setStateCode(selectedState?.isoCode ?? '');
            const selectedCity = City.getAllCities().find(city => city.name == jobDoc?.city && city.countryCode == jobDoc?.country && city.stateCode === jobDoc?.state);
            setCityName(selectedCity?.name ?? '');
        }
    }, [jobDoc])


    async function submitJob(data: FormData) {
        data.set('country', countryCode);
        data.set('state', stateCode);
        data.set('city', cityName);
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
                            <Select.Root onValueChange={setCountryCode} defaultValue={countryCode}>
                                <Select.Trigger
                                    className="inline-flex h-[35px] flex-1 items-center justify-between gap-[5px] rounded bg-white px-[15px] text-[13px] border border-zinc-700 focus:border-[2px]"
                                    aria-label="country"
                                >
                                    <Select.Value placeholder="Select Country"></Select.Value>
                                    <Select.Icon className="SelectIcon">
                                        <ChevronDownIcon />
                                    </Select.Icon>
                                </Select.Trigger>
                                <Select.Portal>
                                    <Select.Content
                                        className="overflow-hidden rounded-md bg-white shadow-[0px_10px_38px_-10px_rgba(22,_23,_24,_0.35),0px_10px_20px_-15px_rgba(22,_23,_24,_0.2)]"
                                        align="end"
                                    >
                                        <Select.ScrollUpButton className="flex h-[25px] cursor-default items-center justify-center bg-white text-violet11">
                                            <FontAwesomeIcon icon={faChevronUp} />
                                        </Select.ScrollUpButton>
                                        <Select.Viewport className="SelectViewport">
                                            {Country.getAllCountries().map(country => (
                                                <SelectItem
                                                    key={country.isoCode}
                                                    value={country.isoCode}
                                                >
                                                    {country.name}
                                                </SelectItem>
                                            ))}
                                        </Select.Viewport>
                                    </Select.Content>
                                </Select.Portal>
                            </Select.Root>
                            <Select.Root onValueChange={setStateCode} defaultValue={stateCode}>
                                <Select.Trigger
                                    className="inline-flex h-[35px] flex-1 items-center justify-between gap-[5px] rounded bg-white px-[15px] text-[13px] border border-zinc-700 focus:border-[2px]"
                                    aria-label="country"
                                >
                                    <Select.Value placeholder="Select State"></Select.Value>
                                    <Select.Icon className="SelectIcon">
                                        <ChevronDownIcon />
                                    </Select.Icon>
                                </Select.Trigger>
                                <Select.Portal>
                                    <Select.Content
                                        className="overflow-hidden rounded-md bg-white shadow-[0px_10px_38px_-10px_rgba(22,_23,_24,_0.35),0px_10px_20px_-15px_rgba(22,_23,_24,_0.2)]"
                                        align="end"
                                    >
                                        <Select.ScrollUpButton className="flex h-[25px] cursor-default items-center justify-center bg-white text-violet11">
                                            <FontAwesomeIcon icon={faChevronUp} />
                                        </Select.ScrollUpButton>
                                        <Select.Viewport className="SelectViewport">
                                            {State.getAllStates().map(state =>
                                                state.countryCode === countryCode && (
                                                    <SelectItem key={state.isoCode} value={state.isoCode}>
                                                        {state.name}
                                                    </SelectItem>
                                                )
                                            )}
                                        </Select.Viewport>
                                    </Select.Content>
                                </Select.Portal>
                            </Select.Root>
                            <Select.Root onValueChange={setCityName} defaultValue={cityName}>
                                <Select.Trigger
                                    className="inline-flex h-[35px] flex-1 items-center justify-between gap-[5px] rounded bg-white px-[15px] text-[13px] border border-zinc-700 focus:border-[2px]"
                                    aria-label="country"
                                >
                                    <Select.Value placeholder="Select City"></Select.Value>
                                    <Select.Icon className="SelectIcon">
                                        <ChevronDownIcon />
                                    </Select.Icon>
                                </Select.Trigger>
                                <Select.Portal>
                                    <Select.Content
                                        className="overflow-hidden rounded-md bg-white shadow-[0px_10px_38px_-10px_rgba(22,_23,_24,_0.35),0px_10px_20px_-15px_rgba(22,_23,_24,_0.2)]"
                                        align="end"
                                    >
                                        <Select.ScrollUpButton className="flex h-[25px] cursor-default items-center justify-center bg-white text-violet11">
                                            <FontAwesomeIcon icon={faChevronUp} />
                                        </Select.ScrollUpButton>
                                        <Select.Viewport className="SelectViewport">
                                            {City.getAllCities().map(city =>
                                                city.countryCode === countryCode && city.stateCode === stateCode && (
                                                    <SelectItem key={city.name} value={city.name}>{city.name}</SelectItem>
                                                )
                                            )}
                                        </Select.Viewport>
                                    </Select.Content>
                                </Select.Portal>
                            </Select.Root>

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


const SelectItem = React.forwardRef(
    ({ children, className, value, ...props }: {
        children: React.ReactNode,
        className?: string,
        value: string,
    }, forwardedRef: LegacyRef<HTMLInputElement>) => {
        return (
            <>
                <Select.Item
                    className={classnames(
                        "relative flex h-[25px] cursor-pointer items-center rounded-[3px] pl-[25px] pr-[35px] text-[13px] leading-none text-violet11 data-[highlighted]:bg-gray-200 data-[highlighted]:outline-none",
                        className,
                    )}
                    value={value}
                    {...props}
                    ref={forwardedRef}
                >
                    <Select.ItemText>{children}</Select.ItemText>
                    <Select.ItemIndicator className="absolute left-0 inline-flex w-[25px] items-center justify-center">
                        <FontAwesomeIcon icon={faCheck} />
                    </Select.ItemIndicator>
                </Select.Item>
            </>
        );
    },
);

SelectItem.displayName = 'SelectItem';
