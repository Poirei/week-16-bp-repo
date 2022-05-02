import React, { useEffect, useState } from "react";
import { PublicKey } from "@solana/web3.js";
import {
  useNavigation,
  Text,
  View,
  BalancesTable,
  BalancesTableHead,
  BalancesTableContent,
  BalancesTableFooter,
  BalancesTableRow,
  BalancesTableCell,
} from "@200ms/anchor-ui";

export function App() {
  return <CmcTable />;
}

function CmcTable() {
  return (
    <BalancesTable>
      <BalancesTableHead title={"Coin Market Cap"} iconUrl={CMC_ICON_DATA} />
      <BalancesTableContent>
        <BalancesTableRow>
          <BalancesTableCell title={"Hello, World!"} icon={CMC_ICON_DATA} />
        </BalancesTableRow>
      </BalancesTableContent>
      <BalancesTableFooter></BalancesTableFooter>
    </BalancesTable>
  );
}

const CMC_ICON_DATA =
  "data:image/png;base64,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";
