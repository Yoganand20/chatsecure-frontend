import { create } from "zustand";
import toast from "react-hot-toast";
import {axiosInstance} from '../lib/axios';

export const useChatStore = create((set,get) => ({
    db:null,
    messages:[],
    contacts:[],
    selectedContact:null,
    isMessageLoading:false,
    isContactsLoading:false,

    getContacts: async () => {
        set({isContactsLoading:true})
        try {
            const response = await axiosInstance.get('/user/contacts')
            
            set({contacts:response.data})
        } catch (error) {
            toast.error(error.response?.data?.message || "Something went wrong")
            console.error(error);
        } finally {
            set({isContactsLoading:false})
        }
    },

    getMessages: async (roomId) => {
        set({isMessageLoading:true});
        try {
             const response = await axiosInstance.get(`/message/${roomId}`)
             set({messages:response.data})
             console.log("chats:"+response.data)
            //  const db=openDB();
            //  (await db).exec(`SELECT * FROM SecureChat WHERE roomId='${roomId}'`)
            
        } catch (error) {
            toast.error(error.response?.data?.message || "Something went wrong")
            console.error(error);
        } finally {
            set({isMessageLoading:false});
        }
    },
    sendMessage: async (msg,roomId) => {
        const {messages } = get();
        try {
          const res = await axiosInstance.post(`/message/send/${roomId}`, msg);
          set({ messages: [...messages, res.data] });
        } catch (error) {
          toast.error(error.response.data.message);
        }
      },

    setSelectedContact: (contact) => {
        set({selectedContact:contact})
    },
}))