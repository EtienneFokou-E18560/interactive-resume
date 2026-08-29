import { cookies } from "next/headers";
import {
  getLabInviteCode,
  getPublicLabWsUrl,
  getServerLabWsUrl,
  LAB_INVITE_COOKIE,
} from "@/lib/lab";
import LaunchEngineeringLab, {
  type LabStatus,
} from "@/components/LaunchEngineeringLab";

export default async function LaunchEngineeringLabGate() {
  const publicUrl = getPublicLabWsUrl();
  if (publicUrl) {
    const initialStatus: LabStatus = {
      mode: "owner",
      unlocked: true,
      hostAvailable: true,
      inviteConfigured: false,
      wsUrl: publicUrl,
    };
    return <LaunchEngineeringLab initialStatus={initialStatus} />;
  }

  const inviteConfigured = Boolean(getLabInviteCode());
  if (!inviteConfigured) {
    return null;
  }

  const cookieStore = await cookies();
  const unlocked = cookieStore.get(LAB_INVITE_COOKIE)?.value === "1";
  const serverUrl = getServerLabWsUrl();

  const initialStatus: LabStatus = {
    mode: "invite",
    unlocked,
    hostAvailable: Boolean(serverUrl),
    inviteConfigured: true,
    wsUrl: unlocked && serverUrl ? serverUrl : null,
  };

  return <LaunchEngineeringLab initialStatus={initialStatus} />;
}
