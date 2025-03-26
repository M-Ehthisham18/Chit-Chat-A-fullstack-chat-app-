import React, { useEffect, useState } from 'react'
import { useChatStore } from "../store/useChatStore";
import SidebarSkeleton from './skeletons/SidebarSkeleton';
import { Users } from "lucide-react"
import { useAuthStore } from '../store/useAuthSotre';

const Sidebar = () => {
  const {getUsers, users, selectedUser , setSelectedUser , isUserLoading } = useChatStore();
  const { onlineUsers } = useAuthStore();
  const [showOnlineOnly, setShowOnlineOnly] = useState(false);

  useEffect( ()=> {
    getUsers()
  },[getUsers])

  const filteredUsers = showOnlineOnly
    ? users.filter((user) => onlineUsers.includes(user._id))
    : users;

  if(isUserLoading) return <SidebarSkeleton/>
  return (
    <aside className="h-screen overflow-hidden flex flex-col pb-12 w-full sm:w-auto">
  <div className="border-b border-base-300 w-full p-5">
    <div className="flex items-center gap-2">
      <Users className="size-6" />
      <span className="font-medium lg:block">Contacts</span>
    </div>
    <div className="mt-3 flex items-center gap-2">
      <label className="cursor-pointer flex items-center gap-2">
        <input
          type="checkbox"
          checked={showOnlineOnly}
          onChange={(e) => setShowOnlineOnly(e.target.checked)}
          className="checkbox checkbox-sm"
        />
        <span className="text-sm">Show online only</span>
      </label>
      <span className="text-xs text-zinc-500">({onlineUsers.length - 1} online)</span>
    </div>
  </div>

  {/* Scrollable User List */}
  <div className="flex-1 overflow-y-auto py-3 mb-20">
    {filteredUsers.map((user) => (
      <button
        key={user._id}
        onClick={() => setSelectedUser(user)}
        className={`
          w-full p-3 flex items-center gap-3
          hover:bg-base-300 transition-colors
          ${selectedUser?._id === user._id ? "bg-base-300 ring-1 ring-base-300" : ""}
        `}
      >
        <div className="relative sm:mx-0 ">
          <img
            src={user.profilePic || "/avatar.png"}
            alt={user.name}
            className="size-12 object-cover rounded-full border"
          />
          {onlineUsers.includes(user._id) && (
            <span
              className="absolute bottom-0 right-0 size-3 bg-green-500 
              rounded-full ring-2 ring-zinc-900"
            />
          )}
        </div>

        <div className="flex justify-between w-[80%] sm:block sm:w-auto text-left min-w-0">
          <div className="font-medium truncate">{user.fullname}</div>
          <div className="text-sm text-zinc-400">
            {onlineUsers.includes(user._id) ? "Online" : "Offline"}
          </div>
        </div>
      </button>
    ))}

    {filteredUsers.length === 0 && (
      <div className="text-center text-zinc-500 py-4">No online users</div>
    )}
  </div>
</aside>

  )
}

export default Sidebar
