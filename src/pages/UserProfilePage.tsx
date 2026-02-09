import { getMyUserProfile, updateMyUser } from "@/api/MyUserApi";
import UserProfileForm from "@/forms/user-profile-form/UserProfileForm"


const UserProfilePage = () => {
    const { currentUser, isPending: isCurrentUserPending } = getMyUserProfile(); // Assuming getMyUserProfile is imported and available
    const { updateUser, isPending: isUpdatePending } = updateMyUser();  
    
    if(isCurrentUserPending) {
        return <div>Loading user profile...</div>;
    }

    if(!currentUser) {
        return <div>Unabe to load user.</div>;
    }
    return (
       <UserProfileForm
        onSave={updateUser}
        currentUser={currentUser}
        isLoading={isUpdatePending}/>
    );
}

export default UserProfilePage;
