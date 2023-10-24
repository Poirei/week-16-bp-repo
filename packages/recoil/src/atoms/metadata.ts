import { BACKEND_API_URL } from "@coral-xyz/common";
import { atom, selector } from "recoil";

type UserMetadata = {
  firstName: string;
  lastName: string;
};

export const userMetadataAtom = atom<UserMetadata | null>({
  key: "userMetadataAtom",
  default: selector({
    key: "userMetadataSelector",
    get: async ({ get }) => {
      const res = await fetch(`${BACKEND_API_URL}/users/metadata`, {
        method: "GET",
      });

      const { firstName, lastName } = await res.json();
      return { firstName, lastName };
    },
  }),
});
