"use client";
import TimeAgo from "react-timeago";

export default function Timeline({
    date
}: {
    date: string
}) {
    return (
        <TimeAgo date={date} />
    )
}