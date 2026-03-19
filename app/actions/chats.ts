'use server';

import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function sendMessageAction(formData: FormData) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) throw new Error("Unauthorized");

  const conversationId = formData.get("conversationId") as string;
  const content = formData.get("content") as string;

  if (!content.trim()) return;

  // 1. Verify the user is actually part of this conversation!
  const conversation = await prisma.conversation.findUnique({
    where: { id: conversationId }
  });

  if (!conversation) throw new Error("Chat room not found.");
  
  const isParticipant = 
    conversation.clientUserId === session.user.id || 
    conversation.helperUserId === session.user.id;

  if (!isParticipant) throw new Error("You do not have access to this chat.");

  // 2. Save the message to the database
  await prisma.message.create({
    data: {
      conversationId,
      senderId: session.user.id,
      content: content.trim(),
    }
  });

  // 3. Force the page to instantly update with the new message
  revalidatePath(`/chat/${conversationId}`);
}