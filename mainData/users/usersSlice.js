import { createSlice } from "@reduxjs/toolkit";
import {
  getAllApplicants,
  deleteApplicant,
  getResentUsers,
  getUser,
  editUser,
  getAllApplicantInfo,
} from "./handleRequests";
import { toast } from "react-toastify";

const initialState = {
  users: null,
  recentUsers: null,
  findUser: {
    email: "ismaeladra250@gmail.com",
    firstName: "Ismaell",
    lastName: "Adra",
    image: "image url updated",
  },
  fullUserInfo: null,
  requestState: true,
  totalCount: 0,
  currentPage: 1,
};

export const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    updateUser: (state, { payload }) => {
      const index = state.users.findIndex((user) => user.id === payload.id);

      if (index !== -1) {
        state.users[index] = payload;
      }
    },

    setCurrentPage: (state, { payload }) => {
      state.currentPage = payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(deleteApplicant.pending, (state, { payload }) => {
        state.requestState = false;
      })
      .addCase(deleteApplicant.fulfilled, (state, { payload }) => {
        state.requestState = true;
        state.users = state.users.filter((user) => user.id !== payload.id);
        state.totalCount = state.totalCount - 1;
        toast.success(payload.data.message);
      })
      .addCase(deleteApplicant.rejected, (state, { payload }) => {
        state.requestState = true;
        toast.error(payload);
      });

    builder
      .addCase(getAllApplicants.pending, (state, { payload }) => {
        state.users = null;
      })
      .addCase(getAllApplicants.fulfilled, (state, { payload }) => {
        state.users = payload.data.list;
        state.totalCount = payload.data.totalCount;
        toast.success(payload.message);
      })
      .addCase(getAllApplicants.rejected, (state, { payload }) => {
        toast.error(payload);
      });

    builder
      .addCase(getResentUsers.pending, (state, { payload }) => {
        state.recentUsers = null;
      })
      .addCase(getResentUsers.fulfilled, (state, { payload }) => {
        state.recentUsers = payload.data.list;
        toast.success(payload.message);
      })
      .addCase(getResentUsers.rejected, (state, { payload }) => {
        toast.error(payload);
      });

    builder
      .addCase(getUser.pending, (state, { payload }) => {
        state.findUser = null;
      })
      .addCase(getUser.fulfilled, (state, { payload }) => {
        state.findUser = payload.data;
        toast.success(payload.message);
      })
      .addCase(getUser.rejected, (state, { payload }) => {
        toast.error(payload);
      });

    builder
      .addCase(editUser.pending, (state, { payload }) => {
        state.requestState = false;
      })
      .addCase(editUser.fulfilled, (state, { payload }) => {
        toast.success(payload.data.message);

        state.requestState = true;
        const index = state.users.findIndex((user) => user.id === payload.id);

        if (index !== -1) {
          state.users[index] = payload.data.data;
        }
      })
      .addCase(editUser.rejected, (state, { payload }) => {
        state.requestState = true;
        toast.error(payload);
      });
    builder
      .addCase(getAllApplicantInfo.pending, (state, { payload }) => {
        state.fullUserInfo = null;
      })
      .addCase(getAllApplicantInfo.fulfilled, (state, { payload }) => {
        state.fullUserInfo = payload.data;
        console.log(state.fullUserInfo);
        toast.success(payload.message);
      })
      .addCase(getAllApplicantInfo.rejected, (state, { payload }) => {
        toast.error(payload);
      });
  },
});

export const { updateUser, setCurrentPage } = usersSlice.actions;
export default usersSlice.reducer;

// {
//   "id": "882d5807-2ecb-4f35-82d4-5932c771aad5",
//   "email": "ismaeladra250@gmail.com",
//   "firstName": "Ismael",
//   "lastName": "Adra",
//   "isGoogleUser": null,
//   "isAppleUser": null,
//   "isLinkedInUser": null,
//   "image": "image url updated",
//   "phone": "+963932078097",
//   "verifiedAt": "2024-04-19T09:00:52.000Z",
//   "createdAt": "2024-04-19T08:59:54.000Z"
// }

