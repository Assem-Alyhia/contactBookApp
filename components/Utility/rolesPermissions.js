const getPermissions = (role) => {
    switch(role) {
        case 'Owner':
            return {
                canRegisterCompany: true,
                canEditCompany: true,
                canViewCompany: true,
                canManageUsers: true,
                canInviteUsers: true,
                canDeleteUsers: true,
                canAddAdmin:true,
                canManageContacts: true,
                canActivitiesContacts: true,
                canCreateContacts: true,
                canDeleteContacts: true,
                canEditContacts: true,
                canViewUsers: true,
                canSendEmail: true,
                canExportContacts: true,
                canViewHome: true,
            };
        case 'Admin':
            return {
                canRegisterCompany: false,
                canEditCompany: false,
                canViewCompany: true,
                canManageUsers: true,
                canInviteUsers: true,
                canDeleteUsers: true,
                canAddAdmin:false,
                canManageContacts: true,
                canActivitiesContacts: true,
                canDeleteContacts: true,
                canEditContacts: true,
                canCreateContacts: true,
                canViewUsers: true,
                canSendEmail: true,
                canExportContacts: true,
                canViewHome: true,

            };
        case 'User':
            return {
                canRegisterCompany: false,
                canEditCompany: false,
                canViewCompany: true,
                canManageUsers: true,
                canInviteUsers: false,
                canDeleteUsers: false,
                canAddAdmin:false,
                canManageContacts: true,
                canActivitiesContacts: false,
                canDeleteContacts: false,
                canEditContacts: false,
                canCreateContacts: false,
                canViewUsers: true,
                canSendEmail: true,
                canExportContacts: true,
                canViewHome: true,
            };
        default:
            return {};
    }
};

export default getPermissions;
