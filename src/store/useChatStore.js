import { create } from "zustand";
import toast from "react-hot-toast";
import {axiosInstance} from '../lib/axios';

export const useChatStore = create((set) => ({
    messages:[],
    users:[],
    contacts:[],
    selectedUser:null,
    isUserLoading:false,
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
    getUsers: async () => {
        set({isUserLoading:true})
        try {
            const response = await axiosInstance.get('/messages/users')
            set({users:response.data})
        } catch (error) {
            toast.error(error.response?.data?.message || "Something went wrong")
            console.error(error);
        } finally {
            set({isUserLoading:false})
        }
    },

    getMessages: async (userId) => {
        set({isMessageLoading:true});
        try {
            const response = await axiosInstance.get(`/messages/${userId}`)
            set({messages:response.data})
        } catch (error) {
            toast.error(error.response?.data?.message || "Something went wrong")
            console.error(error);
        } finally {
            set({isMessageLoading:false});
        }
    },

    setSelectedUser: (user) => {
        set({selectedUser:user})
    },
}))