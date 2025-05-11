import { create } from "zustand";
import toast from "react-hot-toast";
import { axiosInstance } from "../lib/axios";

export const useUserStore = create((set) => ({
    selectedUser: null,
    isUserLoading: false,

    addToContact:async (contactId) => {
        set({ isUserLoading: true, error: null });
        try {
            const response = await axiosInstance.post("/user/addContact/",{contactId:contactId});
            return response.data; // Return for potential chaining
        } catch (error) {
            const errorMessage = error.response?.data?.message 
                || "Failed to add user to contacts";
                
            toast.error(errorMessage);
            //throw error; // Re-throw for error handling in components
        } finally {
            set({ isUserLoading: false });
        }  
    },
    getUserByEmail: async (email) => {
        set({ isUserLoading: true, error: null });
        try {
            const encodedEmail = encodeURIComponent(email);
            const response = await axiosInstance.get(`/user/email/${encodedEmail}`);
            
            if (!response.data) {
                throw new Error("User data not found in response");
            }

            set({ selectedUser: response.data });
            return response.data; // Return for potential chaining
            
        } catch (error) {
            const errorMessage = error.response?.data?.message 
                || "Failed to find user";
                
            set({ selectedUser: null });
            toast.error(errorMessage);
            //throw error; // Re-throw for error handling in components
        } finally {
            set({ isUserLoading: false });
        }
    },
    
    clearSelectedUser: () => set({ selectedUser: null })
}));