// {
//   basicInfo: {
//     id: "58f593b1-888d-419e-a7f9-30584f6be2f0",
//     userId: "a1c8a4d4-1d4b-4ffc-b0c6-6487a0026c4b",
//     brief: "asdv",
//     github: "http://ismael.com",
//     portfolioUrl: "http://ismael.com",
//     birthDate: "1992-03-28",
//     noticePeriod: 25,
//     desiredSalary: 100000,
//     phoneNumber: "(+963) 992480867",
//     location: "Damascus,",
//     linkedinUrl: "https://ismael.com",
//     firstName: null,
//     lastName: null,
//     email: null,
//     createdAt: "2024-05-26T23:42:11.000Z",
//     updatedAt: "2024-05-27T02:55:11.000Z",
//     deletedAt: null,
//   },
//   certificates: [
//     {
//       id: "70f83105-469c-4c4a-be2f-2b7cf610d45a",
//       userId: "a1c8a4d4-1d4b-4ffc-b0c6-6487a0026c4b",
//       title: "kjghjg",
//       link: "http://test.com",
//       institution: ",jgkjgg",
//       brief: "kjhkjh",
//       year: 2023,
//       createdAt: "2024-05-29T03:51:46.000Z",
//       updatedAt: "2024-05-29T03:51:46.000Z",
//       deletedAt: null,
//     },
//   ],
//   skills: [
//     {
//       id: "05df7a41-54cb-4642-ada5-b92b5a71a949",
//       userId: "a1c8a4d4-1d4b-4ffc-b0c6-6487a0026c4b",
//       skillId: "0eca997c-ba4c-43f2-905d-5489598d2c0f",
//       skillName: "Meteor.js",
//     },
//     {
//       id: "0881f77f-2f97-4b8b-8aa3-8b6881448494",
//       userId: "a1c8a4d4-1d4b-4ffc-b0c6-6487a0026c4b",
//       skillId: "c2f1b29c-8cf4-425b-9173-516cd3aac535",
//       skillName: "JavaScript",
//     },
//     {
//       id: "126b67bd-1277-4a00-be97-6f5587156ccc",
//       userId: "a1c8a4d4-1d4b-4ffc-b0c6-6487a0026c4b",
//       skillId: "a5c07964-20ed-42ae-933b-cb7031b6344a",
//       skillName: "MongoDB",
//     },
//     {
//       id: "1b2b765d-df87-43ca-9a04-32a35e28f51e",
//       userId: "a1c8a4d4-1d4b-4ffc-b0c6-6487a0026c4b",
//       skillId: "bc4e8dd3-20b6-4e67-a9e0-4d776339d506",
//       skillName: "MySQL",
//     },
//     {
//       id: "3722f5c5-0db6-4822-9b9c-af3fe17e3625",
//       userId: "a1c8a4d4-1d4b-4ffc-b0c6-6487a0026c4b",
//       skillId: "7aa438c0-c212-4e0e-8932-14219dbc01c0",
//       skillName: "ASP.NET",
//     },
//     {
//       id: "56f88df7-f19c-4e4d-b880-fc4829e4e2ce",
//       userId: "a1c8a4d4-1d4b-4ffc-b0c6-6487a0026c4b",
//       skillId: "81daf2ac-eb99-44e2-9873-a3566ca893be",
//       skillName: "C#",
//     },
//     {
//       id: "587f19ec-08f2-44b2-ad3c-6ffa2e9d69d9",
//       userId: "a1c8a4d4-1d4b-4ffc-b0c6-6487a0026c4b",
//       skillId: "fb2bcbd8-70c2-4a69-b6ff-b576dc1da478",
//       skillName: "Yii",
//     },
//     {
//       id: "62927215-9060-4b32-92c1-e8330e6aacd9",
//       userId: "a1c8a4d4-1d4b-4ffc-b0c6-6487a0026c4b",
//       skillId: "995f0b9d-024e-483e-8e6a-2b239b73ee02",
//       skillName: "TypeScript",
//     },
//     {
//       id: "862e8c38-7436-4900-9e33-cae08bb017dc",
//       userId: "a1c8a4d4-1d4b-4ffc-b0c6-6487a0026c4b",
//       skillId: "7b9dcd79-cc9f-4139-aa44-88124af4d5a4",
//       skillName: "Semantic UI",
//     },
//     {
//       id: "92bffbbb-0ac6-45fb-a685-3ea426878e18",
//       userId: "a1c8a4d4-1d4b-4ffc-b0c6-6487a0026c4b",
//       skillId: "24ec9493-06b9-40d2-b78b-daff8201975b",
//       skillName: "Bootstrap",
//     },
//     {
//       id: "cd5a4871-3e00-45ee-96a8-d0f142fa80c3",
//       userId: "a1c8a4d4-1d4b-4ffc-b0c6-6487a0026c4b",
//       skillId: "88754b71-8a47-4d67-a91b-83842b59a970",
//       skillName: "Node.js",
//     },
//     {
//       id: "e33644d5-35ae-411a-8238-d528f49f4f8a",
//       userId: "a1c8a4d4-1d4b-4ffc-b0c6-6487a0026c4b",
//       skillId: "0d609c5c-4296-4bda-bb3d-c0ff7cdb3f63",
//       skillName: "Oracle Database",
//     },
//     {
//       id: "f4d60617-68a9-4591-a783-680786804b16",
//       userId: "a1c8a4d4-1d4b-4ffc-b0c6-6487a0026c4b",
//       skillId: "c3524fd1-4e54-4bef-9d36-f8eb09a651f8",
//       skillName: "Next.js",
//     },
//     {
//       id: "fbc0575b-c2bf-4bfd-8973-55064424ba2a",
//       userId: "a1c8a4d4-1d4b-4ffc-b0c6-6487a0026c4b",
//       skillId: "53b65a42-0666-471f-aaa4-f3f585b670d4",
//       skillName: "PHP",
//     },
//   ],
//   languages: [
//     {
//       id: "68fe1d24-0163-49a5-b2db-b758a22e6672",
//       userId: "a1c8a4d4-1d4b-4ffc-b0c6-6487a0026c4b",
//       languageId: "906f18fa-aa0d-4254-a356-117b777ee19a",
//       level: "elementary",
//       languageName: "Japanese",
//     },
//     {
//       id: "b20a2200-4468-47ee-9353-84cde10213bb",
//       userId: "a1c8a4d4-1d4b-4ffc-b0c6-6487a0026c4b",
//       languageId: "3b1e77e9-b392-4aeb-9638-f65d358c5efa",
//       level: "none",
//       languageName: "arabic updated",
//     },
//   ],
//   education: [
//     {
//       id:1,
//       degree: "Bachelor of Science in Computer Science",
//       institution: "University of Example",
//       brief: "Studied computer science and software engineering.",
//       fromYear: 2015,
//       toYear: 2019,
//     },
//     {
//       id:2,
//       degree: "Master of Science in Data Science",
//       institution: "Institute of Data",
//       brief: "Focused on data analysis and machine learning.",
//       fromYear: 2020,
//       toYear: 2022,
//     },
//   ],
//   experiences: [
//     {
//       id: "ddc29fbe-91a4-4fb8-ba38-9073c28e36c8",
//       userId: "a1c8a4d4-1d4b-4ffc-b0c6-6487a0026c4b",
//       title: "Frontend Developer",
//       company: "BonZuttner inc.",
//       summary: "Part-time role",
//       location: "Damascus, Syria",
//       remote: false,
//       fulltime: null,
//       startYear: 2018,
//       startMonth: 2,
//       endYear: 2020,
//       endMonth: 2,
//       createdAt: "2024-05-29T05:36:36.000Z",
//       updatedAt: "2024-05-29T05:36:36.000Z",
//       deletedAt: null,
//     },
//   ],
//   projects: [],
// },
