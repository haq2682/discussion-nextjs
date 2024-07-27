'use server';
import {z} from 'zod';
import {auth} from '@/auth';
import type {Topic} from '@prisma/client';
import {revalidatePath} from 'next/cache';
import { redirect } from 'next/navigation';
import {db} from '@/db';
import paths from '@/app/paths';

const topicSchema = z.object({
    title: z.string().min(3).regex(/^[a-z-]+$/, {message: 'Must be lowercase letters or dashes without spaces'}),
    description: z.string().min(10) 
})

interface createTopicFormState {
    errors: {
        title?: string[],
        description?: string[],
        _form?: string[]
    }
    
}

export async function createTopic(formState: createTopicFormState, formData: FormData): Promise<createTopicFormState> {
    const session = await auth();
    const result = topicSchema.safeParse({
        title: formData.get('title'),
        description: formData.get('description')
    });
    if(!session) {
        return {
            errors: {
                _form: ['You must be signed in to create a form']
            }
        }
    }
    if(!result.success) {
        return {
            errors: result.error.flatten().fieldErrors
        }
    }
    let topic: Topic;
    try {
        topic = await db.topic.create({
            data: {
                slug: result.data.title,
                description: result.data.description
            }
        })
    }
    catch(error) {
        if(error instanceof Error) {
            return {
                errors: {
                    _form: [error.message]
                }
            }
        }
        else {
            return {
                errors: {
                    _form: ['Something went wrong']
                }
            }
        }
    }
    revalidatePath(paths.home());
    redirect(paths.topicShow(topic.slug));
}