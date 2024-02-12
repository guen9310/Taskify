export type FindInvitationsRequestDto = {
  size?: number;
  cursorId?: number;
  title?: string;
};
export type UpdateInvitationRequestDto = {
  inviteAccepted: boolean;
};

export type InvitationServiceResponseDto = {
  cursorId: number;
  invitations: Array<{
    id: number;
    inviter: {
      nickname: string;
      email: string;
      id: number;
    };
    teamId: string;
    dashboard: {
      title: string;
      id: number;
    };
    invitee: {
      nickname: string;
      email: string;
      id: number;
    };
    inviteAccepted: boolean | null;
    createdAt: string;
    updatedAt: string;
  }>;
};

export type CreateDashboardInvitationRequestDto = {
  email: string;
};
