import type { User } from "@/types";
import { useAuth0 } from "@auth0/auth0-react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "sonner";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8000";

type CreateUserRequest = {
  auth0Id: string;
  email: string;
};

type UpdateMyUserRequest = {
  name?: string;
  addressLine1?: string;
  city?: string;
  country?: string; 
}

export const getMyUserProfile = () => {
  const { getAccessTokenSilently } = useAuth0();

  const getMyUserProfileRequest = async (): Promise<User> => {
    const accessToken = await getAccessTokenSilently();
    const response = await fetch(`${API_BASE_URL}/api/my/user`, {
      headers: {
        method: "GET",
        Authorization: `Bearer ${accessToken}`,
        "content-type": "application/json",
      },
  });

    if (!response.ok) {
      throw new Error("Failed to fetch user profile");
    }

    return await response.json();
  }

  const {
   data: currentUser,
   isPending,
   error
  } = useQuery({
    queryKey: ["myUserProfile"],
    queryFn: getMyUserProfileRequest,
    retry: false, // Disable automatic retries to handle errors immediately
  });
  
  if(error) {
    toast.error(error.toString());
  }


  return {
    currentUser,
    isPending,
  }
}

export const useCreateMyUser = () => {
  const { getAccessTokenSilently } = useAuth0();

  const createMyUserRequest = async (user: CreateUserRequest) => {
    const accessToken = await getAccessTokenSilently();
    console.log('accessToken', accessToken);
    const response = await fetch(`${API_BASE_URL}/api/my/user`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });

    if (!response.ok) {
      throw new Error("Failed to create user");
    }

    return await response.json();
  };

  const {
    mutateAsync: createUser,
    isPending,   // <- use this instead of isLoading
    isError,
    isSuccess,
  } = useMutation({
    mutationFn: createMyUserRequest,
  });

  return {
    createUser,
    isPending,
    isError,
    isSuccess,
  };
};

export const updateMyUser = () => {
  const { getAccessTokenSilently } = useAuth0();
  
  const updateMyUserRequest = async (formData: UpdateMyUserRequest) => {
    const accessToken = await getAccessTokenSilently();
    const response = await fetch(`${API_BASE_URL}/api/my/user`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    if (!response.ok) {
      throw new Error("Failed to update user");
    }

    return await response.json();
  }

  const {
    mutateAsync: updateUser,
    isPending,   // <- use this instead of isLoading
    isError,
    isSuccess,
    reset,
  } = useMutation({
    mutationFn: updateMyUserRequest,
  });

  if(isSuccess) {
    toast.success("User Profile updated successfully");
  }

  if(isError) {
    toast.error("Failed to update user profile");
    reset(); // reset the mutation state to allow retrying
  }

  return {
    updateUser,
    isPending,
    isError,
    isSuccess,
  }
}
