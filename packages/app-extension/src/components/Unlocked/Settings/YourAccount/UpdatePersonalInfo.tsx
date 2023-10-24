import type { FormEvent } from "react";
import { useEffect, useState } from "react";
import { BACKEND_API_URL } from "@coral-xyz/common";
import {
  PrimaryButton,
  SecondaryButton,
  TextInput,
} from "@coral-xyz/react-common";
import { userMetadataAtom } from "@coral-xyz/recoil";
import { useCustomTheme } from "@coral-xyz/themes";
import { FaceRetouchingNaturalTwoTone } from "@mui/icons-material";
import { Typography } from "@mui/material";
import { useRecoilValue } from "recoil";

import { useNavigation } from "../../../common/Layout/NavStack";

export function UpdatePersonalInfo() {
  const nav = useNavigation();
  const theme = useCustomTheme();
  const initialInfo = useRecoilValue(userMetadataAtom);
  const [firstName, setFirstName] = useState(initialInfo?.firstName || "");
  const [lastName, setLastName] = useState(initialInfo?.lastName || "");

  useEffect(() => {
    nav.setOptions({ headerTitle: "Update Personal Info" });

    (async () => {
      const res = await fetch(`${BACKEND_API_URL}/users/metadata`, {
        method: "GET",
      });

      const { firstName, lastName } = await res.json();
      // return { firstName, lastName };
      console.log({ firstName, lastName });
    })();
  }, []);

  const onCancel = () => {
    nav.pop();
  };

  const save = async (e?: FormEvent) => {
    e?.preventDefault();
  };

  return (
    <form
      onSubmit={save}
      style={{
        paddingLeft: "16px",
        paddingRight: "16px",
        paddingBottom: "16px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        height: "100%",
        textAlign: "center",
        alignContent: "center",
        color: theme.custom.colors.secondary,
      }}
    >
      <FaceRetouchingNaturalTwoTone
        sx={{
          color: theme.custom.colors.icon,
          fontSize: 40,
          margin: "32px auto 0",
        }}
      />

      <div
        style={{
          flex: 1,
          display: "grid",
          gridAutoRows: "max-content",
          rowGap: 12,
        }}
      >
        <div style={{ marginBottom: -2 }}>
          <TextInput
            placeholder="First Name"
            type="string"
            required={false}
            error={false}
            value={firstName}
            setValue={(e) => {
              setFirstName(e.target.value);
            }}
            startAdornment={
              <Typography
                style={{
                  fontSize: "11px",
                  fontWeight: 500,
                  lineHeight: "18px",
                  color: theme.custom.colors.secondary,
                }}
              >
                First Name
              </Typography>
            }
          />
        </div>
        <div style={{ marginBottom: -2 }}>
          <TextInput
            placeholder="Last Name"
            type="string"
            required={false}
            error={false}
            value={lastName}
            setValue={(e) => {
              setLastName(e.target.value);
            }}
            startAdornment={
              <Typography
                style={{
                  fontSize: "11px",
                  fontWeight: 500,
                  lineHeight: "18px",
                  color: theme.custom.colors.secondary,
                }}
              >
                Last Name
              </Typography>
            }
          />
        </div>
      </div>

      <div style={{ display: "flex" }}>
        <SecondaryButton
          label="Cancel"
          onClick={() => onCancel()}
          style={{
            marginRight: "8px",
            border: `${theme.custom.colors.borderFull}`,
          }}
        />
        <PrimaryButton label="Set" type="submit" disabled={false} />
      </div>
    </form>
  );
}
