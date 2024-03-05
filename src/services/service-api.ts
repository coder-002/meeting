export const api = {
  organization: {
    get: "/org",
  },
  unit: {
    get: "/org/units",
    post: "/org/unit",
  },
  branch: {
    get: "/org/branches",
    post: "/org/branch",
  },
  committee: {
    get: "/committee",
    post: "/committee",
    member: {
      getMember: "/committee/members/{committeeId}",
      postMember: "/committee/member",
      deleteMember: "/committee/member/{id}",
    },
  },
  designation: {
    get: "/designation",
    post: "/designation",
  },
  deduct: {
    get: "/deduct",
    post: "/deduct",
  },
  meeting: {
    get: "/Meeting/GetAll",
    post: "/Meeting",
    delete: "/Meeting/{meetingId}",
    patch: "/Meeting/{id}",
    approve: "/Meeting/Approve/{meetingId}",
    participants: {
      get: "/Participant/{meetingId}",
      post: "/Participant/{meetingId}",
    },
  },
  member: {
    getMember: "/member/page",
    post: "/member",
    init: "/member/init",
    getById: "member/{id}",
    memberDetails: {
      address: {
        post: "/member/address",
      },
      contact: {
        post: "/member/contact",
      },
      office: {
        post: "/member/office",
      },
      id: {
        post: "/member/kyc-id",
      },
      relation: {
        post: "/member/relation",
      },
    },
  },
};
