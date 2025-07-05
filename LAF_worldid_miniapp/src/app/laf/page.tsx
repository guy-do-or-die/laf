import { Page } from "@/components/PageLayout";
import { LAFHeader } from "@/components/LAFHeader";
import { LAFMain } from "@/components/LAFMain";

export default function LAFPage() {
  return (
    <Page>
      <Page.Header>
        <LAFHeader />
      </Page.Header>
      <Page.Main>
        <LAFMain />
      </Page.Main>
    </Page>
  );
}
