import Link from "next/link";
import {db} from '@/db';
import paths from "@/app/paths";

export default async function TopicList() {
    const topics = await db.topic.findMany();

    const renderedTopics = topics.map((topic) => {
        return (
            <li key={topic.id} className="my-4">
                <Link href={paths.topicShow(topic.slug)} className="bg-purple-600 text-white rounded-lg p-2">
                    {topic.slug}
                </Link>
            </li>
        )
    })
    return (
        <ul className="flex flex-row flex-wrap gap-4">
            {renderedTopics}
        </ul>
    )
}