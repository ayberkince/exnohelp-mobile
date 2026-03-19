import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import { sendMessageAction } from "@/app/actions/chat";
import Link from "next/link";

export default async function ChatRoomPage({ params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) redirect("/login");

  // 1. Fetch the Conversation and all its Messages
  const conversation = await prisma.conversation.findUnique({
    where: { id: params.id },
    include: {
      messages: {
        orderBy: { createdAt: 'asc' } // Oldest at top, newest at bottom
      },
      booking: {
        include: { request: true }
      }
    }
  });

  if (!conversation) {
    return <div className="p-8 text-center text-red-500 font-bold">Chat not found.</div>;
  }

  // 2. Security Check: Kick out anyone who doesn't belong here
  const isParticipant = 
    conversation.clientUserId === session.user.id || 
    conversation.helperUserId === session.user.id;

  if (!isParticipant) {
    return <div className="p-8 text-center text-red-500 font-bold">Unauthorized access.</div>;
  }

  const currentUserId = session.user.id;

  return (
    <main className="min-h-screen bg-stone-100 flex flex-col items-center pt-8 pb-4">
      <div className="w-full max-w-2xl bg-white rounded-3xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] border-2 border-stone-900 flex flex-col h-[85vh]">
        
        {/* Chat Header */}
        <header className="p-6 border-b-2 border-stone-100 flex justify-between items-center bg-stone-50 rounded-t-3xl">
          <div>
            <h1 className="text-xl font-black uppercase tracking-tighter text-stone-900">
              Booking Chat
            </h1>
            <p className="text-stone-500 font-bold text-xs uppercase tracking-widest mt-1">
              Ref: {conversation.booking?.request?.title || "Support Request"}
            </p>
          </div>
          <Link href="/dashboard" className="text-xs font-bold text-stone-400 hover:text-stone-900 uppercase tracking-widest transition-colors">
            Close ✕
          </Link>
        </header>

        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-white">
          {conversation.messages.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-stone-400">
              <span className="text-4xl mb-2">💬</span>
              <p className="font-bold text-sm uppercase tracking-widest">Say hello to coordinate!</p>
              <p className="text-xs font-medium mt-1 text-stone-300">Remember to keep communication on-platform for safety.</p>
            </div>
          ) : (
            conversation.messages.map((msg) => {
              const isMe = msg.senderId === currentUserId;
              return (
                <div key={msg.id} className={`flex ${isMe ? "justify-end" : "justify-start"}`}>
                  <div className={`max-w-[75%] p-4 rounded-2xl ${
                    isMe 
                      ? "bg-emerald-600 text-white rounded-tr-none" 
                      : "bg-stone-100 text-stone-900 rounded-tl-none border border-stone-200"
                  }`}>
                    <p className="font-medium text-sm leading-relaxed">{msg.content}</p>
                    <p className={`text-[10px] font-bold uppercase tracking-widest mt-2 ${isMe ? "text-emerald-200" : "text-stone-400"}`}>
                      {msg.createdAt.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Input Area */}
        <div className="p-4 bg-stone-50 border-t-2 border-stone-100 rounded-b-3xl">
          <form action={sendMessageAction} className="flex gap-2">
            <input type="hidden" name="conversationId" value={conversation.id} />
            <input 
              type="text" 
              name="content"
              placeholder="Type your message..."
              required
              autoComplete="off"
              className="flex-1 p-4 border-2 border-stone-200 rounded-xl bg-white font-medium focus:border-emerald-600 outline-none transition-colors"
            />
            <button 
              type="submit"
              className="px-8 py-4 bg-stone-900 text-white rounded-xl font-black uppercase tracking-widest hover:bg-emerald-600 transition-all shadow-md active:scale-95"
            >
              Send
            </button>
          </form>
        </div>

      </div>
    </main>
  );
}